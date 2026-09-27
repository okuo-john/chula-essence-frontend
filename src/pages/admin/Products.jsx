import { useState, useEffect } from "react";
import { productApi } from "../../services/productApi";
import ProductForm from "../../components/admin/ProductForm";
import ProductTable from "../../components/admin/ProductTable";
import ProductDetailModal from "../../components/admin/ProductDetailModal";
import { LoadingTableSkeleton } from "../../components/common/SkeletonLoader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  function openAddForm() {
    setEditingProduct(null);
    setIsFormOpen(true);
  }

  function openEditForm(product) {
    setSelectedProduct(null);
    setEditingProduct(product);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingProduct(null);
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
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't save product.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    setError(null);
    setActionLoading("delete");
    try {
      await productApi.remove(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setSelectedProduct(null);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't delete product.");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        {!isFormOpen && (
          <button
            type="button"
            onClick={openAddForm}
            className="px-5 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 transition"
          >
            + Add Product
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      {isFormOpen && (
        <ProductForm
          initialValue={editingProduct}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          isSaving={isSaving}
        />
      )}

      {loading ? (
        <LoadingTableSkeleton rows={5} columns={5} />
      ) : (
        <ProductTable products={products} onSelect={setSelectedProduct} />
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onEdit={openEditForm}
          onDelete={handleDelete}
          onClose={() => setSelectedProduct(null)}
          actionLoading={actionLoading}
        />
      )}
    </div>
  );
}