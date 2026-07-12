export interface OrderItemPayload {
  product: string; // product ki MongoDB _id
  quantity: number;
  price: number;
}

export interface CreateOrderPayload {
  items: OrderItemPayload[];
  totalAmount: number;
  shippingAddress: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItemPayload[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: string;
  createdAt: string;
}
