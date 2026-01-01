import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
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
      window.location.href = "http://localhost:8000/auth/login";
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
