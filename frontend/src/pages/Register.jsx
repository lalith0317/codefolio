import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        await axios.post(
            "https://codefolio-r8zm.onrender.com/api/auth/register",
            {
                name,
                email,
                password
            }
        );

        toast.success("Registered successfully");

        navigate("/login");

    } catch (error) {

        console.error(error);

        alert("Registration failed");

    }

};

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">

    <div className="bg-gray-800 p-10 rounded-xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

        <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />

        <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button
            type="submit"
            className="w-full bg-indigo-600 p-3 rounded-lg hover:bg-indigo-500"
        >
            Register
        </button>

        </form>

        <p className="text-center mt-4 text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400">
                Login
            </Link>
        </p>

    </div>

    </div>
);
}