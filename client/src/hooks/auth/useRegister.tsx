import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { authApi, RegisterData, AuthResponse } from "@/api";

export const useRegister = (
  options?: UseMutationOptions<AuthResponse, Error, RegisterData>
) => {
  return useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: (data: RegisterData) => authApi.register(data),
    ...options,
  });
};
