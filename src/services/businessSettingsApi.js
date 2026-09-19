import api from "./api";

export const businessSettingsApi = {
  get: () => api.get("/business-settings").then((res) => res.data.data),
  updateLocation: (payload) =>
    api.patch("/business-settings/location", payload).then((res) => res.data.data),
};