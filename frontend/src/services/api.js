import axios from 'axios';

// Dynamically pick the backend URL depending on the build tool
const BASE_URL = 
  import.meta.env.VITE_API_BASE_URL ||  // For Vite

  'http://localhost:5000/api';          // Fallback default

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Set to true if using cookies/sessions
});

// Optional: Add request interceptors to automatically attach JWT Auth tokens
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;