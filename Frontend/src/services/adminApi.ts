import { api } from "./api";

export interface AdminStats {
  stats: {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalUsers: number;
  };
  recentOrders: Array<{
    _id: string;
    customerName: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    user?: {
      name: string;
      email: string;
    };
  }>;
}

export const getAdminStats = async (): Promise<AdminStats> => {
  const response = await api.get<AdminStats>("/admin/stats");
  return response.data;
};
