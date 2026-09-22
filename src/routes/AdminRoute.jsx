import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../components/admin/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
import Bookings from "../pages/admin/Bookings";
import Availability from "../pages/admin/Availability";
import Services from "../pages/admin/Services";
import Products from "../pages/admin/Products";
import Orders from "../pages/admin/Orders";
import Payments from "../pages/admin/Payments";
import Testimonials from "../pages/admin/Testimonials";
import Settings from "../pages/admin/Settings";

function AdminRoute() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="availability" element={<Availability />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="payments" element={<Payments />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AdminRoute;