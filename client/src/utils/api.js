import axios from "axios";

// Use environment variable for API URL, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token to headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle responses globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const spotifyAPI = () => {
  return {
    login: () => {
      window.location.href = `${API_URL}/auth/login`;
    },
    getUserData: () => API.get("/data/user"),
    getCurrentUser: () => API.get("/auth/me"),
    logout: () => API.get("/auth/logout"),
  };
};

export const roastAPI = () => {
  return {
    generateRoast: (userData, roastType) =>
      API.post("/roast/generate", { userData, roastType }),
  };
};

export default API;
