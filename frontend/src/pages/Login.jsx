import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
};
const handleLogin = async () => {
try {
    const res = await API.post("/auth/login", {
        email,
        password
    });

    localStorage.setItem("token", res.data.token);

    alert("Login successful");
} catch (err) {
    console.error(err);
    alert("Login failed");
}
};

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">

        <div className="bg-gray-800 p-10 rounded-xl shadow-xl w-full max-w-md">

            <h2 className="text-3xl font-bold text-center mb-6">
            Welcome Back
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

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
                Login
            </button>

            </form>

            <p className="text-center mt-4 text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-400">
                Register
            </Link>
            </p>

        </div>

        </div>
    );
}