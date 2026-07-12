import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  index?: number;
}

const ProductCard = ({
  id,
  name,
  price,
  category,
  rating,
  image,
  index = 0,
}: ProductCardProps) => {
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    addToCart({ id, name, price, image, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // Reset after 1.5 seconds
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{
        y: -4,
        boxShadow:
          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      }}
      className="bg-white rounded-2xl border border-gray-100 shadow-md flex flex-col h-full cursor-pointer relative group overflow-hidden"
      onClick={() => navigate(`/product/${id}`)}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl bg-gray-50">
        {image && (
          <img
            src={image}
            alt={name}
            onError={(e) => {
              const img = e.currentTarget;
              img.onerror = null; // ✅ loop rokne ke liye — dobara trigger nahi hoga
              img.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%239ca3af' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Category Badge (Top-Left) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-primary text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wide">
            {category || "Unknown"}
          </span>
        </div>

        {/* Wishlist Icon (Top-Right) */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-sm hover:scale-110 transition-transform active:scale-95"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${wishlisted ? "fill-accent text-accent" : "text-gray-400 hover:text-gray-600"}`}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 text-lg leading-snug line-clamp-2">
          {name || "Product"}
        </h3>

        <div className="flex items-center gap-1.5 mt-2 mb-4">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-gray-600">
            {rating || 0}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xl font-bold text-gray-900">
            ${price ? price.toLocaleString() : "0"}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white shadow-md transition-colors ${
              added ? "bg-success" : "bg-accent hover:bg-accent-hover"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {added ? "Added!" : "Add"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
