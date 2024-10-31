import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const ProtectedRoutes = ({ type }: { type: "user" | "company" }) => {
  const { user } = useAuthStore();
  return user?.type === type ? <Outlet /> : <Navigate to="/login" />;
};
