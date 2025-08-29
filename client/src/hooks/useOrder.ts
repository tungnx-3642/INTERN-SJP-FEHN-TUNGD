import {
  useMutation,
  UseMutationOptions,
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
