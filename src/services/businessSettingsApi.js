import api from "./api";
import { getCached, invalidateCache } from "../utils/staleCache";

export const businessSettingsApi = {
  get: () =>
    getCached(
      "business-settings",
      () => api.get("/business-settings").then((res) => res.data.data),
      { ttl: 300000 },
    ),
  updateLocation: (payload) =>
    api
      .patch("/business-settings/location", payload)
      .then((res) => res.data.data)
      .then((data) => {
        invalidateCache("business-settings");
        return data;
      }),
};
