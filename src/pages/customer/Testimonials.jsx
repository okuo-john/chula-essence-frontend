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
    <>
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl lg:text-4xl text-chula-black">What Our Clients Say</h2>
        <p className="mt-3 font-body text-gray-600">
          Real experiences from real clients — or share your own below.
        </p>
      </div>

      {loading && <p className="text-center font-body text-sm text-gray-400">Loading testimonials...</p>}
      {error && <p className="text-center font-body text-sm text-red-500">{error}</p>}

      {!loading && !error && testimonials.length === 0 && (
        <p className="text-center font-body text-sm text-gray-400">Be the first to leave a testimonial!</p>
      )}

      {!loading && !error && testimonials.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <TestimonialCard key={t._id} testimonial={t} />
          ))}
        </div>
      )}

      <div className="max-w-xl mx-auto">
        <TestimonialForm
          onSubmit={handleSubmit}
          isSaving={isSaving}
          submitError={submitError}
          submitSuccess={submitSuccess}
        />
      </div>
    </>
  );
}