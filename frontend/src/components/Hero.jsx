import { Link } from "react-router-dom";

export default function Hero() {
return (
    <section className="text-center py-28 px-6 bg-gray-900 text-white">

        <h1 className="text-5xl font-bold mb-6">
            Build Your Developer Portfolio in Seconds
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Import your GitHub projects and instantly create a beautiful developer
            portfolio that you can share with recruiters.
        </p>

        <div className="space-x-4">

            <Link
            to="/register"
            className="bg-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-500"
            >
            Get Started
            </Link>

            <Link
            to="/demo"
            className="border border-gray-600 px-8 py-3 rounded-lg hover:bg-gray-800"
            >
            View Demo
            </Link>

        </div>

        </section>
    );
}