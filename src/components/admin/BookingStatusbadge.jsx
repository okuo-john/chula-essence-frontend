const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-600",
  Confirmed: "bg-green-100 text-green-600",
  Rescheduled: "bg-blue-100 text-blue-600",
  Cancelled: "bg-red-100 text-red-500",
  Completed: "bg-gray-100 text-gray-600",
};

export default function BookingStatusBadge({ status }) {
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