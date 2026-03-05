const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:username", async (req, res) => {
try {
    const username = req.params.username;

    const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
    );

    res.json(response.data);

} catch (error) {
    console.log("GitHub API ERROR:", error.response?.data || error.message);

    res.status(500).json({
        message: "Failed to fetch GitHub repos"
    });
}
});

module.exports = router;