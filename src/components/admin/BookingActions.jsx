export default function BookingActions({ booking, onConfirm, onReschedule, onCancel, onComplete }) {
  const { status } = booking;
  const isFinal = status === "Cancelled" || status === "Completed";

  return (
    <div className="flex items-center justify-end gap-3 whitespace-nowrap">
      {status === "Pending" && (
        <button type="button" onClick={() => onConfirm(booking)} className="text-green-600 font-medium hover:text-green-700">
          Confirm
        </button>
      )}

      {!isFinal && (
        <button type="button" onClick={() => onReschedule(booking)} className="text-blue-600 font-medium hover:text-blue-700">
          Reschedule
        </button>
      )}

      {status === "Confirmed" && (
        <button type="button" onClick={() => onComplete(booking)} className="text-gray-600 font-medium hover:text-gray-800">
          Complete
        </button>
      )}

      {!isFinal && (
        <button type="button" onClick={() => onCancel(booking)} className="text-red-500 font-medium hover:text-red-600">
          Cancel
        </button>
      )}
    </div>
  );
}