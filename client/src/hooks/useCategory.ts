import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { categoryApi, Category, Product } from "@/api";

export const useCategories = (
  options?: Omit<UseQueryOptions<Category[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getAll(),
    ...options,
  });
};

export const useProductByCategory = (
  id: number,
  options?: Omit<UseQueryOptions<Product[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Product[]>({
    queryKey: ["products", "category", id],
    queryFn: () => categoryApi.getProductsByCategory(id),
    enabled: !!id,
    ...options,
  });
};
