import BookingStepper from "./BookingStepper";
import BookingStatus from "./BookingStatus";
import { useNavigate } from "react-router-dom";


export default function BookingSuccess({ booking, onRestart }) {
  const navigate = useNavigate();
  const breakdown = booking?.servicePriceBreakdown;
  const breakdownRows = Array.isArray(breakdown)
    ? breakdown
    : breakdown && typeof breakdown === "object"
      ? Object.entries(breakdown).map(([name, value]) =>
          typeof value === "object" ? { name, ...value } : { name, price: value },
        )
      : [];

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
      <BookingStepper number={8} title="CONFIRMATION" />
      <div className="mx-auto w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 text-pink-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="mt-4 text-xl font-semibold text-gray-900">
        Booking Request Submitted!
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Your appointment request has been successfully submitted.
      </p>

      <BookingStatus status="Pending" />
      <p className="mt-2 text-sm text-gray-500">
        We will review your booking and confirm, reschedule or cancel your appointment.
      </p>

      {breakdownRows.length > 0 && (
        <div className="mt-5 rounded-xl bg-gray-50 p-4 text-left">
          <h2 className="text-sm font-semibold text-gray-900">Price breakdown</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {breakdownRows.map((item, index) => {
              const name = item.serviceName ?? item.name ?? item.service?.name ?? "Service";
              const price = item.price ?? item.amount ?? item.servicePrice ?? item.totalPrice ?? item.shopPrice ?? item.homePrice;

              return (
                <li key={item.serviceId ?? item._id ?? `${name}-${index}`} className="flex justify-between gap-3 text-gray-600">
                  <span>{name}</span>
                  {price != null && <span className="shrink-0 font-medium text-gray-900">₦{Number(price).toLocaleString()}</span>}
                </li>
              );
            })}
          </ul>
          {(booking?.totalPrice ?? booking?.total) != null && (
            <p className="mt-3 flex justify-between border-t border-gray-200 pt-3 text-sm font-semibold text-gray-900">
              <span>Total</span>
              <span>₦{Number(booking.totalPrice ?? booking.total).toLocaleString()}</span>
            </p>
          )}
        </div>
      )}

      <button
  type="button"
  onClick={() => navigate("/my-bookings")}
  className="mt-6 w-full py-3.5 rounded-full bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 active:scale-[0.99] transition"
>
  View My Booking
</button>

      <button
        type="button"
        onClick={onRestart}
        className="mt-3 w-full py-3.5 rounded-full border border-gray-200 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-50 transition"
      >
        Book Another Service
      </button>
    </div>
  );
}