import { useState, useEffect } from "react";
import { adminBookingApi } from "../../services/adminBookingApi";
import BookingTable from "../../components/admin/BookingTable";
import RescheduleBookingModal from "../../components/admin/RescheduleBookingModal";
import CancelBookingModal from "../../components/admin/CancelBookingModal";
import { LoadingTableSkeleton } from "../../components/common/SkeletonLoader";
import { toast } from "react-toastify";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [statesLoading, setStatesLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [reschedulingBooking, setReschedulingBooking] = useState(null);
  const [cancellingBooking, setCancellingBooking] = useState(null);

  useEffect(() => {
    let active = true;

    adminBookingApi
      .getAll(selectedState)
      .then((data) => {
        if (active) setBookings(data);
      })
      .catch((err) => {
        if (active) {
          const message = err.response?.data?.message || "Couldn't load bookings.";
          setError(message);
          toast.error(message);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedState]);

  useEffect(() => {
    let active = true;
    adminBookingApi
      .getStates()
      .then((data) => {
        if (active) {
          const stateNames = data
            .map((state) => (typeof state === "string" ? state : state.name ?? state.state))
            .filter(Boolean);
          setStates([...new Set(stateNames)].sort((a, b) => a.localeCompare(b)));
        }
      })
      .catch((err) => {
        if (active) toast.error(err.response?.data?.message || "Couldn't load booking states.");
      })
      .finally(() => {
        if (active) setStatesLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

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

  function handleStateChange(event) {
    setLoading(true);
    setError(null);
    setSelectedState(event.target.value);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Bookings</h1>

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="booking-state-filter" className="text-sm font-medium text-gray-700">
          State
        </label>
        <select
          id="booking-state-filter"
          value={selectedState}
          onChange={handleStateChange}
          disabled={statesLoading}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 disabled:cursor-wait disabled:opacity-60 sm:w-56"
        >
          <option value="">All States</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

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