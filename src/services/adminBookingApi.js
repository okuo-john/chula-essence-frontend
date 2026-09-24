import api from "./api";
import { getCached, invalidateCache } from "../utils/staleCache";

export const adminBookingApi = {
  getAll: () =>
    getCached(
      "bookings:admin",
      () => api.get("/bookings").then((res) => res.data.data),
      { ttl: 15000 },
    ),
  confirm: (id, adminNotes) =>
    api
      .patch(`/bookings/${id}/confirm`, { adminNotes })
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCache("bookings:admin");
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
        invalidateCache("bookings:admin");
        return data;
      }),
  cancel: (id, { cancellationReason, adminNotes }) =>
    api
      .patch(`/bookings/${id}/cancel`, { cancellationReason, adminNotes })
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCache("bookings:admin");
        return data;
      }),
  complete: (id) =>
    api
      .patch(`/bookings/${id}/complete`)
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCache("bookings:admin");
        return data;
      }),
};
