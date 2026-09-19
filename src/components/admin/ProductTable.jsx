export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-400">
        No products yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-500">
            <th className="px-5 py-3">Image</th>
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Category</th>
            <th className="px-5 py-3">Price</th>
            <th className="px-5 py-3">Stock</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-5 py-3">
                <img
                  src={product.image}
                  alt={product.product_name}
                  className="w-12 h-12 object-cover rounded-lg border border-gray-100"
                />
              </td>
              <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">
                {product.product_name}
              </td>
              <td className="px-5 py-3 text-gray-600">{product.category || "—"}</td>
              <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                ₦{Number(product.price).toLocaleString()}
              </td>
              <td className="px-5 py-3 text-gray-600">{product.stock}</td>
              <td className="px-5 py-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    product.isAvailable ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {product.isAvailable ? "Available" : "Unavailable"}
                </span>
              </td>
              <td className="px-5 py-3 text-right space-x-3 whitespace-nowrap">
                <button type="button" onClick={() => onEdit(product)} className="text-pink-500 font-medium hover:text-pink-600">
                  Edit
                </button>
                <button type="button" onClick={() => onDelete(product._id)} className="text-red-500 font-medium hover:text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}