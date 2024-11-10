import React, { createContext, useContext, useState, useEffect } from "react";
import { axi } from "../utils/axiosInstance";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  userType: "user" | "company" | null;
  login: (userData: any) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState<"user" | "company" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axi.get("/auth/verify", {
          withCredentials: true,
        });
        if (response.data.success && response.data.user) {
          setIsAuthenticated(true);
          setUser(response.data.user);
          setUserType(response.data.user.type);
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setUserType(null);
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        setIsAuthenticated(false);
        setUser(null);
        setUserType(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: any) => {
    if (!userData) return;
    setIsAuthenticated(true);
    setUser(userData);
    setUserType(userData.type);
  };

  const logout = async () => {
    try {
      await axi.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Error durante logout:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setUserType(null);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, userType, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
