import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { allProducts } from "../Data/ProductData";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  // Suggestions filter karo
  const suggestions = allProducts
    .filter(
      (p) =>
        p.name.toLowerCase().startsWith(search.toLowerCase()) && search.trim(),
    )
    .slice(0, 5); // max 5 suggestions

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

  return (
    <>
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
      <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="w-full px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-wide">
            🛒 DevMart
          </Link>

          {/* Right Side Group */}
          <div className="flex items-center gap-6 md:gap-20">
            {/* Nav Links */}
            <ul className="hidden md:flex gap-8 text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-300 transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-300 transition duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-blue-300 transition duration-200"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-blue-300 transition duration-200"
                >
                  Cart
                </Link>
              </li>
            </ul>

            {/* Search Bar */}
            <div className="hidden md:flex flex-col relative">
              <div className="flex items-center bg-blue-800 rounded-lg px-3 py-1.5 gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
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
                  className="bg-transparent text-sm text-white placeholder-blue-300 outline-none w-40"
                />
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-10 left-0 w-64 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
                  {suggestions.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSuggestionClick(product.name)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 cursor-pointer transition"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-8 h-8 object-cover rounded-md"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {product.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <Link
                to="/cart"
                className="relative hover:text-blue-300 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-10H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {/* User Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="hover:text-blue-300 transition cursor-pointer flex items-center gap-1"
                >
                  👤
                  <span className="text-xs">▾</span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-50 px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        Haseebi
                      </p>
                      <p className="text-xs text-gray-400">
                        haseebi@devmart.com
                      </p>
                    </div>

                    {/* Options */}
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition"
                      >
                        <span>👤</span> Account
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition"
                      >
                        <span>⚙️</span> Settings
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={() => setShowUserMenu(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                      >
                        <span>🔒</span> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="md:hidden flex flex-col gap-1.5"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-blue-800 px-6 py-4 flex flex-col gap-4">
            {/* Mobile Search */}
            <div className="flex items-center bg-blue-700 rounded-lg px-3 py-2 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                className="bg-transparent text-sm text-white placeholder-blue-300 outline-none w-full"
              />
            </div>

            {/* Mobile Links */}
            <ul className="flex flex-col gap-3 text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="block hover:text-blue-300 transition"
                  onClick={() => setIsOpen(false)}
                >
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block hover:text-blue-300 transition"
                  onClick={() => setIsOpen(false)}
                >
                  📦 Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="block hover:text-blue-300 transition"
                  onClick={() => setIsOpen(false)}
                >
                  🛒 Cart
                </Link>
              </li>
            </ul>
            <button className="text-left text-sm hover:text-blue-300 transition">
              👤 Profile
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
