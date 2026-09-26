import { useEffect, useState } from "react";
import { businessSettingsApi } from "../../services/businessSettingsApi";
import LocationMap from "./LocationMap";

export default function ShopServiceLocation({ onConfirm, onBack }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    businessSettingsApi
      .get()
      .then((settings) => {
        if (active) setLocation(settings?.shopLocation ?? null);
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.message || "Couldn't load the shop location.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h1 className="text-xl font-semibold text-gray-900 leading-snug">
        Your Service Location
      </h1>

      {loading ? (
        <p className="mt-4 text-sm text-gray-500">Loading shop location...</p>
      ) : error ? (
        <p className="mt-4 text-sm text-red-500">{error}</p>
      ) : location ? (
        <>
          <p className="mt-4 text-sm font-semibold text-gray-900">{location.name || "Chula Essence"}</p>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            {location.address}<br />
            {[location.city, location.state].filter(Boolean).join(", ")}
          </p>
          {location.landmark && <p className="mt-2 text-sm text-gray-600">Landmark: {location.landmark}</p>}
        </>
      ) : (
        <p className="mt-4 text-sm text-gray-500">Shop location is not available.</p>
      )}

      {!loading && !error && location && <div className="mt-4"><LocationMap location={location} /></div>}

      <p className="mt-5 text-sm font-medium text-gray-900">
        Is this the location you would like to visit?
      </p>

      <button
        type="button"
        onClick={onConfirm}
        disabled={loading || !location || !!error}
        className="mt-3 w-full py-3.5 rounded-full bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 active:scale-[0.99] transition"
      >
        Confirm Location
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