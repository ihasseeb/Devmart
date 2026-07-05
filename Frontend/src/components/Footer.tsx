const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-auto border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 — Brand */}
        <div>
          <h2 className="text-gray-800 text-xl font-bold mb-3">🛒 DevMart</h2>
          <p className="text-sm leading-relaxed text-gray-500">
            Your one-stop shop for quality products, fast delivery, and the best
            prices.
          </p>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3 text-sm uppercase tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/"
                className="hover:text-blue-600 transition duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:text-blue-600 transition duration-200"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-blue-600 transition duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/cart"
                className="hover:text-blue-600 transition duration-200"
              >
                Cart
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3 text-sm uppercase tracking-wider">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>📧 ihaseeb0085@gmail.com</li>
            <li>📞 +92 3420085940</li>
            <li>📍 Islamabad, Pakistan</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© 2026 DevMart. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Built by <span className="text-blue-500 font-medium">Haseebi</span>{" "}
            💙
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
