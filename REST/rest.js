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
      const LIMIT = 8;
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const total = await publications.countDocuments({});
      const totalPages = Math.ceil(total / LIMIT);
      const pubs = await publications.find({}).sort({ date: -1 }).skip((page - 1) * LIMIT).limit(LIMIT);
      res.render("publications", { publication: pubs, currentPage: page, totalPages });
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
      const LIMIT = 8;
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const total = await activities.countDocuments({});
      const totalPages = Math.ceil(total / LIMIT);
      const acts = await activities.find({}).sort({ date: -1 }).skip((page - 1) * LIMIT).limit(LIMIT);
      res.render("activities", { activities: acts, currentPage: page, totalPages });
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
