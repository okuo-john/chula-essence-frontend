import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EMPTY_ADDRESS_FORM } from "../../components/booking/data.js"
import ServiceSelector from "../../components/booking/ServiceSelector";
import ServiceTypeSelector from "../../components/booking/ServiceTypeSelector";
import HomeServiceForm from "../../components/booking/HomeServiceForm";
import ShopServiceLocation from "../../components/booking/ShopServiceLocation";
import DateTimeSelector from "../../components/booking/DateTimeSelector";
import AdditionalDetails from "../../components/booking/AdditionalDetails.jsx";
import BookingSummary from "../../components/booking/BookingSummary";
import BookingSuccess from "../../components/booking/BookingSuccess";
import { convertTo24Hour } from "../../components/booking/utils.js";
import { bookingApi } from "../../services/bookingApi.js";
import RitualBackdrop from "../../components/common/RitualBackdrop";
  import { toast } from "react-toastify";


export default function BookServices() {
  const [step, setStep] = useState("services");
  const [allServices, setAllServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState(() => new Set());
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS_FORM);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmitBooking() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { redirectTo: "/book-service" } });
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        services: Array.from(selectedServices),
        appointmentDate: selectedDate.toISOString(),
        startTime: convertTo24Hour(selectedTime),
        serviceType: selectedLocation === "home" ? "Home" : "Shop",
        additionalDetails: additionalDetails || undefined,
      };

      if (selectedLocation === "home") {
        payload.serviceLocation = {
          address: addressForm.address,
          city: addressForm.city,
          state: addressForm.state,
          landmark: addressForm.landmark || undefined,
          additionalInfo: addressForm.instructions || undefined,
        };
      }

      await bookingApi.createBooking(payload);
      setStep("confirmed");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Couldn't submit your booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    bookingApi.getServices().then(setAllServices).catch(() => { });
  }, []);

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
    setSubmitError(null);
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
    <RitualBackdrop
      aside={
        <div className="ritual-reveal">
          <span className="ritual-aside-mark">01</span>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500">Your ritual</p>
          <h1 className="mt-3 font-heading text-3xl leading-tight text-gray-900">Take your time. We have got the rest.</h1>
          <p className="mt-4 text-sm leading-6">Choose what feels good today. You can move back and refine every detail before confirming.</p>
          <div className="mt-8 h-px w-16 bg-pink-300" />
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-gray-400">Curated care, your way</p>
        </div>
      }
    >
      <div className="flex min-h-[34rem] items-center justify-center">
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
          allServices={allServices}
          onSubmit={handleSubmitBooking}
          onBack={() => setStep("additional-details")}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}

      {step === "confirmed" && <BookingSuccess onRestart={restart} />}
      </div>
    </RitualBackdrop>
  );
}