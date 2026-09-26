import api from "./api";
import { getCached, invalidateCachePrefix } from "../utils/staleCache";

export const adminBookingApi = {
  getAll: (state = "") =>
    getCached(
      state ? `bookings:admin:state:${state}` : "bookings:admin:all",
      () =>
        api
          .get("/bookings", { params: state ? { state } : {} })
          .then((res) => res.data.data),
      { ttl: 15000 },
    ),
  getStates: () =>
    api.get("/bookings/states").then((res) => {
      const data = res.data.data ?? res.data.states ?? res.data;
      return Array.isArray(data) ? data : [];
    }),
  confirm: (id, adminNotes) =>
    api
      .patch(`/bookings/${id}/confirm`, { adminNotes })
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCachePrefix("bookings:admin");
        return data;
      }),
  reschedule: (id, { appointmentDate, startTime, adminNotes }) =>
    api
      .patch(`/bookings/${id}/reschedule`, {
        appointmentDate,
        startTime,
        adminNotes,
      })
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCachePrefix("bookings:admin");
        return data;
      }),
  cancel: (id, { cancellationReason, adminNotes }) =>
    api
      .patch(`/bookings/${id}/cancel`, { cancellationReason, adminNotes })
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCachePrefix("bookings:admin");
        return data;
      }),
  complete: (id) =>
    api
      .patch(`/bookings/${id}/complete`)
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCachePrefix("bookings:admin");
        return data;
      }),
};
