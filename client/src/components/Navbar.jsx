import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const mockUser = {
  name: "Satish",
  isLoggedIn: true,
};

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Shop", to: "/products" },
  { name: "Profile", to: "/profile" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(mockUser.isLoggedIn ? mockUser : null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation(); // 👈 Get current route

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleAuth = () => setUser(user ? null : mockUser);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-wide">
          Sawariya Novelty
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Link
                  to={link.to}
                  className={`font-medium transition ${
                    isActive
                      ? "text-indigo-600 font-semibold"
                      : "text-gray-700 hover:text-indigo-600"
                  }`}
                >
                  {link.name}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-0 h-0.5 w-full bg-indigo-500 rounded"
                  />
                )}
              </motion.div>
            );
          })}

          <motion.div whileTap={{ scale: 0.9 }} className="relative">
            <FiShoppingCart className="text-xl text-gray-700 cursor-pointer hover:text-indigo-600" />
            <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </motion.div>

          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              <FiUser className="text-xl" />
            </motion.button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-36 bg-white shadow-md rounded-md z-10 overflow-hidden"
                >
                  {user ? (
                    <>
                      <p className="px-4 py-2 text-sm text-gray-600 border-b">Hi, {user.name}</p>
                      <button
                        onClick={handleAuth}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleAuth}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-green-600"
                    >
                      Login
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-white px-6 pb-4 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 font-medium transition ${
                  location.pathname === link.to
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-2 flex justify-between items-center">
              <motion.div whileTap={{ scale: 0.9 }} className="relative">
                <FiShoppingCart className="text-xl text-gray-700 cursor-pointer hover:text-indigo-600" />
                <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </motion.div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAuth}
                className="px-4 py-1 rounded-md text-sm font-medium bg-indigo-600 text-white"
              >
                {user ? "Logout" : "Login"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
