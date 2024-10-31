import { User } from "../interfaces/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  setUser: (email: string, password: string, type: string) => void;
  resetUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      resetUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
