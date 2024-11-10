import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { CompanyLayout } from "./pages/CompanyLayout";
import {
  Login,
  Register,
  ResetPassword,
  CompanyGames,
  Home,
  Catalogue,
  CompanySales,
  CompanyDashboard,
  EditGames,
  PublishGame,
  About,
  SpecificGame,
  Consoles,
} from "./pages";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/games" element={<Catalogue />} />
        <Route path="/game/:id" element={<SpecificGame />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

        {/* Rutas protegidas para usuarios */}
        <Route element={<ProtectedRoutes type="user" />}>
          <Route path="/game/:id/review" element={<SpecificGame />} />
        </Route>

        {/* Rutas protegidas para empresas */}
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

        <Route path="/consoles" element={<Consoles />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
