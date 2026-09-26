import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ProductCard from "../../components/products/ProductCard";
import { LoadingProductCards } from "../../components/common/SkeletonLoader";
import { useFavorites } from "../../hooks/useFavorites";
import { productApi } from "../../services/productApi";

export default function Favorites() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const { favoriteIds } = useFavorites();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) return undefined;

    let active = true;
    productApi
      .getAll()
      .then((data) => {
        if (active) {
          const productList = Array.isArray(data) ? data : data.products ?? data.data ?? [];
          setProducts(productList);
        }
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.message || "Couldn't load your favorite products.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ redirectTo: "/favorites" }} />;
  }

  const favoriteProducts = products.filter((product) => favoriteIds.includes(product._id));

  return (
    <section className="mx-auto min-h-[60vh] max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-500">Saved for later</p>
          <h1 className="mt-2 font-heading text-3xl text-gray-900">Your Favorites</h1>
        </div>
        <span className="text-sm text-gray-500">{favoriteProducts.length} saved</span>
      </div>

      {loading && <div className="mt-8"><LoadingProductCards count={4} /></div>}
      {error && <p className="mt-8 text-sm text-red-500">{error}</p>}

      {!loading && !error && favoriteProducts.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {favoriteProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {!loading && !error && favoriteProducts.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-pink-200 bg-white p-10 text-center">
          <p className="text-gray-600">You haven’t saved any favorites yet.</p>
          <Link
            to="/shop-wigs"
            className="mt-5 inline-flex rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
          >
            Browse Wigs
          </Link>
        </div>
      )}
    </section>
  );
}