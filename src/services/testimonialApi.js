import api from "./api";
import { getCached, invalidateCache } from "../utils/staleCache";

function unwrap(body) {
  return Array.isArray(body) ? body : (body.data ?? []);
}

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
};
