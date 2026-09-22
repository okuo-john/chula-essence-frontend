export default function ServiceTable({ services, onEdit, onDeactivate }) {
  if (services.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-400">
        No services yet. Add your first one above.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-500">
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Category</th>
            <th className="px-5 py-3">Price</th>
            <th className="px-5 py-3">Duration</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {services.map((service) => (
            <tr key={service._id}>
              <td className="px-5 py-3 font-medium text-gray-900">{service.name}</td>
              <td className="px-5 py-3 text-gray-600">{service.category}</td>
              <td className="px-5 py-3 text-gray-600">
                ₦{Number(service.price).toLocaleString()}
              </td>
              <td className="px-5 py-3 text-gray-600">{service.duration} min</td>
              <td className="px-5 py-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    service.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {service.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-5 py-3 text-right space-x-3 whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => onEdit(service)}
                  className="text-pink-500 font-medium hover:text-pink-600"
                >
                  Edit
                </button>
                {service.isActive && (
                  <button
                    type="button"
                    onClick={() => onDeactivate(service._id)}
                    className="text-red-500 font-medium hover:text-red-600"
                  >
                    Deactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}