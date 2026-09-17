import api from "./api";

export const bookingApi = {
  getServices: () => api.get("/services/active").then((res) => res.data.data),
  createBooking: (payload) => api.post("/bookings", payload).then((res) => res.data.data),
  getMyBookings: () => api.get("/bookings/my").then((res) => res.data.data),
};