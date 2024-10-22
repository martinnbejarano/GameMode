import React from "react";
import { Header } from "../index";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      {/* Puedes agregar un componente Footer aquí si lo deseas */}
    </div>
  );
};

export default Layout;
