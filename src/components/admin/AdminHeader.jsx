export default function AdminHeader({ title, avatarUrl }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

      <button
        type="button"
        aria-label="Profile"
        className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <svg viewBox="0 0 24 24" className="w-full h-full p-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
          </svg>
        )}
      </button>
    </div>
  );
}