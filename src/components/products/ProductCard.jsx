import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, items } = useCart();
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = items.find((item) => item.product._id === product._id);
  const quantityInCart = cartItem?.quantity ?? 0;
  const outOfStock = !product.isAvailable || product.stock === 0;
  const atMaxStock = quantityInCart >= product.stock;

  async function handleAddToCart() {
    setError(null);
    setIsAdding(true);
    try {
      await addToCart(product._id, 1);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't add to cart.");
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <button
        type="button"
        aria-label="Add to wishlist"
        className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-gray-900">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </button>

      {outOfStock && (
        <span className="absolute top-3 left-3 z-10 bg-gray-900/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
          Out of Stock
        </span>
      )}

      <img
        src={product.image}
        alt={product.product_name}
        className="w-full aspect-[4/5] object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{product.product_name}</h3>
        <p className="text-pink-500 font-semibold mt-1">
          ₦{Number(product.price).toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {outOfStock ? "Unavailable" : `Available: ${product.stock}`}
        </p>

        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

        <div className="mt-4 flex gap-2">
          <Link
            to={`/shop/${product._id}`}
            className="flex-1 text-center rounded-full border border-pink-500 px-3 py-2 text-xs font-semibold text-pink-500 transition hover:bg-pink-500 hover:text-white"
          >
            View Product
          </Link>
          <button
            type="button"
            disabled={outOfStock || atMaxStock || isAdding}
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-pink-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-pink-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isAdding && (
              <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            )}
            {isAdding ? "Adding..." : atMaxStock ? "Max in Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}