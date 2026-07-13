import { api } from "./api";
import type { CreateOrderPayload, Order } from "../types/order.types";

export const placeOrder = async (data: CreateOrderPayload): Promise<Order> => {
  const response = await api.post<Order>("/orders", data);
  return response.data;
};

export const getMyOrders = async (): Promise<Order[]> => {
  const response = await api.get<Order[]>("/orders");
  return response.data;
};

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await api.get<Order[]>("/orders/admin/all");
  return response.data;
};

export const updateOrderStatus = async (
  id: string,
  status: Order["status"],
): Promise<Order> => {
  const response = await api.put<Order>(`/orders/${id}/status`, { status });
  return response.data;
};

