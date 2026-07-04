module.exports = function (app, ensureLoggedIn, verifyCsrf, upload, fs, path, publications, team_members, multimedia, about_us, ObjectId, activities) {
    app.get("/add_team_member", ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console.log(err);
            } else {
                var isAuthenticated = !!req.user;
                var user = req.user;
                res.render("add_team_member", { auth: isAuthenticated, user: user, about_us: about });
            }
        });
    });

    app.get("/edit_team_member/:id", ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console.error(err);
            } else {
                team_members.findById(req.params.id, function (err, member) {
                    if (err) {
                        console.log(err);
                        res.redirect('/team');
                    } else {
                        var isAuthenticated = !!req.user;
                        var user = req.user;
                        res.render("edit_team_member", { auth: isAuthenticated, user: user, member: member, about_us: about });
                    }
                });
            }
        });

    });

    app.delete("/team/:id", ensureLoggedIn('/login'), verifyCsrf, async (req, res, next) => {
        try {
            await team_members.findByIdAndDelete(req.params.id);
            res.redirect("/team");
        } catch (err) { next(err); }
    });

    app.put("/edit_team_member/:id", ensureLoggedIn('/login'), verifyCsrf, async (req, res, next) => {
        try {
            await team_members.findByIdAndUpdate(req.params.id, {
                $set: { name: req.body.name, email: req.body.email, phone: req.body.phone, country: req.body.country, area: req.body.area, about: req.body.about }
            });
            res.redirect("/team");
        } catch (err) { next(err); }
    });

    app.get("/add_publication", ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console.error(err);
            } else {
                var isAuthenticated = !!req.user;
                var user = req.user;
                res.render("add_publication", { auth: isAuthenticated, user: user, about_us: about });
            }
        });

    });

    app.post("/add_publication", ensureLoggedIn('/login'), verifyCsrf, async (req, res, next) => {
        try {
            await publications.create({ title: req.body.title, authors: req.body.authors, type: req.body.type, date: req.body.date, abstract: req.body.abstract, url: req.body.url });
            res.redirect("/publications");
        } catch (err) { next(err); }
    });

    app.delete("/publications/:id", ensureLoggedIn('/login'), verifyCsrf, async (req, res, next) => {
        try {
            await publications.findByIdAndDelete(req.params.id);
            res.redirect("/publications");
        } catch (err) { next(err); }
    });

    app.get("/edit_publication/:id", ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console.error(err);
            } else {
                publications.findById(req.params.id, function (err, publication) {
                    if (err) {
                        console.log(err);
                        res.redirect('/publications');
                    } else {
                        var isAuthenticated = !!req.user;
                        var user = req.user;
                        res.render("edit_publication", { auth: isAuthenticated, user: user, publication: publication, about_us: about });
                    }
                });
            }
        });
    });

    app.put("/edit_publication/:id", ensureLoggedIn('/login'), verifyCsrf, async (req, res, next) => {
        try {
            await publications.findByIdAndUpdate(req.params.id, {
                $set: { title: req.body.title, authors: req.body.authors, type: req.body.type, date: req.body.date, abstract: req.body.abstract, url: req.body.url }
            });
            res.redirect("/publications/" + req.params.id);
        } catch (err) { next(err); }
    });

    app.get("/add_activitie", ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console.error(err);
            } else {
                var isAuthenticated = !!req.user;
                var user = req.user;
                res.render("add_activitie", { auth: isAuthenticated, user: user, about_us: about });
            }
        });

    });

    app.post("/add_activitie", ensureLoggedIn('/login'), verifyCsrf, async (req, res, next) => {
        try {
            await activities.create({ title: req.body.title, participations: req.body.participations, abstract: req.body.abstract, date: req.body.date, url: req.body.url });
            res.redirect("/activities");
        } catch (err) { next(err); }
    });

    app.delete("/activities/:id", ensureLoggedIn('/login'), verifyCsrf, async (req, res, next) => {
        try {
            await activities.findByIdAndDelete(req.params.id);
            res.redirect("/activities");
        } catch (err) { next(err); }
    });

    app.get("/edit_activitie/:id", ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console.error(err);
            } else {
                activities.findById(req.params.id, function (err, activitie) {
                    if (err) {
                        console.log(err);
                        res.redirect('/activities');
                    } else {
                        var isAuthenticated = !!req.user;
                        var user = req.user;
                        res.render("edit_activitie", { auth: isAuthenticated, user: user, activitie: activitie, about_us: about });
                    }
                });
            }
        });
    });

    app.put("/edit_activitie/:id", ensureLoggedIn('/login'), verifyCsrf, async (req, res, next) => {
        try {
            await activities.findByIdAndUpdate(req.params.id, {
                $set: { title: req.body.title, participations: req.body.participations, abstract: req.body.abstract, date: req.body.date, url: req.body.url }
            });
            res.redirect("/activities/" + req.params.id);
        } catch (err) { next(err); }
    });

    app.get("/add_multimedia", ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console.error(err);
            } else {
                var isAuthenticated = !!req.user;
                var user = req.user;
                res.render("add_multimedia", { auth: isAuthenticated, user: user, about_us: about });
            }
        });

    });

    app.post("/add_multimedia", ensureLoggedIn('/login'), verifyCsrf, async (req, res, next) => {
        try {
            await multimedia.create({ title: req.body.title, description: req.body.description, url: req.body.url });
            res.redirect("/multimedia");
        } catch (err) { next(err); }
    });

    app.delete("/multimedia/:id", ensureLoggedIn('/login'), verifyCsrf, async (req, res, next) => {
        try {
            await multimedia.findByIdAndDelete(req.params.id);
            res.redirect("/multimedia");
        } catch (err) { next(err); }
    });

    app.get('/edit_multimedia/:id', ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console.error(err);
            } else {
                multimedia.findById(req.params.id, function (err, multimedia) {
                    if (err) {
                        console.log(err);
                        res.redirect('/multimedia');
                    }
                    else {
                        var isAuthenticated = !!req.user;
                        var user = req.user;
                        res.render("edit_multimedia", { auth: isAuthenticated, user: user, multimedia: multimedia, about_us: about });
                    }
                });
            }
        });
    });

    app.put("/edit_multimedia/:id", ensureLoggedIn('/login'), verifyCsrf, async (req, res, next) => {
        try {
            await multimedia.findByIdAndUpdate(req.params.id, {
                $set: { title: req.body.title, description: req.body.description, url: req.body.url }
            });
            res.redirect("/multimedia/");
        } catch (err) { next(err); }
    });

    app.get('/edit_about_us/:id', ensureLoggedIn('/login'), (req, res) => {
        about_us.find(ObjectId(req.params.id), function (err, about) {
            if (err) {
                console.log(err);
                res.redirect('/brant');
            }
            else {
                var isAuthenticated = !!req.user;
                var user = req.user;
                res.render("edit_about_us", { auth: isAuthenticated, user: user, about_us: about });
                console.log(about);
            }
        });
    });

    app.put("/edit_about_us/:id", ensureLoggedIn('/login'), verifyCsrf, async (req, res, next) => {
        try {
            await about_us.findByIdAndUpdate(req.params.id, {
                $set: { objectives: req.body.objectives, mission: req.body.mission, structural_org: req.body.structural_org, about: req.body.about, address: req.body.address, email: req.body.email, phone1: req.body.phone1, phone2: req.body.phone2, facebook: req.body.facebook, twitter: req.body.twitter, youtube: req.body.youtube }
            });
            res.redirect("/brant/");
        } catch (err) { next(err); }
    });

    app.post('/add_team_member', ensureLoggedIn('/login'), upload.single('image'), async (req, res, next) => {
        try {
            const obj = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                country: req.body.country,
                area: req.body.area,
                about: req.body.about,
                img: {
                    data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
                    contentType: req.file.mimetype
                }
            };
            await team_members.create(obj);
            res.redirect('/team');
        } catch (err) { next(err); }
    });

}
