import axios from "axios";

const API = axios.create({
    baseURL: "https://codefolio-r8zm.onrender.com/api"
});

export default API;