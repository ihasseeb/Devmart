import { Schema, model, Document, Types } from "mongoose";

interface OrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface OrderDocument extends Document {
  user: Types.ObjectId;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
}

const orderSchema = new Schema<OrderDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
    },
    customerPhone: {
      type: String,
      required: [true, "Customer phone number is required"],
    },
    shippingAddress: {
      type: String,
      required: [true, "Shipping address is required"],
    },
  },
  { timestamps: true },
);

export const OrderModel = model<OrderDocument>("Order", orderSchema);
