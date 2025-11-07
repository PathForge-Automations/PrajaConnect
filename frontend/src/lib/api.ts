import axios from "axios";

// 🧠 Backend API base configuration
const API = axios.create({
  baseURL: "http://localhost:8080/api", // change if your backend runs on a different port
  withCredentials: false,
});

export default API;
