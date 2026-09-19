import { useState, useEffect } from "react";
import { testimonialApi } from "../../services/testimonialApi";
import TestimonialCard from "../../components/customer/TestimonialCard";
import TestimonialForm from "../../components/customer/TestimonialForm";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
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

  async function handleSubmit(payload) {
    setIsSaving(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      const created = await testimonialApi.create(payload);
      setTestimonials((prev) => [created, ...prev]);
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Couldn't submit your testimonial.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">Testimonials</h1>
      <p className="mt-2 text-sm text-gray-500">
        See what our customers are saying, or share your own experience.
      </p>

      <div className="mt-8">
        <TestimonialForm
          onSubmit={handleSubmit}
          isSaving={isSaving}
          submitError={submitError}
          submitSuccess={submitSuccess}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-base font-semibold text-gray-900 mb-4">What People Are Saying</h2>

        {loading && <p className="text-sm text-gray-400">Loading testimonials...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && testimonials.length === 0 && (
          <p className="text-sm text-gray-400">Be the first to leave a testimonial!</p>
        )}

        {!loading && !error && testimonials.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <TestimonialCard key={t._id} testimonial={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}