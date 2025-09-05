import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from "@tanstack/react-query";
import { categoryApi, Category, Subcategory, Product } from "@/api";

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

export const useCreateCategory = (
  options?: Omit<
    UseMutationOptions<
      Category,
      Error,
      Omit<Category, "id" | "subcategories">
    >,
    "mutationFn"
  >
) => {
  return useMutation<Category, Error, Omit<Category, "id" | "subcategories">>({
    mutationFn: categoryApi.create,
    ...options,
  });
};

export const useUpdateCategory = (
  options?: Omit<
    UseMutationOptions<Category, Error, { id: number; data: Partial<Category> }>,
    "mutationFn"
  >
) => {
  return useMutation<Category, Error, { id: number; data: Partial<Category> }>({
    mutationFn: ({ id, data }) => categoryApi.update(id, data),
    ...options,
  });
};

export const useDeleteCategory = (
  options?: Omit<UseMutationOptions<Category, Error, number>, "mutationFn">
) => {
  return useMutation<Category, Error, number>({
    mutationFn: categoryApi.delete,
    ...options,
  });
};

export const useCreateSubcategory = (
  options?: Omit<
    UseMutationOptions<Subcategory, Error, Omit<Subcategory, "id" | "products">>,
    "mutationFn"
  >
) => {
  return useMutation<
    Subcategory,
    Error,
    Omit<Subcategory, "id" | "products">
  >({
    mutationFn: categoryApi.createSub,
    ...options,
  });
};

export const useUpdateSubcategory = (
  options?: Omit<
    UseMutationOptions<
      Subcategory,
      Error,
      { id: number; data: Partial<Subcategory> }
    >,
    "mutationFn"
  >
) => {
  return useMutation<
    Subcategory,
    Error,
    { id: number; data: Partial<Subcategory> }
  >({
    mutationFn: ({ id, data }) => categoryApi.updateSub(id, data),
    ...options,
  });
};

export const useDeleteSubcategory = (
  options?: Omit<UseMutationOptions<Subcategory, Error, number>, "mutationFn">
) => {
  return useMutation<Subcategory, Error, number>({
    mutationFn: categoryApi.deleteSub,
    ...options,
  });
};
