import { Response } from "express";
import { UserModel } from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

// @route GET /api/users (Admin only)
export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @route PUT /api/users/:id/role (Admin only)
export const updateUserRole = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (role !== "admin" && role !== "user") {
      res.status(400).json({ message: "Invalid role value" });
      return;
    }

    // Prevent admin from demoting themselves
    if (id === req.user?.id) {
      res.status(400).json({ message: "You cannot change your own role" });
      return;
    }

    const user = await UserModel.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true },
    ).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// @route DELETE /api/users/:id (Admin only)
export const deleteUser = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (id === req.user?.id) {
      res.status(400).json({ message: "You cannot delete your own account" });
      return;
    }

    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
