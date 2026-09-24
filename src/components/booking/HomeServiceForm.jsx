import { useMemo } from "react";
import { City, Country, State } from "country-state-city";

export default function HomeServiceForm({ form, onChange, onContinue, onBack }) {
  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () => (form.countryCode ? State.getStatesOfCountry(form.countryCode) : []),
    [form.countryCode]
  );
  const cities = useMemo(
    () => (form.countryCode && form.stateCode
      ? City.getCitiesOfState(form.countryCode, form.stateCode)
      : []),
    [form.countryCode, form.stateCode]
  );

  const isValid = form.address.trim() && form.countryCode && form.stateCode && form.city.trim();

  function handleLocationChange(field, value) {
    if (field === "countryCode") {
      onChange("countryCode", value);
      onChange("stateCode", "");
      onChange("state", "");
      onChange("city", "");
      return;
    }

    const selectedState = states.find((state) => state.isoCode === value);
    onChange("stateCode", value);
    onChange("state", selectedState?.name || "");
    onChange("city", "");
  }

  function handleCityChange(value) {
    onChange("city", value);
  }

  const inputClassName = "w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300";
  const selectClassName = "w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 disabled:bg-gray-50 disabled:text-gray-400";

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h1 className="text-xl font-semibold text-gray-900 leading-snug">
        Where should we come to you?
      </h1>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-gray-900">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={form.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Enter your address"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="countryCode" className="mb-1.5 block text-sm font-medium text-gray-900">
            Country
          </label>
          <select
            id="countryCode"
            value={form.countryCode}
            onChange={(e) => handleLocationChange("countryCode", e.target.value)}
            className={selectClassName}
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="stateCode" className="mb-1.5 block text-sm font-medium text-gray-900">
            State
          </label>
          <select
            id="stateCode"
            value={form.stateCode}
            onChange={(e) => handleLocationChange("stateCode", e.target.value)}
            disabled={!form.countryCode}
            className={selectClassName}
          >
            <option value="">Select state</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-gray-900">
            City
          </label>
          <select
            id="city"
            value={form.city}
            onChange={(e) => handleCityChange(e.target.value)}
            disabled={!form.stateCode}
            className={selectClassName}
          >
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={`${city.name}-${city.latitude}`} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="landmark" className="mb-1.5 block text-sm font-medium text-gray-900">
            Landmark
          </label>
          <input
            id="landmark"
            type="text"
            value={form.landmark}
            onChange={(e) => onChange("landmark", e.target.value)}
            placeholder="Enter landmark"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-900 mb-1.5">
            Additional Instructions
          </label>
          <input
            id="instructions"
            type="text"
            value={form.instructions}
            onChange={(e) => onChange("instructions", e.target.value)}
            placeholder="E.g. Gate number, building, etc."
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>
      </div>

      <button
        type="button"
        disabled={!isValid}
        onClick={onContinue}
        className="mt-6 w-full py-3.5 rounded-full bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 active:scale-[0.99] transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-3 hidden w-full py-3.5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50 active:scale-[0.99] transition sm:block"
      >
        Back
      </button>
    </div>
  );
}