import api from "./api";
import { invalidateCache } from "../utils/staleCache";

export const adminTestimonialApi = {
  getAll: () => api.get("/testimonials/admin").then((res) => res.data.data),
  approve: (id) =>
    api.patch(`/testimonials/admin/${id}/approve`).then((res) => {
      invalidateCache("testimonials:all");
      return res.data.data;
    }),
  reject: (id) =>
    api.patch(`/testimonials/admin/${id}/reject`).then((res) => {
      invalidateCache("testimonials:all");
      return res.data.data;
    }),
  remove: (id) =>
    api.delete(`/testimonials/admin/${id}`).then((res) => {
      invalidateCache("testimonials:all");
      return res.data;
    }),
};