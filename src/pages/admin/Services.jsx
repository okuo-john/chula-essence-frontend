import { useState, useEffect } from "react";
import { serviceApi } from "../../services/serviceApi";
import ServiceForm from "../../components/admin/ServiceForm";
import ServiceTable from "../../components/admin/ServiceTable";
import ServiceDetailModal from "../../components/admin/ServiceDetailModal";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

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

  function openAddForm() {
    setEditingService(null);
    setIsFormOpen(true);
  }

  function openEditForm(service) {
    setSelectedService(null);
    setEditingService(service);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingService(null);
  }

  async function handleSubmit(payload) {
    setIsSaving(true);
    setError(null);
    try {
      if (editingService) {
        const updated = await serviceApi.update(editingService._id, payload);
        setServices((prev) => prev.map((s) => (s._id === updated._id ? updated : s)));
      } else {
        const created = await serviceApi.create(payload);
        setServices((prev) => [...prev, created]);
      }
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't save service.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeactivate(id) {
    if (!window.confirm("Deactivate this service?")) return;
    setError(null);
    setActionLoading("deactivate");
    try {
      const updated = await serviceApi.deactivate(id);
      setServices((prev) => prev.map((s) => (s._id === updated._id ? updated : s)));
      setSelectedService(updated);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't deactivate service.");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleActivate(id) {
  setError(null);
  setActionLoading("activate");
  try {
    const updated = await serviceApi.activate(id);
    setServices((prev) => prev.map((s) => (s._id === updated._id ? updated : s)));
    setSelectedService(updated);
  } catch (err) {
    setError(err.response?.data?.message || "Couldn't activate service.");
  } finally {
    setActionLoading(null);
  }
}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
        {!isFormOpen && (
          <button
            type="button"
            onClick={openAddForm}
            className="px-5 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 transition"
          >
            + Add Service
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      {isFormOpen && (
        <ServiceForm
          initialValue={editingService}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          isSaving={isSaving}
        />
      )}

      {loading ? (
        <p className="text-sm text-gray-400">Loading services...</p>
      ) : (
        <ServiceTable services={services} onSelect={setSelectedService} />
      )}

      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onEdit={openEditForm}
          onDeactivate={handleDeactivate}
          onClose={() => setSelectedService(null)}
          onActivate={handleActivate}
          actionLoading={actionLoading}
        />
      )}
    </div>
  );
}