import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { authApi, LoginData, AuthResponse } from "@/api";

export const useLogin = (
  options?: UseMutationOptions<AuthResponse, Error, LoginData>
) => {
  return useMutation<AuthResponse, Error, LoginData>({
    mutationFn: (data: LoginData) => authApi.login(data),
    ...options,
  });
};
