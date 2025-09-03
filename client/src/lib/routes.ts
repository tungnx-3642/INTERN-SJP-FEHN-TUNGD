// src/lib/routes.ts
export const routes = {
  home: "/",
  infor: "/infor",
  cart: "/cart",
  orders: {
    list: "/orders",
    detail: (id: number | string) => `/orders/${id}`,
  },
  addresses: "/addresses",
  contact: "/contact",
  products: {
    list: "/products",
    detail: (id: number | string) => `/products/${id}`,
    create: "/products/create",
  },
  blogs: {
    list: "/blogs",
    detail: (id: number | string) => `/blogs/${id}`,
    create: "/blogs/create",
  },
  auth: {
    login: "/login",
    register: "/register",
  },
  admin: {
    dashboard: "/admin",
    products: {
      list: "/admin/products",
      detail: (id: number | string) => `/admin/products/${id}`,
    },
    orders: "/admin/orders",
  },
} as const;
