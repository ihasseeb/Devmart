import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
}

const ProductCard = ({
  id,
  name,
  price,
  category,
  rating,
  image,
}: ProductCardProps) => {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    addToCart({ id, name, price, image, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // Reset after 1.5 seconds
  };

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {image && (
        <img
          src={image}
          alt={name || "Product"}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <span className="text-xs text-gray-400 uppercase tracking-wide">
          {category || "Unknown"}
        </span>
        <h3 className="font-semibold text-gray-900 mt-1 truncate">
          {name || "Product"}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-400 text-sm">⭐</span>
          <span className="text-sm text-gray-500">{rating || 0}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-blue-600 font-bold text-lg">
            Rs. {price ? price.toLocaleString() : "0"}
          </span>
          <button
            onClick={handleAddToCart}
            className={`text-sm px-3 py-1.5 rounded-lg transition duration-200 active:scale-95 ${
              added
                ? "bg-green-500 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {added ? "✅ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
