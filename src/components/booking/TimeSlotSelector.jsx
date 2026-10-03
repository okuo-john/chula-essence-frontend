import { toast } from "react-toastify";
import { TIME_SLOTS } from "./data";
import { convertTo24Hour } from "./utils";

function toMinutes(time) {
  if (!time) return null;
  const normalized = /AM|PM/i.test(time) ? convertTo24Hour(time) : time;
  const [hours, minutes] = normalized.split(":").map(Number);
  return hours * 60 + minutes;
}

function getDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function TimeSlotSelector({
  selectedDate,
  selectedTime,
  availability,
  availabilityLoading,
  durationMinutes = 60,
  onSelectTime,
}) {
  const record = selectedDate && availability.find(
    (item) => getDateKey(new Date(item.date)) === getDateKey(selectedDate) && item.isAvailable,
  );

  return (
    <div className="grid grid-cols-3 gap-2">
      {TIME_SLOTS.map((slot) => {
        const isSelected = selectedTime === slot;
        const start = toMinutes(slot);
        const appointmentDuration = Number(durationMinutes) > 0 ? Number(durationMinutes) : 60;
        const end = start + appointmentDuration;
        const opening = toMinutes(record?.startTime);
        const closing = toMinutes(record?.endTime);
        const overlapsBlockedPeriod = (record?.blockedPeriods ?? []).some((period) => {
          const blockedStart = toMinutes(period.startTime);
          const blockedEnd = toMinutes(period.endTime);
          return blockedStart !== null && blockedEnd !== null && start < blockedEnd && end > blockedStart;
        });
        const unavailable =
          availabilityLoading ||
          !record ||
          opening === null ||
          closing === null ||
          start < opening ||
          end > closing ||
          overlapsBlockedPeriod;

        return (
          <button
            key={slot}
            type="button"
            onClick={() => {
              if (availabilityLoading) {
                toast.info("Checking appointment availability. Please wait.");
              } else if (!selectedDate) {
                toast.info("Select an available date first to see open appointment times.");
              } else if (unavailable) {
                toast.info("This time is unavailable. Please choose an open time slot.");
              } else {
                onSelectTime(slot);
              }
            }}
            aria-disabled={unavailable}
            aria-label={`${slot}${unavailable ? ", unavailable" : ""}`}
            title={unavailable ? "Unavailable" : undefined}
            className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${
              isSelected
                ? "bg-pink-500 border-pink-500 text-white"
                : unavailable
                  ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
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