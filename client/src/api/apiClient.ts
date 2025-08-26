import axios, { AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST, 
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response?.data ?? response,
  (error) => Promise.reject(error),
)

export default apiClient;
