import api from "./api";

export const paymentApi = {
  initialize: (delivery) =>
    api.post("/payments/initialize", { delivery }).then((res) => res.data.data),
  verify: (reference) =>
    api.get(`/payments/verify/${reference}`).then((res) => res.data.data),
};