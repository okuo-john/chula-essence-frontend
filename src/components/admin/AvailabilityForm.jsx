import { useState, useEffect } from "react";
import BlockedPeriodFields from "./BlockedPeriodFields";

const EMPTY_FORM = {
  date: "",
  startTime: "",
  endTime: "",
  isAvailable: true,
  blockedPeriods: [],
};

function toDateInputValue(isoDate) {
  if (!isoDate) return "";
  return new Date(isoDate).toISOString().slice(0, 10);
}

export default function AvailabilityForm({ initialValue, onSubmit, onCancel, isSaving }) {
  const [form, setForm] = useState(
    initialValue
      ? { ...initialValue, date: toDateInputValue(initialValue.date) }
      : EMPTY_FORM
  );

  useEffect(() => {
    setForm(
      initialValue
        ? { ...initialValue, date: toDateInputValue(initialValue.date) }
        : EMPTY_FORM
    );
  }, [initialValue]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const cleanedPeriods = form.blockedPeriods
      .filter((p) => p.startTime && p.endTime)
      .map((p) => ({
        startTime: p.startTime,
        endTime: p.endTime,
        reason: p.reason?.trim() || undefined,
      }));

    onSubmit({
      date: new Date(form.date).toISOString(),
      startTime: form.startTime,
      endTime: form.endTime,
      isAvailable: form.isAvailable,
      blockedPeriods: cleanedPeriods,
    });
  }

  const isValid = form.date && form.startTime && form.endTime;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            disabled={!!initialValue}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Start Time</label>
          <input
            type="time"
            value={form.startTime}
            onChange={(e) => handleChange("startTime", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">End Time</label>
          <input
            type="time"
            value={form.endTime}
            onChange={(e) => handleChange("endTime", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.isAvailable}
          onChange={(e) => handleChange("isAvailable", e.target.checked)}
          className="rounded border-gray-300 text-pink-500 focus:ring-pink-300"
        />
        Available for bookings on this date
      </label>

      <div className="mt-4">
        <BlockedPeriodFields
          blockedPeriods={form.blockedPeriods}
          onChange={(periods) => handleChange("blockedPeriods", periods)}
        />
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          disabled={!isValid || isSaving}
          className="px-5 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : initialValue ? "Update Availability" : "Add Availability"}
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