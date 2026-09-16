import { useState } from "react";
import { SERVICES, EMPTY_ADDRESS_FORM } from "../../components/booking/data.js"
import ServiceSelector from "../../components/booking/ServiceSelector";
import ServiceTypeSelector from "../../components/booking/ServiceTypeSelector";
import HomeServiceForm from "../../components/booking/HomeServiceForm";
import ShopServiceLocation from "../../components/booking/ShopServiceLocation";
import DateTimeSelector from "../../components/booking/DateTimeSelector";
import AdditionalDetails from "../../components/booking/AdditionalDetails.jsx";
import BookingSummary from "../../components/booking/BookingSummary";
import BookingSuccess from "../../components/booking/BookingSuccess";

export default function BookingService() {
  const [step, setStep] = useState("services");
  const [selectedServices, setSelectedServices] = useState(() => new Set());
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS_FORM);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState("");

  function toggleService(id) {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleLocationContinue() {
    if (selectedLocation === "home") setStep("home-address");
    if (selectedLocation === "shop") setStep("shop-location");
  }

  function restart() {
    setStep("services");
    setSelectedServices(new Set());
    setSelectedLocation(null);
    setAddressForm(EMPTY_ADDRESS_FORM);
    setSelectedDate(null);
    setSelectedTime(null);
    setAdditionalDetails("");
  }

  const booking = {
    services: selectedServices,
    location: selectedLocation,
    address: addressForm,
    date: selectedDate,
    time: selectedTime,
    details: additionalDetails,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      {step === "services" && (
        <ServiceSelector
          selected={selectedServices}
          onToggle={toggleService}
          onContinue={() => setStep("location")}
        />
      )}

      {step === "location" && (
        <ServiceTypeSelector
          selectedLocation={selectedLocation}
          onSelect={setSelectedLocation}
          onContinue={handleLocationContinue}
          onBack={() => setStep("services")}
        />
      )}

      {step === "home-address" && (
        <HomeServiceForm
          form={addressForm}
          onChange={(field, value) =>
            setAddressForm((prev) => ({ ...prev, [field]: value }))
          }
          onContinue={() => setStep("datetime")}
          onBack={() => setStep("location")}
        />
      )}

      {step === "shop-location" && (
        <ShopServiceLocation
          onConfirm={() => setStep("datetime")}
          onBack={() => setStep("location")}
        />
      )}

      {step === "datetime" && (
        <DateTimeSelector
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSelectDate={setSelectedDate}
          onSelectTime={setSelectedTime}
          onContinue={() => setStep("additional-details")}
          onBack={() =>
            setStep(selectedLocation === "home" ? "home-address" : "shop-location")
          }
        />
      )}

      {step === "additional-details" && (
        <AdditionalDetails
          value={additionalDetails}
          onChange={setAdditionalDetails}
          onContinue={() => setStep("review")}
          onBack={() => setStep("datetime")}
        />
      )}

      {step === "review" && (
        <BookingSummary
          booking={booking}
          onSubmit={() => setStep("confirmed")}
          onBack={() => setStep("additional-details")}
        />
      )}

      {step === "confirmed" && <BookingSuccess onRestart={restart} />}
    </div>
  );
}