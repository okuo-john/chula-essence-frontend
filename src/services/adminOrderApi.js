import api from "./api";
import { getCached } from "../utils/staleCache";

export const adminOrderApi = {
  getAll: () =>
    getCached(
      "orders:admin",
      () => api.get("/orders/admin").then((res) => res.data.data),
      { ttl: 15000 },
    ),
  getOne: (id) =>
    getCached(
      `orders:admin:${id}`,
      () => api.get(`/orders/admin/${id}`).then((res) => res.data.data),
      { ttl: 15000 },
    ),
};
