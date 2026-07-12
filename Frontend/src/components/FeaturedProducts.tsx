import { useState } from "react";
import ProductCard from "./ProductCards";
import { motion } from "framer-motion";

interface Product {
  id: number | string;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
}

// All products data - 10 per category
const allProducts: Product[] = [
  // Electronics - 10 products
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
  {
    id: 101,
    name: "Keyboard RGB",
    price: 12000,
    category: "Electronics",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add1?w=400&h=300&fit=crop",
  },
  {
    id: 102,
    name: "Monitor 4K",
    price: 35000,
    category: "Electronics",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop",
  },
  {
    id: 103,
    name: "Webcam HD",
    price: 5500,
    category: "Electronics",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1598080502436-0ba90127c9fd?w=400&h=300&fit=crop",
  },
  {
    id: 104,
    name: "USB Hub",
    price: 2000,
    category: "Electronics",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
  },
  {
    id: 105,
    name: "Hard Drive 2TB",
    price: 8500,
    category: "Electronics",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
  },

  // Phones - 10 products
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
  {
    id: 201,
    name: "OnePlus 12",
    price: 55000,
    category: "Phones",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1552710771-d33cda3fda2e?w=400&h=300&fit=crop",
  },
  {
    id: 202,
    name: "Google Pixel 8",
    price: 75000,
    category: "Phones",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1598286871644-5f85cc0e1a8d?w=400&h=300&fit=crop",
  },
  {
    id: 203,
    name: "Motorola Edge 50",
    price: 45000,
    category: "Phones",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: 204,
    name: "Realme 12 Pro",
    price: 35000,
    category: "Phones",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: 205,
    name: "Nothing Phone 2",
    price: 50000,
    category: "Phones",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=300&fit=crop",
  },
  {
    id: 206,
    name: "Vivo X100",
    price: 60000,
    category: "Phones",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
  },
  {
    id: 207,
    name: "Oppo Reno 11",
    price: 42000,
    category: "Phones",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop",
  },

  // Fashion - 10 products
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
  {
    id: 301,
    name: "Denim Jeans",
    price: 4500,
    category: "Fashion",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=300&fit=crop",
  },
  {
    id: 302,
    name: "Winter Jacket",
    price: 8000,
    category: "Fashion",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=300&fit=crop",
  },
  {
    id: 303,
    name: "Summer Dress",
    price: 3500,
    category: "Fashion",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1595606863675-dde5edd97bc5?w=400&h=300&fit=crop",
  },
  {
    id: 304,
    name: "Sports Cap",
    price: 1500,
    category: "Fashion",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1540895577874-86fd374e3537?w=400&h=300&fit=crop",
  },
  {
    id: 305,
    name: "Sunglasses",
    price: 6000,
    category: "Fashion",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
  },

  // Sports - 10 products
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
  {
    id: 401,
    name: "Dumbbell Set",
    price: 8000,
    category: "Sports",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
  },
  {
    id: 402,
    name: "Badminton Racket",
    price: 3500,
    category: "Sports",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1532568827798-34abf65dd604?w=400&h=300&fit=crop",
  },
  {
    id: 403,
    name: "Tennis Racket",
    price: 5500,
    category: "Sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34c8?w=400&h=300&fit=crop",
  },
  {
    id: 404,
    name: "Running Belt",
    price: 1200,
    category: "Sports",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=400&h=300&fit=crop",
  },
  {
    id: 405,
    name: "Basketball",
    price: 2500,
    category: "Sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1546519638-68711109bc52?w=400&h=300&fit=crop",
  },
  {
    id: 406,
    name: "Swimming Goggles",
    price: 800,
    category: "Sports",
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },

  // Home & Kitchen - 10 products
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
  {
    id: 501,
    name: "Microwave Oven",
    price: 15000,
    category: "Home & Kitchen",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop",
  },
  {
    id: 502,
    name: "Coffee Maker",
    price: 5000,
    category: "Home & Kitchen",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=400&h=300&fit=crop",
  },
  {
    id: 503,
    name: "Dining Table",
    price: 25000,
    category: "Home & Kitchen",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
  },
  {
    id: 504,
    name: "Bedsheet Set",
    price: 2500,
    category: "Home & Kitchen",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
  },
  {
    id: 505,
    name: "Kitchen Knife Set",
    price: 4000,
    category: "Home & Kitchen",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=300&fit=crop",
  },
  {
    id: 506,
    name: "Pressure Cooker",
    price: 3500,
    category: "Home & Kitchen",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1553189778-eb7b9c8f2723?w=400&h=300&fit=crop",
  },

  // Books - 10 products
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
  {
    id: 601,
    name: "Python Basics",
    price: 2200,
    category: "Books",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=300&fit=crop",
  },
  {
    id: 602,
    name: "The Lean Startup",
    price: 1500,
    category: "Books",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
  },
  {
    id: 603,
    name: "Design Patterns",
    price: 3500,
    category: "Books",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1451681523040-f578dc4d43e9?w=400&h=300&fit=crop",
  },
  {
    id: 604,
    name: "1984",
    price: 800,
    category: "Books",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1507842707343-583f20270319?w=400&h=300&fit=crop",
  },
  {
    id: 605,
    name: "Thinking Fast & Slow",
    price: 1200,
    category: "Books",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1534516098193-a0d19fd52adf?w=400&h=300&fit=crop",
  },
  {
    id: 606,
    name: "SQL Guide",
    price: 2800,
    category: "Books",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1547448432-7a472d7dfc86?w=400&h=300&fit=crop",
  },
  {
    id: 607,
    name: "Harry Potter",
    price: 600,
    category: "Books",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=300&fit=crop",
  },

  // Beauty - 10 products
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
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop",
  },
  {
    id: 701,
    name: "Face Mask",
    price: 1500,
    category: "Beauty",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1598580070160-91ec68cefb47?w=400&h=300&fit=crop",
  },
  {
    id: 702,
    name: "Hair Oil",
    price: 800,
    category: "Beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1596954541914-7e7e6662cae5?w=400&h=300&fit=crop",
  },
  {
    id: 703,
    name: "Eye Cream",
    price: 2500,
    category: "Beauty",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca519?w=400&h=300&fit=crop",
  },
  {
    id: 704,
    name: "Foundation",
    price: 2000,
    category: "Beauty",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1573086760197-8baf96ce4c4f?w=400&h=300&fit=crop",
  },
  {
    id: 705,
    name: "Blush",
    price: 1200,
    category: "Beauty",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1571875257842-35eb6e5acdf7?w=400&h=300&fit=crop",
  },
  {
    id: 706,
    name: "Nail Polish",
    price: 500,
    category: "Beauty",
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
  },
  {
    id: 707,
    name: "Moisturizer",
    price: 1800,
    category: "Beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
  },

  // Toys - 10 products
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
  {
    id: 801,
    name: "Puzzle 1000pc",
    price: 1500,
    category: "Toys",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1607813692712-a3b86fae8908?w=400&h=300&fit=crop",
  },
  {
    id: 802,
    name: "Action Figures",
    price: 2500,
    category: "Toys",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop",
  },
  {
    id: 803,
    name: "Drone",
    price: 12000,
    category: "Toys",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=300&fit=crop",
  },
  {
    id: 804,
    name: "Building Blocks",
    price: 3500,
    category: "Toys",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1591871937669-8844a4008b13?w=400&h=300&fit=crop",
  },
  {
    id: 805,
    name: "Doll House",
    price: 4500,
    category: "Toys",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1606774281777-d6ffc113fcb0?w=400&h=300&fit=crop",
  },
  {
    id: 806,
    name: "Train Set",
    price: 5000,
    category: "Toys",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1634821551459-37fc3f70b9f0?w=400&h=300&fit=crop",
  },
  {
    id: 807,
    name: "Telescope",
    price: 8500,
    category: "Toys",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1608889335941-33ac5f53d8ba?w=400&h=300&fit=crop",
  },
];

