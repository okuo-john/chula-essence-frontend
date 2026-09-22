import { useState, useEffect } from "react";
import { adminOrderApi } from "../../services/adminOrderApi";
import OrderTable from "../../components/admin/OrderTable";
import OrderDetailModal from "../../components/admin/OrderDetailModal";
import { LoadingTableSkeleton } from "../../components/common/SkeletonLoader";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {
        setLoading(true);
        setError(null);
        try {
            const data = await adminOrderApi.getAll();
            setOrders(data);
        } catch (err) {
            setError(err.response?.data?.message || "Couldn't load orders.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Orders</h1>

            {error && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
                    {error}
                </div>
            )}

            {loading ? (
                <LoadingTableSkeleton rows={5} columns={5} />
            ) : (
                <OrderTable orders={orders} onViewDetails={setSelectedOrder} />
            )}

            {selectedOrder && (
                <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
            )}
        </div>
    );
}