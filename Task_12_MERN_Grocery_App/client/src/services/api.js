import axios from "axios";

// Determine backend URL dynamically
export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (window.location.hostname === "localhost" ? "http://localhost:8000" : "/api");

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
