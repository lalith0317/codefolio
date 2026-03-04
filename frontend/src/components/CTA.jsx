import { Link } from "react-router-dom";

export default function CTA() {
return (
        <section className="py-24 bg-indigo-600 text-center text-white">

        <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your Portfolio?
        </h2>

        <p className="mb-8 text-lg">
            Start building your developer portfolio today.
        </p>

        <Link
            to="/register"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold"
        >
            Create Free Portfolio
        </Link>

        </section>
    );
}