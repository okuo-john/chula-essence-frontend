import { LOCATION_OPTIONS } from "./data";

const ICONS = {
  home: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M5.5 9.5V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
      <path d="M9.5 20v-5.5h5V20" />
      <path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01" />
    </svg>
  ),
  shop: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7.5" r="3" />
      <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M4.5 20h15" />
    </svg>
  ),
};

export default function ServiceTypeSelector({ selectedLocation, onSelect, onContinue, onBack }) {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h1 className="text-xl font-semibold text-gray-900 leading-snug">
        Where would you like your service?
      </h1>

      <div className="mt-5 space-y-3">
        {LOCATION_OPTIONS.map((option) => {
          const isSelected = selectedLocation === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={isSelected}
              className={`w-full flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                isSelected ? "border-pink-300 bg-pink-50" : "border-gray-200 bg-white"
              }`}
            >
              <span className="shrink-0 text-gray-900">{ICONS[option.id]}</span>
              <span>
                <span className="block text-sm font-semibold text-gray-900">
                  {option.title}
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  {option.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!selectedLocation}
        onClick={onContinue}
        className="mt-6 w-full py-3.5 rounded-full bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 active:scale-[0.99] transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-3 hidden w-full py-3.5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50 active:scale-[0.99] transition sm:block"
      >
        Back
      </button>
    </div>
  );
}