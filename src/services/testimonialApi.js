import api from "./api";

function unwrap(body) {
  return Array.isArray(body) ? body : body.data ?? [];
}

export const testimonialApi = {
  getAll: () => api.get("/testimonials").then((res) => unwrap(res.data)),
  create: (payload) => api.post("/testimonials", payload).then((res) => res.data.data ?? res.data),
};