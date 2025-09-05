import apiClient from "./apiClient";
import { Product } from "./productApi";

const resource = "/categories";
const subResource = "subcategories";

export interface Category {
  id: number;
  name: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
  products?: Product[];
}

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    return apiClient.get(`${resource}?_embed=${subResource}`);
  },

  getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
    const subcategory = await apiClient.get<Subcategory>(
      `${subResource}/${categoryId}?_embed=products`
    );
    return subcategory?.products ?? [];
  },

  create: async (data: Omit<Category, "id" | "subcategories">) => {
    return apiClient.post(resource, data);
  },

  update: async (id: number, data: Partial<Category>) => {
    return apiClient.put(`${resource}/${id}`, data);
  },

  delete: async (id: number) => {
    return apiClient.delete(`${resource}/${id}`);
  },

  createSub: async (
    data: Omit<Subcategory, "id" | "products">
  ): Promise<Subcategory> => {
    return apiClient.post(subResource, data);
  },

  updateSub: async (id: number, data: Partial<Subcategory>) => {
    return apiClient.put(`${subResource}/${id}`, data);
  },

  deleteSub: async (id: number) => {
    return apiClient.delete(`${subResource}/${id}`);
  },
};
