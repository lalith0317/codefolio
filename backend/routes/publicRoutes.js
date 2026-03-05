const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Project = require("../models/Project");

router.get("/portfolio/:username", async (req, res) => {
try {

    const user = await User.findOne({
        username: req.params.username
    }).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const projects = await Project.find({
        user: user._id
    });

    res.json({
        user,
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