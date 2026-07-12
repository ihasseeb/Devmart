import dotenv from "dotenv";
dotenv.config(); // sabse pehle .env file load karo, taake process.env.* sab jagah available ho

import cors from "cors";
import express, { Request, Response } from "express";
import authRoutes from "./src/routes/authRoutes";
import productRoutes from "./src/routes/productRoutes";
import orderRoutes from "./src/routes/orderRoutes";
import { notFound, errorHandler } from "./src/middleware/errorHandler";
import { connectDB } from "./src/config/db";
import { prisma } from "./src/config/prisma";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("DevMart API is running 🚀");
});

// Main API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes); // yeh line add karo

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(Number(PORT), "0.0.0.0", () =>
    console.log(`Server running on port ${PORT}`),
  );
});
