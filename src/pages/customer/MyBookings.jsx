import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bookingApi } from "../../services/bookingApi";
import MyBookingCard from "../../components/booking/MyBookingCard";
import { LoadingBookingRows } from "../../components/common/SkeletonLoader";
import RitualBackdrop from "../../components/common/RitualBackdrop";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBookings() {
      setLoading(true);
      setError(null);
      try {
        const data = await bookingApi.getMyBookings();
        setBookings(data);
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't load your bookings.");
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  const aside = (
    <div className="ritual-reveal">
      <span className="ritual-aside-mark">03</span>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500">Your schedule</p>
      <p className="mt-3 font-heading text-2xl leading-tight text-gray-900">Every appointment matters.</p>
      <p className="mt-4 text-sm leading-6">Keep an eye on upcoming care, confirm details, and revisit your latest rituals anytime.</p>
    </div>
  );

  return (
    <RitualBackdrop aside={aside}>
      <div className="ritual-reveal">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-500">My bookings</p>
        <h1 className="mt-3 font-heading text-4xl leading-tight text-gray-900 sm:text-5xl">Your beauty timeline.</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
          Track your upcoming appointments and stay close to every detail of your care routine.
        </p>
      </div>

      <div className="mt-8 max-w-2xl">
        {loading && <LoadingBookingRows count={3} />}

        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && bookings.length === 0 && (
          <div className="rounded-[28px] border border-dashed border-pink-200 bg-white/80 p-10 text-center shadow-sm backdrop-blur-sm">
            <p className="text-sm text-gray-500">You haven't booked a service yet.</p>
            <Link
              to="/book-service"
              className="mt-4 inline-block rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              Book Your First Service
            </Link>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <MyBookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </RitualBackdrop>
  );
}