import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCards";
import type { Product } from "../types/product.types";
import { getAllProducts } from "../services/productApi";

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

  const [search, setSearch] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);

  // URL search change hone pe update karo
  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  // ✅ Real backend se data — TanStack Query
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  // Filter + Sort Logic — ab real 'products' array pe chal raha hai
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
      if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0); // rating na ho to 0 maano
      return 0;
    });

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Animation Layer */}
      <div className="absolute inset-0 z-[-10] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div
          className="absolute top-20 right-1/4 w-[30rem] h-[30rem] bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-32 left-1/3 w-[30rem] h-[30rem] bg-primary-light/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
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
                <h3 className="font-semibold text-gray-900 mb-3">
                  Price Range
                </h3>
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
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin text-4xl">⏳</div>
                <p className="ml-3 text-gray-500">Loading products...</p>
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">⚠️</p>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Failed to load products
                </h2>
                <p className="text-gray-400">Please try again later</p>
              </div>
            )}

            {/* No Results */}
            {!isLoading && !isError && filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">😕</p>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  No products found
                </h2>
                <p className="text-gray-400">Try changing your filters</p>
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && !isError && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                    rating={product.rating ?? 0}
                    image={product.image ?? ""}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
