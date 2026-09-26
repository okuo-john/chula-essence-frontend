import OrderStatusBadge from "./OrderStatusBadge";

function customerLabel(customer) {
  if (!customer) return "Unknown customer";
  if (typeof customer === "string") return customer;
  return customer.fullname || customer.email || customer._id;
}

function formatDate(isoDate) {
  const d = new Date(isoDate);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export default function OrderTable({ orders, onSelect }) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-400">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-500">
            <th className="px-5 py-3">Customer</th>
            <th className="px-5 py-3">Items</th>
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3">Total</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr
              key={order._id}
              onClick={() => onSelect(order)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">
                {customerLabel(order.customer)}
              </td>
              <td className="px-5 py-3 text-gray-600 max-w-[220px] truncate">
                {order.items.map((item) => `${item.productName} ×${item.quantity}`).join(", ")}
              </td>
              <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                {formatDate(order.createdAt)}
              </td>
              <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                ₦{Number(order.totalAmount).toLocaleString()}
              </td>
              <td className="px-5 py-3">
                <OrderStatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}