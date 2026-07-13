import { Router } from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/userController";
import { protect, authorize } from "../middleware/authMiddleware";

const router = Router();

// All routes are protected and admin only
router.get("/", protect, authorize("admin"), getAllUsers);
router.put("/:id/role", protect, authorize("admin"), updateUserRole);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;
