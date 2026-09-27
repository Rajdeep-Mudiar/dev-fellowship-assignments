import axios from "axios";

// Determine backend URL dynamically
export const getBackendUrl = () => {
  if (
    import.meta.env.VITE_API_URL &&
    !import.meta.env.VITE_API_URL.includes("localhost")
  ) {
    return import.meta.env.VITE_API_URL;
  }

  if (typeof window !== "undefined" && window.location) {
    const hostname = window.location.hostname;
    if (
      hostname &&
      hostname !== "localhost" &&
      hostname !== "127.0.0.1" &&
      !hostname.startsWith("192.168.")
    ) {
      return "/api/hotel";
    }
  }

  return "http://localhost:5000/api/hotel";
};

export const API_BASE_URL = getBackendUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Attach Clerk Authorization Token to requests
 */
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Hotel Services
export const getHotels = async (params = {}) => {
  const response = await api.get("/hotels", { params });
  return response.data;
};

export const getHotelById = async (id) => {
  const response = await api.get(`/hotels/${id}`);
  return response.data;
};

export const searchHotels = async (params) => {
  const response = await api.get("/hotels/search", { params });
  return response.data;
};

// Booking Services
export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get("/bookings/my");
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await api.patch(`/bookings/${id}/cancel`);
  return response.data;
};

// Payment Services
export const createCheckoutSession = async (bookingId) => {
  const response = await api.post("/payments/create-checkout-session", { bookingId });
  return response.data;
};

// Admin Services
export const getAdminStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

export const getAdminHotels = async () => {
  const response = await api.get("/admin/hotels");
  return response.data;
};

export const createHotel = async (hotelData) => {
  const response = await api.post("/admin/hotels", hotelData);
  return response.data;
};

export const updateHotel = async (id, hotelData) => {
  const response = await api.put(`/admin/hotels/${id}`, hotelData);
  return response.data;
};

export const deleteHotel = async (id) => {
  const response = await api.delete(`/admin/hotels/${id}`);
  return response.data;
};

export const getAdminBookings = async (params = {}) => {
  const response = await api.get("/admin/bookings", { params });
  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await api.patch(`/admin/bookings/${id}/status`, { status });
  return response.data;
};

export default api;
