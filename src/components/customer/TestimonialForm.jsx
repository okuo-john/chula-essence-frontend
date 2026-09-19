import { useState } from "react";

const StarIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.2}
    className={`h-6 w-6 ${filled ? "text-gold" : "text-gray-300"}`}
  >
    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.8L10 14.9l-5.2 2.62.99-5.8-4.21-4.1 5.82-.85z" />
  </svg>
);

export default function TestimonialForm({ onSubmit, isSaving, submitError, submitSuccess }) {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);

  const isValid = name.trim() && feedback.trim();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name: name.trim(), feedback: feedback.trim(), rating });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-heading text-xl text-chula-black">Share Your Experience</h3>

      <div className="mt-4 space-y-4">
        <div>
          <label className="block font-body text-sm font-medium text-chula-black mb-1.5">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary-pink/30 focus:border-primary-pink"
          />
        </div>

        <div>
          <label className="block font-body text-sm font-medium text-chula-black mb-1.5">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} aria-label={`${star} star${star === 1 ? "" : "s"}`}>
                <StarIcon filled={star <= rating} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-body text-sm font-medium text-chula-black mb-1.5">Your Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            placeholder="Tell us about your experience..."
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 font-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-pink/30 focus:border-primary-pink"
          />
        </div>
      </div>

      {submitError && <p className="mt-3 font-body text-sm text-red-500">{submitError}</p>}
      {submitSuccess && <p className="mt-3 font-body text-sm text-green-600">Thank you for your feedback!</p>}

      <button
        type="submit"
        disabled={!isValid || isSaving}
        className="mt-5 w-full rounded-full bg-primary-pink text-white font-body text-sm font-semibold py-3 hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isSaving ? "Submitting..." : "Submit Testimonial"}
      </button>
    </form>
  );
}