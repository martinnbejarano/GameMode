import React, { useState } from "react";
import "./Header.css";
import { SearchGames } from "../../components/index";

export const Header: React.FC = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="grid-container">
          <div className="logo-section">
            <a href="/">
              <img
                src="https://play-lh.googleusercontent.com/1cg3eQALpEpYC-eNdus-u_ORVT7qh68YQrz9ClucjRjriAiT_kZXLbAMnuUCw7MDCmLy=s360-rw"
                alt="Logo de GameMode"
              />
            </a>
          </div>

          <div className="nav-section">
            <div className={`nav-content ${isMenuOpen ? "active" : ""}`}>
              <ul className="nav-links">
                <li>
                  <a href="/">Inicio</a>
                </li>
                <li className="dropdown">
                  <a
                    href="#"
                    onClick={() => setShowCategories(!showCategories)}
                  >
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
            </div>
          </div>

          <SearchGames />

          <div className="controls-section">
            <button
              className="hamburger-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className="user-icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Usuario"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
