import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { productApi } from "../../services/productApi";
import { useCart } from "../../context/CartContext";
import { LoadingDetailSkeleton } from "../../components/common/SkeletonLoader";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addError, setAddError] = useState(null);

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

  async function handleAddToCart() {
    setAddError(null);
    try {
      await addToCart(product._id, quantity);
    } catch (err) {
      setAddError(err.response?.data?.message || "Couldn't add to cart.");
    }
  }

  if (loading) {
    return <LoadingDetailSkeleton />;
  }

  if (error) {
    return <p className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-sm text-red-500">{error}</p>;
  }

  if (!product) {
    return null;
  }

  const cartItem = items.find((item) => item.product._id === product._id);
  const quantityInCart = cartItem?.quantity ?? 0;
  const remainingStock = product.stock - quantityInCart;
  const outOfStock = !product.isAvailable || product.stock === 0;
  const atMaxStock = !outOfStock && remainingStock <= 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <button
        type="button"
        onClick={() => navigate("/shop-wigs")}
        aria-label="Back to Shop"
        className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-500 shadow-sm transition hover:-translate-y-0.5 hover:border-pink-300 hover:text-pink-600"
      >
        <ArrowLeft size={18} strokeWidth={2.5} />
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

          {quantityInCart > 0 && (
            <p className="mt-1 text-xs text-gray-400">{quantityInCart} already in your cart</p>
          )}

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
                  onClick={() => setQuantity((q) => Math.min(remainingStock, q + 1))}
                  disabled={atMaxStock}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-pink-500 disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {addError && <p className="mt-3 text-sm text-red-500">{addError}</p>}

          <button
            type="button"
            disabled={outOfStock || atMaxStock}
            onClick={handleAddToCart}
            className="mt-5 w-full sm:w-auto px-8 rounded-full bg-pink-500 text-white text-sm font-semibold py-3 hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {atMaxStock ? "Max in Cart" : outOfStock ? "Unavailable" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}