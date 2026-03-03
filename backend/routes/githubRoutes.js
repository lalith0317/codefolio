const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:username", async (req, res) => {

    try {

        const githubUsername = req.params.username;

        const response = await axios.get(
            `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=10`
        );

        const repos = response.data
            .filter(repo => !repo.fork) // ignore forks
            .map(repo => ({
                title: repo.name,
                description: repo.description || "GitHub Repository",
                repoLink: repo.html_url,
                techStack: repo.language ? [repo.language] : []
            }));

        res.json(repos);

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({
            message: "Failed to fetch GitHub repos"
        });

    }

});

module.exports = router;