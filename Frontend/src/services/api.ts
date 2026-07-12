import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // agar cookies/auth headers bhejne hain to
  headers: {
    "Content-Type": "application/json",
  },
});

// Har request jaane se pehle, agar token localStorage mein ho to header mein add kar do
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
