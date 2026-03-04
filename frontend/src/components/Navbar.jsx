import { Link } from "react-router-dom";

export default function Navbar() {
return (
    <nav className="flex justify-between items-center px-10 py-6 bg-gray-900 text-white">

        <h1 className="text-2xl font-bold text-indigo-400">
            Codefolio
        </h1>

        <div className="space-x-6">
            <a href="#features" className="hover:text-indigo-400">Features</a>
            <a href="#how" className="hover:text-indigo-400">How it Works</a>

            <Link
            to="/login"
            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800"
            >
            Login
            </Link>

            <Link
            to="/register"
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
            >
            Register
            </Link>
        </div>
        </nav>
    );
}