import { Link } from "react-router-dom";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-chula-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-12">
        <div>
          <h3 className="font-heading text-2xl">Chula Essence</h3>
          <p className="mt-2 font-body text-sm text-gray-400">Beauty. Confidence. You.</p>
          <p className="mt-4 font-body text-sm text-gray-400 max-w-xs">
            Professional beauty services and premium wigs, built around you.
          </p>
        </div>

        <div>
          <h4 className="font-body font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 font-body text-sm text-gray-400">
            <li><Link to="/" className="hover:text-primary-pink transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary-pink transition">Services</Link></li>
            <li><Link to="/book-service" className="hover:text-primary-pink transition">Book a Service</Link></li>
            <li><Link to="/shop-wigs" className="hover:text-primary-pink transition">Shop Wigs</Link></li>
            <li><Link to="/contact" className="hover:text-primary-pink transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-body font-semibold mb-4">Get in Touch</h4>
          <ul className="space-y-2 font-body text-sm text-gray-400">
            <li>0812 345 6789</li>
            <li>hello@chulaessence.com</li>
            <li>@chula_essence</li>
          </ul>
          <a
            href="https://instagram.com/chula_essence"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-gray-400 hover:text-primary-pink transition"
            aria-label="Chula Essence on Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 font-body text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Chula Essence. All rights reserved.</p>
          <p>Benin City, Edo State.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;