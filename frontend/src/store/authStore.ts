import { User } from "../interfaces/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (email: string, password: string, type: string) => void;
  resetUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User) => set({ user, isAuthenticated: true }),
      resetUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "user-storage",
    }
  )
);
