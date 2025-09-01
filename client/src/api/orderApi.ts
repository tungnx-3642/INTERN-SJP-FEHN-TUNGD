import apiClient from "./apiClient";

const resource = "/orders";

export enum OrderStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}


export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id?: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  created_at?: string;
  updated_at?: string;
}

export const orderApi = {
  create: async (
    order: Omit<Order, "id" | "created_at" | "updated_at">
  ): Promise<Order> => {
    return apiClient.post(resource, {
      ...order,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  },

  getByUserId: async (userId: number): Promise<Order[]> => {
    return apiClient.get(`${resource}?userId=${userId}`);
  },

  getById: async (id: number): Promise<Order> => {
    return apiClient.get(`${resource}/${id}`);
  }
};
