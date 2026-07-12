export interface OrderItemDTO {
  product: string;
  quantity: number;
  price: number;
}

export interface CreateOrderDTO {
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
}

export interface UpdateOrderStatusDTO {
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}
