import { useState } from "react";

const EMPTY_FORM = {
  name: "",
  description: "",
  shopPrice: "",
  homePrice: "",
  duration: "",
  category: "",
};

function toFormValue(service) {
  if (!service) return EMPTY_FORM;
  return {
    ...EMPTY_FORM,
    ...service,
    shopPrice: service.shopPrice ?? "",
    homePrice: service.homePrice ?? "",
  };
}

export default function ServiceForm({ initialValue, onSubmit, onCancel, isSaving }) {
  const [form, setForm] = useState(() => toFormValue(initialValue));

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      shopPrice: Number(form.shopPrice),
      homePrice: Number(form.homePrice),
      duration: Number(form.duration),
    });
  }

  const isValid =
    form.name.trim() &&
    form.description.trim() &&
    form.shopPrice !== "" &&
    form.homePrice !== "" &&
    form.duration !== "" &&
    form.category.trim();

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Nails"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Category</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            placeholder="e.g. Nails"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Shop Price (₦)</label>
          <input
            type="number"
            min="0"
            value={form.shopPrice}
            onChange={(e) => handleChange("shopPrice", e.target.value)}
            placeholder="10000"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Home Price (₦)</label>
          <input
            type="number"
            min="0"
            value={form.homePrice}
            onChange={(e) => handleChange("homePrice", e.target.value)}
            placeholder="12000"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Duration (minutes)</label>
          <input
            type="number"
            value={form.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            placeholder="60"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={!isValid || isSaving}
          className="px-5 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : initialValue ? "Update Service" : "Add Service"}
        </button>
        {initialValue && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}