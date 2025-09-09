import apiClient from "./apiClient";
import { User } from "./authApi";

export const adminApi = {
  getCustomers: (): Promise<Omit<User, "favorite">[]> => {
    return apiClient.get("users?isAdmin=false");
  },

  getCustomerInfor: (id: number): Promise<User> => {
    return apiClient.get(`users/${id}`)
  }
}
