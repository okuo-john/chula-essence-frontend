import { useState, useEffect } from "react";
import { adminBookingApi } from "../../services/adminBookingApi";
import BookingTable from "../../components/admin/BookingTable";
import RescheduleBookingModal from "../../components/admin/RescheduleBookingModal";
import CancelBookingModal from "../../components/admin/CancelBookingModal";
import { LoadingTableSkeleton } from "../../components/common/SkeletonLoader";
import { toast } from "react-toastify";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [reschedulingBooking, setReschedulingBooking] = useState(null);
  const [cancellingBooking, setCancellingBooking] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    setLoading(true);
    setError(null);
    try {
      const data = await adminBookingApi.getAll();
      setBookings(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't load bookings.");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm(booking) {
    setActionError(null);
    try {
      const updated = await adminBookingApi.confirm(booking._id);
      setBookings((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't confirm booking.");
    }
  }

  async function handleComplete(booking) {
    setActionError(null);
    try {
      const updated = await adminBookingApi.complete(booking._id);
      setBookings((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't complete booking.");
    }
  }

  async function handleRescheduleSubmit(payload) {
    setIsSaving(true);
    setActionError(null);
    try {
      const updated = await adminBookingApi.reschedule(reschedulingBooking._id, payload);
      setBookings((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
      setReschedulingBooking(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't reschedule booking.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleCancelSubmit(payload) {
    setIsSaving(true);
    setActionError(null);
    try {
      const updated = await adminBookingApi.cancel(cancellingBooking._id, payload);
      setBookings((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
      setCancellingBooking(null);
    } catch (err) {
      setActionError(err.response?.data?.message || "Couldn't cancel booking.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Bookings</h1>

      {(error || actionError) && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error || actionError}
        </div>
      )}

      {loading ? (
        <LoadingTableSkeleton rows={5} columns={5} />
      ) : (
        <BookingTable
          bookings={bookings}
          onConfirm={handleConfirm}
          onReschedule={setReschedulingBooking}
          onCancel={setCancellingBooking}
          onComplete={handleComplete}
        />
      )}

      {reschedulingBooking && (
        <RescheduleBookingModal
          booking={reschedulingBooking}
          onConfirm={handleRescheduleSubmit}
          onClose={() => setReschedulingBooking(null)}
          isSaving={isSaving}
        />
      )}

      {cancellingBooking && (
        <CancelBookingModal
          booking={cancellingBooking}
          onConfirm={handleCancelSubmit}
          onClose={() => setCancellingBooking(null)}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}