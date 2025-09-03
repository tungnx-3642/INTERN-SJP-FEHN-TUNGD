import apiClient from "./apiClient";
import { User } from "./authApi";

export const adminApi = {
  getCustomers: (): Promise<User[]> => {
    return apiClient.get("users?isAdmin=false");
  }
}
