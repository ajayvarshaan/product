import axios from "axios";

// 1. Automatically detect if we are on localhost or Render
const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000/api" 
  : "https://product-backend-hpkz.onrender.com/api"; // <--- YOUR BACKEND URL

const API = axios.create({
  baseURL: BASE_URL,
});

// 2. Attach token if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;