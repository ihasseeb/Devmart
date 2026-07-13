import { api } from "./api";
import { type Product } from "../types/product.types";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (
  data: Omit<Product, "_id" | "createdAt" | "updatedAt">,
): Promise<Product> => {
  const response = await api.post<Product>("/products", data);
  return response.data;
};

export const updateProduct = async (
  id: string,
  data: Partial<Product>,
): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (
  id: string,
): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/products/${id}`);
  return response.data;
};

