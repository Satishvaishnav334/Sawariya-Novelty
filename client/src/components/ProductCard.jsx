// src/components/ProductCard.jsx
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <p className="text-indigo-600 font-medium mt-2">{product.price}</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
