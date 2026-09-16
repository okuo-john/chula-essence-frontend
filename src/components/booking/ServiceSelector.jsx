import { SERVICES } from "./data";
import ServiceCard from "./ServiceCard";

export default function ServiceSelector({ selected, onToggle, onContinue }) {
  const count = selected.size;

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h1 className="text-xl font-semibold text-gray-900 leading-snug">
        Book Your Beauty Experience
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Select all the services you need
      </p>

      <ul className="mt-5 divide-y divide-gray-100">
        {SERVICES.map((service) => (
          <li key={service.id}>
            <ServiceCard
              service={service}
              isChecked={selected.has(service.id)}
              onToggle={onToggle}
            />
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-gray-500">
        {count} service{count === 1 ? "" : "s"} selected
      </p>

      <button
        type="button"
        disabled={count === 0}
        onClick={onContinue}
        className="mt-4 w-full py-3.5 rounded-full bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 active:scale-[0.99] transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}