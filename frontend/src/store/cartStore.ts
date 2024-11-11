import { create } from "zustand";
import { Game } from "../interfaces/Game";

interface CartStore {
  cartCount: number;
  setCartCount: (count: number) => void;
  incrementCartCount: () => void;
  decrementCartCount: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  incrementCartCount: () =>
    set((state) => ({ cartCount: state.cartCount + 1 })),
  decrementCartCount: () =>
    set((state) => ({ cartCount: Math.max(0, state.cartCount - 1) })),
}));
