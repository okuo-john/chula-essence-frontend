import TestimonialStatusBadge from "./TestimonialStatusBadge";

function StarRating({ rating }) {
  if (!rating) return <span className="text-gray-300">—</span>;
  return (
    <span className="text-amber-400 text-sm">
      {"★".repeat(rating)}
      <span className="text-gray-200">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export default function TestimonialDetailModal({
  testimonial,
  onApprove,
  onReject,
  onDelete,
  onClose,
  actionLoading,
}) {
  const isBusy = Boolean(actionLoading);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-white rounded-xl p-6">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Testimonial</h2>
          <button type="button" onClick={onClose} disabled={isBusy} className="text-gray-400 hover:text-gray-600 disabled:opacity-50">
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="text-gray-900 font-medium mt-0.5">{testimonial.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Rating</p>
            <div className="mt-0.5"><StarRating rating={testimonial.rating} /></div>
          </div>

          <div>
            <p className="text-gray-500">Feedback</p>
            <p className="text-gray-700 mt-0.5 leading-relaxed">{testimonial.feedback}</p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <div className="mt-0.5"><TestimonialStatusBadge status={testimonial.status} /></div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {testimonial.status !== "approved" && (
            <button
              type="button"
              onClick={() => onApprove(testimonial._id)}
              disabled={isBusy}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-green-500 text-white text-sm font-semibold py-2.5 hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading === "approve" && <Spinner />}
              {actionLoading === "approve" ? "Approving..." : "Approve"}
            </button>
          )}
          {testimonial.status !== "rejected" && (
            <button
              type="button"
              onClick={() => onReject(testimonial._id)}
              disabled={isBusy}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 text-white text-sm font-semibold py-2.5 hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading === "reject" && <Spinner />}
              {actionLoading === "reject" ? "Rejecting..." : "Reject"}
            </button>
          )}
          <button
            type="button"
            onClick={() => onDelete(testimonial._id)}
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