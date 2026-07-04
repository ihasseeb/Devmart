import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

// Same products data — 80 products from FeaturedProducts
const allProducts = [
  // Electronics - 10 products
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 101,
    name: "Keyboard RGB",
    price: 12000,
    category: "Electronics",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add1?w=400&h=300&fit=crop",
    description:
      "Mechanical RGB keyboard with customizable switches and backlighting.",
    stock: 14,
  },
  {
    id: 102,
    name: "Monitor 4K",
    price: 35000,
    category: "Electronics",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop",
    description: "27 inch 4K monitor with HDR, USB-C and built-in speakers.",
    stock: 7,
  },
  {
    id: 103,
    name: "Webcam HD",
    price: 5500,
    category: "Electronics",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1598080502436-0ba90127c9fd?w=400&h=300&fit=crop",
    description:
      "1080p HD webcam with auto-focus and noise-cancelling microphone.",
    stock: 22,
  },
  {
    id: 104,
    name: "USB Hub",
    price: 2000,
    category: "Electronics",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
    description: "Multi-port USB 3.0 hub with fast charging support.",
    stock: 30,
  },
  {
    id: 105,
    name: "Hard Drive 2TB",
    price: 8500,
    category: "Electronics",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    description: "External 2TB hard drive with USB 3.0 and 256-bit encryption.",
    stock: 16,
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
    description:
      "Latest iPhone with A17 Pro chip, 48MP camera, and Dynamic Island. Best smartphone experience.",
    stock: 12,
  },
  {
    id: 7,
    name: "Samsung Galaxy S24",
    price: 85000,
    category: "Phones",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
    description:
      "Flagship Android phone with Snapdragon 8 Gen 3, 200MP camera and AI features.",
    stock: 15,
  },
  {
    id: 8,
    name: "Xiaomi 13 Pro",
    price: 65000,
    category: "Phones",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop",
    description:
      "Premium Xiaomi with Snapdragon processor, beautiful AMOLED display and fast charging.",
    stock: 11,
  },
  {
    id: 201,
    name: "OnePlus 12",
    price: 55000,
    category: "Phones",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1552710771-d33cda3fda2e?w=400&h=300&fit=crop",
    description:
      "High-speed phone with Snapdragon 8 Gen 3, 120fps display refresh rate.",
    stock: 19,
  },
  {
    id: 202,
    name: "Google Pixel 8",
    price: 75000,
    category: "Phones",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1598286871644-5f85cc0e1a8d?w=400&h=300&fit=crop",
    description:
      "Google's flagship with Tensor chip, exceptional camera AI and pure Android.",
    stock: 9,
  },
  {
    id: 203,
    name: "Motorola Edge 50",
    price: 45000,
    category: "Phones",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    description:
      "Mid-range powerhouse with fast processor and 5G connectivity.",
    stock: 20,
  },
  {
    id: 204,
    name: "Realme 12 Pro",
    price: 35000,
    category: "Phones",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Budget-friendly phone with great camera and performance.",
    stock: 25,
  },
  {
    id: 205,
    name: "Nothing Phone 2",
    price: 50000,
    category: "Phones",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=300&fit=crop",
    description: "Innovative phone with unique design and Glyph interface.",
    stock: 13,
  },
  {
    id: 206,
    name: "Vivo X100",
    price: 60000,
    category: "Phones",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
    description: "Premium phone with advanced imaging and fast performance.",
    stock: 10,
  },
  {
    id: 207,
    name: "Oppo Reno 11",
    price: 42000,
    category: "Phones",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop",
    description: "Sleek design with excellent camera system and battery life.",
    stock: 17,
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
    description:
      "Premium Nike running shoes with air cushioning. Comfortable for daily use and sports.",
    stock: 20,
  },
  {
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 301,
    name: "Denim Jeans",
    price: 4500,
    category: "Fashion",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=300&fit=crop",
    description: "Classic denim jeans with perfect fit and durability.",
    stock: 28,
  },
  {
    id: 302,
    name: "Winter Jacket",
    price: 8000,
    category: "Fashion",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=300&fit=crop",
    description: "Warm and stylish winter jacket with water-resistant fabric.",
    stock: 15,
  },
  {
    id: 303,
    name: "Summer Dress",
    price: 3500,
    category: "Fashion",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1595606863675-dde5edd97bc5?w=400&h=300&fit=crop",
    description: "Light and breezy summer dress perfect for warm weather.",
    stock: 24,
  },
  {
    id: 304,
    name: "Sports Cap",
    price: 1500,
    category: "Fashion",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1540895577874-86fd374e3537?w=400&h=300&fit=crop",
    description: "Comfortable sports cap with adjustable strap.",
    stock: 42,
  },
  {
    id: 305,
    name: "Sunglasses",
    price: 6000,
    category: "Fashion",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
    description: "UV protection sunglasses with stylish frame design.",
    stock: 18,
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
    description:
      "Professional grade cricket bat made from premium English willow.",
    stock: 15,
  },
  {
    id: 15,
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
    id: 16,
    name: "Gym Gloves",
    price: 1500,
    category: "Sports",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
    description: "Comfortable gym gloves with grip and wrist support.",
    stock: 32,
  },
  {
    id: 17,
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
    id: 401,
    name: "Dumbbell Set",
    price: 8000,
    category: "Sports",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    description: "Complete dumbbell set for home gym workouts.",
    stock: 12,
  },
  {
    id: 402,
    name: "Badminton Racket",
    price: 3500,
    category: "Sports",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1532568827798-34abf65dd604?w=400&h=300&fit=crop",
    description:
      "Professional badminton racket with carbon fiber construction.",
    stock: 19,
  },
  {
    id: 403,
    name: "Tennis Racket",
    price: 5500,
    category: "Sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34c8?w=400&h=300&fit=crop",
    description: "High-quality tennis racket suitable for all skill levels.",
    stock: 14,
  },
  {
    id: 404,
    name: "Running Belt",
    price: 1200,
    category: "Sports",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=400&h=300&fit=crop",
    description:
      "Lightweight running belt with secure pockets for phone and keys.",
    stock: 38,
  },
  {
    id: 405,
    name: "Basketball",
    price: 2500,
    category: "Sports",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1546519638-68711109bc52?w=400&h=300&fit=crop",
    description: "Official size basketball with superior grip and durability.",
    stock: 23,
  },
  {
    id: 406,
    name: "Swimming Goggles",
    price: 800,
    category: "Sports",
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Anti-fog swimming goggles with comfortable fit.",
    stock: 45,
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
    description:
      "High power blender with 6 stainless steel blades, ideal for smoothies and soups.",
    stock: 12,
  },
  {
    id: 19,
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
    id: 20,
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
    id: 21,
    name: "Table Lamp",
    price: 3500,
    category: "Home & Kitchen",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
    description:
      "Modern table lamp with adjustable brightness and USB charging.",
    stock: 21,
  },
  {
    id: 501,
    name: "Microwave Oven",
    price: 15000,
    category: "Home & Kitchen",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop",
    description:
      "Digital microwave oven with multiple cooking modes and sensors.",
    stock: 8,
  },
  {
    id: 502,
    name: "Coffee Maker",
    price: 5000,
    category: "Home & Kitchen",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=400&h=300&fit=crop",
    description:
      "Programmable coffee maker with thermal carafe and auto-brew feature.",
    stock: 18,
  },
  {
    id: 503,
    name: "Dining Table",
    price: 25000,
    category: "Home & Kitchen",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
    description:
      "Beautiful dining table with tempered glass top and wooden base.",
    stock: 6,
  },
  {
    id: 504,
    name: "Bedsheet Set",
    price: 2500,
    category: "Home & Kitchen",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    description: "Soft cotton bedsheet set with multiple color options.",
    stock: 35,
  },
  {
    id: 505,
    name: "Kitchen Knife Set",
    price: 4000,
    category: "Home & Kitchen",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=300&fit=crop",
    description: "Professional kitchen knife set with ergonomic handles.",
    stock: 17,
  },
  {
    id: 506,
    name: "Pressure Cooker",
    price: 3500,
    category: "Home & Kitchen",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1553189778-eb7b9c8f2723?w=400&h=300&fit=crop",
    description:
      "Stainless steel pressure cooker for quick and healthy cooking.",
    stock: 14,
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
    description:
      "Robert C. Martin's classic guide to writing clean, maintainable code. Must read for developers.",
    stock: 50,
  },
  {
    id: 23,
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
    id: 24,
    name: "JavaScript Guide",
    price: 3000,
    category: "Books",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
    description:
      "Comprehensive JavaScript guide for beginners and advanced developers.",
    stock: 28,
  },
  {
    id: 601,
    name: "Python Basics",
    price: 2200,
    category: "Books",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=300&fit=crop",
    description: "Learn Python programming from basics to advanced concepts.",
    stock: 32,
  },
  {
    id: 602,
    name: "The Lean Startup",
    price: 1500,
    category: "Books",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
    description:
      "Eric Ries' guide to building successful startups efficiently.",
    stock: 38,
  },
  {
    id: 603,
    name: "Design Patterns",
    price: 3500,
    category: "Books",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1451681523040-f578dc4d43e9?w=400&h=300&fit=crop",
    description: "Classic book on software design patterns and best practices.",
    stock: 22,
  },
  {
    id: 604,
    name: "1984",
    price: 800,
    category: "Books",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1507842707343-583f20270319?w=400&h=300&fit=crop",
    description: "George Orwell's dystopian novel about totalitarianism.",
    stock: 55,
  },
  {
    id: 605,
    name: "Thinking Fast & Slow",
    price: 1200,
    category: "Books",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1534516098193-a0d19fd52adf?w=400&h=300&fit=crop",
    description: "Daniel Kahneman's exploration of human decision-making.",
    stock: 40,
  },
  {
    id: 606,
    name: "SQL Guide",
    price: 2800,
    category: "Books",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1547448432-7a472d7dfc86?w=400&h=300&fit=crop",
    description: "Complete guide to SQL database programming and queries.",
    stock: 26,
  },
  {
    id: 607,
    name: "Harry Potter",
    price: 600,
    category: "Books",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=300&fit=crop",
    description: "J.K. Rowling's magical fantasy series - a must-read.",
    stock: 60,
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
    description:
      "Long lasting premium fragrance with notes of oud, sandalwood and rose. 100ml bottle.",
    stock: 20,
  },
  {
    id: 26,
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
    id: 27,
    name: "Lipstick Set",
    price: 2000,
    category: "Beauty",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop",
    description:
      "Vibrant lipstick set with multiple shades for every occasion.",
    stock: 25,
  },
  {
    id: 701,
    name: "Face Mask",
    price: 1500,
    category: "Beauty",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1598580070160-91ec68cefb47?w=400&h=300&fit=crop",
    description: "Hydrating face mask with natural ingredients.",
    stock: 30,
  },
  {
    id: 702,
    name: "Hair Oil",
    price: 800,
    category: "Beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1596954541914-7e7e6662cae5?w=400&h=300&fit=crop",
    description: "Nourishing hair oil with herbal extracts for shiny hair.",
    stock: 42,
  },
  {
    id: 703,
    name: "Eye Cream",
    price: 2500,
    category: "Beauty",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca519?w=400&h=300&fit=crop",
    description: "Anti-aging eye cream to reduce wrinkles and dark circles.",
    stock: 19,
  },
  {
    id: 704,
    name: "Foundation",
    price: 2000,
    category: "Beauty",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1573086760197-8baf96ce4c4f?w=400&h=300&fit=crop",
    description: "Flawless foundation with long-lasting coverage.",
    stock: 23,
  },
  {
    id: 705,
    name: "Blush",
    price: 1200,
    category: "Beauty",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1571875257842-35eb6e5acdf7?w=400&h=300&fit=crop",
    description: "Rosy blush to add natural color to your cheeks.",
    stock: 28,
  },
  {
    id: 706,
    name: "Nail Polish",
    price: 500,
    category: "Beauty",
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
    description: "Long-lasting nail polish in trendy colors.",
    stock: 50,
  },
  {
    id: 707,
    name: "Moisturizer",
    price: 1800,
    category: "Beauty",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
    description: "Hydrating moisturizer for all skin types.",
    stock: 35,
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
    description:
      "Creative Lego building set with 500+ pieces. Great for kids aged 8 and above.",
    stock: 15,
  },
  {
    id: 29,
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
  {
    id: 30,
    name: "Board Game",
    price: 3000,
    category: "Toys",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
    description: "Fun family board game for entertainment and bonding.",
    stock: 17,
  },
  {
    id: 801,
    name: "Puzzle 1000pc",
    price: 1500,
    category: "Toys",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1607813692712-a3b86fae8908?w=400&h=300&fit=crop",
    description: "1000 piece jigsaw puzzle with beautiful scenic imagery.",
    stock: 21,
  },
  {
    id: 802,
    name: "Action Figures",
    price: 2500,
    category: "Toys",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop",
    description: "Collectible action figures from popular franchises.",
    stock: 26,
  },
  {
    id: 803,
    name: "Drone",
    price: 12000,
    category: "Toys",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=300&fit=crop",
    description:
      "Beginner-friendly drone with 4K camera and 30-minute flight time.",
    stock: 11,
  },
  {
    id: 804,
    name: "Building Blocks",
    price: 3500,
    category: "Toys",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1591871937669-8844a4008b13?w=400&h=300&fit=crop",
    description: "Colorful building blocks set for creative construction play.",
    stock: 19,
  },
  {
    id: 805,
    name: "Doll House",
    price: 4500,
    category: "Toys",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1606774281777-d6ffc113fcb0?w=400&h=300&fit=crop",
    description:
      "Miniature doll house with detailed furniture and accessories.",
    stock: 9,
  },
  {
    id: 806,
    name: "Train Set",
    price: 5000,
    category: "Toys",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1634821551459-37fc3f70b9f0?w=400&h=300&fit=crop",
    description:
      "Classic electric train set with tracks and realistic details.",
    stock: 13,
  },
  {
    id: 807,
    name: "Telescope",
    price: 8500,
    category: "Toys",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1608889335941-33ac5f53d8ba?w=400&h=300&fit=crop",
    description:
      "Refractor telescope for stargazing and astronomy exploration.",
    stock: 8,
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
