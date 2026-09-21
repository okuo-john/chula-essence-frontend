import api from "./api";

export const adminPaymentApi = {
  getAll: () => api.get("/payments/admin").then((res) => res.data.data),
  getOne: (id) => api.get(`/payments/admin/${id}`).then((res) => res.data.data),
};