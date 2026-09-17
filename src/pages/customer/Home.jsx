import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import WigCard from "../../components/products/WigCard";
import heroImage from "../../assets/hero-woman.png";
import installationImg from "../../assets/installation.png";
import lashesImg from "../../assets/lashes.png";
import nailsImg from "../../assets/nails.png";
import pedicureImg from "../../assets/pedicure.png";
import wiggingImg from "../../assets/wigging.png";
import { wigs } from "../../utils/mockWigs";

const API_BASE_URL = "https://server-chula-ess.onrender.com/api";

const serviceImages = {
  Installation: installationImg,
  "Cluster Lashes": lashesImg,
  Nails: nailsImg,
  Pedicure: pedicureImg,
  "Wigging & Revamping": wiggingImg,
};

const fallbackServices = [
  { id: "installation", name: "Installation", price: "₦20,000", image: installationImg },
  { id: "cluster-lashes", name: "Cluster Lashes", price: "₦12,000", image: lashesImg },
  { id: "nails", name: "Nails", price: "₦10,000", image: nailsImg },
  { id: "pedicure", name: "Pedicure", price: "₦8,000", image: pedicureImg },
  { id: "wigging-revamping", name: "Wigging & Revamping", price: "₦15,000", image: wiggingImg },
];

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-gold">
    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.8L10 14.9l-5.2 2.62.99-5.8-4.21-4.1 5.82-.85z" />
  </svg>
);

const testimonials = [
  { id: "t1", quote: "The best hands for my hair and nails! I always leave feeling like a queen.", name: "Maryam A." },
  { id: "t2", quote: "Chula Essence never disappoints. The quality is unmatched.", name: "Jessica O." },
  { id: "t3", quote: "My go-to place for wigs and beauty services.", name: "Adaeze K." },
];

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((json) => setServices(json.data || []))
      .catch((err) => {
        console.error("Falling back to local service data:", err);
        setServices(fallbackServices);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="relative min-h-[550px] overflow-hidden rounded-lg bg-[#fff0f6] lg:min-h-[600px]">
            <img
              src={heroImage}
              alt="Chula Essence beauty model"
              className="absolute inset-0 h-full w-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff0f6] via-[#fff0f6]/40 to-transparent" />
            <div className="relative z-10 flex min-h-[620px] items-center lg:min-h-[650px]">
              <div className="px-8 sm:px-12 lg:text-left">
                <h1 className="font-heading text-4xl leading-tight text-chula-black sm:text-5xl lg:text-6xl">
                  Your Beauty.
                  <br />
                  Your Confidence.
                  <br />
                  Your <span className="text-primary-pink">Essence.</span>
                </h1>
                <p className="mt-6 max-w-md font-body text-base sm:text-lg text-gray-600 lg-mx-0">
                  Professional beauty services and premium wigs that bring out the best in you. Luxury. Quality. You.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/book-service" className="inline-flex items-center justify-center rounded-full bg-primary-pink px-8 py-3 font-body font-semibold text-white shadow-sm transition duration-200 hover:bg-pink-600">
                    Book a Service
                  </Link>
                  <Link to="/shop-wigs" className="inline-flex items-center justify-center rounded-full border border-chula-black bg-white/80 px-8 py-3 font-body font-semibold text-chula-black transition duration-200 hover:bg-chula-black hover:text-white">
                    Shop Wigs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl text-chula-black">Our Services</h2>
            <p className="mt-3 font-body text-gray-600">Indulge in our premium beauty services</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:border-primary-pink/60"
              >
                <img
                  src={service.image || serviceImages[service.name]}
                  alt={service.name}
                  className="w-full aspect-square object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="p-4">
                  <h3 className="relative inline-block font-body font-semibold text-chula-black">
                    {service.name}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </h3>
                  <p className="font-body text-sm text-gray-500 mt-2">
                    From{" "}
                    <span className="text-primary-pink font-semibold">
                      {typeof service.price === "number"
                        ? `₦${service.price.toLocaleString()}`
                        : service.price}
                    </span>
                  </p>
                  <Link to="/book-service" className="mt-4 block text-center rounded-full bg-primary-pink px-4 py-2 font-body text-sm font-semibold text-white transition hover:bg-pink-600">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Premium Wigs */}
      <section className="bg-soft-pink py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl text-chula-black">Shop Premium Wigs</h2>
            <p className="mt-3 font-body text-gray-600">High quality wigs for every queen</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {wigs.slice(0, 4).map((wig) => (
              <WigCard key={wig.id} wig={wig} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/shop-wigs" className="bg-white inline-block rounded-full border border-chula-black px-8 py-3 font-body font-semibold text-chula-black transition hover:bg-chula-black hover:text-white">
              View All Wigs
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl text-chula-black">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-soft-pink rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="font-body text-sm text-gray-700 italic">"{t.quote}"</p>
                <p className="mt-4 font-body font-semibold text-chula-black">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;