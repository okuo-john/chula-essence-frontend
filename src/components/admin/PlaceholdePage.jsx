export default function PlaceholderPage({ title }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h1>
      <div className="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-400">
        {title} page — coming soon.
      </div>
    </div>
  );
}