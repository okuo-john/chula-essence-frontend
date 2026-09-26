import { useState, useEffect, useMemo } from "react";
import { adminBookingApi } from "../../services/adminBookingApi";
import BookingFilters from "../../components/admin/BookingFilters";
import BookingTable from "../../components/admin/BookingTable";
import BookingDetailModal from "../../components/admin/BookingDetailModal";
import RescheduleBookingModal from "../../components/admin/RescheduleBookingModal";
import CancelBookingModal from "../../components/admin/CancelBookingModal";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [statesLoading, setStatesLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reschedulingBooking, setReschedulingBooking] = useState(null);
  const [cancellingBooking, setCancellingBooking] = useState(null);

  useEffect(() => {
    let active = true;

<<<<<<< HEAD
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
=======
  async function loadBookings() {
    setLoading(true);
    setError(null);
    try {
      const data = await adminBookingApi.getAll();
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load bookings.");
    } finally {
      setLoading(false);
    }
  }
>>>>>>> 7c62db32640a1bb132cce66708a9410c91a5dd02

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
      if (!matchesStatus) return false;

      if (!search.trim()) return true;

      const query = search.trim().toLowerCase();
      const customerName = booking.customer?.fullname?.toLowerCase() || "";
      const customerEmail = booking.customer?.email?.toLowerCase() || "";
      const serviceNames = Array.isArray(booking.services)
        ? booking.services.map((s) => (typeof s === "string" ? s : s.name)).join(" ").toLowerCase()
        : "";

      return (
        customerName.includes(query) ||
        customerEmail.includes(query) ||
        serviceNames.includes(query)
      );
    });
  }, [bookings, search, statusFilter]);

  async function handleConfirm(booking) {
    setActionError(null);
    setActionLoading("confirm");
    try {
      const updated = await adminBookingApi.confirm(booking._id);
      setBookings((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
      setSelectedBooking(updated);
    } catch (err) {
      setActionError(err.response?.data?.message || "Couldn't confirm booking.");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleComplete(booking) {
    setActionError(null);
    setActionLoading("complete");
    try {
      const updated = await adminBookingApi.complete(booking._id);
      setBookings((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
      setSelectedBooking(updated);
    } catch (err) {
      setActionError(err.response?.data?.message || "Couldn't complete booking.");
    } finally {
      setActionLoading(null);
    }
  }

  function openReschedule(booking) {
    setSelectedBooking(null);
    setReschedulingBooking(booking);
  }

  function openCancel(booking) {
    setSelectedBooking(null);
    setCancellingBooking(booking);
  }

  async function handleRescheduleSubmit(payload) {
    setIsSaving(true);
    setActionError(null);
    try {
      const updated = await adminBookingApi.reschedule(reschedulingBooking._id, payload);
      setBookings((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
      setReschedulingBooking(null);
    } catch (err) {
      setActionError(err.response?.data?.message || "Couldn't reschedule booking.");
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

      <BookingFilters
        search={search}
        onSearchChange={setSearch}
        status={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {loading ? (
        <p className="text-sm text-gray-400">Loading bookings...</p>
      ) : (
        <BookingTable bookings={filteredBookings} onSelect={setSelectedBooking} />
      )}

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onConfirm={handleConfirm}
          onReschedule={openReschedule}
          onCancel={openCancel}
          onComplete={handleComplete}
          onClose={() => setSelectedBooking(null)}
          actionLoading={actionLoading}
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