import { useState, useEffect, useMemo } from "react";
import { bookingApi } from "../../services/bookingApi";
import ServiceListCard from "../../components/customer/ServiceListCard";
import { LoadingServiceCards } from "../../components/common/SkeletonLoader";

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">Our Services</h1>
      <p className="mt-2 text-sm text-gray-500">
        Browse everything we offer and book the ones you need.
      </p>

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
    </div>
  );
}