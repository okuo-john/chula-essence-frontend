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
import Testimonials from "./Testimonials";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { productApi } from "../../services/productApi";
import ProductCard from "../../components/products/ProductCard";

const API_BASE_URL = "https://server-chula-ess.onrender.com/api";

const serviceImages = {
  Installation: installationImg,
  "Cluster Lashes": lashesImg,
  Nails: nailsImg,
  Pedicure: pedicureImg,
  "Wigging & Revamping": wiggingImg,
};

const fallbackServices = [
  {
    id: "installation",
    name: "Installation",
    price: "₦20,000",
    image: installationImg,
  },
  {
    id: "cluster-lashes",
    name: "Cluster Lashes",
    price: "₦12,000",
    image: lashesImg,
  },
  { id: "nails", name: "Nails", price: "₦10,000", image: nailsImg },
  { id: "pedicure", name: "Pedicure", price: "₦8,000", image: pedicureImg },
  {
    id: "wigging-revamping",
    name: "Wigging & Revamping",
    price: "₦15,000",
    image: wiggingImg,
  },
];

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-[18px] w-[18px]"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [wigs, setWigs] = useState([]);
  const [wigsLoading, setWigsLoading] = useState(true);

  useEffect(() => {
    productApi
      .getAll()
      .then((data) => setWigs(data.slice(0, 4)))
      .catch(() => { })
      .finally(() => setWigsLoading(false));
  }, []);

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
          <div className="relative min-h-[420px] sm:min-h-[550px] overflow-hidden rounded-lg bg-[#fff0f6] lg:min-h-[600px]">
            <img
              src={heroImage}
              alt="Chula Essence beauty model"
              className="absolute inset-0 h-full w-full object-cover object-[75%_15%] sm:object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff0f6] via-[#fff0f6]/40 to-transparent" />
            <div className="relative z-10 flex min-h-[620px] items-center lg:min-h-[650px]">
              <div className="px-8 sm:px-12 lg:text-left">
                <h1 className="font-heading text-4xl leading-tight text-black sm:text-5xl lg:text-6xl">
                  Your Beauty.
                  <br />
                  Your Confidence.
                  <br />
                  Your <span className="text-primary-pink">Essence.</span>
                </h1>
                <p className="mt-6 max-w-md font-body sm:text-lg text-black lg-mx-0">
                  Professional beauty services and premium wigs that bring out
                  the best in you. Luxury. Quality. You.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to="/book-service"
                    className="inline-flex items-center justify-center rounded-full bg-primary-pink px-8 py-3 font-body font-semibold text-white shadow-lg shadow-primary-pink/30 transition duration-200 hover:bg-pink-600 animate-bounce"
                  >
                    Book a Service
                  </Link>
                  <Link
                    to="/shop-wigs"
                    className="inline-flex items-center justify-center rounded-full border border-chula-black bg-white px-8 py-3 font-body font-semibold text-chula-black shadow-lg transition duration-200 hover:bg-chula-black hover:text-white"
                  >
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
            <h2 className="font-heading text-3xl lg:text-4xl text-chula-black">
              Our Services
            </h2>
            <p className="mt-3 font-body text-gray-600">
              Indulge in our premium beauty services
            </p>
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
                  <Link
                    to="/book-service"
                    className="mt-4 block text-center rounded-full bg-primary-pink px-4 py-2 font-body text-sm font-semibold text-white transition hover:bg-pink-600"
                  >
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
            <h2 className="font-heading text-3xl lg:text-4xl text-chula-black">
              Shop Premium Wigs
            </h2>
            <p className="mt-3 font-body text-gray-600">
              High quality wigs for every queen
            </p>
          </div>

          {wigsLoading ? (
            <p className="text-center text-sm text-gray-400">Loading wigs...</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {wigs.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/shop-wigs"
              className="bg-white inline-block rounded-full border border-chula-black px-8 py-3 font-body font-semibold text-chula-black transition hover:bg-chula-black hover:text-white"
            >
              View More Wigs
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Testimonials />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-soft-pink py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl text-chula-black">
              Get in Touch
            </h2>
            <p className="mt-3 font-body text-gray-600">
              We'd love to hear from you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-pink text-primary-pink">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="font-body text-xs text-gray-500">Phone</p>
                  <p className="font-body font-semibold text-chula-black">
                    0916 351 5242
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-pink text-primary-pink">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="font-body text-xs text-gray-500">Email</p>
                  <p className="font-body font-semibold text-chula-black">
                    chulachula403@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-pink text-primary-pink">
                  <InstagramIcon />
                </span>
                <div>
                  <p className="font-body text-xs text-gray-500">Instagram</p>
                  <p className="font-body font-semibold text-chula-black">
                    @chula_essence
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-pink text-primary-pink">
                  <Clock size={18} />
                </span>
                <div>
                  <p className="font-body text-xs text-gray-500">
                    Business Hours
                  </p>
                  <p className="font-body font-semibold text-chula-black">
                    Mon – Sat: 9:00AM – 7:00PM
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-primary-pink" />
                <h3 className="font-body font-semibold text-chula-black">
                  Current Service Location
                </h3>
              </div>
              <p className="font-body text-sm text-gray-600">
                Country home road, Benin City, Edo State.
              </p>
              <p className="font-body text-sm text-gray-500 mt-1">
                Landmark: Opposite Agip Filling Station, Sapele Road.
              </p>

              <div className="mt-4 flex-1 min-h-[200px] rounded-xl overflow-hidden">
                <iframe
                  title="Chula Essence Location"
                  src="https://www.google.com/maps?q=Country+Home+Road+Benin+City+Edo+State&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Country+Home+Road+Benin+City+Edo+State"
                target="_blank"
                rel="noreferrer"
                className="mt-4 block text-center rounded-full border border-primary-pink px-4 py-2 font-body text-sm font-semibold text-primary-pink transition hover:bg-primary-pink hover:text-white"
              >
                View on Map
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
