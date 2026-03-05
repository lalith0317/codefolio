const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const Project = require("../models/Project");


//create project

router.post("/", protect, async (req, res) => {

    try {

        const { title, description, techStack, repoLink, liveLink } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const project = new Project({
            title,
            description,
            techStack,
            repoLink,
            liveLink,
            user: req.user.id
        });

        const savedProject = await project.save();

        res.status(201).json(savedProject);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


//get user projects

router.get("/", protect, async (req, res) => {

    try {

        const projects = await Project.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.json(projects);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


//update project

router.put("/:id", protect, async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.user.toString() !== req.user.id.toString()) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        project.title = req.body.title || project.title;
        project.description = req.body.description || project.description;
        project.techStack = req.body.techStack || project.techStack;
        project.repoLink = req.body.repoLink || project.repoLink;
        project.liveLink = req.body.liveLink || project.liveLink;

        const updatedProject = await project.save();

        res.json(updatedProject);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


//delete project

router.delete("/:id", protect, async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        await project.deleteOne();

        res.json({
            message: "Project deleted"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


module.exports = router;