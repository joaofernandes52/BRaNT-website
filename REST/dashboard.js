module.exports = function (app, ensureLoggedIn, upload, fs, path, publications, team_members, multimedia, about_us, ObjectId, activities) {
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
                console - log(err);
            } else {
                team_members.findById(req.params.id, function (err, member) {
                    if (err) {
                        console.log(err);
                        redirect('/team');
                    } else {
                        var isAuthenticated = !!req.user;
                        var user = req.user;
                        res.render("edit_team_member", { auth: isAuthenticated, user: user, member: member, about_us: about });
                    }
                });
            }
        });

    });

    app.delete("/team/:id", ensureLoggedIn('/login'), (req, res) => {
        team_members.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                console.log(err);
                res.redirect("/team");
            } else {
                res.redirect("/team");
            }
        });
    });

    app.put("/edit_team_member/:id", ensureLoggedIn('/login'), (req, res) => {
        team_members.findByIdAndUpdate(req.params.id, req.body, function (err, editMember) {
            if (err) {
                console.log(err);
                res.redirect("/team")
            } else {
                res.redirect("/team");
            }
        });

    });

    app.get("/add_publication", ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console - log(err);
            } else {
                var isAuthenticated = !!req.user;
                var user = req.user;
                res.render("add_publication", { auth: isAuthenticated, user: user, about_us: about });
            }
        });

    });

    app.post("/add_publication", ensureLoggedIn('/login'), (req, res) => {
        publications.create(req.body, function (err, newPublication) {
            if (err) {
                console.log(err);
                res.redirect("/publications")
            } else {
                res.redirect("/publications");
            }
        });
    });

    app.delete("/publications/:id", ensureLoggedIn('/login'), (req, res) => {
        publications.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                console.log(err);
                res.redirect("/publications");
            } else {
                res.redirect("/publications");
            }
        });
    });

    app.get("/edit_publication/:id", ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console - log(err);
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

    app.put("/edit_publication/:id", ensureLoggedIn('/login'), (req, res) => {
        publications.findByIdAndUpdate(req.params.id, req.body, function (err, editPublication) {
            if (err) {
                console.log(err);
                res.redirect("/publications")
            } else {
                res.redirect("/publications/" + req.params.id);
            }
        });

    });

    app.get("/add_activitie", ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console - log(err);
            } else {
                var isAuthenticated = !!req.user;
                var user = req.user;
                res.render("add_activitie", { auth: isAuthenticated, user: user, about_us: about });
            }
        });

    });

    app.post("/add_activitie", ensureLoggedIn('/login'), (req, res) => {
        activities.create(req.body, function (err, newActivitie) {
            if (err) {
                console.log(err);
                res.redirect("/activities")
            } else {
                res.redirect("/activities");
            }
        });
    });

    app.delete("/activities/:id", ensureLoggedIn('/login'), (req, res) => {
        activities.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                console.log(err);
                res.redirect("/activities");
            } else {
                res.redirect("/activities");
            }
        });
    });

    app.get("/edit_activitie/:id", ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console - log(err);
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

    app.put("/edit_activitie/:id", ensureLoggedIn('/login'), (req, res) => {
        activities.findByIdAndUpdate(req.params.id, req.body, function (err, editActivitie) {
            if (err) {
                console.log(err);
                res.redirect("/activities")
            } else {
                res.redirect("/activities/" + req.params.id);
            }
        });

    });

    app.get("/add_multimedia", ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console - log(err);
            } else {
                var isAuthenticated = !!req.user;
                var user = req.user;
                res.render("add_multimedia", { auth: isAuthenticated, user: user, about_us: about });
            }
        });

    });

    app.post("/add_multimedia", ensureLoggedIn('/login'), (req, res) => {
        multimedia.create(req.body, function (err, newMultimedia) {
            if (err) {
                console.log(err);
                res.redirect("/multimedia")
            } else {
                res.redirect("/multimedia");
            }
        });
    });

    app.delete("/multimedia/:id", ensureLoggedIn('/login'), (req, res) => {
        multimedia.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                console.log(err);
                res.redirect("/multimedia");
            } else {
                res.redirect("/multimedia");
            }
        });
    });

    app.get('/edit_multimedia/:id', ensureLoggedIn('/login'), (req, res) => {
        about_us.find({}, function (err, about) {
            if (err) {
                console - log(err);
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

    app.put("/edit_multimedia/:id", ensureLoggedIn('/login'), (req, res) => {
        multimedia.findByIdAndUpdate(req.params.id, req.body, function (err, editMultimedia) {
            if (err) {
                console.log(err);
                res.redirect("/multimedia")
            } else {
                res.redirect("/multimedia/");
            }
        });
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

    app.put("/edit_about_us/:id", ensureLoggedIn('/login'), (req, res) => {
        about_us.findByIdAndUpdate(req.params.id, req.body, function (err, editAbout_us) {
            if (err) {
                console.log(err);
                res.redirect("/brant")
            } else {
                res.redirect("/brant/");
            }
        });
    });

}