import { useState } from "react";

export default function RescheduleBookingModal({ booking, onConfirm, onClose, isSaving }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  const isValid = date && time;

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm({
      appointmentDate: new Date(date).toISOString(),
      startTime: time,
      adminNotes: adminNotes || undefined,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-sm bg-white rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900">Reschedule Booking</h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">New Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">New Start Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">Admin Notes (optional)</label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={!isValid || isSaving}
              className="flex-1 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 transition disabled:opacity-40"
            >
              {isSaving ? "Saving..." : "Reschedule"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}