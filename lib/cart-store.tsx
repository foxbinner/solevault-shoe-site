"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Product, CartItem } from "@/types";

// ── Types ──────────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; cartKey: string }
  | { type: "CLEAR" }
  | { type: "LOAD"; items: CartItem[] };

interface ToastState {
  message: string;
  visible: boolean;
}

interface CartContextValue {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (cartKey: string) => void;
  clearCart: () => void;
  toast: ToastState;
}

// ── Reducer ────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD":
      return {
        items: [
          ...state.items,
          { ...action.product, cartKey: `${action.product.id}-${Date.now()}` },
        ],
      };
    case "REMOVE":
      return {
        items: state.items.filter((i) => i.cartKey !== action.cartKey),
      };
    case "CLEAR":
      return { items: [] };
    case "LOAD":
      return { items: action.items };
    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [toast, setToast] = useState<ToastState>({
    message: "",
    visible: false,
  });
  const [hydrated, setHydrated] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("solevault-cart");
      if (saved) {
        const items: CartItem[] = JSON.parse(saved);
        dispatch({ type: "LOAD", items });
      }
    } catch {
      localStorage.removeItem("solevault-cart");
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("solevault-cart", JSON.stringify(state.items));
  }, [state.items, hydrated]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToast = useCallback((message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, visible: true });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ message: "", visible: false });
      toastTimeoutRef.current = null;
    }, 2500);
  }, []);

  const addToCart = useCallback(
    (product: Product) => {
      dispatch({ type: "ADD", product });
      showToast(`${product.name} added to cart!`);
    },
    [showToast],
  );

  const removeFromCart = useCallback(
    (cartKey: string) => {
      const item = state.items.find((i) => i.cartKey === cartKey);
      dispatch({ type: "REMOVE", cartKey });
      if (item) showToast(`${item.name} removed from cart`);
    },
    [state.items, showToast],
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const cartCount = state.items.length;
  const cartTotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price, 0),
    [state.items],
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        clearCart,
        toast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
