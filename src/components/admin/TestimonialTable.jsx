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

function testimonialStatus(testimonial) {
  if (testimonial.status) return testimonial.status;
  if (testimonial.isApproved === true) return "Approved";
  if (testimonial.isRejected === true) return "Rejected";
  return "Pending";
}

export default function TestimonialTable({ testimonials, onApprove, onReject, onDelete, busyId }) {
=======
export default function TestimonialTable({ testimonials, onSelect }) {

  if (testimonials.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-400">
        No testimonials yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-500">
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Feedback</th>
            <th className="px-5 py-3">Rating</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3"></th>
=======

          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {testimonials.map((t) => (
            <tr
              key={t._id}
              onClick={() => onSelect(t)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">{t.name}</td>
              <td className="px-5 py-3 text-gray-600 max-w-md truncate">{t.feedback}</td>
              <td className="px-5 py-3"><StarRating rating={t.rating} /></td>
              <td className="px-5 py-3">
                <TestimonialStatusBadge status={t.status} />
              </td>
              <td className="px-5 py-3">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  testimonialStatus(t) === "Approved"
                    ? "bg-green-100 text-green-700"
                    : testimonialStatus(t) === "Rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-amber-100 text-amber-700"
                }`}>
                  {testimonialStatus(t)}
                </span>
              </td>
              <td className="px-5 py-3 text-right">
                <div className="flex justify-end gap-3 whitespace-nowrap">
                  <button type="button" onClick={() => onApprove(t)} disabled={busyId === t._id} className="font-medium text-green-600 transition hover:text-green-700 disabled:opacity-50">
                    Approve
                  </button>
                  <button type="button" onClick={() => onReject(t)} disabled={busyId === t._id} className="font-medium text-amber-600 transition hover:text-amber-700 disabled:opacity-50">
                    Reject
                  </button>
                  <button type="button" onClick={() => onDelete(t._id)} disabled={busyId === t._id} className="font-medium text-red-500 transition hover:text-red-600 disabled:opacity-50">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}