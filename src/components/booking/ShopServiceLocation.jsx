import { SHOP_LOCATION } from "./data";
import LocationMap from "./LocationMap";

export default function ShopServiceLocation({ onConfirm, onBack }) {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h1 className="text-xl font-semibold text-gray-900 leading-snug">
        Your Service Location
      </h1>

      <p className="mt-4 text-sm font-semibold text-gray-900">{SHOP_LOCATION.name}</p>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        {SHOP_LOCATION.address}
        <br />
        {SHOP_LOCATION.cityState}
      </p>
      <p className="mt-2 text-sm text-gray-600">Landmark: {SHOP_LOCATION.landmark}</p>

      <div className="mt-4">
        <LocationMap />
      </div>

      <p className="mt-5 text-sm font-medium text-gray-900">
        Is this the location you would like to visit?
      </p>

      <button
        type="button"
        onClick={onConfirm}
        className="mt-3 w-full py-3.5 rounded-full bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 active:scale-[0.99] transition"
      >
        Confirm Location
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-3 w-full py-3.5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50 active:scale-[0.99] transition"
      >
        Back
      </button>
    </div>
  );
}