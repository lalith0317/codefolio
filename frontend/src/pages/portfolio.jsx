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

    pdf.save(`${profile.name}-portfolio.pdf`);
    
};

return (

    
        <div id="portfolio" className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto p-8">

        {/* PROFILE HEADER */}

        <div className="text-center mb-12">

            <h1 className="text-4xl font-bold mb-2">
            {profile.name}
            </h1>

            <p className="text-gray-600 dark:text-gray-300">
            {profile.bio}
            </p>

            <div className="flex justify-center gap-6 mt-4">

            {profile.github && (
                <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 font-semibold"
                >
                GitHub
                </a>
            )}

            {profile.linkedin && (
                <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 font-semibold"
                >
                LinkedIn
                </a>
            )}

        </div>

        </div>
        <button
            onClick={exportPDF}
            className="mb-8 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Download Portfolio PDF
        </button>
        <p className = "text-sm text-gray-500 mb-4">Portfolio Visits: {profile.visits}</p>


        {/* PROJECTS */}

        <h2 className="text-2xl font-bold mb-8 text-center">
            Projects
        </h2>

        {projects.length === 0 ? (

            <p className="text-center">No projects</p>

        ) : (

            <div className="grid md:grid-cols-2 gap-8">

            {projects.map((project) => {

              // Fix nested array issue
                const techStack =
                Array.isArray(project.techStack?.[0])
                    ? project.techStack[0]
                    : project.techStack || [];

                return (

                <div
                    key={project._id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:scale-105 transition"
                >

                    <h3 className="text-xl font-bold mb-2">
                        {project.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {project.description}
                    </p>


                  {/* TECH STACK */}

                    <div className="flex flex-wrap gap-2 mb-4">

                    {techStack.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                        >
                        {tech}
                        </span>
                    ))}

                    </div>


                  {/* LINKS */}

                    <div className="flex gap-4">

                    {project.repoLink && (
                        <a
                            href={project.repoLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 font-semibold"
                        >
                        GitHub
                        </a>
                    )}

                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-green-600 font-semibold"
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