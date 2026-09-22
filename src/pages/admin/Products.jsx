import { useState, useEffect } from "react";
import { productApi } from "../../services/productApi";
import ProductForm from "../../components/admin/ProductForm";
import ProductTable from "../../components/admin/ProductTable";
import { LoadingTableSkeleton } from "../../components/common/SkeletonLoader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

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

  async function handleSubmit(fields, file) {
    setIsSaving(true);
    setError(null);
    try {
      if (editingProduct) {
        const updated = await productApi.update(editingProduct._id, fields, file);
        setProducts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
      } else {
        const created = await productApi.create(fields, file);
        setProducts((prev) => [...prev, created]);
      }
      setEditingProduct(null);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't save product.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    setError(null);
    try {
      await productApi.remove(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't delete product.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Products</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <ProductForm
        initialValue={editingProduct}
        onSubmit={handleSubmit}
        onCancel={() => setEditingProduct(null)}
        isSaving={isSaving}
      />

      {loading ? (
        <LoadingTableSkeleton rows={5} columns={5} />
      ) : (
        <ProductTable products={products} onEdit={setEditingProduct} onDelete={handleDelete} />
      )}
    </div>
  );
}