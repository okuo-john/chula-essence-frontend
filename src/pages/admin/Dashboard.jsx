import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { adminOrderApi } from "../../services/adminOrderApi";
import AdminHeader from "../../components/admin/AdminHeader";
import StatCard from "../../components/admin/StatCard";
import BookingTable from "../../components/admin/BookingTable";
import { LoadingTableSkeleton } from "../../components/common/SkeletonLoader";

export default function Dashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      setError(null);
      try {
        const [bookingsRes, ordersRes] = await Promise.all([
          api.get("/bookings"),
          adminOrderApi.getAll(),
        ]);
        const allBookings = bookingsRes.data.data;
        setBookings(allBookings.slice(0, 5));
        setTotalBookings(allBookings.length);
        setOrders(ordersRes);
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't load dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + Number(order.totalAmount ?? 0), 0);

  const stats = [
    { label: "Total Bookings", value: String(totalBookings) },
    { label: "Total Orders", value: String(orders.length) },
    { label: "Total Revenue", value: `₦${totalRevenue.toLocaleString()}` },
  ];

  return (
    <div>
      <AdminHeader title="Overview" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      <div className="mt-6 w-full rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex w-full flex-col">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="w-full min-w-0 overflow-hidden">
            <BookingTable
              bookings={bookings}
              onConfirm={() => { }}
              onReschedule={() => { }}
              onCancel={() => { }}
              onComplete={() => { }}
            />
          </div>
          <button
            type="button"
            onClick={() => navigate("/admin/bookings")}
            className="text-sm font-medium text-pink-500 hover:text-pink-600 mt-6"
          >
            View All
          </button>
        </div>

        <div className="mt-2">
          {loading && <LoadingTableSkeleton rows={3} columns={5} />}
          {error && <p className="text-sm text-red-500 py-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}