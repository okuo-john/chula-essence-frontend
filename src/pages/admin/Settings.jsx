import { useState, useEffect } from "react";
import { businessSettingsApi } from "../../services/businessSettingsApi";
import LocationForm from "../../components/admin/LocationForm";
import { SkeletonBlock } from "../../components/common/SkeletonLoader";

export default function Location() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setLoading(true);
    setError(null);
    try {
      const data = await businessSettingsApi.get();
      setSettings(data);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load business settings.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(payload) {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const updated = await businessSettingsApi.updateLocation(payload);
      setSettings(updated);
      setSuccessMessage("Shop location updated.");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't update location.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Location</h1>
      <p className="text-sm text-gray-500 mb-6">
        This is the address customers see when they choose Shop Service.
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-100 text-green-600 text-sm px-4 py-3">
          {successMessage}
        </div>
      )}

      {loading ? (
        <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-11 w-full" />
          <SkeletonBlock className="h-11 w-full" />
          <SkeletonBlock className="h-11 w-36 rounded-full" />
        </div>
      ) : (
        <LocationForm
          initialValue={settings?.shopLocation}
          onSubmit={handleSubmit}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}