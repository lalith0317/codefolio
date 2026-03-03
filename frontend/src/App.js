import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from "./dashboard/Dashboard";
import Portfolio from "./pages/Portfolio";

function App() {
return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<h2>Home</h2>} />
        <Route path="/:username" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio/:id" element={<Portfolio />} />
    </Routes>
    </BrowserRouter>
    );
}

export default App;
