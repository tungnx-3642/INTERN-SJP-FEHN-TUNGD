import apiClient from "./apiClient";

const resource = "/products";
const reviewResource = "reviews";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  madeYear: number;
  made_from: string;
  reviews?: Review[];
}

export interface Review {
  id: number;
  productId: number;
  rating: number;
  comment: string;
  user: string;
  created_at: string;
}

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    return apiClient.get(resource);
  },
  getById: async (id: number): Promise<Product> => {
    return apiClient.get(`${resource}/${id}?_embed=${reviewResource}`);
  }
};
