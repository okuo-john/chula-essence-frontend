import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { cartApi } from "../services/cartApi";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoggedIn = !!localStorage.getItem("token");

  const refreshCart = useCallback(async () => {
    if (!isLoggedIn) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const cart = await cartApi.getCart();
      setItems(cart.items ?? []);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load your cart.");
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  async function addToCart(productId, quantity = 1) {
    setError(null);
    try {
      const cart = await cartApi.addToCart(productId, quantity);
      setItems(cart.items ?? []);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't add item to cart.");
      throw err;
    }
  }

  async function updateQuantity(productId, quantity) {
    setError(null);
    try {
      const cart = await cartApi.updateQuantity(productId, quantity);
      setItems(cart.items ?? []);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't update quantity.");
      throw err;
    }
  }

  async function removeFromCart(productId) {
    setError(null);
    try {
      const cart = await cartApi.removeFromCart(productId);
      setItems(cart.items ?? []);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't remove item.");
      throw err;
    }
  }

  async function clearCart() {
    setError(null);
    try {
      await cartApi.clearCart();
      setItems([]);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't clear cart.");
      throw err;
    }
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}