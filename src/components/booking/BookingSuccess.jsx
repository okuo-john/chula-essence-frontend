import BookingStepper from "./BookingStepper";
import BookingStatus from "./BookingStatus";
import { useNavigate } from "react-router-dom";


export default function BookingSuccess({ onRestart }) {
  const navigate = useNavigate();
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

      <button
  type="button"
  onClick={() => navigate("/my-bookings")}
  className="mt-6 w-full py-3.5 rounded-full bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 active:scale-[0.99] transition"
>
  View My Booking
</button>
    </div>
  );
}