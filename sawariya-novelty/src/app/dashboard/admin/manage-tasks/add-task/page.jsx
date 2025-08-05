'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductUploadPage() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  // Load categories from backend (optional)
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get('/api/get-categories'); // Update this route accordingly
        setAllCategories(res.data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', desc);
      formData.append('price', price);
      formData.append('brand', brand);
      formData.append('stock', stock);
      formData.append('category', category);
      formData.append('image', image);

      sizes.forEach(size => formData.append('sizes', size));
      colors.forEach(color => formData.append('colors', color));

      const res = await axios.post('/api/get-products', formData);
      console.log('Product created:', res.data);
      alert('Product uploaded successfully!');
      
      // Reset form
      setName('');
      setDesc('');
      setPrice('');
      setBrand('');
      setStock('');
      setCategory('');
      setImage(null);
      setSizes([]);
      setColors([]);
    } catch (err) {
      console.error('Product creation failed', err);
      alert('Failed to upload product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-2xl space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Upload Product</h2>

        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border p-2 w-full rounded"
          placeholder="Product Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="number"
          className="border p-2 w-full rounded"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Brand (optional)"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          type="number"
          className="border p-2 w-full rounded"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <select
          className="border p-2 w-full rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {allCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          className="border p-2 w-full rounded"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* Sizes and Colors */}
        <input
          type="text"
          placeholder="Add Size (e.g. M, L)"
          className="border p-2 w-full rounded"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setSizes([...sizes, e.target.value]);
              e.target.value = '';
            }
          }}
        />
        <div className="flex flex-wrap gap-2">
          {sizes.map((s, i) => (
            <span key={i} className="bg-blue-100 px-2 py-1 rounded">{s}</span>
          ))}
        </div>

        <input
          type="text"
          placeholder="Add Color (e.g. Red, #fff)"
          className="border p-2 w-full rounded"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setColors([...colors, e.target.value]);
              e.target.value = '';
            }
          }}
        />
        <div className="flex flex-wrap gap-2">
          {colors.map((c, i) => (
            <span key={i} className="bg-green-100 px-2 py-1 rounded">{c}</span>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
}

export default ProductUploadPage;
