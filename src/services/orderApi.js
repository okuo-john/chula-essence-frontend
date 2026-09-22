import api from "./api";

export const orderApi = {
  prepareCheckout: (delivery) =>
    api.post("/orders/checkout", { delivery }).then((res) => res.data.data),
};