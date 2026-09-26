import { useState, useEffect, useMemo } from "react";
import { adminPaymentApi } from "../../services/adminPaymentApi";
import PaymentFilters from "../../components/admin/PaymentFilters";
import PaymentTable from "../../components/admin/PaymentTable";
import PaymentDetailModal from "../../components/admin/PaymentDetailModal";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadPayments();
  }, []);

  async function loadPayments() {
    setLoading(true);
    setError(null);
    try {
      const data = await adminPaymentApi.getAll();
      setPayments(data);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load payments.");
    } finally {
      setLoading(false);
    }
  }

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesStatus = statusFilter === "All" || payment.status === statusFilter;
      if (!matchesStatus) return false;

      if (!search.trim()) return true;

      const query = search.trim().toLowerCase();
      const reference = payment.reference?.toLowerCase() || "";
      const customerName = payment.customer?.fullname?.toLowerCase() || "";
      const customerEmail = payment.customer?.email?.toLowerCase() || "";

      return (
        reference.includes(query) ||
        customerName.includes(query) ||
        customerEmail.includes(query)
      );
    });
  }, [payments, search, statusFilter]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Payments</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <PaymentFilters
        search={search}
        onSearchChange={setSearch}
        status={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {loading ? (
        <p className="text-sm text-gray-400">Loading payments...</p>
      ) : (
        <PaymentTable payments={filteredPayments} onSelect={setSelectedPayment} />
      )}

      {selectedPayment && (
        <PaymentDetailModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
      )}
    </div>
  );
}