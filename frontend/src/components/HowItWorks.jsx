export default function HowItWorks() {
return (
    <section id="how" className="py-24 bg-gray-900 text-white text-center">

        <h2 className="text-3xl font-bold mb-16">
            How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-10 px-10">

            <div>
            <h3 className="text-xl font-semibold mb-3">1. Sign Up</h3>
            <p className="text-gray-400">
                Create your Codefolio account.
            </p>
            </div>

            <div>
            <h3 className="text-xl font-semibold mb-3">2. Import GitHub</h3>
            <p className="text-gray-400">
                Import your repositories instantly.
            </p>
            </div>

            <div>
            <h3 className="text-xl font-semibold mb-3">3. Customize</h3>
            <p className="text-gray-400">
                Add details and choose portfolio theme.
            </p>
            </div>

            <div>
            <h3 className="text-xl font-semibold mb-3">4. Share</h3>
            <p className="text-gray-400">
                Share your portfolio with recruiters.
            </p>
            </div>

        </div>

        </section>
    );
}