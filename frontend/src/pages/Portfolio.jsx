import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Portfolio() {

const { username } = useParams();

const [profile, setProfile] = useState(null);
const [projects, setProjects] = useState([]);

useEffect(() => {

const fetchPortfolio = async () => {

    try {

        const res = await axios.get(
            `https://codefolio-r8zm.onrender.com/api/public/portfolio/${username}`
        );

        setProfile(res.data);
        setProjects(res.data.projects || []);

    } catch (error) {

        console.log(error);

    }

    };

    fetchPortfolio();

}, [username]);



if (profile === null) {
    return (
        <div className="flex justify-center items-center h-screen">
            Loading portfolio...
        </div>
    );
}

const exportPDF = async () => {

    const element = document.getElementById("portfolio");

    const canvas = await html2canvas(element);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p","mm","a4");

    const width = pdf.internal.pageSize.getWidth();

    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData,"PNG",0,0,width,height);

    pdf.save(`${profile.username}-portfolio.pdf`);
    
};

return (
<div
    id="portfolio"
    className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black"
>
    <div className="max-w-6xl mx-auto p-8">

      {/* PROFILE HEADER */}

        <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white">
            {profile.username}
            </h1>

            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            {profile.bio}
            </p>

            <div className="flex justify-center gap-6 mt-5">
            {profile.github && (
                <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                GitHub
                </a>
            )}

            {profile.linkedin && (
                <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                LinkedIn
                </a>
            )}
            </div>
        </div>

      {/* PORTFOLIO VISITS */}

        <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm">Portfolio Visits</p>

            <h2 className="text-2xl font-bold text-indigo-600">
                {profile.visits}
            </h2>
            </div>
        </div>

      {/* DOWNLOAD BUTTON */}

        <div className="flex justify-center mb-10">
            <button
            onClick={exportPDF}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow transition"
            >
            Download Portfolio PDF
            </button>
        </div>

      {/* PROJECT TITLE */}

        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-white">
            Projects
        </h2>

        {projects.length === 0 ? (
            <p className="text-center text-gray-500">No projects added yet</p>
        ) :(
            <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project) => {

                    const techStack =
                    Array.isArray(project.techStack?.[0])
                    ? project.techStack[0]
                    : project.techStack || [];

                return (
                    <div
                        key={project._id}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                    >

                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                        {project.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {project.description}
                        </p>

                {/* TECH STACK */}

                    <div className="flex flex-wrap gap-2 mb-5">
                        {techStack.map((tech, index) => (
                        <span
                        key={index}
                        className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full"
                        >
                        {tech}
                        </span>
                ))}
                    </div>

                {/* LINKS */}

                    <div className="flex gap-5">
                    {project.repoLink && (
                        <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 font-semibold hover:underline"
                        >
                        View Code
                        </a>
                    )}

                    {project.liveLink && (
                        <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 font-semibold hover:underline"
                        >
                        Live Demo
                        </a>
                    )}
            </div>

            </div>
                );

        })}
        </div>
    )}

    </div>
</div>
);
}

export default Portfolio;