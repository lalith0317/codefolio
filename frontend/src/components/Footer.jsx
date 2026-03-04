export default function Footer() {
return (
    <footer className="bg-gray-900 text-gray-400 py-8 text-center">

        <p>© {new Date().getFullYear()} Codefolio</p>
        <p className="mt-2">Built with MERN Stack</p>

    </footer>
    );
}