const FeaturedProducts = () => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );

  const categories = Array.from(new Set(allProducts.map((p) => p.category)));

  const handleLoadMore = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  return (
    <div>
      {/* Products Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-6 py-8 mt-4"
      >
        <h2 className="text-4xl font-bold text-gray-900 text-center">
          📦 Products
        </h2>
        <p className="text-gray-500 mt-2 text-center">
          Explore all categories and find what you need
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {categories.map((category) => {
          const categoryProducts = allProducts.filter(
            (p) => p.category === category,
          );
          const isExpanded = expandedCategories.has(category);
          const productsToShow = isExpanded
            ? categoryProducts
            : categoryProducts.slice(0, 3);
          const hasMore = categoryProducts.length > 3;

          return (
            <div key={category} className="mb-14">
              {/* Category name — left se aaye */}
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-bold text-gray-900 mb-6"
              >
                {category}
              </motion.h3>

              {/* Product Cards — stagger */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {productsToShow.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProductCard
                      id={String(product.id)}
                      name={product.name}
                      price={product.price}
                      category={product.category}
                      rating={product.rating}
                      image={product.image}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mb-8">
                  <button
                    onClick={() => handleLoadMore(category)}
                    className={`
                    group flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm
                    transition-all duration-300 active:scale-95 shadow-sm
                    ${
                      isExpanded
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                    }
                  `}
                  >
                    {isExpanded ? (
                      <>
                        <span>Show Less</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        <span>Load More</span>
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                          +{categoryProducts.length - 3}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
              <hr className="mt-12 border-gray-200" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
