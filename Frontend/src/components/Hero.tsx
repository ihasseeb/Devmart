import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-28 flex flex-col items-center text-center">
        {/* Badge */}
        <span className="bg-blue-100 border border-blue-300 text-blue-700 text-xs font-medium px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">
          🎉 New Arrivals Every Week
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 max-w-3xl">
          Your One-Stop Shop for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Everything You Need
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          Discover thousands of products with the best prices, fast delivery,
          and a seamless shopping experience.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/products">
            <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 active:scale-95 transition duration-200 shadow-lg cursor-pointer">
              🛒 Shop Now
            </button>
          </Link>

          <Link to="/products">
            <button className="border-2 border-gray-300 text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 active:scale-95 transition duration-200 cursor-pointer">
              Browse Products →
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 md:gap-16">
          <div>
            <p className="text-3xl font-bold text-gray-900">10K+</p>
            <p className="text-gray-600 text-sm mt-1">Products</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">50K+</p>
            <p className="text-gray-600 text-sm mt-1">Customers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">4.9⭐</p>
            <p className="text-gray-600 text-sm mt-1">Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
