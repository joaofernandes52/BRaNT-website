var mongoose = require("mongoose");

//mongoose.connect("mongodb+srv://DBW11:Kq7sKuMNdj1wibo5@clusterdbw.1dbjr.mongodb.net/DBW11?authSource=admin&replicaSet=atlas-bek8xj-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true");
mongoose.connect("mongodb+srv://Brant:Brant@dbbrant.mlorq9v.mongodb.net/?retryWrites=true&w=majority");
const  ObjectId = require('mongodb').ObjectId;

var user_Schema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
}, {
    versionKey: false
});

var team_members_Schema = new mongoose.Schema({
    name: String,
    area: String,
    email: String,
    about: String,
    phone: String,
    country: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
}, {
    versionKey: false
}
);

var publications_Schema = new mongoose.Schema({
    tittle: String,
    authors: String,
    type: String,
    date: String,
    abstract: String,
    url: String,
}, {
    versionKey: false
});

var activities_Schema = new mongoose.Schema({
    tittle: String,
    participations: String,
    abstract: String,
    date: String,
    url: String,
}, {
    versionKey: false
});

var multimedia_Schema = new mongoose.Schema({
    tittle: String,
    description: String,
    url: String,
}, {
    versionKey: false
});

var about_us_Schema = new mongoose.Schema({
    objectives: String,
    mission: String,
    structural_org: String,
    about: String,
    adress: String,
    email: String,
    phone1: String,
    phone2: String,
    facebook: String,
    twitter: String,
    youtube: String
}, {
    versionKey: false
});

user_Schema.methods.verifyPassword = function (password) {
    return password === this.password;
}

var user = mongoose.model('users', user_Schema);
var team_members = mongoose.model('team_members', team_members_Schema);
var publications = mongoose.model('publications', publications_Schema);
var multimedia = mongoose.model('multimedia', multimedia_Schema);
var about_us = mongoose.model('about_us', about_us_Schema);
var activities = mongoose.model('activities', activities_Schema);

module.exports = { user, team_members, publications, multimedia, about_us, ObjectId, activities};

