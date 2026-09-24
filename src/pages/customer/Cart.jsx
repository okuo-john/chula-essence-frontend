import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItemRow from "../../components/cart/CartItemRow";
import { LoadingCartSkeleton } from "../../components/common/SkeletonLoader";
import RitualBackdrop from "../../components/common/RitualBackdrop";

export default function Cart() {
  const { items, loading, error, updateQuantity, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();

  const aside = (
    <div className="ritual-reveal">
      <span className="ritual-aside-mark">02</span>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500">Your bag</p>
      <p className="mt-3 font-heading text-2xl leading-tight text-gray-900">Every pick deserves its moment.</p>
      <p className="mt-4 text-sm leading-6">Review your favorites, adjust your quantity, and move on to checkout when you’re ready.</p>
    </div>
  );

  if (loading) {
    return (
      <RitualBackdrop aside={aside}>
        <LoadingCartSkeleton />
      </RitualBackdrop>
    );
  }

  if (error) {
    return (
      <RitualBackdrop aside={aside}>
        <p className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-sm text-red-500">{error}</p>
      </RitualBackdrop>
    );
  }

  if (items.length === 0) {
    return (
      <RitualBackdrop aside={aside}>
        <div className="mx-auto max-w-2xl rounded-[28px] border border-pink-100 bg-white/80 p-8 text-center shadow-sm backdrop-blur-sm sm:p-10 dark:border-slate-700 dark:bg-slate-900/80">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-500">Your cart</p>
          <h1 className="mt-3 font-heading text-3xl text-gray-900 dark:text-slate-100">Your bag is waiting for a little love.</h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-slate-300">Looks like nothing is in your cart yet. Let’s add a few favorites.</p>
          <Link
            to="/shop-wigs"
            className="mt-6 inline-block rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600 dark:bg-white dark:text-slate-900"
          >
            Browse Wigs
          </Link>
        </div>
      </RitualBackdrop>
    );
  }

  return (
    <RitualBackdrop aside={aside}>
      <div className="ritual-reveal">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-500">Cart</p>
        <h1 className="mt-3 font-heading text-4xl leading-tight text-gray-900 sm:text-5xl">Your beauty edits.</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
          Review your selections, adjust quantities, and head to checkout when everything feels just right.
        </p>
      </div>

      <div className="mt-8 max-w-3xl rounded-[28px] border border-pink-100 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-black sm:p-5">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white/80 dark:border-zinc-800 dark:bg-black">
          {items.map((item) => (
            <CartItemRow
              key={item.product._id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 max-w-3xl rounded-[28px] border border-pink-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-black">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-slate-300">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900 dark:text-slate-100">₦{subtotal.toLocaleString()}</span>
        </div>
        <p className="mt-1 text-xs text-gray-400 dark:text-slate-400">Delivery fee calculated at checkout.</p>

        <button
          type="button"
          onClick={() => navigate("/checkout")}
          className="mt-4 w-full rounded-full bg-pink-500 text-white text-sm font-semibold py-3.5 transition hover:bg-pink-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </RitualBackdrop>
  );
}