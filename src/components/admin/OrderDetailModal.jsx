import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderDetailModal({ order, onClose }) {
  const { delivery, payment } = order;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-white rounded-xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm">
          <div>
            <p className="text-gray-500">Customer</p>
            <p className="text-gray-900 mt-0.5">
              {order.customer?.fullname} · {order.customer?.email}
            </p>
            {order.customer?.phoneNumber && (
              <p className="text-gray-600 text-xs mt-0.5">{order.customer.phoneNumber}</p>
            )}
          </div>

          <div>
            <p className="text-gray-500 mb-1.5">Items</p>
            <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-xs text-gray-700">
                  <span>{item.productName} × {item.quantity}</span>
                  <span>₦{Number(item.subtotal).toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-200 space-y-1 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>₦{Number(order.subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery Fee</span>
                  <span>₦{Number(order.deliveryFee).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₦{Number(order.totalAmount).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-500">Delivery Address</p>
            <p className="text-gray-900 mt-0.5">
              {delivery.fullname} · {delivery.phoneNumber}
            </p>
            <p className="text-gray-600 mt-0.5">
              {delivery.address}, {delivery.city}, {delivery.state}
            </p>
            {delivery.landmark && (
              <p className="text-gray-500 text-xs mt-0.5">Landmark: {delivery.landmark}</p>
            )}
            {delivery.additionalInfo && (
              <p className="text-gray-500 text-xs mt-0.5">{delivery.additionalInfo}</p>
            )}
          </div>

          {payment && (
            <div>
              <p className="text-gray-500">Payment</p>
              <p className="text-gray-900 mt-0.5 font-mono text-xs">{payment.reference}</p>
              <p className="text-gray-600 text-xs mt-0.5">
                {payment.status} {payment.channel && `· ${payment.channel}`}
              </p>
            </div>
          )}

          <div>
            <p className="text-gray-500 mb-1">Order Status</p>
            <OrderStatusBadge status={order.status} />
          </div>
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