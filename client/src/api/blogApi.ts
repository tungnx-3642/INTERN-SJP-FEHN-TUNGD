import apiClient from "./apiClient";

export interface Blog {
  id: number;
  title: string;
  content: string;
  user: string;
  createdAt: string;
  imageUrl: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  name: string;
  blogId: number;
  message: string;
  createdAt: string;
}

export interface CreateComment {
  name: string;
  blogId: number;
  message: string;
  createdAt: string;
}

const resource = "blogs";
const subresource = "comments";

export const blogApi = {
  getAll: async (): Promise<Blog[]> => {
    return apiClient.get(resource);
  },
  getById: async (id: string): Promise<Blog> => {
    return apiClient.get(`/${resource}/${id}?_embed=${subresource}`);
  },

  addComment: async (data: CreateComment): Promise<any> => {
    return apiClient.post(subresource, data);
  },

  deleteComment: async (commentId: number): Promise<any> => {
    return apiClient.delete(`/${subresource}/${commentId}`);
  },
};
