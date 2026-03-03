const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
title: String,
description: String,
techStack: [String],
repoLink: String,
liveLink: String,
});

const userSchema = new mongoose.Schema(
{
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },


    name: String,
    bio: String,
    github: String,
    linkedin: String,
    visits: { type: Number, default: 0 },

    projects: [projectSchema],
},
{ timestamps: true }
);

module.exports =  mongoose.models.User || mongoose.model("User", userSchema);
