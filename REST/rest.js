module.exports = function (app, team_members, upload, publications, multimedia, about_us, activities) {
	app.get("/", function (req, res) {
		res.redirect("/brant");
	});


	app.get("/brant", function (req, res) {
		about_us.find({}, function (err, about) {
			if (err) {
				console.log(err);
				res.status(500).send('An error occurred', err);
			}
			else {
				publications.find({}, function (err, publications) {
					if(err){
						console.log(err);
					}
					else{
						var isAuthenticated = !!req.user;
						var user = req.user;
						if (isAuthenticated) {
							res.render("about_us", { about_us: about, auth: isAuthenticated, user: user, publications: publications });
						}
						else {
							isAuthenticated = false;
							res.render('about_us', { about_us: about, auth: isAuthenticated, user: user, publications: publications });
						}
					}
				});
			}
		});
	});

	app.get("/team", function (req, res) {
		about_us.find({}, function (err, about) {
			if (err) {
				console.log(err);
			} else {
				team_members.find({}, function (err, members) {
					if (err) {
						console.log(err);
						res.status(500).send('An error occurred', err);
					}
					else {
						var isAuthenticated = !!req.user;
						var user = req.user;
						if (isAuthenticated) {
							res.render("team", { members: members, auth: isAuthenticated, user: user, about_us: about });
						}
						else {
							isAuthenticated = false;
							res.render('team', { members: members, auth: isAuthenticated, user: user, about_us: about });
						}
					}
				});
			}
		});
	});

	app.get("/team/:id", function (req, res) {
		about_us.find({}, function (err, about) {
			if (err) {
				console.log(err);
			} else {
				team_members.findById(req.params.id, function (err, member_profile) {
					if (err) {
						console.log(err);
						res.status(500).send('An error occurred', err);
					}
					else {
						var isAuthenticated = !!req.user;
						var user = req.user;
						if (isAuthenticated) {
							res.render("member_profile", { auth: isAuthenticated, member_profile: member_profile, user: user, about_us: about });
						}
						else {
							isAuthenticated = false;
							res.render("member_profile", { auth: isAuthenticated, member_profile: member_profile, user: user, about_us: about });
						}
					}
				});
			}
		});
	});

	app.get("/publications", function (req, res) {
		about_us.find({}, function (err, about) {
			if (err) {
				console.log(err);
			} else {
				publications.find({}, function (err, publications) {
					if (err) {
						console.log(err);
						res.status(500).send('An error occurred', err);
					}
					else {
						var isAuthenticated = !!req.user;
						var user = req.user;
						if (isAuthenticated) {
							res.render("publications", { publication: publications, auth: isAuthenticated, user: user, about_us: about });
						}
						else {
							isAuthenticated = false;
							res.render('publications', { publication: publications, auth: isAuthenticated, user: user, about_us: about });
						}
					}
				});
			}
		});
	});

	app.get("/publications/:id", function (req, res) {
		about_us.find({}, function (err, about) {
			if (err) {
				console.log(err);
			} else {
				publications.findById(req.params.id, function (err, publication) {
					if (err) {
						console.log(err);
						res.status(500).send('An error occurred', err);
					}
					else {
						var isAuthenticated = !!req.user;
						var user = req.user;
						if (isAuthenticated) {
							res.render("publications_info", { auth: isAuthenticated, publication: publication, user: user, about_us: about });
						}
						else {
							isAuthenticated = false;
							res.render("publications_info", { auth: isAuthenticated, publication: publication, user: user, about_us: about });
						}
					}
				});
			}
		});
	});

	app.get("/activities", function (req, res) {
		about_us.find({}, function (err, about) {
			if (err) {
				console.log(err);
			} else {
				activities.find({}, function (err, activities) {
					if (err) {
						console.log(err);
						res.status(500).send('An error occurred', err);
					}
					else {
						var isAuthenticated = !!req.user;
						var user = req.user;
						if (isAuthenticated) {
							res.render("activities", { activities: activities, auth: isAuthenticated, user: user, about_us: about });
						}
						else {
							isAuthenticated = false;
							res.render('activities', { activities: activities, auth: isAuthenticated, user: user, about_us: about });
						}
					}
				});
			}
		});
	});

	app.get("/activities/:id", function (req, res) {
		about_us.find({}, function (err, about) {
			if (err) {
				console.log(err);
			} else {
				activities.findById(req.params.id, function (err, activitie) {
					if (err) {
						console.log(err);
						res.status(500).send('An error occurred', err);
					}
					else {
						var isAuthenticated = !!req.user;
						var user = req.user;
						if (isAuthenticated) {
							res.render("activities_info", { auth: isAuthenticated, activitie: activitie, user: user, about_us: about });
						}
						else {
							isAuthenticated = false;
							res.render("activities_info", { auth: isAuthenticated, activitie: activitie, user: user, about_us: about });
						}
					}
				});
			}
		});
	});

	app.get("/multimedia", function (req, res) {
		about_us.find({}, function (err, about) {
			if (err) {
				console.log(err);
			} else {
				multimedia.find({}, function (err, multimedia) {
					if (err) {
						console.log(err);
						res.status(500).send('An error occurred', err);
					}
					else {
						var isAuthenticated = !!req.user;
						var user = req.user;
						if (isAuthenticated) {
							res.render("multimedia", { multimedia: multimedia, auth: isAuthenticated, user: user, about_us: about });
						}
						else {
							isAuthenticated = false;
							res.render('multimedia', { multimedia: multimedia, auth: isAuthenticated, user: user, about_us: about });
						}
					}
				});
			}
		});

	});
	
}