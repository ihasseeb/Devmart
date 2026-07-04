import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCards";

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
}

// Fake Data — baad mein API se aayega
const allProducts: Product[] = [
  // Electronics
  {
    id: 1,
    name: "Laptop Pro",
    price: 80000,
    category: "Electronics",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: 'Samsung TV 55"',
    price: 95000,
    category: "Electronics",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Headphones Pro",
    price: 8000,
    category: "Electronics",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "iPad Pro",
    price: 150000,
    category: "Electronics",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    price: 6000,
    category: "Electronics",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
  },

  // Phones
  {
    id: 6,
    name: "iPhone 15",
    price: 120000,
    category: "Phones",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Samsung Galaxy S24",
    price: 85000,
    category: "Phones",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Xiaomi 13 Pro",
    price: 65000,
    category: "Phones",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop",
  },

  // Fashion
  {
    id: 9,
    name: "Nike Shoes",
    price: 15000,
    category: "Fashion",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    name: "Backpack",
    price: 5000,
    category: "Fashion",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
  },
  {
    id: 11,
    name: "Running Shoes",
    price: 12000,
    category: "Fashion",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop",
  },
  {
    id: 12,
    name: "Casual Shirt",
    price: 3000,
    category: "Fashion",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
  },
  {
    id: 13,
    name: "Leather Wallet",
    price: 2500,
    category: "Fashion",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop",
  },

  // Sports
  {
    id: 14,
    name: "Cricket Bat",
    price: 4500,
    category: "Sports",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop",
  },
  {
    id: 15,
    name: "Football",
    price: 2000,
    category: "Sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=300&fit=crop",
  },
  {
    id: 16,
    name: "Gym Gloves",
    price: 1500,
    category: "Sports",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
  },
  {
    id: 17,
    name: "Yoga Mat",
    price: 3000,
    category: "Sports",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1601925228008-d0e86e38a450?w=400&h=300&fit=crop",
  },

  // Home & Kitchen
  {
    id: 18,
    name: "Blender",
    price: 8000,
    category: "Home & Kitchen",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop",
  },
  {
    id: 19,
    name: "Rice Cooker",
    price: 6500,
    category: "Home & Kitchen",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop",
  },
  {
    id: 20,
    name: "Sofa Set",
    price: 45000,
    category: "Home & Kitchen",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
  },
  {
    id: 21,
    name: "Table Lamp",
    price: 3500,
    category: "Home & Kitchen",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
  },

  // Books
  {
    id: 22,
    name: "Clean Code",
    price: 2500,
    category: "Books",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
  },
  {
    id: 23,
    name: "Atomic Habits",
    price: 1800,
    category: "Books",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
  },
  {
    id: 24,
    name: "JavaScript Guide",
    price: 3000,
    category: "Books",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
  },

  // Beauty
  {
    id: 25,
    name: "Perfume",
    price: 5000,
    category: "Beauty",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=300&fit=crop",
  },
  {
    id: 26,
    name: "Skincare Kit",
    price: 3500,
    category: "Beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
  },
  {
    id: 27,
    name: "Lipstick Set",
    price: 2000,
    category: "Beauty",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1586495777744-4e6232a5a0e9?w=400&h=300&fit=crop",
  },

  // Toys
  {
    id: 28,
    name: "Lego Set",
    price: 8000,
    category: "Toys",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=300&fit=crop",
  },
  {
    id: 29,
    name: "RC Car",
    price: 5500,
    category: "Toys",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop",
  },
  {
    id: 30,
    name: "Board Game",
    price: 3000,
    category: "Toys",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
  },
];
const categories = [
  "All",
  "Electronics",
  "Phones",
  "Fashion",
  "Sports",
  "Home & Kitchen",
  "Books",
  "Beauty",
  "Toys",
];

const sortOptions = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(urlSearch); // ← URL se search lo
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);

  // URL search change hone pe update karo
  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    setTimeout(() => {
      setProducts(allProducts);
      setLoading(false);
    }, 800);
  }, []);

  // Filter + Sort Logic
  const filteredProducts = products
    .filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchPrice = p.price >= minPrice && p.price <= maxPrice;
      return matchSearch && matchCategory && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-400 mt-1">
          {filteredProducts.length} products found
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar — Filters */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            {/* Search */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Search</h3>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 gap-2">
                <span className="text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400">Min Price</label>
                  <input
                    type="range"
                    min={0}
                    max={200000}
                    step={1000}
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <span className="text-sm text-blue-600 font-medium">
                    Rs. {minPrice.toLocaleString()}
                  </span>
                </div>
                <div>
                  <label className="text-xs text-gray-400">Max Price</label>
                  <input
                    type="range"
                    min={0}
                    max={200000}
                    step={1000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <span className="text-sm text-blue-600 font-medium">
                    Rs. {maxPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSortBy("default");
                setMinPrice(0);
                setMaxPrice(200000);
              }}
              className="w-full border border-gray-200 text-gray-500 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort Bar */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-xl shadow-sm px-4 py-3">
            <span className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              results
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none text-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin text-4xl">⏳</div>
              <p className="ml-3 text-gray-500">Loading products...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">😕</p>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No products found
              </h2>
              <p className="text-gray-400">Try changing your filters</p>
            </div>
          )}

          {/* Products Grid */}
          {!loading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  rating={product.rating}
                  image={product.image}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
