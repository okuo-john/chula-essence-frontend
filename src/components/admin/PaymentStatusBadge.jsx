const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-600",
  Paid: "bg-green-100 text-green-600",
  Failed: "bg-red-100 text-red-500",
  Refunded: "bg-gray-100 text-gray-600",
};

export default function PaymentStatusBadge({ status }) {
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