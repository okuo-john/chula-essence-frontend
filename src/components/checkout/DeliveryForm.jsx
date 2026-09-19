import { useState } from "react";

const EMPTY_FORM = {
  fullname: "",
  phoneNumber: "",
  address: "",
  city: "",
  state: "",
  landmark: "",
  additionalInfo: "",
};

export default function DeliveryForm({ onSubmit, isSubmitting }) {
  const [form, setForm] = useState(EMPTY_FORM);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      fullname: form.fullname,
      phoneNumber: form.phoneNumber,
      address: form.address,
      city: form.city,
      state: form.state,
      landmark: form.landmark || undefined,
      additionalInfo: form.additionalInfo || undefined,
    });
  }

  const isValid =
    form.fullname.trim() &&
    form.phoneNumber.trim() &&
    form.address.trim() &&
    form.city.trim() &&
    form.state.trim();

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Delivery Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Full Name</label>
          <input
            type="text"
            value={form.fullname}
            onChange={(e) => handleChange("fullname", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Phone Number</label>
          <input
            type="text"
            value={form.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">City</label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">State</label>
          <input
            type="text"
            value={form.state}
            onChange={(e) => handleChange("state", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Landmark (optional)</label>
          <input
            type="text"
            value={form.landmark}
            onChange={(e) => handleChange("landmark", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Additional Info (optional)</label>
          <textarea
            value={form.additionalInfo}
            onChange={(e) => handleChange("additionalInfo", e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="mt-5 w-full rounded-full bg-pink-500 text-white text-sm font-semibold py-3.5 hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Checking..." : "Review Order"}
      </button>
    </form>
  );
}