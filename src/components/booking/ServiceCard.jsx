import { formatNaira } from "./utils";

export default function ServiceCard({ service, isChecked, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(service._id)}
      aria-pressed={isChecked}
      className="w-full flex items-center gap-3 py-3.5 text-left"
    >
      <span
        className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
          isChecked ? "bg-pink-500" : "border-2 border-gray-300 bg-white"
        }`}
      >
        {isChecked && (
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>

      <span className="flex-1 min-w-0">
        <span className="block text-sm font-medium text-gray-900">{service.name}</span>
        <span className="block text-xs text-gray-400">{service.duration} min</span>
      </span>

      <span className="text-sm text-gray-500 whitespace-nowrap">
        {formatNaira(service.price)}
      </span>
    </button>
  );
}