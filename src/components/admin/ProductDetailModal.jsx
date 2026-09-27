function Spinner() {
  return (
    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export default function ProductDetailModal({ product, onEdit, onDelete, onClose, actionLoading }) {
  const isBusy = Boolean(actionLoading);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-white rounded-xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
          <button type="button" onClick={onClose} disabled={isBusy} className="text-gray-400 hover:text-gray-600 disabled:opacity-50">
            ✕
          </button>
        </div>

        <img
          src={product.image}
          alt={product.product_name}
          className="mt-4 w-full aspect-square object-cover rounded-lg border border-gray-100"
        />

        <div className="mt-4 space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="text-gray-900 font-medium mt-0.5">{product.product_name}</p>
          </div>

          <div>
            <p className="text-gray-500">Category</p>
            <p className="text-gray-900 mt-0.5">{product.category || "—"}</p>
          </div>

          {product.description && (
            <div>
              <p className="text-gray-500">Description</p>
              <p className="text-gray-700 mt-0.5 leading-relaxed">{product.description}</p>
            </div>
          )}

          <div className="flex gap-6">
            <div>
              <p className="text-gray-500">Price</p>
              <p className="text-gray-900 font-semibold mt-0.5">
                ₦{Number(product.price).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Stock</p>
              <p className="text-gray-900 mt-0.5">{product.stock}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <span
              className={`inline-block mt-0.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                product.isAvailable ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
              }`}
            >
              {product.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onEdit(product)}
            disabled={isBusy}
            className="flex-1 rounded-lg bg-pink-500 text-white text-sm font-semibold py-2.5 hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(product._id)}
            disabled={isBusy}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-red-200 text-red-500 text-sm font-semibold py-2.5 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLoading === "delete" && <Spinner />}
            {actionLoading === "delete" ? "Deleting..." : "Delete"}
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={isBusy}
          className="mt-3 w-full rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 py-2.5 hover:bg-gray-50 transition disabled:opacity-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}