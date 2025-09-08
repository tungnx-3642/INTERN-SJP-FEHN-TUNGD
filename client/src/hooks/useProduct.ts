import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { productApi, Product, Review } from "@/api";

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

export const useCreateProduct = (
  options?: UseMutationOptions<
    Product,
    Error,
    Omit<Product, "id" | "created_at" | "updated_at">
  >
) => {
  return useMutation({
    mutationFn: productApi.create,
    ...options,
  });
};

export const useDeleteProduct = (
  options?: UseMutationOptions<void, Error, number>
) => {
  return useMutation({
    mutationFn: (id: number) => productApi.delete(id),
    ...options,
  });
};

export const useUpdateProduct = (
  options?: UseMutationOptions<
    Product,
    Error,
    { id: number; data: Omit<Product, "id" | "updated_at"> }
  >
) => {
  return useMutation({
    mutationFn: ({ id, data }) => productApi.update(id, data),
    ...options,
  });
};

export const useAddReview = (
  options?: UseMutationOptions<
    Review,
    Error,
    { data: Omit<Review, "id" | "created_at"> }
  >
) => {
  return useMutation({
    mutationFn: ({data}) => productApi.addReview(data),
    ...options,
  })
}
