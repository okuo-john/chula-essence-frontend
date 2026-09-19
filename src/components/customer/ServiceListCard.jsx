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

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-400">{service.duration} min</span>
        <span className="font-semibold text-gray-900">
          ₦{Number(service.price).toLocaleString()}
        </span>
      </div>

      <Link
        to="/book-service"
        className="mt-4 w-full text-center rounded-full bg-pink-500 text-white text-sm font-semibold py-2.5 hover:bg-pink-600 transition"
      >
        Book Now
      </Link>
    </div>
  );
}