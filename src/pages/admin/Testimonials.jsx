import { useState, useEffect } from "react";
import { testimonialApi } from "../../services/testimonialApi";
import TestimonialTable from "../../components/admin/TestimonialTable";
import { LoadingTableSkeleton } from "../../components/common/SkeletonLoader";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await testimonialApi.getAll();
        setTestimonials(data);
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't load testimonials.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
    }
  }

  async function handleDelete(id) {
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
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Testimonials</h1>
      <p className="text-sm text-gray-500 mb-6">
        Review submissions and approve or reject them before they appear publicly.
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingTableSkeleton rows={5} columns={4} />
      ) : (
        <TestimonialTable
          testimonials={testimonials}
          onApprove={(testimonial) => handleModeration("approve", testimonial)}
          onReject={(testimonial) => handleModeration("reject", testimonial)}
          onDelete={handleDelete}
          busyId={busyId}
        />
      )}
    </div>
  );
}