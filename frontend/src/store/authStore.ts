import { User } from "../interfaces/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axi } from "../utils/axiosInstance";
import Cookies from "js-cookie";

interface LoginData {
  email: string;
  password: string;
  type: "user" | "company";
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
  login: (userData: LoginData) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      resetUser: () => set({ user: null }),
      login: (userData: LoginData) => {
        if (!userData) return;
        set({ user: userData });
      },
      logout: async () => {
        try {
          await axi.post("/auth/logout", {}, { withCredentials: true });
          Object.keys(Cookies.get()).forEach((cookieName) => {
            Cookies.remove(cookieName);
          });
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
