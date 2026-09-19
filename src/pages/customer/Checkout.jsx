import { useState } from "react";
import { paymentApi } from "../../services/paymentApi";
import DeliveryForm from "../../components/checkout/DeliveryForm";

export default function Checkout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleDeliverySubmit(delivery) {
    setIsSubmitting(true);
    setError(null);
    try {
      const paymentData = await paymentApi.initialize(delivery);
      window.location.href = paymentData.authorizationUrl;
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't start payment.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Checkout</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <DeliveryForm onSubmit={handleDeliverySubmit} isSubmitting={isSubmitting} />
    </div>
  );
}