import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // your backend base URL
});

// Add token to headers automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

//  || "http://localhost:5000/"