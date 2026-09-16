export default function BookingStepper({ number, title }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-xs font-semibold tracking-wide text-gray-400">
        {number}. {title}
      </span>
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 text-gray-300"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </div>
  );
}