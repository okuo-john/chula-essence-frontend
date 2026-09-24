import { useState, useEffect, useMemo } from "react";
import { bookingApi } from "../../services/bookingApi";
import ServiceListCard from "../../components/customer/ServiceListCard";
import { LoadingServiceCards } from "../../components/common/SkeletonLoader";
import RitualBackdrop from "../../components/common/RitualBackdrop";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      setError(null);
      try {
        const data = await bookingApi.getServices();
        setServices(data);
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't load services.");
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(services.map((s) => s.category))];
    return ["All", ...unique];
  }, [services]);

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <RitualBackdrop
      aside={
        <div className="ritual-reveal">
          <span className="ritual-aside-mark">*</span>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500">Chula Essence</p>
          <p className="mt-3 font-heading text-2xl leading-tight text-gray-900">A little care goes a long way.</p>
          <p className="mt-4 text-sm leading-6">Find the ritual that fits your mood, then let us handle the details.</p>
        </div>
      }
    >
      <div className="ritual-reveal">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-500">The menu of self-care</p>
        <h1 className="mt-3 font-heading text-4xl leading-tight text-gray-900 sm:text-5xl">Your next beautiful moment starts here.</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
          Browse everything we offer and build a care session that feels entirely yours.
        </p>
      </div>

      {loading && <LoadingServiceCards count={6} />}

      {error && <p className="mt-8 text-sm text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {categories.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {filteredServices.length === 0 ? (
            <p className="mt-8 text-sm text-gray-400">No services in this category yet.</p>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredServices.map((service) => (
                <ServiceListCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </>
      )}
    </RitualBackdrop>
  );
}