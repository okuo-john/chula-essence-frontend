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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}