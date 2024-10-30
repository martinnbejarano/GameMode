import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { SpecificGame } from "./pages/SpecificGame";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ResetPassword } from "./pages/ResetPassword";
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SpecificGame />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
    </Routes>
  );
};

export default AppRoutes;
