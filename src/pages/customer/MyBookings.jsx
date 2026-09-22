import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bookingApi } from "../../services/bookingApi";
import MyBookingCard from "../../components/booking/MyBookingCard";
import { LoadingBookingRows } from "../../components/common/SkeletonLoader";

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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">My Bookings</h1>

      {loading && <LoadingBookingRows count={3} />}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <div className="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center">
          <p className="text-sm text-gray-500">You haven't booked a service yet.</p>
          <Link
            to="/book-service"
            className="inline-block mt-4 rounded-full bg-pink-500 text-white text-sm font-semibold px-5 py-2.5 hover:bg-pink-600 transition"
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
  );
}