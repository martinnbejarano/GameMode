import "./Layout.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "..";

const Layout: React.FC = () => {
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

export default Layout;
