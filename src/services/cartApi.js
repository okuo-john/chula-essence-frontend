import api from "./api";
import {
  getCached,
  getUserCacheScope,
  invalidateCache,
} from "../utils/staleCache";

function cartCacheKey() {
  return `cart:${getUserCacheScope()}`;
}

export const cartApi = {
  getCart: () =>
    getCached(cartCacheKey(), () => api.get("/cart").then((res) => res.data), {
      ttl: 30000,
    }),
  addToCart: (productId, quantity) =>
    api.post("/cart", { productId, quantity }).then(() => {
      invalidateCache(cartCacheKey());
      return cartApi.getCart();
    }),
  updateQuantity: (productId, quantity) =>
    api.patch(`/cart/${productId}`, { quantity }).then((res) => {
      invalidateCache(cartCacheKey());
      return res.data;
    }),
  removeFromCart: (productId) =>
    api.delete(`/cart/${productId}`).then((res) => {
      invalidateCache(cartCacheKey());
      return res.data;
    }),
  clearCart: () =>
    api.delete("/cart").then((res) => {
      invalidateCache(cartCacheKey());
      return res;
    }),
};
