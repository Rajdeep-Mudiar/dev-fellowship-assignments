import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
  const response = await api.get("/api/hotels", { params });
  return response.data;
};

export const getHotelById = async (id) => {
  const response = await api.get(`/api/hotels/${id}`);
  return response.data;
};

export const searchHotels = async (params) => {
  const response = await api.get("/api/hotels/search", { params });
  return response.data;
};

// Booking Services
export const createBooking = async (bookingData) => {
  const response = await api.post("/api/bookings", bookingData);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get("/api/bookings/my");
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await api.get(`/api/bookings/${id}`);
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await api.patch(`/api/bookings/${id}/cancel`);
  return response.data;
};

// Payment Services
export const createCheckoutSession = async (bookingId) => {
  const response = await api.post("/api/payments/create-checkout-session", { bookingId });
  return response.data;
};

// Admin Services
export const getAdminStats = async () => {
  const response = await api.get("/api/admin/stats");
  return response.data;
};

export const getAdminHotels = async () => {
  const response = await api.get("/api/admin/hotels");
  return response.data;
};

export const createHotel = async (formData) => {
  const response = await api.post("/api/admin/hotels", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateHotel = async (id, hotelData) => {
  const response = await api.put(`/api/admin/hotels/${id}`, hotelData);
  return response.data;
};

export const deleteHotel = async (id) => {
  const response = await api.delete(`/api/admin/hotels/${id}`);
  return response.data;
};

export const getAdminBookings = async (params = {}) => {
  const response = await api.get("/api/admin/bookings", { params });
  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await api.patch(`/api/admin/bookings/${id}/status`, { status });
  return response.data;
};

export default api;
