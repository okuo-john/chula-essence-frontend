const STATUS_STYLES = {
  Paid: "bg-blue-100 text-blue-600",
  Processing: "bg-amber-100 text-amber-600",
  Shipped: "bg-purple-100 text-purple-600",
  Delivered: "bg-green-100 text-green-600",
  Cancelled: "bg-red-100 text-red-500",
};

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
        STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}