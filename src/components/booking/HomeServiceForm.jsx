import { ADDRESS_FIELDS } from "./data";

export default function HomeServiceForm({ form, onChange, onContinue, onBack }) {
  const isValid = form.address.trim() && form.city.trim() && form.state.trim();

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h1 className="text-xl font-semibold text-gray-900 leading-snug">
        Where should we come to you?
      </h1>

      <div className="mt-5 space-y-4">
        {ADDRESS_FIELDS.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-900 mb-1.5">
              {field.label}
            </label>
            <input
              id={field.id}
              type="text"
              value={form[field.id]}
              onChange={(e) => onChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
            />
          </div>
        ))}

        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-900 mb-1.5">
            Additional Instructions
          </label>
          <input
            id="instructions"
            type="text"
            value={form.instructions}
            onChange={(e) => onChange("instructions", e.target.value)}
            placeholder="E.g. Gate number, building, etc."
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>
      </div>

      <button
        type="button"
        disabled={!isValid}
        onClick={onContinue}
        className="mt-6 w-full py-3.5 rounded-full bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 active:scale-[0.99] transition disabled:opacity-40 disabled:cursor-not-allowed"
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