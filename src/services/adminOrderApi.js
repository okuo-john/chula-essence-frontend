import api from "./api";

export const adminOrderApi = {
  getAll: () => api.get("/orders/admin").then((res) => res.data.data),
  getOne: (id) => api.get(`/orders/admin/${id}`).then((res) => res.data.data),
};