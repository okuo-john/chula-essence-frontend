import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag } from "lucide-react";
import chulaLogo from "../../assets/logos/chula-essence-logo.png";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Book a Service", path: "/book-service" },
    { name: "Shop Wigs", path: "/shop" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto h-[72px] px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src={chulaLogo}
            alt="Chula Essence"
            className="w-[105px] h-auto"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative py-7 text-[11px] font-medium transition-colors ${
                  isActive
                    ? "text-[#FF3B73]"
                    : "text-[#111111] hover:text-[#FF3B73]"
                }`}
              >
                {link.name}

                {/* Active underline */}
                {isActive && (
                  <span className="absolute left-0 right-0 bottom-3 h-[2px] bg-[#FF3B73]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Navbar Actions */}
        <div className="flex items-center gap-5">

          {/* Search */}
          <button
            type="button"
            className="flex flex-col items-center gap-1 text-[#111111] hover:text-[#FF3B73] transition-colors"
          >
            <Search size={16} strokeWidth={1.8} />
            <span className="text-[9px]">Search</span>
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex flex-col items-center gap-1 text-[#111111] hover:text-[#FF3B73] transition-colors"
          >
            <ShoppingBag size={16} strokeWidth={1.8} />

            {/* Cart Badge */}
            <span className="absolute -top-1 -right-2 flex h-[13px] min-w-[13px] items-center justify-center rounded-full bg-[#FF3B73] px-1 text-[7px] text-white">
              0
            </span>

            <span className="text-[9px]">Cart</span>
          </Link>

          {/* Login / Account */}
          <Link
            to="/login"
            className="rounded-md bg-[#111111] px-5 py-3 text-[10px] font-medium text-white hover:bg-[#FF3B73] transition-colors"
          >
            Login / Account
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;