module.exports = function (app, ensureLoggedIn, ensureAdmin, verifyCsrf, upload, fs, path, publications, team_members, multimedia, about_us, ObjectId, activities) {
    const admin = [ensureLoggedIn('/login'), ensureAdmin];

    app.get("/add_team_member", admin, async (req, res, next) => {
        try {
            res.render("add_team_member");
        } catch (err) { next(err); }
    });

    app.get("/edit_team_member/:id", admin, async (req, res, next) => {
        try {
            const member = await team_members.findById(req.params.id);
            res.render("edit_team_member", { member });
        } catch (err) { next(err); }
    });

    app.delete("/team/:id", admin, verifyCsrf, async (req, res, next) => {
        try {
            await team_members.findByIdAndDelete(req.params.id);
            req.flash('success', 'Membro removido com sucesso.');
            res.redirect("/team");
        } catch (err) { next(err); }
    });

    app.put("/edit_team_member/:id", admin, verifyCsrf, async (req, res, next) => {
        try {
            await team_members.findByIdAndUpdate(req.params.id, {
                $set: { name: req.body.name, email: req.body.email, phone: req.body.phone, country: req.body.country, area: req.body.area, about: req.body.about }
            });
            req.flash('success', 'Membro atualizado com sucesso.');
            res.redirect("/team");
        } catch (err) { next(err); }
    });

    app.get("/add_publication", admin, async (req, res, next) => {
        try {
            res.render("add_publication");
        } catch (err) { next(err); }
    });

    app.post("/add_publication", admin, verifyCsrf, async (req, res, next) => {
        try {
            await publications.create({ title: req.body.title, authors: req.body.authors, type: req.body.type, date: req.body.date, abstract: req.body.abstract, url: req.body.url });
            req.flash('success', 'Publicação adicionada com sucesso.');
            res.redirect("/publications");
        } catch (err) { next(err); }
    });

    app.delete("/publications/:id", admin, verifyCsrf, async (req, res, next) => {
        try {
            await publications.findByIdAndDelete(req.params.id);
            req.flash('success', 'Publicação removida com sucesso.');
            res.redirect("/publications");
        } catch (err) { next(err); }
    });

    app.get("/edit_publication/:id", admin, async (req, res, next) => {
        try {
            const publication = await publications.findById(req.params.id);
            res.render("edit_publication", { publication });
        } catch (err) { next(err); }
    });

    app.put("/edit_publication/:id", admin, verifyCsrf, async (req, res, next) => {
        try {
            await publications.findByIdAndUpdate(req.params.id, {
                $set: { title: req.body.title, authors: req.body.authors, type: req.body.type, date: req.body.date, abstract: req.body.abstract, url: req.body.url }
            });
            req.flash('success', 'Publicação atualizada com sucesso.');
            res.redirect("/publications/" + req.params.id);
        } catch (err) { next(err); }
    });

    app.get("/add_activitie", admin, async (req, res, next) => {
        try {
            res.render("add_activitie");
        } catch (err) { next(err); }
    });

    app.post("/add_activitie", admin, verifyCsrf, async (req, res, next) => {
        try {
            await activities.create({ title: req.body.title, participations: req.body.participations, abstract: req.body.abstract, date: req.body.date, url: req.body.url });
            req.flash('success', 'Atividade adicionada com sucesso.');
            res.redirect("/activities");
        } catch (err) { next(err); }
    });

    app.delete("/activities/:id", admin, verifyCsrf, async (req, res, next) => {
        try {
            await activities.findByIdAndDelete(req.params.id);
            req.flash('success', 'Atividade removida com sucesso.');
            res.redirect("/activities");
        } catch (err) { next(err); }
    });

    app.get("/edit_activitie/:id", admin, async (req, res, next) => {
        try {
            const activitie = await activities.findById(req.params.id);
            res.render("edit_activitie", { activitie });
        } catch (err) { next(err); }
    });

    app.put("/edit_activitie/:id", admin, verifyCsrf, async (req, res, next) => {
        try {
            await activities.findByIdAndUpdate(req.params.id, {
                $set: { title: req.body.title, participations: req.body.participations, abstract: req.body.abstract, date: req.body.date, url: req.body.url }
            });
            req.flash('success', 'Atividade atualizada com sucesso.');
            res.redirect("/activities/" + req.params.id);
        } catch (err) { next(err); }
    });

    app.get("/add_multimedia", admin, async (req, res, next) => {
        try {
            res.render("add_multimedia");
        } catch (err) { next(err); }
    });

    app.post("/add_multimedia", admin, verifyCsrf, async (req, res, next) => {
        try {
            await multimedia.create({ title: req.body.title, description: req.body.description, url: req.body.url });
            req.flash('success', 'Conteúdo multimédia adicionado com sucesso.');
            res.redirect("/multimedia");
        } catch (err) { next(err); }
    });

    app.delete("/multimedia/:id", admin, verifyCsrf, async (req, res, next) => {
        try {
            await multimedia.findByIdAndDelete(req.params.id);
            req.flash('success', 'Conteúdo multimédia removido com sucesso.');
            res.redirect("/multimedia");
        } catch (err) { next(err); }
    });

    app.get('/edit_multimedia/:id', admin, async (req, res, next) => {
        try {
            const media = await multimedia.findById(req.params.id);
            res.render("edit_multimedia", { multimedia: media });
        } catch (err) { next(err); }
    });

    app.put("/edit_multimedia/:id", admin, verifyCsrf, async (req, res, next) => {
        try {
            await multimedia.findByIdAndUpdate(req.params.id, {
                $set: { title: req.body.title, description: req.body.description, url: req.body.url }
            });
            req.flash('success', 'Conteúdo multimédia atualizado com sucesso.');
            res.redirect("/multimedia/");
        } catch (err) { next(err); }
    });

    app.get('/edit_about_us/:id', admin, async (req, res, next) => {
        try {
            const about = await about_us.findById(req.params.id);
            res.render("edit_about_us", { about_us: [about] });
        } catch (err) { next(err); }
    });

    app.put("/edit_about_us/:id", admin, verifyCsrf, async (req, res, next) => {
        try {
            await about_us.findByIdAndUpdate(req.params.id, {
                $set: { objectives: req.body.objectives, mission: req.body.mission, structural_org: req.body.structural_org, about: req.body.about, address: req.body.address, email: req.body.email, phone1: req.body.phone1, phone2: req.body.phone2, facebook: req.body.facebook, twitter: req.body.twitter, youtube: req.body.youtube }
            });
            req.flash('success', 'Informações atualizadas com sucesso.');
            res.redirect("/brant/");
        } catch (err) { next(err); }
    });

    app.post('/add_team_member', admin, upload.single('image'), async (req, res, next) => {
        try {
            if (!req.file) {
                req.flash('error', 'É necessário selecionar uma imagem.');
                return res.redirect('back');
            }
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
            req.flash('success', 'Membro adicionado com sucesso.');
            res.redirect('/team');
        } catch (err) { next(err); }
    });

}
