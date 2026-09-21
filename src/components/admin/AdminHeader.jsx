import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function AdminHeader({ title, avatarUrl }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h1>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:text-pink-500 dark:border-gray-700 dark:bg-slate-800 dark:text-slate-100"
        >
          {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
        </button>

        <button
          type="button"
          aria-label="Profile"
          className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700"
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <svg viewBox="0 0 24 24" className="h-full w-full p-2 text-gray-400 dark:text-slate-200" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}