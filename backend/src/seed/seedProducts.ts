import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { ProductModel } from "../models/Product"; // apna sahi path daalo

const dummyProducts = [
  {
    name: "Laptop Pro",
    price: 80000,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
  },
  {
    name: 'Samsung TV 55"',
    price: 95000,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
  },
  {
    name: "Headphones Pro",
    price: 8000,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    name: "iPad Pro",
    price: 150000,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
  },
  {
    name: "Gaming Mouse",
    price: 6000,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
  },
  {
    name: "Keyboard RGB",
    price: 12000,
    category: "Electronics",
    image: "https://loremflickr.com/400/300/keyboard?random=152",
  },
  {
    name: "Monitor 4K",
    price: 35000,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop",
  },
  {
    name: "Webcam HD",
    price: 5500,
    category: "Electronics",
    image: "https://loremflickr.com/400/300/webcam?random=259",
  },
  {
    name: "USB Hub",
    price: 2000,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
  },
  {
    name: "Hard Drive 2TB",
    price: 8500,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
  },
  {
    name: "iPhone 15",
    price: 120000,
    category: "Phones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
  },
  {
    name: "Samsung Galaxy S24",
    price: 85000,
    category: "Phones",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
  },
  {
    name: "Xiaomi 13 Pro",
    price: 65000,
    category: "Phones",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop",
  },
  {
    name: "OnePlus 12",
    price: 55000,
    category: "Phones",
    image:
      "https://images.unsplash.com/photo-1533228100845-08145b01de14?w=400&h=300&fit=crop",
  },
  {
    name: "Google Pixel 8",
    price: 75000,
    category: "Phones",
    image: "https://loremflickr.com/400/300/google?random=932",
  },
  {
    name: "Motorola Edge 50",
    price: 45000,
    category: "Phones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    name: "Realme 12 Pro",
    price: 35000,
    category: "Phones",
    image: "https://loremflickr.com/400/300/realme?random=206",
  },
  {
    name: "Nothing Phone 2",
    price: 50000,
    category: "Phones",
    image:
      "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=300&fit=crop",
  },
  {
    name: "Vivo X100",
    price: 60000,
    category: "Phones",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
  },
  {
    name: "Oppo Reno 11",
    price: 42000,
    category: "Phones",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop",
  },
  {
    name: "Nike Shoes",
    price: 15000,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  },
  {
    name: "Backpack",
    price: 5000,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
  },
  {
    name: "Running Shoes",
    price: 12000,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop",
  },
  {
    name: "Casual Shirt",
    price: 3000,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
  },
  {
    name: "Leather Wallet",
    price: 2500,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop",
  },
  {
    name: "Denim Jeans",
    price: 4500,
    category: "Fashion",
    image: "https://loremflickr.com/400/300/denim?random=210",
  },
  {
    name: "Winter Jacket",
    price: 8000,
    category: "Fashion",
    image: "https://loremflickr.com/400/300/winter?random=12",
  },
  {
    name: "Summer Dress",
    price: 3500,
    category: "Fashion",
    image: "https://loremflickr.com/400/300/summer?random=990",
  },
  {
    name: "Sports Cap",
    price: 1500,
    category: "Fashion",
    image: "https://loremflickr.com/400/300/sports?random=132",
  },
  {
    name: "Sunglasses",
    price: 6000,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
  },
  {
    name: "Cricket Bat",
    price: 4500,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop",
  },
  {
    name: "Football",
    price: 2000,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=300&fit=crop",
  },
  {
    name: "Gym Gloves",
    price: 1500,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
  },
  {
    name: "Yoga Mat",
    price: 3000,
    category: "Sports",
    image: "https://loremflickr.com/400/300/yoga?random=21",
  },
  {
    name: "Dumbbell Set",
    price: 8000,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
  },
  {
    name: "Badminton Racket",
    price: 3500,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
  },
  {
    name: "Tennis Racket",
    price: 5500,
    category: "Sports",
    image: "https://loremflickr.com/400/300/tennis?random=314",
  },
  {
    name: "Running Belt",
    price: 1200,
    category: "Sports",
    image: "https://loremflickr.com/400/300/running?random=629",
  },
  {
    name: "Basketball",
    price: 2500,
    category: "Sports",
    image: "https://loremflickr.com/400/300/basketball?random=922",
  },
  {
    name: "Swimming Goggles",
    price: 800,
    category: "Sports",
    image: "https://loremflickr.com/400/300/swimming?random=484",
  },
  {
    name: "Blender",
    price: 8000,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop",
  },
  {
    name: "Rice Cooker",
    price: 6500,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop",
  },
  {
    name: "Sofa Set",
    price: 45000,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
  },
  {
    name: "Table Lamp",
    price: 3500,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
  },
  {
    name: "Microwave Oven",
    price: 15000,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop",
  },
  {
    name: "Coffee Maker",
    price: 5000,
    category: "Home & Kitchen",
    image: "https://loremflickr.com/400/300/coffee?random=268",
  },
  {
    name: "Dining Table",
    price: 25000,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
  },
  {
    name: "Bedsheet Set",
    price: 2500,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
  },
  {
    name: "Kitchen Knife Set",
    price: 4000,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=300&fit=crop",
  },
  {
    name: "Pressure Cooker",
    price: 3500,
    category: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=300&fit=crop",
  },
  {
    name: "Clean Code",
    price: 2500,
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
  },
  {
    name: "Atomic Habits",
    price: 1800,
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
  },
  {
    name: "JavaScript Guide",
    price: 3000,
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
  },
  {
    name: "Python Basics",
    price: 2200,
    category: "Books",
    image: "https://loremflickr.com/400/300/python?random=529",
  },
  {
    name: "The Lean Startup",
    price: 1500,
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
  },
  {
    name: "Design Patterns",
    price: 3500,
    category: "Books",
    image: "https://loremflickr.com/400/300/design?random=441",
  },
  {
    name: "1984",
    price: 800,
    category: "Books",
    image: "https://loremflickr.com/400/300/?random=533",
  },
  {
    name: "Thinking Fast & Slow",
    price: 1200,
    category: "Books",
    image: "https://loremflickr.com/400/300/thinking?random=640",
  },
  {
    name: "SQL Guide",
    price: 2800,
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
  },
  {
    name: "Harry Potter",
    price: 600,
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=300&fit=crop",
  },
  {
    name: "Perfume",
    price: 5000,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=300&fit=crop",
  },
  {
    name: "Skincare Kit",
    price: 3500,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
  },
  {
    name: "Lipstick Set",
    price: 2000,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop",
  },
  {
    name: "Face Mask",
    price: 1500,
    category: "Beauty",
    image: "https://loremflickr.com/400/300/face?random=998",
  },
  {
    name: "Hair Oil",
    price: 800,
    category: "Beauty",
    image: "https://loremflickr.com/400/300/hair?random=937",
  },
  {
    name: "Eye Cream",
    price: 2500,
    category: "Beauty",
    image: "https://loremflickr.com/400/300/eye?random=261",
  },
  {
    name: "Foundation",
    price: 2000,
    category: "Beauty",
    image: "https://loremflickr.com/400/300/foundation?random=236",
  },
  {
    name: "Blush",
    price: 1200,
    category: "Beauty",
    image: "https://loremflickr.com/400/300/blush?random=916",
  },
  {
    name: "Nail Polish",
    price: 500,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
  },
  {
    name: "Moisturizer",
    price: 1800,
    category: "Beauty",
    image: "https://loremflickr.com/400/300/moisturizer?random=944",
  },
  {
    name: "Lego Set",
    price: 8000,
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=300&fit=crop",
  },
  {
    name: "RC Car",
    price: 5500,
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop",
  },
  {
    name: "Board Game",
    price: 3000,
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
  },
  {
    name: "Puzzle 1000pc",
    price: 1500,
    category: "Toys",
    image: "https://loremflickr.com/400/300/puzzle?random=530",
  },
  {
    name: "Action Figures",
    price: 2500,
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop",
  },
  {
    name: "Drone",
    price: 12000,
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=300&fit=crop",
  },
  {
    name: "Building Blocks",
    price: 3500,
    category: "Toys",
    image: "https://loremflickr.com/400/300/building?random=794",
  },
  {
    name: "Doll House",
    price: 4500,
    category: "Toys",
    image: "https://loremflickr.com/400/300/doll?random=301",
  },
  {
    name: "Train Set",
    price: 5000,
    category: "Toys",
    image: "https://loremflickr.com/400/300/train?random=908",
  },
  {
    name: "Telescope",
    price: 8500,
    category: "Toys",
    image: "https://loremflickr.com/400/300/telescope?random=631",
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI as string;
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");

    await ProductModel.deleteMany({}); // purane products clear karo
    console.log("🗑️  Old products removed");

    const productsWithDefaults = dummyProducts.map((p) => ({
      ...p,
      description: `${p.name} - high quality ${p.category.toLowerCase()} product available at DevMart.`,
      stock: Math.floor(Math.random() * 50) + 10, // 10-60 ke beech random stock
    }));

    await ProductModel.insertMany(productsWithDefaults);
    console.log(`✅ ${productsWithDefaults.length} products inserted`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
