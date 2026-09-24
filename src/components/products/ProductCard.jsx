import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, items } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const cartItem = items.find((item) => item.product._id === product._id);
  const quantityInCart = cartItem?.quantity ?? 0;
  const outOfStock = !product.isAvailable || product.stock === 0;
  const atMaxStock = quantityInCart >= product.stock;

  function isMobileView() {
    return typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;
  }

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

  function openProduct() {
    if (!isMobileView()) return;
    navigate(`/shop/${product._id}`);
  }

  function handleCardKeyDown(event) {
    if (!isMobileView()) return;
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProduct();
    }
  }

  function toggleWishlist(event) {
    event.stopPropagation();
    setIsWishlisted((previous) => !previous);
  }

  function handleCartClick(event) {
    event.stopPropagation();
    if (!outOfStock && !atMaxStock && !isAdding) handleAddToCart();
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={openProduct}
      onKeyDown={handleCardKeyDown}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 sm:cursor-default sm:hover:translate-y-0 sm:hover:shadow-sm"
      aria-label={`View ${product.product_name}`}
    >
      <button
        type="button"
        onClick={toggleWishlist}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={isWishlisted}
        className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition hover:scale-110 hover:text-pink-500"
      >
        <Heart
          size={17}
          fill={isWishlisted ? "currentColor" : "none"}
          className={isWishlisted ? "text-pink-500" : ""}
        />
      </button>

      <button
        type="button"
        onClick={handleCartClick}
        disabled={outOfStock || atMaxStock || isAdding}
        aria-label={atMaxStock ? "Maximum quantity in cart" : "Add to cart"}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-white shadow-sm transition hover:scale-110 hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-45 sm:hidden"
      >
        {isAdding ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : (
          <ShoppingCart size={17} />
        )}
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

        <div className="mt-4 hidden gap-2 sm:flex">
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