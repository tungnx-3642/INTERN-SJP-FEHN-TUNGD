import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { productApi, Product } from "@/api";

export const useProducts = (
  options?: Omit<UseQueryOptions<Product[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => productApi.getAll(),
    ...options,
  });
};

export const useProduct = (
  id: number,
  options?: Omit<UseQueryOptions<Product>, "queryKey" | "queryFn">
) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => productApi.getById(id),
    enabled: !!id,
    ...options,
  });
};

export const useProductsList = (
  ids: number[],
  options?: Omit<UseQueryOptions<Product[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Product[]>({
    queryKey: ["productsByIds", ids],
    queryFn: () => productApi.getByIdList(ids),
    enabled: Array.isArray(ids) && ids.length > 0,
    ...options,
  });
};
