const StarIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.2}
    className={`h-4 w-4 ${filled ? "text-gold" : "text-gray-300"}`}
  >
    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.8L10 14.9l-5.2 2.62.99-5.8-4.21-4.1 5.82-.85z" />
  </svg>
);

export default function TestimonialCard({ testimonial }) {
  const rating = testimonial.rating || 5;

  return (
    <div className="bg-soft-pink rounded-2xl p-6">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < rating} />
        ))}
      </div>
      <p className="font-body text-sm text-gray-700 italic">"{testimonial.feedback}"</p>
      <p className="mt-4 font-body font-semibold text-chula-black">— {testimonial.name}</p>
    </div>
  );
}