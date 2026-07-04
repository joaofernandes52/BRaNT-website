module.exports = function (app, team_members, upload, publications, multimedia, about_us, activities) {
  app.get("/", (req, res) => res.redirect("/brant"));

  app.get("/brant", async (req, res, next) => {
    try {
      const pubs = await publications.find({});
      res.render("about_us", { publications: pubs });
    } catch (err) { next(err); }
  });

  app.get("/team", async (req, res, next) => {
    try {
      const members = await team_members.find({});
      res.render("team", { members });
    } catch (err) { next(err); }
  });

  app.get("/team/:id", async (req, res, next) => {
    try {
      const member_profile = await team_members.findById(req.params.id);
      res.render("member_profile", { member_profile });
    } catch (err) { next(err); }
  });

  app.get("/publications", async (req, res, next) => {
    try {
      const pubs = await publications.find({});
      res.render("publications", { publication: pubs });
    } catch (err) { next(err); }
  });

  app.get("/publications/:id", async (req, res, next) => {
    try {
      const publication = await publications.findById(req.params.id);
      res.render("publications_info", { publication });
    } catch (err) { next(err); }
  });

  app.get("/activities", async (req, res, next) => {
    try {
      const acts = await activities.find({});
      res.render("activities", { activities: acts });
    } catch (err) { next(err); }
  });

  app.get("/activities/:id", async (req, res, next) => {
    try {
      const activitie = await activities.findById(req.params.id);
      res.render("activities_info", { activitie });
    } catch (err) { next(err); }
  });

  app.get("/multimedia", async (req, res, next) => {
    try {
      const media = await multimedia.find({});
      res.render("multimedia", { multimedia: media });
    } catch (err) { next(err); }
  });
};
