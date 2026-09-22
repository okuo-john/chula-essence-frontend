import api from "./api";

export const adminBookingApi = {
  getAll: () => api.get("/bookings").then((res) => res.data.data),
  confirm: (id, adminNotes) =>
    api.patch(`/bookings/${id}/confirm`, { adminNotes }).then((res) => res.data.data),
  reschedule: (id, { appointmentDate, startTime, adminNotes }) =>
    api
      .patch(`/bookings/${id}/reschedule`, { appointmentDate, startTime, adminNotes })
      .then((res) => res.data.data),
  cancel: (id, { cancellationReason, adminNotes }) =>
    api
      .patch(`/bookings/${id}/cancel`, { cancellationReason, adminNotes })
      .then((res) => res.data.data),
  complete: (id) => api.patch(`/bookings/${id}/complete`).then((res) => res.data.data),
};