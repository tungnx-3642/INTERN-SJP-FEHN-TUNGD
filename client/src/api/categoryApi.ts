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
};
