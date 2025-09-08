import apiClient from "./apiClient";

export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean;
  favorite?: number[];
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
    return apiClient.post("register", { ...data, favorite: [], isAdmin: false });
  },
  login: async (data: LoginData): Promise<AuthResponse> => {
    return apiClient.post("login", data);
  },

  updateFavorites: async (
    userId: number,
    favorites: number[]
  ): Promise<any> => {
    return apiClient.patch(`/users/${userId}`, { favorite: favorites });
  },
};
