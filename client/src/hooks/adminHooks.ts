import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { adminApi, User } from "@/api";

export const useCustomers = (
  options?: Omit<UseQueryOptions<User[]>, "queryKey" | "queryFn">
) => {
  return useQuery<User[]>({
    queryKey: ["customers"],
    queryFn: () => adminApi.getCustomers(),
    ...options,
  });
};
