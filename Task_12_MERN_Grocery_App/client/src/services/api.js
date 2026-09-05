import axios from "axios";

// Determine backend URL dynamically
export const getBackendUrl = () => {
  // If a full remote URL is provided in env (e.g. deployed backend URL)
  if (
    import.meta.env.VITE_BACKEND_URL &&
    !import.meta.env.VITE_BACKEND_URL.includes("localhost")
  ) {
    return import.meta.env.VITE_BACKEND_URL;
  }

  // Runtime browser check: on Vercel / production cloud domains
  if (typeof window !== "undefined" && window.location) {
    const hostname = window.location.hostname;
    if (
      hostname &&
      hostname !== "localhost" &&
      hostname !== "127.0.0.1" &&
      !hostname.startsWith("192.168.")
    ) {
      return "/api/grocery";
    }
  }

  return "http://localhost:8000/api";
};

export const BACKEND_URL = getBackendUrl();

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

// Request interceptor to attach customer or seller token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("greencart_token");
  const sellerToken = localStorage.getItem("greencart_seller_token");

  if (token) {
    config.headers.token = token;
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (sellerToken) {
    config.headers.seller_token = sellerToken;
  }

  return config;
});

export default api;
