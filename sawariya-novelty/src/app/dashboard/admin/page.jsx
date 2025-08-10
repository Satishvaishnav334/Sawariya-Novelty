'use client'

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUserDataContext } from '@/components/context/UserContext';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';

function AdminDashboard() {
  const { products, categories, user } = useUserDataContext();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // name | price | stock

  // Filtering and sorting
  const filteredProducts = useMemo(() => {
    return products
      ?.filter((p) =>
        p?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      ?.sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'stock') return a.stock - b.stock;
        return a.name.localeCompare(b.name);
      });
  }, [products, searchTerm, sortBy]);

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert("Product deleted successfully!");
        window.location.reload();
      } else {
        alert("Failed to delete product.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col items-center justify-start w-full p-4'>
      <h1 className='text-2xl font-bold my-4'>Welcome Back {user?.name}</h1>

      {/* Add Product Button */}
      <div className='flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow my-5 w-full'>
        <Link href='/dashboard/admin/manage-products/add-product' className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
          Add New Product
        </Link>
      </div>
      <div className='flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow my-5 w-full'>
        <Link href='/dashboard/admin/manage-categories/add-categorie' className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
          Add New Categories
        </Link>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex gap-4 w-full mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="stock">Sort by Stock</option>
        </select>
      </div>

      {/* Products Table */}
      <Table>
        <TableCaption>My Products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts?.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                {product.images?.[0]?.url ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>₹{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category?.name}</TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => router.push(`/dashboard/admin/edit-product/${product._id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Categories Table */}
      <Table className="mt-8">
        <TableCaption>All Categories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((cat) => (
            <TableRow key={cat._id}>
              <TableCell>{cat.name}</TableCell>
              <TableCell>{cat.description}</TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => router.push(`/dashboard/admin/edit-category/${cat._id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminDashboard;
