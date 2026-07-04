const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

mongoose.connect(process.env.MONGODB_URI);
const  ObjectId = require('mongodb').ObjectId;

const user_Schema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    role: { type: String, enum: ['admin', 'user'], default: 'admin' },
}, {
    versionKey: false
});

const team_members_Schema = new mongoose.Schema({
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

const publications_Schema = new mongoose.Schema({
    title: String,
    authors: String,
    type: String,
    date: String,
    abstract: String,
    url: String,
}, {
    versionKey: false
});

const activities_Schema = new mongoose.Schema({
    title: String,
    participations: String,
    abstract: String,
    date: String,
    url: String,
}, {
    versionKey: false
});

const multimedia_Schema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
}, {
    versionKey: false
});

const about_us_Schema = new mongoose.Schema({
    objectives: String,
    mission: String,
    structural_org: String,
    about: String,
    address: String,
    email: String,
    phone1: String,
    phone2: String,
    facebook: String,
    twitter: String,
    youtube: String
}, {
    versionKey: false
});

user_Schema.methods.verifyPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

user_Schema.statics.hashPassword = async function (plaintext) {
    return bcrypt.hash(plaintext, SALT_ROUNDS);
};

const user = mongoose.model('users', user_Schema);
const team_members = mongoose.model('team_members', team_members_Schema);
const publications = mongoose.model('publications', publications_Schema);
const multimedia = mongoose.model('multimedia', multimedia_Schema);
const about_us = mongoose.model('about_us', about_us_Schema);
const activities = mongoose.model('activities', activities_Schema);

module.exports = { user, team_members, publications, multimedia, about_us, ObjectId, activities};

