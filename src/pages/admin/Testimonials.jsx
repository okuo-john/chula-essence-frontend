import { useState, useEffect, useMemo } from "react";
import { adminTestimonialApi } from "../../services/adminTestimonialApi";
import TestimonialFilters from "../../components/admin/TestimonialFilters";
import TestimonialTable from "../../components/admin/TestimonialTable";
import TestimonialDetailModal from "../../components/admin/TestimonialDetailModal";
import { LoadingTableSkeleton } from "../../components/common/SkeletonLoader";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    setLoading(true);
    setError(null);
    try {
      const data = await adminTestimonialApi.getAll();
      setTestimonials(data);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load testimonials.");
    } finally {
      setLoading(false);
    }
  }

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((t) => {
      const matchesStatus = statusFilter === "All" || t.status === statusFilter;
      if (!matchesStatus) return false;

      if (!search.trim()) return true;

      const query = search.trim().toLowerCase();
      const name = t.name?.toLowerCase() || "";
      const feedback = t.feedback?.toLowerCase() || "";

      return name.includes(query) || feedback.includes(query);
    });
  }, [testimonials, search, statusFilter]);

  async function handleApprove(id) {
    setError(null);
    setActionLoading("approve");
    try {
      const updated = await adminTestimonialApi.approve(id);
      setTestimonials((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setSelectedTestimonial(updated);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't approve testimonial.");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleReject(id) {
    setError(null);
    setActionLoading("reject");
    try {
      const updated = await adminTestimonialApi.reject(id);
      setTestimonials((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setSelectedTestimonial(updated);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't reject testimonial.");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this testimonial permanently?")) return;
    setError(null);
    setActionLoading("delete");
    try {
      await adminTestimonialApi.remove(id);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      setSelectedTestimonial(null);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't delete testimonial.");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Testimonials</h1>
      <p className="text-sm text-gray-500 mb-6">
        Click a testimonial to review and approve, reject, or delete it.
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <TestimonialFilters
        search={search}
        onSearchChange={setSearch}
        status={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {loading ? (
        <LoadingTableSkeleton rows={5} columns={4} />
      ) : (
        <TestimonialTable testimonials={filteredTestimonials} onSelect={setSelectedTestimonial} />
      )}

      {selectedTestimonial && (
        <TestimonialDetailModal
          testimonial={selectedTestimonial}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
          onClose={() => setSelectedTestimonial(null)}
          actionLoading={actionLoading}
        />
      )}
    </div>
  );
}