import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { SpecificGame } from "./pages/SpecificGame";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ResetPassword } from "./pages/ResetPassword";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { CompanyLayout } from "./pages/CompanyLayout";
import { CompanyGames } from "./pages/CompanyGames";
import { PublishGame } from "./pages/PublishGame";
import { EditGames } from "./pages/EditGames";
import { CompanyDashboard } from "./pages/CompanyDashboard";
import { CompanySales } from "./pages/CompanySales";
import Home from "./pages/Home";
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {
          //        <Route index element={<SpecificGame />} />
        }{" "}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route element={<ProtectedRoutes type="company" />}>
          <Route path="/company" element={<CompanyLayout />}>
            <Route
              index
              path="/company/dashboard"
              element={<CompanyDashboard />}
            />
            <Route path="/company/my-games" element={<CompanyGames />} />
            <Route path="/company/add-game" element={<PublishGame />} />
            <Route path="/company/edit-games" element={<EditGames />} />
            <Route path="/company/sales" element={<CompanySales />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
