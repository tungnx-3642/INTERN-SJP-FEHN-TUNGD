import apiClient from "./apiClient";

const resource = "/products";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    return apiClient.get(resource);
  }
};
