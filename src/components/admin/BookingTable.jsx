import BookingStatusBadge from "./BookingStatusBadge";

function formatDate(isoDate) {
  const d = new Date(isoDate);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function customerLabel(customer) {
  if (!customer) return "Unknown customer";
  if (typeof customer === "string") return customer;
  return customer.fullname || customer.email || customer._id;
}

function servicesLabel(services) {
  if (!Array.isArray(services) || services.length === 0) return "—";
  return services.map((s) => (typeof s === "string" ? s : s.name)).join(", ");
}

export default function BookingTable({ bookings, onSelect }) {
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-400">
        No bookings yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-500">
            <th className="px-5 py-3">Customer</th>
            <th className="px-5 py-3">Services</th>
            <th className="px-5 py-3">Date & Time</th>
            <th className="px-5 py-3">Type</th>
            <th className="px-5 py-3">Price</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {bookings.map((booking) => (
            <tr
              key={booking._id}
              onClick={() => onSelect(booking)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">
                {customerLabel(booking.customer)}
              </td>
              <td className="px-5 py-3 text-gray-600 max-w-[200px] truncate">
                {servicesLabel(booking.services)}
              </td>
              <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                {formatDate(booking.appointmentDate)} · {booking.startTime}
              </td>
              <td className="px-5 py-3 text-gray-600">{booking.serviceType}</td>
              <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                ₦{Number(booking.totalPrice ?? 0).toLocaleString()}
              </td>
              <td className="px-5 py-3">
                <BookingStatusBadge status={booking.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}