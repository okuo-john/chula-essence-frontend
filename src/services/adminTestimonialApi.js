import api from "./api";

export const adminTestimonialApi = {
  getAll: () => api.get("/testimonials/admin").then((res) => res.data.data),
  approve: (id) => api.patch(`/testimonials/admin/${id}/approve`).then((res) => res.data.data),
  reject: (id) => api.patch(`/testimonials/admin/${id}/reject`).then((res) => res.data.data),
  remove: (id) => api.delete(`/testimonials/admin/${id}`),
};