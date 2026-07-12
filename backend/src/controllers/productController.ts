import { Request, Response } from "express";
import { ProductModel } from "../models/Product";
import { CreateProductDTO, UpdateProductDTO } from "../models/Products.types";

// @route GET /api/products
export const getAllProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @route GET /api/products/:id
export const getProductById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @route POST /api/products (Admin only)
export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data: CreateProductDTO = req.body;
    const product = await ProductModel.create(data);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid product data", error });
  }
};

// @route PUT /api/products/:id (Admin only)
export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data: UpdateProductDTO = req.body;
    const product = await ProductModel.findByIdAndUpdate(req.params.id, data, {
      new: true, // updated document return karega
      runValidators: true, // schema validation dobara chalega
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid update data", error });
  }
};

// @route DELETE /api/products/:id (Admin only)
export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
