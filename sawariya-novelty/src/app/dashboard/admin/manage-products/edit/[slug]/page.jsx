"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function EditProductPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    images: [],
    sizes: [],
    colors: [],
    isFeatured: false,
    isActive: true,
  });

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get(`/api/get-products/${slug}`),
          axios.get("/api/categories"),
        ]);
        setForm(productRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);
console.log(form)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/api/get-products/${slug}`, form);
      toast.success("Product updated successfully");
      router.push("/dashboard/admin/products");
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-medium mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block font-medium mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sizes */}
        <div>
          <label className="block font-medium mb-1">Sizes (comma separated)</label>
          <input
            type="text"
            name="sizes"
            value={form.sizes.join(", ")}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                sizes: e.target.value.split(",").map((s) => s.trim()),
              }))
            }
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Colors */}
        <div>
          <label className="block font-medium mb-1">Colors (comma separated)</label>
          <input
            type="text"
            name="colors"
            value={form.colors.join(", ")}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                colors: e.target.value.split(",").map((c) => c.trim()),
              }))
            }
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {form.images.map((img, idx) => (
              <div key={idx} className="relative w-20 h-20">
                <img
                  src={img.url}
                  alt="preview"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
            />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
