import { useQuery, UseQueryOptions, useMutation } from "@tanstack/react-query";
import { blogApi, Blog, CreateComment } from "@/api";

export const useBlog = (
  id: string,
  options?: Omit<UseQueryOptions<Blog>, "queryKey" | "queryFn">
) => {
  return useQuery<Blog>({
    queryKey: ["blog"],
    queryFn: () => blogApi.getById(id),
    ...options,
  });
};

export const useBlogs = (
  options?: Omit<UseQueryOptions<Blog[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: () => blogApi.getAll(),
    ...options,
  });
};

export const useAddComment = () => {
  return useMutation({
    mutationFn: (data: CreateComment) => blogApi.addComment(data),
  });
};
