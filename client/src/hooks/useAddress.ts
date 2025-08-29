import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { addressApi, Address } from "@/api/addressApi";

export const useCreateAddress = (
  options?: Omit<
    UseMutationOptions<Address, Error, Omit<Address, "id">>,
    "mutationFn"
  >
) => {
  return useMutation<Address, Error, Omit<Address, "id">>({
    mutationFn: addressApi.createAddress,
    ...options,
  });
};

export const useUpdateAddress = (
  options?: Omit<
    UseMutationOptions<Address, Error, { id: number; data: Partial<Address> }>,
    "mutationFn"
  >
) => {
  return useMutation<Address, Error, { id: number; data: Partial<Address> }>({
    mutationFn: ({ id, data }) => addressApi.updateAddress(id, data),
    ...options,
  });
};

export const useDeleteAddress = (
  options?: Omit<UseMutationOptions<void, Error, number>, "mutationFn">
) => {
  return useMutation<void, Error, number>({
    mutationFn: (id) => addressApi.deleteAddress(id),
    ...options,
  });
};

export const useAddressesByUser = (
  userId: number | undefined,
  options?: Omit<UseQueryOptions<Address[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Address[]>({
    queryKey: ["addressesByUser", userId],
    queryFn: () => addressApi.getAddressesByUser(userId!),
    enabled: !!userId,
    ...options,
  });
};
