import { Schema, model, Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image: string;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: { type: String, required: [true, "Description is required"] },
    category: { type: String, required: [true, "Category is required"] },
    stock: { type: Number, default: 0, min: [0, "Stock cannot be negative"] },
    image: { type: String, default: "" },
  },
  { timestamps: true },
);

export const ProductModel = model<ProductDocument>("Product", productSchema);
