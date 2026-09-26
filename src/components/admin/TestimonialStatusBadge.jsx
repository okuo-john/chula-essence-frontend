const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-600",
  approved: "bg-green-100 text-green-600",
  rejected: "bg-red-100 text-red-500",
};

export default function TestimonialStatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap capitalize ${
        STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}