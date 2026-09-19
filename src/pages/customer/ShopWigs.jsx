// import { wigs } from "../../utils/mockWigs";
// import WigCard from "../../components/products/WigCard";

// const ShopWigs = () => {
//   return (
//     <section className="bg-white py-16 lg:py-24">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="text-center mb-12">
//           <h1 className="font-heading text-3xl lg:text-4xl text-chula-black">
//             Shop All Wigs
//           </h1>
//           <p className="mt-3 font-body text-gray-600">
//             High quality wigs for every queen
//           </p>
//         </div>

//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//           {wigs.map((wig) => (
//             <WigCard key={wig.id} wig={wig} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ShopWigs;

import { useState, useEffect, useMemo } from "react";
import { productApi } from "../../services/productApi";
import ProductCard from "../../components/products/ProductCard";

export default function ShopWigs() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      try {
        const data = await productApi.getAll();
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't load products.");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(products.filter((p) => p.category).map((p) => p.category))];
    return ["All", ...unique];
  }, [products]);

  const filteredProducts =
    activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  function handleAddToCart(product) {
    // Cart isn't wired up yet — placeholder for now.
    console.log("Add to cart:", product);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">Shop Wigs</h1>
      <p className="mt-2 text-sm text-gray-500">
        Browse our wig collection and get one delivered to you.
      </p>

      {loading && <p className="mt-8 text-sm text-gray-400">Loading products...</p>}

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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <p className="mt-8 text-sm text-gray-400">No products in this category yet.</p>
          ) : (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}