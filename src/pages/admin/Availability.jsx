import { useState, useEffect } from "react";
import { availabilityApi } from "../../services/availabilityApi";
import AvailabilityForm from "../../components/admin/AvailabilityForm";
import AvailabilityTable from "../../components/admin/AvailabilityTable";
import { LoadingTableSkeleton } from "../../components/common/SkeletonLoader";

export default function Availability() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

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
      setEditingRecord(null);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't save availability.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this availability record?")) return;
    setError(null);
    try {
      await availabilityApi.remove(id);
      setRecords((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't delete availability.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Availability</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <AvailabilityForm
        initialValue={editingRecord}
        onSubmit={handleSubmit}
        onCancel={() => setEditingRecord(null)}
        isSaving={isSaving}
      />

      {loading ? (
        <LoadingTableSkeleton rows={5} columns={4} />
      ) : (
        <AvailabilityTable
          records={records}
          onEdit={setEditingRecord}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}