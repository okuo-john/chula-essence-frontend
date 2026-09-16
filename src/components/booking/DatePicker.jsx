import { useState, useMemo } from "react";
import { WEEKDAY_LABELS, MONTH_LABELS } from "./data";
import { buildCalendarGrid } from "./utils";

export default function DatePicker({ selectedDate, onSelectDate }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(
    selectedDate ? selectedDate.getFullYear() : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    selectedDate ? selectedDate.getMonth() : today.getMonth()
  );

  const cells = useMemo(() => buildCalendarGrid(viewYear, viewMonth), [viewYear, viewMonth]);
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  function goToMonth(delta) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m);
    setViewYear(y);
  }

  function isSameDate(day) {
    if (!selectedDate || day === null) return false;
    return (
      selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
    );
  }

  function isPast(day) {
    if (day === null) return false;
    const cellDate = new Date(viewYear, viewMonth, day);
    return cellDate < todayStart;
  }

  return (
    <div className="rounded-xl border border-gray-200 p-3">
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => goToMonth(-1)}
          aria-label="Previous month"
          className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-50"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-gray-900">
          {MONTH_LABELS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={() => goToMonth(1)}
          aria-label="Next month"
          className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-50"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAY_LABELS.map((wd) => (
          <span key={wd} className="text-[11px] font-medium text-gray-400">
            {wd}
          </span>
        ))}

        {cells.map((day, idx) => {
          if (day === null) return <span key={`blank-${idx}`} />;
          const selected = isSameDate(day);
          const past = isPast(day);
          return (
            <button
              key={day}
              type="button"
              disabled={past}
              onClick={() => onSelectDate(new Date(viewYear, viewMonth, day))}
              className={`mx-auto my-0.5 w-8 h-8 rounded-full text-sm flex items-center justify-center transition-colors ${
                selected
                  ? "bg-pink-500 text-white font-semibold"
                  : past
                  ? "text-gray-300"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}