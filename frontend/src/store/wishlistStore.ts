import { create } from "zustand";
import { Game } from "../interfaces/Game";

interface WishlistStore {
  wishlist: Game[];
  setWishlist: (games: Game[]) => void;
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (gameId: string) => void;
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  wishlist: [],
  setWishlist: (games) => set({ wishlist: games }),
  addToWishlist: (game) =>
    set((state) => ({
      wishlist: [...state.wishlist, game],
    })),
  removeFromWishlist: (gameId) =>
    set((state) => ({
      wishlist: state.wishlist.filter((game) => game._id !== gameId),
    })),
}));
