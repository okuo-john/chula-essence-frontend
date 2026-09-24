import { formatNaira, formatDate } from "./utils";
import BookingStepper from "./BookingStepper";

export default function BookingSummary({ booking, allServices, onSubmit, onBack, isSubmitting, submitError }) {
  const selectedServiceObjs = allServices.filter((s) => booking.services.has(s._id));
  const total = selectedServiceObjs.reduce((sum, s) => sum + Number(s.price), 0);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <BookingStepper number={7} title="REVIEW BOOKING" />
      <h1 className="text-xl font-semibold text-gray-900 leading-snug">Your Booking</h1>
      <p className="mt-2 text-sm text-gray-500">
        Please review your booking details before submitting.
      </p>

      <div className="mt-5 space-y-4 text-sm">
        <div>
          <p className="font-medium text-gray-900">Services</p>
          <ul className="mt-1 text-gray-600 space-y-0.5">
            {selectedServiceObjs.map((s) => (
              <li key={s._id}>• {s.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-medium text-gray-900">Service Type</p>
          <p className="mt-1 text-gray-600">
            {booking.location === "home" ? "Home Service" : "Shop Service"}
          </p>
        </div>

        {booking.location === "home" && booking.address.address && (
          <div>
            <p className="font-medium text-gray-900">Service Address</p>
            <p className="mt-1 text-gray-600">
              {booking.address.address},<br />
              {booking.address.city}, {booking.address.state}.
            </p>
          </div>
        )}

        <div>
          <p className="font-medium text-gray-900">Date & Time</p>
          <p className="mt-1 text-gray-600">
            {formatDate(booking.date)} · {booking.time}
          </p>
        </div>

        {booking.details && (
          <div>
            <p className="font-medium text-gray-900">Additional Details</p>
            <p className="mt-1 text-gray-600">{booking.details}</p>
          </div>
        )}

        <div>
          <p className="font-medium text-gray-900">Estimated Price</p>
          <p className="mt-1 text-gray-900 font-semibold">{formatNaira(total)}</p>
        </div>
      </div>

      {submitError && (
        <p className="mt-4 text-sm text-red-500">{submitError}</p>
      )}

      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="mt-6 w-full py-3.5 rounded-full bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 active:scale-[0.99] transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Booking"}
      </button>

      <button
        type="button"
        onClick={onBack}
        disabled={isSubmitting}
        className="mt-3 hidden w-full py-3.5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50 active:scale-[0.99] transition disabled:opacity-40 sm:block"
      >
        Back
      </button>
    </div>
  );
}