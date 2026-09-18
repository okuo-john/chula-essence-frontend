import { useState, useEffect } from "react";
import { serviceApi } from "../../services/serviceApi";
import ServiceForm from "../../components/admin/ServiceForm";
import ServiceTable from "../../components/admin/ServiceTable";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceApi.getAll();
      setServices(data);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load services.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(payload) {
    setIsSaving(true);
    setError(null);
    try {
      if (editingService) {
        await serviceApi.update(editingService._id, payload);
      } else {
        await serviceApi.create(payload);
      }
      setEditingService(null);
      await loadServices();
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't save service.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeactivate(id) {
    if (!window.confirm("Deactivate this service?")) return;
    setError(null);
    try {
      await serviceApi.deactivate(id);
      await loadServices();
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't deactivate service.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Services</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <ServiceForm
        initialValue={editingService}
        onSubmit={handleSubmit}
        onCancel={() => setEditingService(null)}
        isSaving={isSaving}
      />

      {loading ? (
        <p className="text-sm text-gray-400">Loading services...</p>
      ) : (
        <ServiceTable
          services={services}
          onEdit={setEditingService}
          onDeactivate={handleDeactivate}
        />
      )}
    </div>
  );
}