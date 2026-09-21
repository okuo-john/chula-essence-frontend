export default function PaymentDetailModal({ payment, onClose }) {
  const order = payment.order;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-white rounded-xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Reference</p>
            <p className="font-mono text-xs text-gray-900 mt-0.5">{payment.reference}</p>
          </div>

          <div>
            <p className="text-gray-500">Customer</p>
            <p className="text-gray-900 mt-0.5">
              {payment.customer?.fullname} · {payment.customer?.email}
            </p>
            {payment.customer?.phoneNumber && (
              <p className="text-gray-600 text-xs mt-0.5">{payment.customer.phoneNumber}</p>
            )}
          </div>

          <div>
            <p className="text-gray-500">Amount</p>
            <p className="text-gray-900 font-semibold mt-0.5">
              ₦{(payment.amount / 100).toLocaleString()} {payment.currency}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <p className="text-gray-900 mt-0.5">{payment.status}</p>
          </div>

          {payment.channel && (
            <div>
              <p className="text-gray-500">Channel</p>
              <p className="text-gray-900 mt-0.5 capitalize">{payment.channel}</p>
            </div>
          )}

          {payment.paidAt && (
            <div>
              <p className="text-gray-500">Paid At</p>
              <p className="text-gray-900 mt-0.5">{new Date(payment.paidAt).toLocaleString()}</p>
            </div>
          )}

          {order && (
            <div className="pt-3 border-t border-gray-100">
              <p className="text-gray-500 mb-1.5">Linked Order</p>
              <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                {order.items?.map((item, i) => (
                  <p key={i} className="text-xs text-gray-700">
                    {item.productName} × {item.quantity} — ₦{Number(item.subtotal).toLocaleString()}
                  </p>
                ))}
                <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between text-xs">
                  <span className="text-gray-500">Total</span>
                  <span className="font-semibold text-gray-900">
                    ₦{Number(order.totalAmount).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Order status: {order.status}</p>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-full border border-gray-200 text-sm font-semibold text-gray-700 py-2.5 hover:bg-gray-50 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}