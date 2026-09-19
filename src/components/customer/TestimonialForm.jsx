import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h2 className="text-base font-semibold text-gray-900">Share Your Experience</h2>

      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                aria-label={`${star} star${star === 1 ? "" : "s"}`}
                className={`text-2xl leading-none ${star <= rating ? "text-amber-400" : "text-gray-200"}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Your Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            placeholder="Tell us about your experience..."
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>
      </div>

      {submitError && <p className="mt-3 text-sm text-red-500">{submitError}</p>}
      {submitSuccess && <p className="mt-3 text-sm text-green-600">Thank you for your feedback!</p>}

      <button
        type="submit"
        disabled={!isValid || isSaving}
        className="mt-4 w-full rounded-full bg-pink-500 text-white text-sm font-semibold py-3 hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isSaving ? "Submitting..." : "Submit Testimonial"}
      </button>
    </form>
  );
}