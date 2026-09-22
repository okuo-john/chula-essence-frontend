import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { paymentApi } from "../../services/paymentApi";

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState("verifying"); // verifying | success | failed
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      setError("No payment reference found.");
      return;
    }

    async function verify() {
      try {
        const data = await paymentApi.verify(reference);
        setResult(data);
        setStatus("success");
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't verify payment.");
        setStatus("failed");
      }
    }
    verify();
  }, [reference]);

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16 text-center">
      {status === "verifying" && (
        <p className="text-sm text-gray-500">Verifying your payment...</p>
      )}

      {status === "success" && (
        <>
          <div className="mx-auto w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-4 text-xl font-semibold text-gray-900">Payment Successful</h1>
          <p className="mt-2 text-sm text-gray-500">Your order has been placed.</p>
          <Link
            to="/shop"
            className="inline-block mt-6 rounded-full bg-pink-500 text-white text-sm font-semibold px-6 py-3 hover:bg-pink-600 transition"
          >
            Continue Shopping
          </Link>
        </>
      )}

      {status === "failed" && (
        <>
          <h1 className="text-xl font-semibold text-gray-900">Payment Verification Failed</h1>
          <p className="mt-2 text-sm text-red-500">{error}</p>
          <Link
            to="/cart"
            className="inline-block mt-6 rounded-full bg-pink-500 text-white text-sm font-semibold px-6 py-3 hover:bg-pink-600 transition"
          >
            Back to Cart
          </Link>
        </>
      )}
    </div>
  );
}