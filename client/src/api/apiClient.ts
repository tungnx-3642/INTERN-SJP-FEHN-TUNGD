import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface ApiClient {
  get<T = any>(url: string): Promise<T>;
  post<T = any>(url: string, data?: any): Promise<T>;
  put<T = any>(url: string, data?: any): Promise<T>;
  patch<T = any>(url: string, data?: any): Promise<T>;
  delete<T = any>(url: string): Promise<T>;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => (response?.data ?? response) as any,
  (error) => Promise.reject(error)
);

const apiClient: ApiClient = {
  get: <T>(url: string) => axiosInstance.get<T, T>(url),
  post: <T>(url: string, data?: any) => axiosInstance.post<T, T>(url, data),
  put: <T>(url: string, data?: any) => axiosInstance.put<T, T>(url, data),
  patch: <T>(url: string, data?: any) => axiosInstance.patch<T, T>(url, data),
  delete: <T>(url: string) => axiosInstance.delete<T, T>(url),
};

export default apiClient;
