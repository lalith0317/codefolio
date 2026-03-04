import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Dashboard() {

const navigate = useNavigate();

const [profile, setProfile] = useState({
    name: "",
    bio: "",
    github: "",
    linkedin: ""
});

const [projects, setProjects] = useState([]);

const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    techStack: "",
    repoLink: "",
    liveLink: ""
});

const [editingId, setEditingId] = useState(null);
const [search, setSearch] = useState("");
const [darkMode, setDarkMode] = useState(false);


useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
    setDarkMode(true);
    }
}, []);

useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
}, [darkMode]);

useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

const fetchProfile = async () => {
    const res = await axios.get(
        "https://codefolio-r8zm.onrender.com/api/user/profile",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

        setProfile(res.data);
    };

const fetchProjects = async () => {
    const res = await axios.get(
        "https://codefolio-r8zm.onrender.com/api/projects",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

        setProjects(res.data);
    };

    fetchProfile();
    fetchProjects();

}, [navigate]);


const handleProfileChange = (e) => {
    setProfile({
        ...profile,
        [e.target.name]: e.target.value
    });
};

const handleProfileSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.put(
        "https://codefolio-r8zm.onrender.com/api/user/profile",
        profile,
        {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
    );

    toast.success("Profile updated");

};

const safeTechStack = (techStack) => {

    if (!techStack) return [];

    if (typeof techStack === "string") {
        return techStack.split(",").map(t => t.trim());
    }

    if (Array.isArray(techStack)) {
        return techStack.flat();
    }

    return [];
};

const getTechStats = () => {

const techCount = {};

    projects.forEach(project => {

        safeTechStack(project.techStack).forEach(tech => {

        const name = tech.toLowerCase();

        if (techCount[name]) {
            techCount[name] += 1;
        } else {
            techCount[name] = 1;
        }

    });

});

return techCount;
};

const handleProjectChange = (e) => {

    setNewProject({
        ...newProject,
        [e.target.name]: e.target.value
    });

};

const handleAddProject = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    const techArray = newProject.techStack
        .split(",")
        .map(t => t.trim())
        .filter(t => t !== "");

const formData = new FormData();

    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    formData.append("repoLink", newProject.repoLink);
    formData.append("liveLink", newProject.liveLink);
    formData.append("techStack", techArray);
    formData.append("image", newProject.image);

const res = await axios.post(
    "https://codefolio-r8zm.onrender.com/api/projects",
    formData,
    {
    headers:{
    Authorization:`Bearer ${token}`,
    "Content-Type":"multipart/form-data"
    }
    }
);

    setProjects([...projects, res.data]);

    toast.success("Project added");

    setNewProject({
        title: "",
        description: "",
        techStack: "",
        repoLink: "",
        liveLink: ""
    });

};

