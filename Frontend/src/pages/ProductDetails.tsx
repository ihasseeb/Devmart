import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { allProducts } from "../Data/ProductData";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //   const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Product dhundo
  const product = allProducts.find((p) => p.id === Number(id));

  // Product nahi mila
  if (!product) {
    return (
      <div className="text-center py-24">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Product not found!
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      //   addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 })
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition mb-8 text-sm"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left — Image */}
        <div>
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Right — Details */}
        <div>
          {/* Category */}
          <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
            {product.category}
          </span>

          {/* Name */}
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {"⭐".repeat(Math.round(product.rating))}
            </div>
            <span className="text-gray-600 font-semibold">
              {product.rating}
            </span>
            <span className="text-gray-400 text-sm">(128 reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-blue-600">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 font-bold transition"
              >
                -
              </button>
              <span className="w-6 text-center font-semibold text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 font-bold transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 rounded-xl font-semibold transition duration-200 active:scale-95 ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {added ? "✅ Added to Cart!" : "🛒 Add to Cart"}
            </button>
            <button className="flex-1 py-3 rounded-xl font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition duration-200">
              Buy Now
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-xl mb-1">🚚</p>
              <p className="text-xs text-gray-600 font-medium">Free Delivery</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-xl mb-1">↩️</p>
              <p className="text-xs text-gray-600 font-medium">Easy Returns</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-xl mb-1">🔒</p>
              <p className="text-xs text-gray-600 font-medium">
                Secure Payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
