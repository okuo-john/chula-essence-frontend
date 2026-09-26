function Spinner() {
  return (
    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

function formatDate(isoDate) {
  const d = new Date(isoDate);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export default function AvailabilityDetailModal({ record, onEdit, onDelete, onClose, actionLoading }) {
  const isBusy = Boolean(actionLoading);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-white rounded-xl p-6">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Availability Details</h2>
          <button type="button" onClick={onClose} disabled={isBusy} className="text-gray-400 hover:text-gray-600 disabled:opacity-50">
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Date</p>
            <p className="text-gray-900 font-medium mt-0.5">{formatDate(record.date)}</p>
          </div>

          <div>
            <p className="text-gray-500">Working Hours</p>
            <p className="text-gray-900 mt-0.5">{record.startTime} – {record.endTime}</p>
          </div>

          <div>
            <p className="text-gray-500">Blocked Periods</p>
            {record.blockedPeriods.length === 0 ? (
              <p className="text-gray-400 mt-0.5">None</p>
            ) : (
              <div className="mt-1 space-y-1">
                {record.blockedPeriods.map((p, i) => (
                  <p key={i} className="text-gray-700">
                    {p.startTime} – {p.endTime}
                    {p.reason && <span className="text-gray-400"> ({p.reason})</span>}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <span
              className={`inline-block mt-0.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                record.isAvailable ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
              }`}
            >
              {record.isAvailable ? "Open" : "Closed"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onEdit(record)}
            disabled={isBusy}
            className="flex-1 rounded-lg bg-pink-500 text-white text-sm font-semibold py-2.5 hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(record._id)}
            disabled={isBusy}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-red-200 text-red-500 text-sm font-semibold py-2.5 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLoading === "delete" && <Spinner />}
            {actionLoading === "delete" ? "Deleting..." : "Delete"}
          </button>
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