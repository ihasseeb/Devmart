const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        {/*logo*/}
        <span className="text-xl font-bold tracking-wide">🛒 DevMart</span>

        {/* Right Side Group */}
        <div className="flex items-center gap-20">
          {/*Navlinks*/}
          <ul className="hidden md:flex gap-8 text-sm font-medium">
            <li>
              <a
                href="/"
                className="hover:text-blue-300 transition duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:text-blue-300 transition duration-200"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-blue-300 transition duration-200"
              >
                About
              </a>
            </li>
          </ul>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-blue-800 rounded-lg px-3 py-1.5 gap-2">
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
              className="bg-transparent text-sm text-white placeholder-blue-300 outline-none w-40"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <button className="relative hover:text-blue-300 transition">
              🛒
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* User */}
            <button className="hover:text-blue-300 transition">👤</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
