const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-600",
  Confirmed: "bg-green-100 text-green-600",
  Rescheduled: "bg-blue-100 text-blue-600",
  Cancelled: "bg-red-100 text-red-500",
  Completed: "bg-gray-100 text-gray-600",
};

function formatDate(isoDate) {
  const d = new Date(isoDate);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export default function MyBookingCard({ booking }) {
  const serviceNames = booking.services.map((s) => s.name).join(", ");

  return (
    <div className="rounded-[24px] border border-pink-100 bg-white/85 p-5 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900 dark:text-slate-100">{serviceNames}</p>
          <p className="mt-1 text-xs text-gray-500 dark:text-slate-300">
            {formatDate(booking.appointmentDate)} · {booking.startTime}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            STATUS_STYLES[booking.status] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {booking.status}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-pink-50 pt-3 text-xs text-gray-500 dark:border-slate-700 dark:text-slate-300">
        <span>{booking.serviceType} Service</span>
        <span className="font-semibold text-gray-900 dark:text-slate-100">
          ₦{Number(booking.totalPrice ?? 0).toLocaleString()}
        </span>
      </div>

      {booking.status === "Rescheduled" && booking.rescheduledFrom?.date && (
        <p className="mt-2 text-xs text-blue-600 dark:text-blue-300">
          Rescheduled from {formatDate(booking.rescheduledFrom.date)} · {booking.rescheduledFrom.startTime}
        </p>
      )}

      {booking.status === "Cancelled" && booking.cancellationReason && (
        <p className="mt-2 text-xs text-red-500 dark:text-red-300">Reason: {booking.cancellationReason}</p>
      )}
    </div>
  );
}