// src/pages/Home.jsx
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    title: "Matte Lipstick",
    price: "₹299",
    image: "/mat-lip.jpeg",
  },
  {
    id: 2,
    title: "Nail Polish Set",
    price: "₹499",
    image: "/nail-polish.jpeg",
  },
  {
    id: 3,
    title: "Fragrance Perfume",
    price: "₹899",
    image: "/perfume.jpeg",
  },
];

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
              Glam Up with <span className="text-indigo-600">E-Shop</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Explore the finest collection of imitation cosmetics & beauty essentials made for you.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-md bg-indigo-600 text-white font-medium shadow-lg"
            >
              Shop Now
            </motion.button>
          </motion.div>

          <motion.img
            src="/cosmetic-banner.jpeg"
            alt="cosmetic-banner"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="rounded-xl shadow-xl w-full max-w-sm"
          />
        </div>
      </section>

      {/* Category Strip */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {["Lipsticks", "Fragrances", "Skin Care", "Nails"].map((cat, idx) => (
            <motion.div
              key={cat}
              whileHover={{ y: -4 }}
              className="cursor-pointer group"
            >
              <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl font-bold group-hover:bg-indigo-600 group-hover:text-white transition">
                {cat[0]}
              </div>
              <p className="mt-2 font-medium text-gray-700 group-hover:text-indigo-600 transition">{cat}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
