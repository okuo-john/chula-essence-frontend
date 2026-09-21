import { useState, useEffect } from "react";
import { bookingApi } from "../../services/bookingApi";
import ServiceCard from "./ServiceCard";
import { SkeletonBlock } from "../common/SkeletonLoader";

export default function ServiceSelector({ selected, onToggle, onContinue }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadServices() {
      setLoading(true);
      setError(null);
      try {
        const data = await bookingApi.getServices();
        if (!cancelled) setServices(data);
      } catch (err) {
        if (!cancelled) setError("Couldn't load services. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadServices();
    return () => { cancelled = true; };
  }, []);

  const count = selected.size;

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h1 className="text-xl font-semibold text-gray-900 leading-snug">
        Book Your Beauty Experience
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Select all the services you need
      </p>

      {loading && (
        <div className="mt-5 space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
              <SkeletonBlock className="h-5 w-5 rounded" />
              <div className="flex-1 space-y-2">
                <SkeletonBlock className="h-4 w-2/3" />
                <SkeletonBlock className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-5 text-sm text-red-500">{error}</p>
      )}

      {!loading && !error && (
        <ul className="mt-5 divide-y divide-gray-100">
          {services.map((service) => (
            <li key={service._id}>
              <ServiceCard
                service={service}
                isChecked={selected.has(service._id)}
                onToggle={onToggle}
              />
            </li>
          ))}
        </ul>
      )}

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