import axios from "axios";

// Automatically switches URL based on where the code is running
// Uses your specific Render URL from the screenshot
const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000/api" 
  : "https://product-backend-hpkz.onrender.com/api"; 

const API = axios.create({
  baseURL: BASE_URL,
});

// Add Token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;