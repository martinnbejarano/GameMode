import { User } from "../interfaces/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axi } from "../utils/axiosInstance";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
  login: (userData: any) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      resetUser: () => set({ user: null }),
      login: (userData: User) => {
        if (!userData) return;
        set({ user: userData });
      },
      logout: async () => {
        try {
          await axi.post("/auth/logout", {}, { withCredentials: true });
        } catch (error) {
          console.error("Error durante logout:", error);
        } finally {
          set({ user: null });
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
);
