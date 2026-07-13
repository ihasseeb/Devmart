import { Router } from "express";
import { getAdminStats } from "../controllers/adminController";
import { protect, authorize } from "../middleware/authMiddleware";

const router = Router();

router.get("/stats", protect, authorize("admin"), getAdminStats);

export default router;
