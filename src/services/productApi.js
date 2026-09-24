import api from "./api";
import { getCached, invalidateCachePrefix } from "../utils/staleCache";

function buildFormData(fields, file) {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  if (file) {
    formData.append("media", file);
  }
  return formData;
}

export const productApi = {
  getAll: () =>
    getCached("products:all", () =>
      api.get("/products").then((res) => res.data),
    ),
  getOne: (id) =>
    getCached(`products:${id}`, () =>
      api.get(`/products/${id}`).then((res) => res.data),
    ),
  create: (fields, file) =>
    api
      .post("/products", buildFormData(fields, file), {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data)
      .then((data) => {
        invalidateCachePrefix("products");
        return data;
      }),
  update: (id, fields, file) =>
    api
      .patch(`/products/${id}`, buildFormData(fields, file), {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data)
      .then((data) => {
        invalidateCachePrefix("products");
        return data;
      }),
  remove: (id) =>
    api.delete(`/products/${id}`).then((res) => {
      invalidateCachePrefix("products");
      return res;
    }),
};
