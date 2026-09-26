import { useState, useEffect, useMemo } from "react";
import { adminTestimonialApi } from "../../services/adminTestimonialApi";
import TestimonialFilters from "../../components/admin/TestimonialFilters";
import TestimonialTable from "../../components/admin/TestimonialTable";
import TestimonialDetailModal from "../../components/admin/TestimonialDetailModal";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
<<<<<<< HEAD
  const [busyId, setBusyId] = useState(null);
=======
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
>>>>>>> 7c62db32640a1bb132cce66708a9410c91a5dd02

  useEffect(() => {
    loadTestimonials();
  }, []);

<<<<<<< HEAD
  async function handleModeration(action, testimonial) {
    setError(null);
    setBusyId(testimonial._id);
    try {
      const updated = await testimonialApi[action](testimonial._id);
      setTestimonials((current) => current.map((item) => (
        item._id === testimonial._id
          ? { ...item, ...updated, status: updated.status ?? (action === "approve" ? "Approved" : "Rejected") }
          : item
      )));
    } catch (err) {
      setError(err.response?.data?.message || `Couldn't ${action} testimonial.`);
    } finally {
      setBusyId(null);
=======
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
    try {
      const updated = await adminTestimonialApi.approve(id);
      setTestimonials((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setSelectedTestimonial(updated);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't approve testimonial.");
    }
  }

  async function handleReject(id) {
    setError(null);
    try {
      const updated = await adminTestimonialApi.reject(id);
      setTestimonials((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setSelectedTestimonial(updated);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't reject testimonial.");
>>>>>>> 7c62db32640a1bb132cce66708a9410c91a5dd02
    }
  }

  async function handleDelete(id) {
<<<<<<< HEAD
    if (!window.confirm("Delete this testimonial? This cannot be undone.")) return;
    setError(null);
    setBusyId(id);
    try {
      await testimonialApi.remove(id);
      setTestimonials((current) => current.filter((testimonial) => testimonial._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't delete testimonial.");
    } finally {
      setBusyId(null);
=======
    if (!window.confirm("Delete this testimonial permanently?")) return;
    setError(null);
    try {
      await adminTestimonialApi.remove(id);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      setSelectedTestimonial(null);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't delete testimonial.");
>>>>>>> 7c62db32640a1bb132cce66708a9410c91a5dd02
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Testimonials</h1>
      <p className="text-sm text-gray-500 mb-6">
<<<<<<< HEAD
        Review submissions and approve or reject them before they appear publicly.
=======
        Click a testimonial to review and approve, reject, or delete it.
>>>>>>> 7c62db32640a1bb132cce66708a9410c91a5dd02
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
        <p className="text-sm text-gray-400">Loading testimonials...</p>
      ) : (
<<<<<<< HEAD
        <TestimonialTable
          testimonials={testimonials}
          onApprove={(testimonial) => handleModeration("approve", testimonial)}
          onReject={(testimonial) => handleModeration("reject", testimonial)}
          onDelete={handleDelete}
          busyId={busyId}
=======
        <TestimonialTable testimonials={filteredTestimonials} onSelect={setSelectedTestimonial} />
      )}

      {selectedTestimonial && (
        <TestimonialDetailModal
          testimonial={selectedTestimonial}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
          onClose={() => setSelectedTestimonial(null)}
>>>>>>> 7c62db32640a1bb132cce66708a9410c91a5dd02
        />
      )}
    </div>
  );
}