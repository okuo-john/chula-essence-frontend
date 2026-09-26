import { Link } from "react-router-dom";

export default function ServiceListCard({ service }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-gray-900">{service.name}</h3>
        <span className="shrink-0 text-xs font-medium text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full">
          {service.category}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500 flex-1">{service.description}</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
        <span className="text-gray-400">{service.duration} min</span>
        <span className="text-right font-semibold text-gray-900">
          <span className="block text-xs font-medium text-gray-500">Shop ₦{Number(service.shopPrice ?? 0).toLocaleString()}</span>
          <span className="block text-xs font-medium text-gray-500">Home ₦{Number(service.homePrice ?? 0).toLocaleString()}</span>
        </span>
      </div>

      <Link
        to={`/book-service?service=${encodeURIComponent(service._id)}`}
        className="mt-4 w-full text-center rounded-full bg-pink-500 text-white text-sm font-semibold py-2.5 hover:bg-pink-600 transition"
      >
        Book Now
      </Link>
    </div>
  );
}