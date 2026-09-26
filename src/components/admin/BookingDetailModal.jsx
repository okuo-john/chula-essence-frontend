import BookingStatusBadge from "./BookingStatusBadge";

function customerLabel(customer) {
  if (!customer) return "Unknown customer";
  if (typeof customer === "string") return customer;
  return customer.fullname || customer.email || customer._id;
}

function servicesLabel(services) {
  if (!Array.isArray(services) || services.length === 0) return "—";
  return services.map((s) => (typeof s === "string" ? s : s.name)).join(", ");
}

function formatDate(isoDate) {
  const d = new Date(isoDate);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function Spinner() {
  return (
    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export default function BookingDetailModal({
  booking,
  onConfirm,
  onReschedule,
  onCancel,
  onComplete,
  onClose,
  actionLoading,
}) {
  const { status } = booking;
  const isFinal = status === "Cancelled" || status === "Completed";
  const isBusy = Boolean(actionLoading);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-white rounded-xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Booking Details</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Customer</p>
            <p className="text-gray-900 mt-0.5">{customerLabel(booking.customer)}</p>
          </div>

          <div>
            <p className="text-gray-500">Services</p>
            <p className="text-gray-900 mt-0.5">{servicesLabel(booking.services)}</p>
          </div>

          <div>
            <p className="text-gray-500">Date & Time</p>
            <p className="text-gray-900 mt-0.5">
              {formatDate(booking.appointmentDate)} · {booking.startTime}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Type</p>
            <p className="text-gray-900 mt-0.5">{booking.serviceType}</p>
          </div>

          <div>
            <p className="text-gray-500">Price</p>
            <p className="text-gray-900 font-semibold mt-0.5">
              ₦{Number(booking.totalPrice ?? 0).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <div className="mt-0.5"><BookingStatusBadge status={status} /></div>
          </div>

          {status === "Rescheduled" && booking.rescheduledFrom?.date && (
            <div>
              <p className="text-gray-500">Rescheduled From</p>
              <p className="text-blue-600 text-xs mt-0.5">
                {formatDate(booking.rescheduledFrom.date)} · {booking.rescheduledFrom.startTime}
              </p>
            </div>
          )}

          {status === "Cancelled" && booking.cancellationReason && (
            <div>
              <p className="text-gray-500">Cancellation Reason</p>
              <p className="text-red-500 text-xs mt-0.5">{booking.cancellationReason}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {status === "Pending" && (
            <button
              type="button"
              onClick={() => onConfirm(booking)}
              disabled={isBusy}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-green-500 text-white text-sm font-semibold py-2.5 hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading === "confirm" && <Spinner />}
              {actionLoading === "confirm" ? "Confirming..." : "Confirm"}
            </button>
          )}

          {!isFinal && (
            <button
              type="button"
              onClick={() => onReschedule(booking)}
              disabled={isBusy}
              className="flex-1 rounded-lg bg-blue-500 text-white text-sm font-semibold py-2.5 hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reschedule
            </button>
          )}

          {status === "Confirmed" && (
            <button
              type="button"
              onClick={() => onComplete(booking)}
              disabled={isBusy}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-gray-700 text-white text-sm font-semibold py-2.5 hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading === "complete" && <Spinner />}
              {actionLoading === "complete" ? "Completing..." : "Complete"}
            </button>
          )}

          {!isFinal && (
            <button
              type="button"
              onClick={() => onCancel(booking)}
              disabled={isBusy}
              className="flex-1 rounded-lg border border-red-200 text-red-500 text-sm font-semibold py-2.5 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          )}
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