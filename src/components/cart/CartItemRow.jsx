export default function CartItemRow({ item, onUpdateQuantity, onRemove }) {
  const { product, quantity } = item;

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-pink-50 bg-white/80 p-4 last:border-b-0 dark:border-slate-700 dark:bg-black sm:flex sm:gap-4">
      <img
        src={product.image}
        alt={product.product_name}
        className="row-span-2 h-14 w-14 rounded-xl border border-pink-100 object-cover dark:border-slate-700 sm:row-span-1 sm:h-16 sm:w-16"
      />

      <div className="min-w-0 sm:flex-1">
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-slate-100">{product.product_name}</p>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-slate-300">₦{Number(product.price).toLocaleString()}</p>
      </div>

      <div className="col-start-2 row-start-2 flex items-center justify-self-start rounded-full border border-gray-200 bg-white dark:border-slate-600 dark:bg-neutral-950 sm:col-auto sm:row-auto sm:justify-self-auto">
        <button
          type="button"
          onClick={() => onUpdateQuantity(product._id, quantity - 1)}
          disabled={quantity <= 1}
          className="flex h-8 w-8 items-center justify-center text-gray-600 hover:text-pink-500 disabled:opacity-30 dark:text-slate-200"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-7 text-center text-sm font-medium dark:text-slate-100">{quantity}</span>
        <button
          type="button"
          onClick={() => onUpdateQuantity(product._id, quantity + 1)}
          disabled={quantity >= product.stock}
          className="flex h-8 w-8 items-center justify-center text-gray-600 hover:text-pink-500 disabled:opacity-30 dark:text-slate-200"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <p className="col-start-3 row-start-2 w-auto text-right text-sm font-semibold text-gray-900 dark:text-slate-100 sm:row-auto sm:w-20">
        ₦{Number(product.price * quantity).toLocaleString()}
      </p>

      <button
        type="button"
        onClick={() => onRemove(product._id)}
        aria-label="Remove item"
        className="col-start-3 row-start-1 self-start text-gray-400 transition hover:text-red-500 dark:text-slate-300 sm:col-auto sm:row-auto sm:self-auto"
      >
        ✕
      </button>
    </div>
  );
}