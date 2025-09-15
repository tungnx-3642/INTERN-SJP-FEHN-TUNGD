"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { OrderItem } from "@/api/orderApi";

export type CartState = {
  items: OrderItem[];
};

type CartContextValue = {
  cart: CartState;
  getCart: () => CartState;
  addItem: (item: OrderItem) => void;
  removeItem: (productId: number | string) => void;
  removeAll: () => void;
};

const STORAGE_KEY = "cart_data";

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({ items: [] });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed && Array.isArray(parsed.items)) {
          setCart({ items: parsed.items });
        }
      }
    } catch (error) {
      setCart({ items: [] });
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [cart, isHydrated]);

  const getCart = useCallback((): CartState => cart, [cart]);

  const addItem = useCallback((item: OrderItem) => {
    setCart((prev) => {
      const existingIndex = prev.items.findIndex(
        (it) => String(it.productId) === String(item.productId)
      );
      if (existingIndex >= 0) {
        const nextItems = [...prev.items];
        const existing = nextItems[existingIndex];
        nextItems[existingIndex] = {
          ...existing,
          quantity: existing.quantity + item.quantity,
        };
        return { items: nextItems };
      }
      return { items: [...prev.items, item] };
    });
  }, []);

  const removeItem = useCallback((productId: number | string) => {
    setCart((prev) => ({
      items: prev.items.filter(
        (it) => String(it.productId) !== String(productId)
      ),
    }));
  }, []);

  const removeAll = useCallback(() => {
    setCart({ items: [] });
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({ cart, getCart, addItem, removeItem, removeAll }),
    [cart, getCart, addItem, removeItem, removeAll]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
