import { useEffect, useState } from "react";
import BookingStepper from "./BookingStepper";
import DatePicker from "./DatePicker";
import TimeSlotSelector from "./TimeSlotSelector";
import { availabilityApi } from "../../services/availabilityApi";

export default function DateTimeSelector({
  selectedDate,
  selectedTime,
  durationMinutes,
  onSelectDate,
  onSelectTime,
  onContinue,
  onBack,
}) {
  const [availability, setAvailability] = useState([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(true);
  const [availabilityError, setAvailabilityError] = useState(null);
  const canContinue = selectedDate && selectedTime;

  useEffect(() => {
    let active = true;
    availabilityApi
      .getForBooking()
      .then((records) => {
        if (active) setAvailability(records);
      })
      .catch((err) => {
        if (active) {
          setAvailabilityError(err.response?.data?.message || "Couldn't load appointment availability.");
        }
      })
      .finally(() => {
        if (active) setAvailabilityLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  function handleSelectDate(date) {
    onSelectDate(date);
    onSelectTime(null);
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <BookingStepper number={5} title="DATE & TIME" />
      <h1 className="text-xl font-semibold text-gray-900 leading-snug">
        Choose Your Appointment
      </h1>

      <p className="mt-4 text-sm font-medium text-gray-900">Select Date</p>
      <div className="mt-2">
        <DatePicker
          selectedDate={selectedDate}
          availability={availability}
          availabilityLoading={availabilityLoading || !!availabilityError}
          onSelectDate={handleSelectDate}
        />
      </div>

      <p className="mt-5 text-sm font-medium text-gray-900">Select Time</p>
      <div className="mt-2">
        <TimeSlotSelector
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          availability={availability}
          availabilityLoading={availabilityLoading || !!availabilityError}
          durationMinutes={durationMinutes}
          onSelectTime={onSelectTime}
        />
      </div>

      {availabilityError && <p className="mt-3 text-sm text-red-500">{availabilityError}</p>}
      {!availabilityLoading && !availabilityError && availability.length === 0 && (
        <p className="mt-3 text-sm text-gray-500">No appointment dates are currently available.</p>
      )}

      <button
        type="button"
        disabled={!canContinue}
        onClick={onContinue}
        className="mt-6 w-full py-3.5 rounded-full bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 active:scale-[0.99] transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-3 hidden w-full py-3.5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50 active:scale-[0.99] transition sm:block"
      >
        Back
      </button>
    </div>
  );
}