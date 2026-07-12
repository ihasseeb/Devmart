import { Response } from "express";
import { OrderModel } from "../models/Order";
import { CreateOrderDTO, UpdateOrderStatusDTO } from "../types/order.types";
import { AuthRequest } from "../middleware/authMiddleware";
import { sendWhatsAppNotification } from "../utils/sendWhatsApp";
// @route POST /api/orders (logged-in user)

export const createOrder = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const data: CreateOrderDTO = req.body;
    const order = await OrderModel.create({
      user: req.user?.id,
      items: data.items,
      totalAmount: data.totalAmount,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      shippingAddress: data.shippingAddress,
    });

    // ✅ WhatsApp notification bhejo (order create hone ke baad)
    const message = `🛒 New Order on DevMart!\n\nCustomer: ${data.customerName}\nPhone: ${data.customerPhone}\nEmail: ${data.customerEmail}\nAddress: ${data.shippingAddress}\nTotal: Rs. ${data.totalAmount}\nItems: ${data.items.length}`;

    sendWhatsAppNotification(message); // await nahi kiya — response jaldi bhejne ke liye

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: "Invalid order data", error });
  }
};

// @route GET /api/orders (logged-in user — apne orders)
export const getUserOrders = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const orders = await OrderModel.find({ user: req.user?.id }).populate(
      "items.product",
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @route GET /api/orders/:id (logged-in user — single order)
export const getOrderById = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      "items.product",
    );
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @route GET /api/orders/admin/all (Admin only — sab orders)
export const getAllOrders = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "name email")
      .populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @route PUT /api/orders/:id/status (Admin only)
export const updateOrderStatus = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { status }: UpdateOrderStatusDTO = req.body;
    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: "Invalid status update", error });
  }
};
