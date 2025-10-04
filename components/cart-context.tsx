"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type {
  CartLine,
  CartState,
  Product,
  SizeKey,
  ColorKey,
} from "@/lib/types";

type CartAction =
  | { type: "LOAD"; state: CartState }
  | { type: "ADD"; line: Omit<CartLine, "qty">; qty: number }
  | { type: "REMOVE"; key: string }
  | { type: "SET_QTY"; key: string; qty: number }
  | { type: "CLEAR" };

const INITIAL: CartState = { lines: [] };
const STORAGE_KEY = "aruateam-cart";

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "LOAD":
      return action.state || INITIAL;
    case "ADD": {
      const i = state.lines.findIndex((l) => l.key === action.line.key);
      if (i !== -1) {
        const copy = [...state.lines];
        copy[i] = { ...copy[i], qty: Math.min(copy[i].qty + action.qty, 99) };
        return { lines: copy };
      }
      return {
        lines: [
          ...state.lines,
          { ...action.line, qty: Math.min(action.qty, 99) },
        ],
      };
    }
    case "REMOVE":
      return { lines: state.lines.filter((l) => l.key !== action.key) };
    case "SET_QTY":
      return {
        lines: state.lines.map((l) =>
          l.key === action.key
            ? { ...l, qty: Math.max(1, Math.min(action.qty, 99)) }
            : l
        ),
      };
    case "CLEAR":
      return INITIAL;
    default:
      return state;
  }
}

type CartContextType = {
  state: CartState;
  addProduct: (
    p: Product,
    qty?: number,
    opts?: { size?: SizeKey | null }
  ) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number; // cents
};

const CartContext = createContext<CartContextType | null>(null);

function normalizeColorway(cw: Product["colorway"]): ColorKey[] | undefined {
  if (!cw) return undefined;
  return (Array.isArray(cw) ? cw.slice(0, 2) : [cw]) as ColorKey[];
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        dispatch({ type: "LOAD", state: parsed });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const api = useMemo<CartContextType>(() => {
    const addProduct = (
      p: Product,
      qty: number = 1,
      opts?: { size?: SizeKey | null }
    ) => {
      const size = opts?.size ?? null;
      const colorway = normalizeColorway(p.colorway);
      const key = [p.id, size ?? ""].filter(Boolean).join("::");

      dispatch({
        type: "ADD",
        line: {
          key,
          productId: p.id,
          name: p.name,
          price: p.price,
          currency: p.currency,
          image: p.images?.[0] ?? null,
          slug: p.slug,
          colorway,
          size,
        },
        qty,
      });
    };

    const remove = (key: string) => dispatch({ type: "REMOVE", key });
    const setQty = (key: string, qty: number) =>
      dispatch({ type: "SET_QTY", key, qty });
    const clear = () => dispatch({ type: "CLEAR" });

    const count = state.lines.reduce((acc, l) => acc + l.qty, 0);
    const total = state.lines.reduce((acc, l) => acc + l.price * l.qty, 0);

    return { state, addProduct, remove, setQty, clear, count, total };
  }, [state]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
