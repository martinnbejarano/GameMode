import "./Layout.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../components/index";

export const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
