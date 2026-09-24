import api from "./api";
import {
  getCached,
  getUserCacheScope,
  invalidateCache,
} from "../utils/staleCache";

export const bookingApi = {
  getServices: () =>
    getCached("services:active", () =>
      api.get("/services/active").then((res) => res.data.data),
    ),
  createBooking: (payload) =>
    api
      .post("/bookings", payload)
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCache(`bookings:mine:${getUserCacheScope()}`);
        return data;
      }),
  getMyBookings: () => {
    const key = `bookings:mine:${getUserCacheScope()}`;
    return getCached(
      key,
      () => api.get("/bookings/my").then((res) => res.data.data),
      { ttl: 30000 },
    );
  },
};
