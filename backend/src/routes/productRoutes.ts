import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { getFilteredProducts } from "../controllers/prismaProductController";
import { protect, authorize } from "../middleware/authMiddleware";
import { productValidation, validate } from "../middleware/validator";

const router = Router();

// ✅ Specific route PEHLE — /:id se pehle likhna zaroori hai
router.get("/filter", getFilteredProducts);

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes — sirf logged-in admin
router.post("/", protect, authorize("admin"), productValidation, validate, createProduct);
router.put("/:id", protect, authorize("admin"), productValidation, validate, updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;