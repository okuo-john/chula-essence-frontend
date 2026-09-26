import api from "./api";

export const testimonialApi = {
  getAll: () => api.get("/testimonials").then((res) => res.data), // raw array, no wrapper
  create: (payload) => api.post("/testimonials", payload).then((res) => res.data.data),
};