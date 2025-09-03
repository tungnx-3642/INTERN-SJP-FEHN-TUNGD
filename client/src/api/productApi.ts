import apiClient from "./apiClient";
import { Subcategory } from "./categoryApi";

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
  subcategoryId: number;
  subcategory?: Subcategory;
  created_at: string;
  updated_at: string;
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
    return apiClient.get(`${resource}?_expand=subcategory`);
  },
  getById: async (id: number): Promise<Product> => {
    return apiClient.get(`${resource}/${id}?_embed=${reviewResource}`);
  },
  getByIdList: async (ids: number[]): Promise<Product[]> => {
    const queryString = ids.map((id) => `id=${id}`).join("&");
    return apiClient.get(`${resource}?${queryString}`);
  },
  create: async (
    data: Omit<Product, "id" | "created_at" | "updated_at">
  ): Promise<Product> => {
    return apiClient.post(resource, {
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  },
  delete: async (id: number): Promise<any> => {
    return apiClient.delete(`${resource}/${id}`);
  },
  update: async (
    id: number,
    data: Omit<Product, "id" | "created_at" | "updated_at">
  ): Promise<Product> => {
    return apiClient.put(`${resource}/${id}`, {
      ...data,
      updated_at: new Date().toISOString(),
    });
  },
};
