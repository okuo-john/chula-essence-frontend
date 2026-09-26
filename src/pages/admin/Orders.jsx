import { useState, useEffect, useMemo } from "react";
import { adminOrderApi } from "../../services/adminOrderApi";
import OrderFilters from "../../components/admin/OrderFilters";
import OrderTable from "../../components/admin/OrderTable";
import OrderDetailModal from "../../components/admin/OrderDetailModal";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    setError(null);
    try {
      const data = await adminOrderApi.getAll();
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load orders.");
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      if (!matchesStatus) return false;

      if (!search.trim()) return true;

      const query = search.trim().toLowerCase();
      const customerName = order.customer?.fullname?.toLowerCase() || "";
      const customerEmail = order.customer?.email?.toLowerCase() || "";
      const productNames = order.items?.map((item) => item.productName).join(" ").toLowerCase() || "";

      return (
        customerName.includes(query) ||
        customerEmail.includes(query) ||
        productNames.includes(query)
      );
    });
  }, [orders, search, statusFilter]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Orders</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <OrderFilters
        search={search}
        onSearchChange={setSearch}
        status={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {loading ? (
        <p className="text-sm text-gray-400">Loading orders...</p>
      ) : (
        <OrderTable orders={filteredOrders} onSelect={setSelectedOrder} />
      )}

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}