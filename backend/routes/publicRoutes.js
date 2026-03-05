const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Project = require("../models/Project");

router.get("/portfolio/:username", async (req, res) => {
try {

    const user = await User.findOne({
        username: new RegExp(`^${req.params.username}$`, "i")
    }).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.visits = (user.visits || 0) + 1;
    await user.save();
    
    const projects = await Project.find({
        user: user._id
    });

    res.json({
        name: user.username,
        bio: user.bio,
        github: user.github,
        linkedin: user.linkedin,
        visits: user.visits,
        projects
    });

} catch (error) {

    console.error(error);

    res.status(500).json({
        message: "Server error"
    });

}
});

module.exports = router;