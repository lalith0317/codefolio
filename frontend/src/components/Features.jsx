export default function Features() {
return (
    <section id="features" className="py-24 bg-gray-800 text-white">

        <h2 className="text-3xl font-bold text-center mb-14">
            Features
        </h2>

        <div className="grid md:grid-cols-4 gap-10 px-10">

            <div className="bg-gray-900 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-3">GitHub Import</h3>
            <p className="text-gray-400">
                Automatically import repositories from GitHub.
            </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-3">Portfolio Themes</h3>
            <p className="text-gray-400">
                Choose from multiple beautiful portfolio designs.
            </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-3">Analytics</h3>
            <p className="text-gray-400">
                Track how many people visit your portfolio.
            </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-3">Shareable Link</h3>
            <p className="text-gray-400">
                Your portfolio at codefolio.com/username
            </p>
            </div>

        </div>

        </section>
    );
}