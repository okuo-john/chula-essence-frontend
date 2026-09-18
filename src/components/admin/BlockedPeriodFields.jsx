export default function BlockedPeriodFields({ blockedPeriods, onChange }) {
  function updatePeriod(index, field, value) {
    const next = [...blockedPeriods];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  }

  function addPeriod() {
    onChange([...blockedPeriods, { startTime: "", endTime: "", reason: "" }]);
  }

  function removePeriod(index) {
    onChange(blockedPeriods.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-900">Blocked Periods</label>
        <button
          type="button"
          onClick={addPeriod}
          className="text-sm font-medium text-pink-500 hover:text-pink-600"
        >
          + Add Break
        </button>
      </div>

      {blockedPeriods.length === 0 && (
        <p className="text-xs text-gray-400">No breaks added for this day.</p>
      )}

      <div className="space-y-3">
        {blockedPeriods.map((period, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="time"
              value={period.startTime}
              onChange={(e) => updatePeriod(index, "startTime", e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
            />
            <span className="text-gray-400 text-sm">to</span>
            <input
              type="time"
              value={period.endTime}
              onChange={(e) => updatePeriod(index, "endTime", e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
            />
            <input
              type="text"
              value={period.reason}
              onChange={(e) => updatePeriod(index, "reason", e.target.value)}
              placeholder="Reason (optional)"
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
            />
            <button
              type="button"
              onClick={() => removePeriod(index)}
              aria-label="Remove break"
              className="text-red-400 hover:text-red-600 px-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}