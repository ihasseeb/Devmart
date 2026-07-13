import { Response } from "express";
import { OrderModel } from "../models/Order";
import { ProductModel } from "../models/Product";
import { UserModel } from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

// @route GET /api/admin/stats (Admin only)
export const getAdminStats = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    // 1. Total Orders count
    const totalOrders = await OrderModel.countDocuments();

    // 2. Total Revenue (sum of all orders that are not cancelled)
    const revenueAggregate = await OrderModel.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue =
      revenueAggregate.length > 0 ? revenueAggregate[0].total : 0;

    // 3. Total Products count
    const totalProducts = await ProductModel.countDocuments();

    // 4. Total Users count
    const totalUsers = await UserModel.countDocuments();

    // 5. Recent Activity: Last 5 orders
    const recentOrders = await OrderModel.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email");

    res.status(200).json({
      stats: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalUsers,
      },
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error getting stats", error });
  }
};
