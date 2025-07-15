import React from "react";
import { motion } from "framer-motion";

const mockProducts = [
  {
    id: 1,
    name: "Rose Glow Serum",
    description: "Hydrating face serum for glowing skin.",
    price: "₹799",
    image: "https://source.unsplash.com/400x400/?cosmetic,serum"
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    description: "Long-lasting matte lipstick with smooth finish.",
    price: "₹499",
    image: "https://source.unsplash.com/400x400/?lipstick"
  },
  {
    id: 3,
    name: "Aloe Vera Moisturizer",
    description: "Soothing and hydrating skin moisturizer.",
    price: "₹599",
    image: "https://source.unsplash.com/400x400/?moisturizer"
  },
  {
    id: 4,
    name: "Charcoal Face Wash",
    description: "Deep cleansing face wash for oily skin.",
    price: "₹399",
    image: "https://source.unsplash.com/400x400/?facewash"
  }
];

const ShopPage = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Shop All Products</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {mockProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="bg-pink-50 p-4 rounded-lg shadow hover:shadow-lg text-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm my-2">{product.description}</p>
              <p className="text-pink-600 font-bold">{product.price}</p>
              <button className="mt-4 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
