import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { allProducts } from "../Data/ProductData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  LogOut,
  Settings,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Suggestions filter
  const suggestions = allProducts
    .filter(
      (p) =>
        p.name.toLowerCase().startsWith(search.toLowerCase()) && search.trim(),
    )
    .slice(0, 5);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/products?search=${search.trim()}`);
      setSearch("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name: string) => {
    navigate(`/products?search=${name}`);
    setSearch("");
    setShowSuggestions(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsOpen(false);
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/products", label: "Products" },
    { path: "/cart", label: "Cart" },
  ];

  return (
    <>
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
      <nav className="bg-white/90 backdrop-blur-md text-gray-800 sticky top-0 z-50 border-b border-gray-100/80 shadow-sm transition-all duration-200">
        <div className="w-full px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-blue-600 flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="text-2xl">🛒</span>
            <span>DevMart</span>
          </Link>

          {/* Right Side Group */}
          <div className="flex items-center gap-8 lg:gap-12">
            {/* Nav Links with sliding animated underline */}
            <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path} className="relative py-2">
                    <Link
                      to={link.path}
                      className={`transition duration-200 ${
                        isActive ? "text-blue-600" : "hover:text-blue-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {isActive && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Search Bar */}
            <div className="hidden md:flex flex-col relative">
              <div className="flex items-center bg-gray-100 border border-gray-200/60 rounded-full px-4 py-2 gap-2.5 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/10 transition-all duration-200">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={handleSearch}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  className="bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none w-44 focus:w-56 transition-all duration-300"
                />
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-12 left-0 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden py-1"
                  >
                    {suggestions.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSuggestionClick(product.name)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50/50 cursor-pointer transition"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg border border-gray-100"
                        />
                        <div className="overflow-hidden">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm shadow-blue-500/20"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Logged Out — Login / Signup Links */}
              {!isAuthenticated && (
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Logged In — User Dropdown */}
              {isAuthenticated && (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer font-medium text-sm"
                  >
                    <User className="h-5 w-5" />
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden py-1"
                      >
                        {/* Header */}
                        <div className="bg-blue-50/50 px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-bold text-gray-800">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                          </p>
                        </div>

                        {/* Options */}
                        <div className="py-1">
                          <Link
                            to="/profile"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50/50 transition font-medium"
                          >
                            <User className="w-4 h-4 text-gray-500" /> Account
                          </Link>
                          {user?.role === "admin" && (
                            <Link
                              to="/admin"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50/50 transition font-medium"
                            >
                              <Settings className="w-4 h-4 text-gray-500" />{" "}
                              Admin Dashboard
                            </Link>
                          )}
                          {user?.role === "user" && (
                            <Link
                              to="/orders"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50/50 transition font-medium"
                            >
                              <Settings className="w-4 h-4 text-gray-500" /> My
                              Orders
                            </Link>
                          )}
                          <hr className="my-1 border-gray-100" />
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition font-semibold"
                          >
                            <LogOut className="w-4 h-4 text-red-500" /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5 overflow-hidden"
            >
              {/* Mobile Search */}
              <div className="flex items-center bg-gray-100 border border-gray-200/60 rounded-full px-4 py-2.5 gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearch}
                  className="bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none w-full"
                />
              </div>

              {/* Mobile Links */}
              <ul className="flex flex-col gap-4 text-sm font-semibold text-gray-700">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={`block py-1.5 transition ${
                          isActive
                            ? "text-blue-600 font-bold"
                            : "hover:text-blue-600"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <hr className="border-gray-100" />

              {/* Logged Out — Mobile Login/Signup */}
              {!isAuthenticated && (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center text-sm font-semibold text-gray-700 border border-gray-200 py-2 rounded-full hover:bg-gray-50 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="text-center text-sm font-semibold bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Logged In — Mobile User Info */}
              {isAuthenticated && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition mt-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
