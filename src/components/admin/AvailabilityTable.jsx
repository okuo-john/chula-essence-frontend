function formatDate(isoDate) {
  const d = new Date(isoDate);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export default function AvailabilityTable({ records, onEdit, onDelete }) {
  if (records.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-400">
        No availability set yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-500">
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3">Hours</th>
            <th className="px-5 py-3">Breaks</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {records.map((record) => (
            <tr key={record._id}>
              <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">
                {formatDate(record.date)}
              </td>
              <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                {record.startTime} – {record.endTime}
              </td>
              <td className="px-5 py-3 text-gray-600">
                {record.blockedPeriods.length === 0
                  ? "—"
                  : record.blockedPeriods.map((p) => `${p.startTime}-${p.endTime}`).join(", ")}
              </td>
              <td className="px-5 py-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    record.isAvailable ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {record.isAvailable ? "Open" : "Closed"}
                </span>
              </td>
              <td className="px-5 py-3 text-right space-x-3 whitespace-nowrap">
                <button type="button" onClick={() => onEdit(record)} className="text-pink-500 font-medium hover:text-pink-600">
                  Edit
                </button>
                <button type="button" onClick={() => onDelete(record._id)} className="text-red-500 font-medium hover:text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}