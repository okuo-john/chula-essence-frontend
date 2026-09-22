import { useState } from "react";

export default function CancelBookingModal({ booking, onConfirm, onClose, isSaving }) {
  const [cancellationReason, setCancellationReason] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm({
      cancellationReason: cancellationReason || undefined,
      adminNotes: adminNotes || undefined,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-sm bg-white rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900">Cancel Booking</h2>
        <p className="mt-1 text-sm text-gray-500">This action cannot be undone.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Cancellation Reason (optional)
            </label>
            <textarea
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">Admin Notes (optional)</label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition disabled:opacity-40"
            >
              {isSaving ? "Cancelling..." : "Confirm Cancel"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}