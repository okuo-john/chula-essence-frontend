import { Routes, Route } from "react-router-dom";
import Home from "../pages/customer/Home";
import Services from "../pages/customer/Services";
import ShopWigs from "../pages/customer/ShopWigs";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/auth/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Customer Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/shop" element={<ShopWigs />} />

      {/* Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;