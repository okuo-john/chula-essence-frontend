import api from "./api";

export const availabilityApi = {
  getAll: () => api.get("/availability").then((res) => res.data.data),
  create: (payload) => api.post("/availability", payload).then((res) => res.data.data),
  update: (id, payload) => api.patch(`/availability/${id}`, payload).then((res) => res.data.data),
  remove: (id) => api.delete(`/availability/${id}`).then((res) => res.data),
};