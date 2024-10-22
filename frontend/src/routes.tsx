import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { SpecificGame } from "./pages/SpecificGame";

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SpecificGame />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
