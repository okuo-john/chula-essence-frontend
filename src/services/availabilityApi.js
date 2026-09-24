import api from "./api";
import { getCached, invalidateCache } from "../utils/staleCache";

export const availabilityApi = {
  getAll: () =>
    getCached(
      "availability:admin",
      () => api.get("/availability").then((res) => res.data.data),
      { ttl: 30000 },
    ),
  create: (payload) =>
    api
      .post("/availability", payload)
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCache("availability:admin");
        return data;
      }),
  update: (id, payload) =>
    api
      .patch(`/availability/${id}`, payload)
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCache("availability:admin");
        return data;
      }),
  remove: (id) =>
    api
      .delete(`/availability/${id}`)
      .then((res) => res.data)
      .then((data) => {
        invalidateCache("availability:admin");
        return data;
      }),
};
