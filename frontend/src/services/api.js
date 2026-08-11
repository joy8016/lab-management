import axios from 'axios';

// Helper function to clean base URL and prevent duplicate '/api/api' pathing
export const getCleanBaseUrl = (urlStr) => {
  if (!urlStr || urlStr === 'undefined' || urlStr === 'null') {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return 'http://localhost:5000';
    }
    return '';
  }
  let clean = String(urlStr).trim().replace(/\/+$/, '');
  if (clean.toLowerCase().endsWith('/api')) {
    clean = clean.slice(0, -4);
  }
  return clean.replace(/\/+$/, '');
};

const rawUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL;

export const BASE_URL = getCleanBaseUrl(rawUrl);

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor to attach JWT Auth token & prevent duplicate /api/api/ pathing
API.interceptors.request.use(
  (config) => {
    // Interceptor to fix duplicate /api/api in url if present
    if (config.url && config.url.startsWith('/api/') && config.baseURL && config.baseURL.endsWith('/api')) {
      config.url = config.url.replace(/^\/api/, '');
    }

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
