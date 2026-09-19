function StarRating({ rating }) {
  if (!rating) return null;
  return (
    <span className="text-amber-400 text-sm">
      {"★".repeat(rating)}
      <span className="text-gray-200">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <StarRating rating={testimonial.rating} />
      <p className="mt-3 text-sm text-gray-600 leading-relaxed">"{testimonial.feedback}"</p>
      <p className="mt-3 text-sm font-semibold text-gray-900">— {testimonial.name}</p>
    </div>
  );
}