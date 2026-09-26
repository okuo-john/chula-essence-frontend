import { useState, useEffect } from "react";
import { availabilityApi } from "../../services/availabilityApi";
import AvailabilityForm from "../../components/admin/AvailabilityForm";
import AvailabilityTable from "../../components/admin/AvailabilityTable";
import AvailabilityDetailModal from "../../components/admin/AvailabilityDetailModal";

export default function Availability() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    loadRecords();
  }, []);

  async function loadRecords() {
    setLoading(true);
    setError(null);
    try {
      const data = await availabilityApi.getAll();
      setRecords(data);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load availability.");
    } finally {
      setLoading(false);
    }
  }

  function openAddForm() {
    setEditingRecord(null);
    setIsFormOpen(true);
  }

  function openEditForm(record) {
    setSelectedRecord(null);
    setEditingRecord(record);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingRecord(null);
  }

  async function handleSubmit(payload) {
    setIsSaving(true);
    setError(null);
    try {
      if (editingRecord) {
        const updated = await availabilityApi.update(editingRecord._id, payload);
        setRecords((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));
      } else {
        const created = await availabilityApi.create(payload);
        setRecords((prev) => [...prev, created]);
      }
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't save availability.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this availability record?")) return;
    setError(null);
    setActionLoading("delete");
    try {
      await availabilityApi.remove(id);
      setRecords((prev) => prev.filter((r) => r._id !== id));
      setSelectedRecord(null);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't delete availability.");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Availability</h1>
        {!isFormOpen && (
          <button
            type="button"
            onClick={openAddForm}
            className="px-5 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 transition"
          >
            + Add Availability
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      {isFormOpen && (
        <AvailabilityForm
          initialValue={editingRecord}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          isSaving={isSaving}
        />
      )}

      {loading ? (
        <p className="text-sm text-gray-400">Loading availability...</p>
      ) : (
        <AvailabilityTable records={records} onSelect={setSelectedRecord} />
      )}

      {selectedRecord && (
        <AvailabilityDetailModal
          record={selectedRecord}
          onEdit={openEditForm}
          onDelete={handleDelete}
          onClose={() => setSelectedRecord(null)}
          actionLoading={actionLoading}
        />
      )}
    </div>
  );
}