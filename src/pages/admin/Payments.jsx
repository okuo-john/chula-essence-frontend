import { useState, useEffect } from "react";
import { adminPaymentApi } from "../../services/adminPaymentApi";
import PaymentTable from "../../components/admin/PaymentTable";
import PaymentDetailModal from "../../components/admin/PaymentDetailModal";
import { LoadingTableSkeleton } from "../../components/common/SkeletonLoader";

export default function Payments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);

    useEffect(() => {
        loadPayments();
    }, []);

    async function loadPayments() {
        setLoading(true);
        setError(null);
        try {
            const data = await adminPaymentApi.getAll();
            setPayments(data);
        } catch (err) {
            setError(err.response?.data?.message || "Couldn't load payments.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Payments</h1>

            {error && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
                    {error}
                </div>
            )}

            {loading ? (
                <LoadingTableSkeleton rows={5} columns={5} />
            ) : (
                <PaymentTable payments={payments} onViewDetails={setSelectedPayment} />
            )}

            {selectedPayment && (
                <PaymentDetailModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
            )}
        </div>
    );
}