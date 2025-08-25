// src/lib/routes.ts
export const routes = {
  home: "/",
  infor: "/infor",
  products: {
    list: "/products",
    detail: (id: number | string) => `/products/${id}`,
    create: "/products/create",
  },
  auth: {
    login: "/login",
    register: "/register",
  }
} as const;
