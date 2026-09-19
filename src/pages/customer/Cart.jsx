import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItemRow from "../../components/cart/CartItemRow";

export default function Cart() {
  const { items, loading, error, updateQuantity, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return <p className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-sm text-gray-400">Loading your cart...</p>;
  }

  if (error) {
    return <p className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-sm text-red-500">{error}</p>;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-sm text-gray-500">Your cart is empty.</p>
        <Link
          to="/shop-wigs"
          className="inline-block mt-4 rounded-full bg-pink-500 text-white text-sm font-semibold px-6 py-3 hover:bg-pink-600 transition"
        >
          Browse Wigs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Your Cart</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5">
        {items.map((item) => (
          <CartItemRow
            key={item.product._id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">₦{subtotal.toLocaleString()}</span>
        </div>
        <p className="mt-1 text-xs text-gray-400">Delivery fee calculated at checkout.</p>

        <button
          type="button"
          onClick={() => navigate("/checkout")}
          className="mt-4 w-full rounded-full bg-pink-500 text-white text-sm font-semibold py-3.5 hover:bg-pink-600 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}