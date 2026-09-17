import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import AdminHeader from "../../components/admin/AdminHeader";
import StatCard from "../../components/admin/StatCard";
import BookingTable from "../../components/admin/BookingTable";

export default function Dashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBookings() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/bookings");
        setBookings(res.data.data.slice(0, 5));
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't load recent bookings.");
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  const stats = [
    { label: "Total Bookings", value: bookings.length ? String(bookings.length) : "—" },
    { label: "Total Orders", value: "—" },
    { label: "Total Revenue", value: "—" },
  ];

  return (
    <div>
      <AdminHeader title="Overview" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      <div className="mt-6  rounded-xl p-5 border-gray-100 ">
        <div className="flex items-center justify-between flex-col">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Bookings</h2>
          <BookingTable
            bookings={bookings}
            onConfirm={() => { }}
            onReschedule={() => { }}
            onCancel={() => { }}
            onComplete={() => { }}
          />
          <button
            type="button"
            onClick={() => navigate("/admin/bookings")}
            className="text-sm font-medium text-pink-500 hover:text-pink-600 mt-6"
          >
            View All
          </button>
        </div>

        <div className="mt-2">
          {loading && <p className="text-sm text-gray-400 py-4">Loading...</p>}
          {error && <p className="text-sm text-red-500 py-4">{error}</p>}
          
        </div>
      </div>
    </div>
  );
}