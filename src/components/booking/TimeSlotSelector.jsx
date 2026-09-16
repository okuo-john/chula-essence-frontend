import { TIME_SLOTS } from "./data";

export default function TimeSlotSelector({ selectedTime, onSelectTime }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {TIME_SLOTS.map((slot) => {
        const isSelected = selectedTime === slot;
        return (
          <button
            key={slot}
            type="button"
            onClick={() => onSelectTime(slot)}
            className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${
              isSelected
                ? "bg-pink-500 border-pink-500 text-white"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}