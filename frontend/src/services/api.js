import axios from 'axios';

// Dynamically pick backend API URL from environment variable with production fallback
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'https://lab-management-caqg.onrender.com';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor to attach JWT Auth token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lims_token') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
