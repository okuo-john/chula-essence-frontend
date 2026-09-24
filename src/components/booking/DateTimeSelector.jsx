import BookingStepper from "./BookingStepper";
import DatePicker from "./DatePicker";
import TimeSlotSelector from "./TimeSlotSelector";

export default function DateTimeSelector({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onContinue,
  onBack,
}) {
  const canContinue = selectedDate && selectedTime;

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <BookingStepper number={5} title="DATE & TIME" />
      <h1 className="text-xl font-semibold text-gray-900 leading-snug">
        Choose Your Appointment
      </h1>

      <p className="mt-4 text-sm font-medium text-gray-900">Select Date</p>
      <div className="mt-2">
        <DatePicker selectedDate={selectedDate} onSelectDate={onSelectDate} />
      </div>

      <p className="mt-5 text-sm font-medium text-gray-900">Select Time</p>
      <div className="mt-2">
        <TimeSlotSelector selectedTime={selectedTime} onSelectTime={onSelectTime} />
      </div>

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