import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { orderApi, Order, OrderStatus } from "@/api/orderApi";

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

export const useOrders = (
  options?: Omit<UseQueryOptions<Order[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: () => orderApi.getAll(),
    ...options,
  });
};

export const useUpdateOrderStatus = (
  options?: Omit<
    UseMutationOptions<Order, Error, { id: number; status: OrderStatus }>,
    "mutationFn"
  >
) => {
  return useMutation<Order, Error, { id: number; status: OrderStatus }>({
    mutationFn: ({ id, status }) => orderApi.updateStatus(id, status),
    ...options,
  });
};
