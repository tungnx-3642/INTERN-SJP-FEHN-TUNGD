import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { orderApi, Order } from "@/api/orderApi";

export const useCreateOrder = (
  options?: Omit<
    UseMutationOptions<
      Order,
      Error,
      Omit<Order, "id" | "created_at" | "updated_at">
    >,
    "mutationFn"
  >
) => {
  return useMutation<
    Order,
    Error,
    Omit<Order, "id" | "created_at" | "updated_at">
  >({
    mutationFn: orderApi.create,
    ...options,
  });
};

export const useOrderByUSer = (
  userId: number | undefined,
  options?: Omit<UseQueryOptions<Order[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Order[]>({
    queryKey: ["ordersByUser"],
    queryFn: () => orderApi.getByUserId(userId!),
    enabled: !!userId,
    ...options,
  });
};

export const useOrder = (
  id: number | undefined,
  options?: Omit<UseQueryOptions<Order>, "queryKey" | "queryFn">
) => {
  return useQuery<Order>({
    queryKey: ["order", id],
    queryFn: () => orderApi.getById(id!),
    enabled: !!id,
    ...options,
  });
};
