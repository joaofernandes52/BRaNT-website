require('dotenv').config();

const express = require("express");
const app = express();
const server = require("http").createServer(app);
//methodOverride é usado para fazer update da informação do blog para meter na base de dados
const methodOverride = require("method-override");
const model = require("./model/model");
//----------------------------------------------------------------------------------------------------------------------------------------
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");

const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de ficheiro não permitido. Usa JPG, PNG, GIF ou WebP.'));
    }
  }
});

const LocalStrategy = require("passport-local").Strategy;
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;
const sessionMiddleware = session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false });
const expressSanitizer = require('express-sanitizer');
const flash = require('connect-flash');
//-------------------------------------------------------APP CONFIG ------------------------------------------------------------------------
app.use(methodOverride("_method")); //Permite utilizar o HTTP PUT e DELETE num formulario do lado do cliente
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(expressSanitizer());
//---------------------------------------------------------------------------------------------------------------------------
const about_us = model.about_us;

// Middleware global — injeta dados partilhados em todas as views
app.use(async (req, res, next) => {
  try {
    const about = await about_us.find({});
    res.locals.about_us = about;
    res.locals.auth = req.user?.role === 'admin';
    res.locals.user = req.user || null;
    res.locals.flash_success = req.flash('success');
    res.locals.flash_error = req.flash('error');
    next();
  } catch (err) {
    next(err);
  }
});

// CSRF: gera token por sessão, injeta em todas as views
const crypto = require('crypto');
app.use((req, res, next) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(32).toString('hex');
  }
  res.locals.csrfToken = req.session.csrfToken;
  next();
});

// Middleware de verificação CSRF (usado nas rotas que alteram dados)
function verifyCsrf(req, res, next) {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const token = req.body._csrf || req.query._csrf;
    if (!token || token !== req.session.csrfToken) {
      return res.status(403).send('Acesso negado: token CSRF inválido.');
    }
  }
  next();
}

// Garante que o utilizador autenticado tem role admin
function ensureAdmin(req, res, next) {
  if (req.user?.role === 'admin') return next();
  res.redirect('/login');
}

require('./REST/rest')(app, model.team_members, upload, model.publications, model.multimedia, model.about_us, model.activities);
require('./REST/dashboard')(app, ensureLoggedIn, ensureAdmin, verifyCsrf, upload, fs, path, model.publications, model.team_members, model.multimedia, model.about_us, model.ObjectId, model.activities);

server.listen(8080, function () {
  console.log('listening on :8080');
});

const User = model.user;


passport.use(new LocalStrategy(async function (username, password, done) {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false);
    const ok = await user.verifyPassword(password);
    if (!ok) return done(null, false);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));


app.get('/login', (req, res) => {
  if (req.user) return res.redirect('/brant');
  res.locals.flash_error = req.flash('error');
  res.render("login");
});


app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/brant",
    failureRedirect: "/login",
    failureFlash: 'Credenciais inválidas. Tenta novamente.',
  })
);


app.post("/logout", verifyCsrf, (req, res) => {
  req.logout();
  res.redirect("/brant");
});

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


app.use((err, req, res, next) => {
  if (err.message === 'Tipo de ficheiro não permitido. Usa JPG, PNG, GIF ou WebP.') {
    req.flash('error', err.message);
    return res.redirect('back');
  }
  const status = err.status || 500;
  console.error(err);
  res.status(status).render('error', { message: status === 500 ? 'Erro interno do servidor.' : err.message, status });
});

app.all('*', async (req, res, next) => {
  try {
    res.render("404");
  } catch (err) { next(err); }
});