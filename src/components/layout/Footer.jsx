import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 0 0 1 1 4 4 0 0 0 4 4 1 1 0 0 0 1-1" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-chula-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-6 sm:py-16 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-12">
        <div>
          <h3 className="font-heading text-xl sm:text-2xl">Chula Essence</h3>
          <p className="mt-1 sm:mt-2 font-body text-xs sm:text-sm text-gray-400">Beauty. Confidence. You.</p>
          <p className="hidden sm:block mt-4 font-body text-sm text-gray-400 max-w-xs">
            Professional beauty services and premium wigs, built around you.
          </p>
        </div>

        <div>
          <h4 className="font-body text-sm sm:text-base font-semibold mb-2 sm:mb-4">Quick Links</h4>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 font-body text-xs sm:text-sm text-gray-400 sm:block sm:space-y-2">
            <li><Link to="/" className="hover:text-primary-pink transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary-pink transition">Services</Link></li>
            <li><Link to="/book-service" className="hover:text-primary-pink transition">Book a Service</Link></li>
            <li><Link to="/shop-wigs" className="hover:text-primary-pink transition">Shop Wigs</Link></li>
            <li><Link to="/#contact" className="hover:text-primary-pink transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-body text-sm sm:text-base font-semibold mb-2 sm:mb-4">Connect</h4>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/chula_essence" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary-pink transition" aria-label="Chula Essence on Instagram">
              <InstagramIcon />
            </a>
            <a href="https://wa.me/2349163515242" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary-pink transition" aria-label="Chat with Chula Essence on WhatsApp">
              <WhatsAppIcon />
            </a>
            <a href="mailto:chulachula403@gmail.com" className="text-gray-400 hover:text-primary-pink transition" aria-label="Email Chula Essence">
              <Mail size={20} strokeWidth={1.5} />
            </a>
          </div>
          <p className="hidden sm:block mt-6 font-body text-xs text-gray-500">Secure payments powered by Paystack</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-3 sm:py-6 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-1 sm:gap-2 font-body text-[10px] sm:text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Chula Essence. All rights reserved.</p>
          <p className="hidden sm:block">Benin City, Edo State.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;