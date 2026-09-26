import PaymentStatusBadge from "./PaymentStatusBadge";

function customerLabel(customer) {
  if (!customer) return "Unknown customer";
  if (typeof customer === "string") return customer;
  return customer.fullname || customer.email || customer._id;
}

function formatDate(isoDate) {
  const d = new Date(isoDate);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export default function PaymentTable({ payments, onSelect }) {
  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-400">
        No payments yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-500">
            <th className="px-5 py-3">Reference</th>
            <th className="px-5 py-3">Customer</th>
            <th className="px-5 py-3">Amount</th>
            <th className="px-5 py-3">Channel</th>
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {payments.map((payment) => (
            <tr
              key={payment._id}
              onClick={() => onSelect(payment)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="px-5 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">
                {payment.reference}
              </td>
              <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">
                {customerLabel(payment.customer)}
              </td>
              <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                ₦{(payment.amount / 100).toLocaleString()}
              </td>
              <td className="px-5 py-3 text-gray-600 capitalize">
                {payment.channel || "—"}
              </td>
              <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                {formatDate(payment.createdAt)}
              </td>
              <td className="px-5 py-3">
                <PaymentStatusBadge status={payment.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}