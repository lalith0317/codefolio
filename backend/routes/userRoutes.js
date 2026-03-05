const express = require("express");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();


router.get("/profile", protect, async (req, res) => {
const user = await User.findById(req.user.id).select("-password");
res.json(user);
});


router.put("/profile", protect, async (req, res) => {

const { bio, github, linkedin } = req.body;
const user = await User.findById(req.user.id);

if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}

user.bio = bio || user.bio;
user.github = github || user.github;
user.linkedin = linkedin || user.linkedin;

await user.save();
res.json({ message: "Profile updated" });
});

module.exports = router;


router.post("/projects", protect, async (req, res) => {
const user = await User.findById(req.user.id);

user.projects.push(req.body);
await user.save();

res.json(user.projects);
});


router.get("/projects", protect, async (req, res) => {
const user = await User.findById(req.user.id);
res.json(user.projects);
});

// DELETE PROJECT
router.delete("/projects/:id", protect, async (req, res) => {
const user = await User.findById(req.user.id);

user.projects = user.projects.filter(
    (project) => project._id.toString() !== req.params.id
);

await user.save();
res.json(user.projects);
});

// PUBLIC PORTFOLIO
router.get("/portfolio/:username", async (req, res) => {
try {

const user = await User.findOne({ username: req.params.username });

if (!user) {
return res.status(404).json({ message: "User not found" });
}

res.json({
profile: {
name: user.name,
bio: user.bio,
github: user.github,
linkedin: user.linkedin
},
projects: user.projects
});

} catch (err) {
console.error(err);
res.status(500).json({ message: "Server error" });
}
});

module.exports = router;