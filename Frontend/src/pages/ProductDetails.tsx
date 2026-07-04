import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

// Same products data — baad mein API se aayega
const allProducts = [
  {
    id: 1,
    name: "Laptop Pro",
    price: 80000,
    category: "Electronics",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    description:
      "High performance laptop with latest processor, 16GB RAM, 512GB SSD. Perfect for developers and designers.",
    stock: 10,
  },
  {
    id: 2,
    name: "iPhone 15",
    price: 120000,
    category: "Phones",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    description:
      "Latest iPhone with A17 Pro chip, 48MP camera, and Dynamic Island. Best smartphone experience.",
    stock: 15,
  },
  {
    id: 3,
    name: "Nike Shoes",
    price: 15000,
    category: "Fashion",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    description:
      "Premium Nike running shoes with air cushioning. Comfortable for daily use and sports.",
    stock: 20,
  },
  {
    id: 4,
    name: 'Samsung TV 55"',
    price: 95000,
    category: "Electronics",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
    description:
      "55 inch 4K QLED Smart TV with HDR support and built-in streaming apps.",
    stock: 5,
  },
  {
    id: 5,
    name: "Headphones Pro",
    price: 8000,
    category: "Electronics",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    description:
      "Wireless noise cancelling headphones with 30 hours battery life.",
    stock: 25,
  },
  {
    id: 6,
    name: "Samsung Galaxy S24",
    price: 85000,
    category: "Phones",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
    description:
      "Flagship Android phone with Snapdragon 8 Gen 3, 200MP camera and AI features.",
    stock: 12,
  },
  {
    id: 7,
    name: "iPad Pro",
    price: 150000,
    category: "Electronics",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    description:
      "M2 iPad Pro with Liquid Retina XDR display, perfect for creative professionals.",
    stock: 8,
  },
  {
    id: 8,
    name: "Backpack",
    price: 5000,
    category: "Fashion",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    description:
      "Durable waterproof backpack with laptop compartment and USB charging port.",
    stock: 30,
  },
  {
    id: 9,
    name: "Gaming Mouse",
    price: 6000,
    category: "Electronics",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    description:
      "High precision gaming mouse with 25600 DPI, RGB lighting and 8 programmable buttons.",
    stock: 18,
  },
  {
    id: 10,
    name: "Running Shoes",
    price: 12000,
    category: "Fashion",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop",
    description:
      "Lightweight running shoes with breathable mesh and responsive foam sole.",
    stock: 22,
  },
  {
    id: 11,
    name: "Casual Shirt",
    price: 3000,
    category: "Fashion",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
    description:
      "Premium cotton casual shirt, available in multiple colors. Perfect for everyday wear.",
    stock: 40,
  },
  {
    id: 12,
    name: "Leather Wallet",
    price: 2500,
    category: "Fashion",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop",
    description:
      "Genuine leather wallet with multiple card slots and RFID protection.",
    stock: 35,
  },
  {
    id: 13,
    name: "Cricket Bat",
    price: 4500,
    category: "Sports",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop",
    description:
      "Professional grade cricket bat made from premium English willow.",
    stock: 15,
  },
  {
    id: 14,
    name: "Football",
    price: 2000,
    category: "Sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=300&fit=crop",
    description:
      "FIFA approved match ball with durable outer casing and consistent flight.",
    stock: 28,
  },
  {
    id: 15,
    name: "Yoga Mat",
    price: 3000,
    category: "Sports",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1601925228008-d0e86e38a450?w=400&h=300&fit=crop",
    description:
      "Non-slip yoga mat with alignment lines, 6mm thick for joint support.",
    stock: 20,
  },
  {
    id: 16,
    name: "Blender",
    price: 8000,
    category: "Home & Kitchen",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop",
    description:
      "High power blender with 6 stainless steel blades, ideal for smoothies and soups.",
    stock: 12,
  },
  {
    id: 17,
    name: "Rice Cooker",
    price: 6500,
    category: "Home & Kitchen",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop",
    description:
      "Automatic rice cooker with keep-warm function, 1.8L capacity.",
    stock: 16,
  },
  {
    id: 18,
    name: "Sofa Set",
    price: 45000,
    category: "Home & Kitchen",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    description:
      "Premium 5-seater sofa set with velvet upholstery and solid wood frame.",
    stock: 4,
  },
  {
    id: 19,
    name: "Clean Code",
    price: 2500,
    category: "Books",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
    description:
      "Robert C. Martin's classic guide to writing clean, maintainable code. Must read for developers.",
    stock: 50,
  },
  {
    id: 20,
    name: "Atomic Habits",
    price: 1800,
    category: "Books",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    description:
      "James Clear's bestseller on building good habits and breaking bad ones.",
    stock: 45,
  },
  {
    id: 21,
    name: "Perfume",
    price: 5000,
    category: "Beauty",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=300&fit=crop",
    description:
      "Long lasting premium fragrance with notes of oud, sandalwood and rose. 100ml bottle.",
    stock: 20,
  },
  {
    id: 22,
    name: "Skincare Kit",
    price: 3500,
    category: "Beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
    description:
      "Complete skincare routine kit including cleanser, toner, serum and moisturizer.",
    stock: 18,
  },
  {
    id: 23,
    name: "Lego Set",
    price: 8000,
    category: "Toys",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=300&fit=crop",
    description:
      "Creative Lego building set with 500+ pieces. Great for kids aged 8 and above.",
    stock: 15,
  },
  {
    id: 24,
    name: "RC Car",
    price: 5500,
    category: "Toys",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop",
    description:
      "High speed remote control car with 4WD, 2.4GHz control and rechargeable battery.",
    stock: 10,
  },
];

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

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <div
              className={`w-2 h-2 rounded-full ${product.stock > 10 ? "bg-green-500" : "bg-orange-400"}`}
            />
            <span
              className={`text-sm font-medium ${product.stock > 10 ? "text-green-600" : "text-orange-500"}`}
            >
              {product.stock > 10 ? "In Stock" : `Only ${product.stock} left!`}
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
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
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
