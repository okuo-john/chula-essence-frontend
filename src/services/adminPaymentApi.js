import api from "./api";
import { getCached } from "../utils/staleCache";

export const adminPaymentApi = {
  getAll: () =>
    getCached(
      "payments:admin",
      () => api.get("/payments/admin").then((res) => res.data.data),
      { ttl: 15000 },
    ),
  getOne: (id) =>
    getCached(
      `payments:admin:${id}`,
      () => api.get(`/payments/admin/${id}`).then((res) => res.data.data),
      { ttl: 15000 },
    ),
};
