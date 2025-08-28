import apiClient from "./apiClient";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export const authApi = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    return apiClient.post("register", data);
  },
  login: async (data: LoginData): Promise<AuthResponse> => {
    return apiClient.post("login", data);
  },
};
