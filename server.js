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

const upload = multer({ storage: storage });

const LocalStrategy = require("passport-local").Strategy;
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;
const sessionMiddleware = session({ secret: "changeit", resave: false, saveUninitialized: false });
const expressSanitizer = require('express-sanitizer');
//-------------------------------------------------------APP CONFIG ------------------------------------------------------------------------
app.use(methodOverride("_method")); //Permite utilizar o HTTP PUT e DELETE num formulario do lado do cliente
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(expressSanitizer());
//---------------------------------------------------------------------------------------------------------------------------
require('./REST/rest')(app, model.team_members, upload, model.publications, model.multimedia, model.about_us,model.activities);
require('./REST/dashboard')(app, ensureLoggedIn, upload, fs, path, model.publications, model.team_members, model.multimedia, model.about_us, model.ObjectId,model.activities);

server.listen(8080, function () {
  console.log('listening on :8080');
});

const team_members = model.team_members;
const User = model.user;
const about_us = model.about_us;


app.post('/add_team_member', upload.single('image'), (req, res, next) => {
  var obj = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    country: req.body.country,
    area: req.body.area,
    about: req.body.about,
    img: {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: 'image/png'
    }
  }
  team_members.create(obj, function (err, item) {
    if (err) {
      console.log(err);
    }
    else {
      // item.save();
      res.redirect('/team');
    }
  });
});


passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));


app.get('/login', (req, res) => {
  const isAuthenticated = !!req.user;
  if (isAuthenticated) {
    console.log(`user is authenticated, session is ${req.session.id}`);
  } else {
    console.log("unknown user");
  }
  res.render(isAuthenticated ? "index" : "login");
});


app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/brant",
    failureRedirect: "/login",
  })
);


app.post("/logout", (req, res) => {
  console.log(`logout ${req.session.id}`);
  const socketId = req.session.socketId;
  if (socketId && io.of("/login").sockets.get(socketId)) {
    console.log(`forcefully closing socket ${socketId}`);
    io.of("/login").sockets.get(socketId).disconnect(true);
  }
  req.logout();
  res.cookie("connect.sid", "", { expires: new Date() });
  res.redirect("/brant");
});

passport.serializeUser((user, cb) => {
  console.log(`serializeUser ${user.id}`);
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  console.log(`deserializeUser ${id}`);
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


app.all('*', function (req, res) {
  var isAuthenticated = !!req.user;
		var user = req.user;
		about_us.find({}, function (err, about) {
			if (err) {
				console.log(err);
			} else {
				if (isAuthenticated) {
					res.render("404", { auth: isAuthenticated, user: user, about_us: about });
				}
				else {
					isAuthenticated = false;
					res.render("404", { auth: isAuthenticated, user: user, about_us: about });
				}
			}
		});
});