import { useState, useEffect } from "react";
import { testimonialApi } from "../../services/testimonialApi";
import TestimonialTable from "../../components/admin/TestimonialTable";
import { LoadingTableSkeleton } from "../../components/common/SkeletonLoader";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Testimonials</h1>
      <p className="text-sm text-gray-500 mb-6">
        All testimonials appear here as soon as they're submitted — there's no
        approval step yet.
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingTableSkeleton rows={5} columns={4} />
      ) : (
        <TestimonialTable testimonials={testimonials} />
      )}
    </div>
  );
}