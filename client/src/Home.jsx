import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const HeroSection = () => (
  <section className="w-full flex justify-center h-100 bg-pink-500 "
>
    <div className=" bg-no-repeat h-100 w-50 bg-cover p-20 flex flex-col gap-5 text-white"  style={{ backgroundImage: `url('../public/sawariyaji.jpg')` ,width:"50%"}}>
</div>
 <div className=" bg-no-repeat h-100 w-50 bg-cover p-20 flex flex-col gap-5 text-white"  >
    <motion.h1
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-6xl font-bold  mb-4"
      >
      Welcome to Sawariya Novelty
    </motion.h1>
    <p className=" text-lg md:text-xl mb-6">
      Your destination for premium cosmetics & skincare products.
    </p>
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link to="/products" className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold">
        Shop Now
      </Link>
    </motion.div>
        
          </div>
  </section>
);

const OfferSection = () => (
  <section className="py-16 bg-white text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-10">Exclusive Offers</h2>
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
      {[1, 2, 3].map((offer) => (
        <motion.div
          key={offer}
          whileHover={{ scale: 1.05 }}
          className="bg-pink-50 p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold text-pink-700 mb-2">Offer Title {offer}</h3>
          <p className="text-gray-600 mb-4">Get 20% off on your first order. Limited time offer!</p>
          <Link to="/products" className="text-pink-600 font-medium hover:underline">
            Explore Now
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

const ProductHighlight = () => (
  <section className="bg-gray-50 py-16">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Best Sellers</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg"
          >
            <div className="bg-pink-200 h-40 mb-4 rounded-md" />
            <h4 className="text-lg font-semibold text-gray-800">Product {item}</h4>
            <p className="text-gray-600 text-sm mt-1">Hydrating Lip Gloss</p>
            <p className="text-pink-600 font-bold mt-2">₹499</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <OfferSection />
      <ProductHighlight />
    </div>
  );
};

export default HomePage;