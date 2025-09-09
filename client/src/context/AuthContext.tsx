"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authApi, type User } from "@/api";
import { toast } from "sonner";
import Cookie from "js-cookie";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User | null, token: string | null) => void;
  logout: () => void;
  getFavorites: () => number[];
  like: (productId: number) => Promise<void>;
  dislike: (productId: number) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedToken = Cookie.get("accessToken") ?? null;
      const storedUser = localStorage.getItem("authUser");
      setToken(storedToken);
      setUser(storedUser ? (JSON.parse(storedUser) as User) : null);
    } catch {
      setToken(null);
      setUser(null);
    }
  }, []);

  const setAuth = useCallback(
    (nextUser: User | null, nextToken: string | null) => {
      setUser(nextUser);
      setToken(nextToken);

      if (typeof window !== "undefined") {
        if (nextToken) {
          Cookie.set("accessToken", nextToken, {
            expires: 7,
            secure: true,
            sameSite: "strict",
          });
        } else {
          Cookie.remove("accessToken");
        }

        if (nextUser)
          localStorage.setItem("authUser", JSON.stringify(nextUser));
        else localStorage.removeItem("authUser");
      }
    },
    []
  );
  const logout = useCallback(() => {
    setAuth(null, null);
    toast("Đã đăng xuất tài khoản");
  }, [setAuth]);

  const getFavorites = useCallback(() => user?.favorite ?? [], [user]);

  const like = useCallback(
    async (productId: number) => {
      if (!user) return;
      if (getFavorites().includes(productId)) return;

      const updatedUser = await authApi.updateFavorites(user.id, [
        ...getFavorites(),
        productId,
      ]);
      setAuth(updatedUser, token);
    },
    [user, token, getFavorites, setAuth]
  );

  const dislike = useCallback(
    async (productId: number) => {
      if (!user) return;

      const updatedUser = await authApi.updateFavorites(
        user.id,
        getFavorites().filter((id) => id !== productId)
      );
      setAuth(updatedUser, token);
    },
    [user, token, getFavorites, setAuth]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      setAuth,
      logout,
      getFavorites,
      like,
      dislike,
    }),
    [user, token, setAuth, logout, getFavorites, like, dislike]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
