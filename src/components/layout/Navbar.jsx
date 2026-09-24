import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingBag, Calendar, Menu, X, SunMedium, MoonStar, LayoutDashboard } from "lucide-react";
import chulaLogo from "../../assets/logos/chula-essence-logo.png";
import { bookingApi } from "../../services/bookingApi";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { getUserCacheScope, invalidateCache } from "../../utils/staleCache";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.role === "Admin";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  function syncAuthState() {
    const token = !!localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setIsLoggedIn(token);
    setIsAdmin(user?.role === "Admin");
    if (!token) setBookingCount(0);
  }

  useEffect(() => {
    function handleStorageChange() {
      syncAuthState();
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    let cancelled = false;
    bookingApi
      .getMyBookings()
      .then((bookings) => {
        if (!cancelled) setBookingCount(bookings.length);
      })
      .catch(() => { });
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, location.pathname]);

  function handleLogout() {
    const userScope = getUserCacheScope();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    invalidateCache(`cart:${userScope}`, `bookings:mine:${userScope}`);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setBookingCount(0);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    navigate("/login");
  }

  function handleNavClick() {
    setIsMenuOpen(false);
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Book a Service", path: "/book-service" },
    { name: "Shop Wigs", path: "/shop-wigs" },
    { name: "Testimonials", path: "/#testimonials" },
    { name: "Contact", path: "/#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-sm dark:border-gray-700 dark:bg-slate-900/90">
      <div className="max-w-[1200px] mx-auto h-[72px] px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" onClick={handleNavClick} className="shrink-0">
          <img
            src={chulaLogo}
            alt="Chula Essence"
            className="w-[90px] sm:w-[105px] h-auto"
          />
        </Link>

        {/* Navigation Links — desktop only */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={handleNavClick}
                className={`relative py-7 text-[11px] font-medium transition-colors ${isActive
                    ? "text-[#FF3B73]"
                    : "text-[#111111] hover:text-[#FF3B73] dark:text-slate-100 dark:hover:text-[#FF3B73]"
                  }`}
              >
                {link.name}

                {isActive && (
                  <span className="absolute left-0 right-0 bottom-3 h-[2px] bg-[#FF3B73]" />
                )}
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              to="/admin"
              onClick={handleNavClick}
              className="flex items-center gap-1.5 text-[11px] font-medium text-[#111111] hover:text-[#FF3B73] transition-colors dark:text-slate-100 dark:hover:text-[#FF3B73]"
            >
              <LayoutDashboard size={14} strokeWidth={1.8} />
              Admin
            </Link>
          )}
        </div>

        {/* Navbar Actions */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Search — hidden on very small screens */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 text-[#111111] transition-colors hover:text-[#FF3B73] dark:border-gray-700 dark:bg-slate-800 dark:text-slate-100"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <SunMedium size={16} /> : <MoonStar size={16} />}
          </button>

          {/* <button
            type="button"
            className="hidden sm:flex flex-col items-center gap-1 text-[#111111] hover:text-[#FF3B73] transition-colors dark:text-slate-100"
          >
            <Search size={16} strokeWidth={1.8} />
            <span className="text-[9px]">Search</span>
          </button> */}

          {/* My Bookings — only shown when logged in */}
          {isLoggedIn && (
            <Link
              to="/my-bookings"
              onClick={handleNavClick}
              className="relative hidden sm:flex flex-col items-center gap-1 text-[#111111] hover:text-[#FF3B73] transition-colors dark:text-slate-100"
            >
              <Calendar size={16} strokeWidth={1.8} />

              {bookingCount > 0 && (
                <span className="absolute -top-1 -right-2 flex h-[13px] min-w-[13px] items-center justify-center rounded-full bg-[#FF3B73] px-1 text-[7px] text-white">
                  {bookingCount}
                </span>
              )}

              <span className="text-[9px] hidden sm:block">Bookings</span>
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            onClick={handleNavClick}
            className="relative hidden sm:flex flex-col items-center gap-1 text-chula-black hover:text-[#FF3B73] transition-colors"
          >
            <ShoppingBag size={16} strokeWidth={1.8} />

            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 flex h-[13px] min-w-[13px] items-center justify-center rounded-full bg-[#FF3B73] px-1 text-[7px] text-white">
                {itemCount}
              </span>
            )}

            <span className="text-[9px] hidden sm:block">Cart</span>
          </Link>

          {/* Login / Logout — desktop only */}
          <div className="hidden lg:block">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-[#111111] px-5 py-3 text-[10px] font-medium text-white hover:bg-[#FF3B73] transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={handleNavClick}
                className="rounded-md bg-[#111111] px-5 py-3 text-[10px] font-medium text-white hover:bg-[#FF3B73] transition-colors"
              >
                Login / Account
              </Link>
            )}
          </div>

          {/* Hamburger — mobile/tablet only */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="lg:hidden text-[#111111] dark:text-white"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 right-0 border-b border-gray-100 bg-white shadow-sm z-50 dark:border-gray-700 dark:bg-slate-900">
          <div className="flex flex-col px-6 py-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`py-3 text-sm font-medium border-b border-gray-50 last:border-b-0 dark:border-gray-700 ${isActive ? "text-[#FF3B73]" : "text-[#111111] dark:text-slate-100"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                to="/admin"
                onClick={handleNavClick}
                className="py-3 text-sm font-medium text-[#111111] border-b border-gray-50 flex items-center gap-1.5 dark:border-gray-700 dark:text-slate-100"
              >
                <LayoutDashboard size={14} strokeWidth={1.8} />
                Admin
              </Link>
            )}

            <Link
              to="/cart"
              onClick={handleNavClick}
              className="py-3 text-sm font-medium text-[#111111] border-b border-gray-50 flex items-center justify-between dark:border-gray-700 dark:text-slate-100"
            >
              Your Cart
              {itemCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF3B73] px-1.5 text-[10px] text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            {isLoggedIn && (
              <Link
                to="/my-bookings"
                onClick={handleNavClick}
                className="py-3 text-sm font-medium text-[#111111] border-b border-gray-50 flex items-center justify-between dark:border-gray-700 dark:text-slate-100"
              >
                My Bookings
                {bookingCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF3B73] px-1.5 text-[10px] text-white">
                    {bookingCount}
                  </span>
                )}
              </Link>
            )}

            <div className="pt-4">
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-md bg-[#111111] px-5 py-3 text-sm font-medium text-white hover:bg-[#FF3B73] transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="block text-center w-full rounded-md bg-[#111111] px-5 py-3 text-sm font-medium text-white hover:bg-[#FF3B73] transition-colors"
                >
                  Login / Account
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;