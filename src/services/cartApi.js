import api from "./api";

export const cartApi = {
  getCart: () => api.get("/cart").then((res) => res.data),
  addToCart: (productId, quantity) =>
    api.post("/cart", { productId, quantity }).then(() => cartApi.getCart()),
  updateQuantity: (productId, quantity) =>
    api.patch(`/cart/${productId}`, { quantity }).then((res) => res.data),
  removeFromCart: (productId) =>
    api.delete(`/cart/${productId}`).then((res) => res.data),
  clearCart: () => api.delete("/cart"),
}; 