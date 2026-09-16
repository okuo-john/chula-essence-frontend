export default function LocationMap() {
  return (
    <>
      <div className="h-36 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      </div>

      <button
        type="button"
        className="mt-3 w-full py-3 rounded-full border border-gray-200 bg-white text-sm font-semibold text-amber-600 hover:bg-gray-50 active:scale-[0.99] transition"
      >
        View on Map
      </button>
    </>
  );
}