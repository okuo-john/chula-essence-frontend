export default function BookingStatus({ status = "Pending" }) {
  return (
    <p className="mt-3 text-sm text-gray-900">
      Status: <span className="font-semibold text-pink-500">{status}</span>
    </p>
  );
}