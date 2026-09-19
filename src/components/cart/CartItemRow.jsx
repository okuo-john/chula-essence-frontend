export default function CartItemRow({ item, onUpdateQuantity, onRemove }) {
  const { product, quantity } = item;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-b-0">
      <img
        src={product.image}
        alt={product.product_name}
        className="w-16 h-16 rounded-lg object-cover border border-gray-100"
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{product.product_name}</p>
        <p className="text-sm text-gray-500 mt-0.5">₦{Number(product.price).toLocaleString()}</p>
      </div>

      <div className="flex items-center border border-gray-200 rounded-full">
        <button
          type="button"
          onClick={() => onUpdateQuantity(product._id, quantity - 1)}
          disabled={quantity <= 1}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-pink-500 disabled:opacity-30"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-7 text-center text-sm font-medium">{quantity}</span>
        <button
          type="button"
          onClick={() => onUpdateQuantity(product._id, quantity + 1)}
          disabled={quantity >= product.stock}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-pink-500 disabled:opacity-30"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <p className="w-20 text-right text-sm font-semibold text-gray-900">
        ₦{Number(product.price * quantity).toLocaleString()}
      </p>

      <button
        type="button"
        onClick={() => onRemove(product._id)}
        aria-label="Remove item"
        className="text-gray-400 hover:text-red-500"
      >
        ✕
      </button>
    </div>
  );
}