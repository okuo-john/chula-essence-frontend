import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productApi } from "../../services/productApi";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await productApi.getOne(productId);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't load this product.");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  function handleAddToCart() {
  addToCart(product._id, quantity);
}

  if (loading) {
    return <p className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-sm text-gray-400">Loading product...</p>;
  }

  if (error) {
    return <p className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-sm text-red-500">{error}</p>;
  }

  if (!product) {
    return null;
  }

  const outOfStock = !product.isAvailable || product.stock === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <button
        type="button"
        onClick={() => navigate("/shop-wigs")}
        className="text-sm text-gray-500 hover:text-pink-500 mb-6"
      >
        ← Back to Shop
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative">
          <img
            src={product.image}
            alt={product.product_name}
            className="w-full h-full object-cover"
          />
          {outOfStock && (
            <span className="absolute top-3 left-3 bg-gray-900/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        <div>
          {product.category && (
            <span className="text-xs font-medium text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full">
              {product.category}
            </span>
          )}

          <h1 className="mt-3 text-2xl font-semibold text-gray-900">{product.product_name}</h1>

          {product.rating > 0 && (
            <p className="mt-2 text-sm text-amber-500">★ {product.rating.toFixed(1)}</p>
          )}

          <p className="mt-4 text-2xl font-bold text-gray-900">
            ₦{Number(product.price).toLocaleString()}
          </p>

          {product.description && (
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">{product.description}</p>
          )}

          <p className="mt-4 text-sm text-gray-500">
            {outOfStock ? "Currently unavailable" : `${product.stock} in stock`}
          </p>

          {!outOfStock && (
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded-full">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-pink-500"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-pink-500"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={outOfStock}
            onClick={handleAddToCart}
            className="mt-5 w-full sm:w-auto px-8 rounded-full bg-pink-500 text-white text-sm font-semibold py-3 hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {outOfStock ? "Unavailable" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}