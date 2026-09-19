import { useState, useEffect } from "react";

const EMPTY_FORM = {
  product_name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  isAvailable: true,
};

export default function ProductForm({ initialValue, onSubmit, onCancel, isSaving }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (initialValue) {
      setForm({
        product_name: initialValue.product_name ?? "",
        description: initialValue.description ?? "",
        price: initialValue.price ?? "",
        category: initialValue.category ?? "",
        stock: initialValue.stock ?? "",
        isAvailable: initialValue.isAvailable ?? true,
      });
      setPreviewUrl(initialValue.image ?? null);
    } else {
      setForm(EMPTY_FORM);
      setPreviewUrl(null);
    }
    setFile(null);
  }, [initialValue]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileChange(e) {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(
      {
        product_name: form.product_name,
        description: form.description || undefined,
        price: Number(form.price),
        category: form.category || undefined,
        stock: Number(form.stock),
        isAvailable: form.isAvailable,
      },
      file
    );
  }

  const isValid =
    form.product_name.trim() &&
    form.price !== "" &&
    form.stock !== "" &&
    (initialValue || file); // new products require an image; edits can keep the existing one

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Product Name</label>
          <input
            type="text"
            value={form.product_name}
            onChange={(e) => handleChange("product_name", e.target.value)}
            placeholder="e.g. Bone Straight Wig"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Category</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            placeholder="e.g. Wigs"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Price (₦)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="25000"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">Stock</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => handleChange("stock", e.target.value)}
            placeholder="10"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1.5">
            Product Image {initialValue && "(leave empty to keep current image)"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-pink-50 file:text-pink-600 file:text-sm file:font-medium hover:file:bg-pink-100"
          />
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="mt-3 w-24 h-24 object-cover rounded-lg border border-gray-100" />
          )}
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.isAvailable}
          onChange={(e) => handleChange("isAvailable", e.target.checked)}
          className="rounded border-gray-300 text-pink-500 focus:ring-pink-300"
        />
        Available for purchase
      </label>

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={!isValid || isSaving}
          className="px-5 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : initialValue ? "Update Product" : "Add Product"}
        </button>
        {initialValue && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}