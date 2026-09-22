import { useState, useMemo } from "react";
import { Country, State, City } from "country-state-city";

const EMPTY_FORM = {
  fullname: "",
  phoneNumber: "",
  address: "",
  countryCode: "",
  stateCode: "",
  city: "",
  landmark: "",
  additionalInfo: "",
};

export default function DeliveryForm({ onSubmit, isSubmitting }) {
  const [form, setForm] = useState(EMPTY_FORM);

  const countries = useMemo(() => Country.getAllCountries(), []);

  const states = useMemo(
    () => (form.countryCode ? State.getStatesOfCountry(form.countryCode) : []),
    [form.countryCode]
  );

  const cities = useMemo(
    () =>
      form.countryCode && form.stateCode
        ? City.getCitiesOfState(form.countryCode, form.stateCode)
        : [],
    [form.countryCode, form.stateCode]
  );

  function handleChange(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      // Reset dependent fields when a parent selection changes
      if (field === "countryCode") {
        next.stateCode = "";
        next.city = "";
      }
      if (field === "stateCode") {
        next.city = "";
      }
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const country = countries.find((c) => c.isoCode === form.countryCode);
    const stateObj = states.find((s) => s.isoCode === form.stateCode);

    onSubmit({
      fullname: form.fullname,
      phoneNumber: form.phoneNumber,
      address: form.address,
      city: form.city,
      state: stateObj?.name || "",
      landmark: form.landmark || undefined,
      additionalInfo: form.additionalInfo || undefined,
      country: country?.name || undefined, // included for reference; backend may or may not store this yet
    });
  }

  const isValid =
    form.fullname.trim() &&
    form.phoneNumber.trim() &&
    form.address.trim() &&
    form.countryCode &&
    form.stateCode &&
    form.city;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Delivery Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Full Name</label>
          <input
            type="text"
            value={form.fullname}
            required
            onChange={(e) => handleChange("fullname", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Phone Number</label>
          <input
            type="text"
            value={form.phoneNumber}
            required
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Address</label>
          <input
            type="text"
            value={form.address}
            required
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Country</label>
          <select
            value={form.countryCode}
            onChange={(e) => handleChange("countryCode", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">State</label>
          <select
            value={form.stateCode}
            onChange={(e) => handleChange("stateCode", e.target.value)}
            disabled={!form.countryCode}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">Select state</option>
            {states.map((s) => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">City</label>
          <select
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            disabled={!form.stateCode}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">Select city</option>
            {cities.map((c) => (
              <option key={`${c.name}-${c.latitude}`} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Landmark (optional)</label>
          <input
            type="text"
            value={form.landmark}
            onChange={(e) => handleChange("landmark", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Additional Info (optional)</label>
          <textarea
            value={form.additionalInfo}
            onChange={(e) => handleChange("additionalInfo", e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="mt-5 w-full rounded-full bg-pink-500 text-white text-sm font-semibold py-3.5 hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Processing..." : "Proceed to Payment"}
      </button>
    </form>
  );
}