import { Routes, Route } from "react-router-dom";

import CustomerLayout from "../components/layout/CustomerLayout";
import AdminRoute from "./AdminRoute";

import Home from "../pages/customer/Home";
import Services from "../pages/customer/Services";
import ShopWigs from "../pages/customer/ShopWigs";
import BookServices from "../pages/customer/BookService";
import MyBookings from "../pages/customer/MyBookings";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/auth/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Customer Pages */}
      <Route
        path="/"
        element={
          <CustomerLayout>
            <Home />
          </CustomerLayout>
        }
      />

      <Route
        path="/services"
        element={
          <CustomerLayout>
            <Services />
          </CustomerLayout>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <CustomerLayout>
            <MyBookings />
          </CustomerLayout>
        }
      />

      <Route
        path="/book-service"
        element={
          <CustomerLayout>
            <BookServices />
          </CustomerLayout>
        }
      />

      <Route
        path="/shop"
        element={
          <CustomerLayout>
            <ShopWigs />
          </CustomerLayout>
        }
      />

      {/* Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Pages — nested tree, mounted once here */}
      <Route path="/admin/*" element={<AdminRoute />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;