const handleDelete = async (id) => {

    const token = localStorage.getItem("token");

    await axios.delete(
        `https://codefolio-r8zm.onrender.com/api/projects/${id}`,
        {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
    );

    setProjects(projects.filter(p => p._id !== id));

    toast.success("Project deleted");

};

const handleUpdate = async (project) => {

    const token = localStorage.getItem("token");

    const updatedProject = {
        ...project,
        techStack: safeTechStack(project.techStack)
    };

    try {

        const res = await axios.put(
            `https://codefolio-r8zm.onrender.com/api/projects/${project._id}`,
            updatedProject,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setProjects(
            projects.map((p) =>
                p._id === project._id ? res.data : p
            )
        );

        setEditingId(null);

        toast.success("Project updated");

    } catch (error) {
        console.log(error);
        toast.error("Update failed");
    }
};
const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

};

const portfolioUrl = `${window.location.origin}/${profile?.name || ""}`;
const handleCopyLink = () => {

    navigator.clipboard.writeText(portfolioUrl);

    toast.success("Portfolio link copied");
};
const techStats = getTechStats();

const handleImportGithub = async () => {

    try {

        const username = profile.github.split("github.com/").pop();

        const res = await axios.get(
            `https://codefolio-r8zm.onrender.com/api/github/${username}`
        );

        const token = localStorage.getItem("token");

        const existingTitles = projects.map(p => p.title.toLowerCase());

        const newRepos = res.data.filter(repo =>
            !existingTitles.includes(repo.title.toLowerCase())
        );

        for (const repo of newRepos) {

            await axios.post(
                "https://codefolio-r8zm.onrender.com/api/projects",
                repo,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

        }

        toast.success("GitHub repos imported");

        window.location.reload();

    } catch (error) {

        console.log(error);

        toast.error("Import failed");

    }

};

return (

    <div className={darkMode ? "dark" : ""}>

        <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">

            <div className="max-w-5xl mx-auto space-y-10">

            <Toaster position="top-right" />


          {/* HEADER */}

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">
                My Dashboard
                </h1>

                <div className="flex gap-3">

                <button
                    onClick={handleCopyLink}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Copy Portfolio Link
                </button>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="bg-gray-800 text-white px-4 py-2 rounded"
                >
                    {darkMode ? "Light" : "Dark"}
                </button>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>

                </div>

            </div>



          {/* PROFILE */}

            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

                <h2 className="text-xl font-bold mb-4">
                Profile
                </h2>

                <form
                onSubmit={handleProfileSubmit}
                className="space-y-3"
                >

                <input
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    placeholder="Name"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    placeholder="Bio"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <input
                    name="github"
                    value={profile.github}
                    onChange={handleProfileChange}
                    placeholder="Github"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <input
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleProfileChange}
                    placeholder="LinkedIn"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                Save
                </button>

            </form>

        </div>



          {/* ADD PROJECT */}

            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6">

                <h2 className="text-xl font-bold mb-4">
                Add Project
                </h2>

                <form
                onSubmit={handleAddProject}
                className="space-y-3"
                >

                <input
                    name="title"
                    value={newProject.title}
                    onChange={handleProjectChange}
                    placeholder="Title"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <textarea
                    name="description"
                    value={newProject.description}
                    onChange={handleProjectChange}
                    placeholder="Description"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <input
                    name="techStack"
                    value={newProject.techStack}
                    onChange={handleProjectChange}
                    placeholder="Tech Stack (comma separated)"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <input
                    name="repoLink"
                    value={newProject.repoLink}
                    onChange={handleProjectChange}
                    placeholder="Repo URL"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <input
                    name="liveLink"
                    value={newProject.liveLink}
                    onChange={handleProjectChange}
                    placeholder="Live URL"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Add Project
                </button>

                <button
                    onClick = {handleImportGithub}
                    className = "bg-gray-800 text-white px-4 py-2 rounded"
                >
                    Import from GitHub
                </button>
                </form>

            </div>



          {/* SEARCH */}

            <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />





            {/* PROJECT STATS */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 text-center">
<h3 className="text-lg font-semibold">Total Projects</h3>
<p className="text-2xl font-bold text-blue-600">
{projects.length}
</p>
</div>

<div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 text-center">
<h3 className="text-lg font-semibold">React Projects</h3>
<p className="text-2xl font-bold text-green-600">
    {
        projects.filter(p =>
        safeTechStack(p.techStack)
        .some(t => t.toLowerCase() === "react")
        ).length
    }
</p>
</div>

<div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 text-center">
<h3 className="text-lg font-semibold">Node Projects</h3>
<p className="text-2xl font-bold text-purple-600">
    {
        projects.filter(p =>
        safeTechStack(p.techStack)
        .some(t => t.toLowerCase() === "node")
        ).length
    }
</p>
</div>

</div>

{/* TECH ANALYTICS */}

<div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6">

    <h2 className="text-xl font-bold mb-4">
    Technology Usage
    </h2>

        <div className="flex flex-wrap gap-3">

            {Object.entries(techStats).map(([tech,count]) => (

        <div
            key={tech}
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm"
        >
            {tech} : {count}
        </div>

        ))}

    </div>

</div>

<div className="grid gap-6">

    {projects
        .filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((project) => (

        <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
        >

        {editingId === project._id ? (

            <>
                <input
                    value={project.title}
                    onChange={(e) =>
                        setProjects(
                            projects.map((p) =>
                                p._id === project._id
                                    ? { ...p, title: e.target.value }
                                    : p
                            )
                        )
                    }
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <textarea
                    value={project.description}
                    onChange={(e) =>
                        setProjects(
                            projects.map((p) =>
                                p._id === project._id
                                    ? { ...p, description: e.target.value }
                                    : p
                            )
                        )
                    }
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <input
                    value={safeTechStack(project.techStack).join(", ")}
                    onChange={(e) =>
                        setProjects(
                            projects.map((p) =>
                                p._id === project._id
                                    ? { ...p, techStack: e.target.value }
                                    : p
                            )
                        )
                    }
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <input
                    value={project.repoLink}
                    onChange={(e) =>
                        setProjects(
                            projects.map((p) =>
                                p._id === project._id
                                    ? { ...p, repoLink: e.target.value }
                                    : p
                            )
                        )
                    }
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <input
                    value={project.liveLink}
                    onChange={(e) =>
                        setProjects(
                            projects.map((p) =>
                                p._id === project._id
                                    ? { ...p, liveLink: e.target.value }
                                    : p
                            )
                        )
                    }
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <div className="flex gap-3">

                    <button
                        onClick={() => handleUpdate(project)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                        Save
                    </button>

                    <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                        Cancel
                    </button>

                </div>
            </>

        ) : (

            <>
                <h3 className="text-xl font-bold">
                    {project.title}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 my-3">

                    {safeTechStack(project.techStack).map((tech, i) => (

                        <span
                            key={i}
                            className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded"
                        >
                            {tech}
                        </span>

                    ))}

                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() => setEditingId(project._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => handleDelete(project._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Delete
                    </button>

                </div>
            </>

        )}

        </motion.div>

    ))}

</div>

            </div>

        </div>

    </div>

    );

}

export default Dashboard;