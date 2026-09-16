import BookingStepper from "./BookingStepper";

export default function AdditionalDetails({ value, onChange, onContinue, onBack }) {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <BookingStepper number={6} title="ADDITIONAL DETAILS" />
      <h1 className="text-xl font-semibold text-gray-900 leading-snug">
        Any Additional Details?
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Let us know anything else we should know.
      </p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="E.g. I'd like a simple nude nail design."
        rows={6}
        className="mt-4 w-full rounded-xl border border-gray-200 p-3.5 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
      />

      <button
        type="button"
        onClick={onContinue}
        className="mt-6 w-full py-3.5 rounded-full bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 active:scale-[0.99] transition"
      >
        Continue
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-3 w-full py-3.5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50 active:scale-[0.99] transition"
      >
        Back
      </button>
    </div>
  );
}