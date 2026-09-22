import api from "./api";

export const serviceApi = {
  getAll: () => api.get("/services").then((res) => res.data.data),
  create: (payload) => api.post("/services", payload).then((res) => res.data.data),
  update: (id, payload) => api.patch(`/services/${id}`, payload).then((res) => res.data.data),
  deactivate: (id) => api.patch(`/services/${id}/deactivate`).then((res) => res.data.data),
};