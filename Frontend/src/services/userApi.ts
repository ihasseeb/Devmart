import { api } from "./api";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

export const updateUserRole = async (
  id: string,
  role: "admin" | "user",
): Promise<User> => {
  const response = await api.put<User>(`/users/${id}/role`, { role });
  return response.data;
};

export const deleteUser = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/users/${id}`);
  return response.data;
};
