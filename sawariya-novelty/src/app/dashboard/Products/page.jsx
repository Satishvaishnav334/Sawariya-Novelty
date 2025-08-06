'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductShowPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/get-products');
        setProducts(res.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-full px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">Product Catalog</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={product?.images?.[0]?.url || '/placeholder.png'}
                alt={product?.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{product?.category?.title || 'Uncategorized'}</p>
                <div className="mt-2 text-lg font-bold text-green-600">₹{product.price}</div>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Added on: {formatDate(product.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductShowPage;

// Format date
function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
