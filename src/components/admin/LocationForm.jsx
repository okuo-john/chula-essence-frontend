import { useState, useEffect } from "react";

const EMPTY_FORM = { address: "", city: "", state: "", landmark: "", latitude: "", longitude: "" };

export default function LocationForm({ initialValue, onSubmit, isSaving }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (initialValue) {
      setForm({
        address: initialValue.address ?? "",
        city: initialValue.city ?? "",
        state: initialValue.state ?? "",
        landmark: initialValue.landmark ?? "",
        latitude: initialValue.latitude ?? "",
        longitude: initialValue.longitude ?? "",
      });
    }
  }, [initialValue]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      address: form.address,
      city: form.city,
      state: form.state,
      landmark: form.landmark || undefined,
      latitude: form.latitude === "" ? undefined : Number(form.latitude),
      longitude: form.longitude === "" ? undefined : Number(form.longitude),
    });
  }

  const isValid = form.address.trim() && form.city.trim() && form.state.trim();

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="15 Example Street"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">City</label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Benin City"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">State</label>
          <input
            type="text"
            value={form.state}
            onChange={(e) => handleChange("state", e.target.value)}
            placeholder="Edo State"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Landmark (optional)</label>
          <input
            type="text"
            value={form.landmark}
            onChange={(e) => handleChange("landmark", e.target.value)}
            placeholder="Near Example Shopping Complex"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Latitude (optional)</label>
          <input
            type="number"
            step="any"
            value={form.latitude}
            onChange={(e) => handleChange("latitude", e.target.value)}
            placeholder="6.335"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Longitude (optional)</label>
          <input
            type="number"
            step="any"
            value={form.longitude}
            onChange={(e) => handleChange("longitude", e.target.value)}
            placeholder="5.617"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid || isSaving}
        className="mt-5 px-5 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isSaving ? "Saving..." : "Save Location"}
      </button>
    </form>
  );
}