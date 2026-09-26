import api from "./api";

export const testimonialApi = {
  getAll: () =>
    getCached("testimonials:all", () =>
      api.get("/testimonials").then((res) => unwrap(res.data)),
    ),
  create: (payload) =>
    api
      .post("/testimonials", payload)
      .then((res) => res.data.data ?? res.data)
      .then((data) => {
        invalidateCache("testimonials:all");
        return data;
      }),
  approve: (id) =>
    api.patch(`/testimonials/${id}/approve`).then((res) => {
      invalidateCache("testimonials:all");
      return res.data.data ?? res.data;
    }),
  reject: (id) =>
    api.patch(`/testimonials/${id}/reject`).then((res) => {
      invalidateCache("testimonials:all");
      return res.data.data ?? res.data;
    }),
  remove: (id) =>
    api.delete(`/testimonials/${id}`).then((res) => {
      invalidateCache("testimonials:all");
      return res.data;
    }),
};
=======
  getAll: () => api.get("/testimonials").then((res) => res.data), // raw array, no wrapper
  create: (payload) => api.post("/testimonials", payload).then((res) => res.data.data),
};
