"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@/api";
import { toast } from "sonner";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User | null, token: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("authUser");
      setToken(storedToken);
      setUser(storedUser ? (JSON.parse(storedUser) as User) : null);
    } catch {
      setToken(null);
      setUser(null);
    }
  }, []);

  const setAuth = (nextUser: User | null, nextToken: string | null) => {
    setUser(nextUser);
    setToken(nextToken);

    if (typeof window !== "undefined") {
      if (nextToken) localStorage.setItem("accessToken", nextToken);
      else localStorage.removeItem("accessToken");

      if (nextUser) localStorage.setItem("authUser", JSON.stringify(nextUser));
      else localStorage.removeItem("authUser");
    }
  };

  const logout = () => {
    setAuth(null, null);
    toast("Đã đăng xuất tài khoản");
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      setAuth,
      logout,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
