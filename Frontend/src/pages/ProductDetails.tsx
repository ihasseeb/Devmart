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
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-hover transition"
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
    <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-gray-700 transition mb-8 text-sm"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left — Image */}
        <div>
          <div className="rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 md:h-[450px] object-cover"
            />
          </div>
        </div>

        {/* Right — Details */}
        <div>
          {/* Category */}
          <span className="text-[10px] text-primary font-bold uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
            {product.category}
          </span>

          {/* Name */}
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-amber-400 gap-0.5 text-sm">
              {"⭐".repeat(Math.round(product.rating))}
            </div>
            <span className="text-gray-800 font-bold text-sm ml-1">
              {product.rating}
            </span>
            <span className="text-gray-400 text-xs font-medium">
              (128 reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-primary">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-gray-700 font-medium text-sm">Quantity:</span>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-2 py-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 font-bold transition rounded-md"
              >
                -
              </button>
              <span className="w-8 text-center font-semibold text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 font-bold transition rounded-md"
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
                  ? "bg-success text-white"
                  : "bg-accent text-white hover:bg-accent-hover"
              }`}
            >
              {added ? "✅ Added to Cart!" : "🛒 Add to Cart"}
            </button>
            <button className="flex-1 py-3 rounded-xl font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition duration-200">
              ⚡ Buy Now
            </button>
          </div>

          {/* Features */}
          <div className="mt-10 flex items-center gap-10">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-xl mb-2">🚚</p>
              <p className="text-[10px] text-gray-600 font-semibold">Free Delivery</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-xl mb-2">↩️</p>
              <p className="text-[10px] text-gray-600 font-semibold">Easy Returns</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-xl mb-2">🔒</p>
              <p className="text-[10px] text-gray-600 font-semibold">Secure Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
