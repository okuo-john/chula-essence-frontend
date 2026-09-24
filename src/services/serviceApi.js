import api from "./api";
import {
  getCached,
  invalidateCache,
  invalidateCachePrefix,
} from "../utils/staleCache";

export const serviceApi = {
  getAll: () =>
    getCached(
      "services:admin",
      () => api.get("/services").then((res) => res.data.data),
      { ttl: 30000 },
    ),
  create: (payload) =>
    api
      .post("/services", payload)
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCache("services:active");
        invalidateCache("services:admin");
        return data;
      }),
  update: (id, payload) =>
    api
      .patch(`/services/${id}`, payload)
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCache("services:active");
        invalidateCache("services:admin");
        return data;
      }),
  deactivate: (id) =>
    api
      .patch(`/services/${id}/deactivate`)
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCachePrefix("services");
        return data;
      }),
};
