import React, { useState } from "react";
import "./Header.css";

const Header: React.FC = () => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <a href="/">
            <img
              src="https://play-lh.googleusercontent.com/1cg3eQALpEpYC-eNdus-u_ORVT7qh68YQrz9ClucjRjriAiT_kZXLbAMnuUCw7MDCmLy=s360-rw"
              alt="Logo de GameMode"
            />
          </a>
        </div>
        <ul className="nav-links">
          <li>
            <a href="/">Inicio</a>
          </li>
          <li className="dropdown">
            <a href="#" onClick={() => setShowCategories(!showCategories)}>
              Categorías ▼
            </a>
            {showCategories && (
              <div className="dropdown-content">
                <a href="#">Acción</a>
                <a href="#">Aventura</a>
                <a href="#">Estrategia</a>
                <a href="#">Deportes</a>
              </div>
            )}
          </li>
          <li>
            <a href="#">Plataforma</a>
          </li>
          <li>
            <a href="#">Nosotros</a>
          </li>
          <li>
            <a href="#">Contacto</a>
          </li>
        </ul>
        <div className="search-user">
          <input
            type="text"
            placeholder="Buscar juegos..."
            className="search-input"
          />
          <div className="user-icon">
            <p>user</p>
            <img src="https://via.placeholder.com/40" alt="Usuario" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
