"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { authApi, type User } from "@/api";
import { toast } from "sonner";
import { signOut, useSession } from "next-auth/react";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
  getFavorites: () => number[];
  like: (productId: number) => Promise<void>;
  dislike: (productId: number) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken ?? null;
  const [currentUser, setCurrentUser] = useState<User | null>(
    (session?.user as User) ?? null
  );

  useEffect(() => {
    setCurrentUser((session?.user as User) ?? null);
  }, [session]);

  const logout = useCallback(() => {
    signOut({ callbackUrl: "/login" });
    toast("Đã đăng xuất tài khoản");
  }, []);

  const getFavorites = useCallback(
    () => currentUser?.favorite ?? [],
    [currentUser]
  );

  const like = useCallback(
    async (productId: number) => {
      if (!currentUser) return;
      if (getFavorites().includes(productId)) return;

      const updatedUser = await authApi.updateFavorites(currentUser.id, [
        ...getFavorites(),
        productId,
      ]);
      setCurrentUser(updatedUser); 
    },
    [currentUser, token, getFavorites]
  );

  const dislike = useCallback(
    async (productId: number) => {
      if (!currentUser) return;

      const updatedUser = await authApi.updateFavorites(
        currentUser.id,
        getFavorites().filter((id) => id !== productId)
      );
      setCurrentUser(updatedUser); 
    },
    [currentUser, token, getFavorites]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user: currentUser,
      token,
      isAuthenticated: Boolean(currentUser),
      logout,
      getFavorites,
      like,
      dislike,
    }),
    [currentUser, token, logout, getFavorites, like, dislike]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
