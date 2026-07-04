import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-200 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-28 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-100 border border-blue-200 text-blue-600 text-xs font-medium px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase"
        >
          🎉 New Arrivals Every Week
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 max-w-3xl text-gray-900"
        >
          Your One-Stop Shop for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
            Everything You Need
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-500 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        >
          Discover thousands of products with the best prices, fast delivery,
          and a seamless shopping experience.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* Shop Now */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/products"
              className="block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition duration-200 shadow-lg cursor-pointer"
            >
              🛒 Shop Now
            </Link>
          </motion.div>

          {/* Browse Products */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/products"
              className="block border-2 border-blue-600 text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition duration-200 cursor-pointer"
            >
              Browse Products →
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 md:gap-16">
          {[
            { value: "10K+", label: "Products", x: -80 },
            { value: "50K+", label: "Customers", x: 0 },
            { value: "4.9⭐", label: "Rating", x: 80 },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: stat.x }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
