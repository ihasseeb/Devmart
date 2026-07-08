import express, { Request, Response } from "express";
// import cors from "cors";
import authRoutes from "./src/routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
// app.use(cors());
app.use("/api/auth", authRoutes);
app.use(express.json());

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("DevMart API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("DevMart API is running 🚀");
});
