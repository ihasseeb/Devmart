import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const allProducts = [
  {
    id: 1,
    name: "Laptop Pro",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "iPhone 15",
    category: "Phones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Nike Shoes",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: 'Samsung TV 55"',
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Headphones Pro",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Samsung Galaxy S24",
    category: "Phones",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "iPad Pro",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Backpack",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    name: "Gaming Mouse",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    name: "Running Shoes",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop",
  },
  {
    id: 11,
    name: "Casual Shirt",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
  },
  {
    id: 12,
    name: "Cricket Bat",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop",
  },
  {
    id: 13,
    name: "Football",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=300&fit=crop",
  },
  {
    id: 14,
    name: "Yoga Mat",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1601925228008-d0e86e38a450?w=400&h=300&fit=crop",
  },
  {
    id: 15,
    name: "Blender",
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop",
  },
  {
    id: 16,
    name: "Rice Cooker",
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop",
  },
  {
    id: 17,
    name: "Clean Code",
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
  },
  {
    id: 18,
    name: "Atomic Habits",
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
  },
  {
    id: 19,
    name: "Perfume",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=300&fit=crop",
  },
  {
    id: 20,
    name: "Lego Set",
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=300&fit=crop",
  },
];

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
