/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Header.css";
import { SearchGames } from "../../components/index";
import { useAuthStore } from "../../store/authStore";
import { useCardToggle } from "../../hooks/useCardToggle";
import { CiLogout, CiLogin } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { axi } from "../../utils/axiosInstance";
import { useFilterStore } from "../../store/filterStore";
import { useCartStore } from "../../store/cartStore";

export const Header: React.FC = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cardRef, isOpen, setIsOpen } = useCardToggle();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilteredUrl, setSelectedCategory } = useFilterStore();
  const { cartCount, setCartCount } = useCartStore();

  const fetchCartCount = async () => {
    if (!user || user.type === "company") {
      setCartCount(0);
      return;
    }
    try {
      const response = await axi.get("/users/cart");
      setCartCount(response.data.data.length);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [user, location.pathname]);

  const handleCategoryClick = async (category: string) => {
    const params = new URLSearchParams();
    params.append("category", category);
    const newUrl = `/games?${params.toString()}`;

    setSelectedCategory(category);
    setFilteredUrl(newUrl);
    setShowCategories(false);

    navigate("/games");
  };

  return (
    <header className="header bg-primaryv1">
      <nav className="navbar">
        <div className="grid-container">
          <div className="logo-section">
            <Link to="/">
              <img
                src="https://play-lh.googleusercontent.com/1cg3eQALpEpYC-eNdus-u_ORVT7qh68YQrz9ClucjRjriAiT_kZXLbAMnuUCw7MDCmLy=s360-rw"
                alt="Logo de GameMode"
              />
            </Link>
          </div>

          <div className="nav-section">
            <div className={`nav-content ${isMenuOpen ? "active" : ""}`}>
              <ul className="nav-links">
                <li>
                  <Link to="/">Inicio</Link>
                </li>
                <li className="dropdown">
                  <button
                    onClick={() => setShowCategories(!showCategories)}
                    className="text-white bg-transparent border-none cursor-pointer"
                  >
                    Categorías ▼
                  </button>
                  {showCategories && (
                    <div className="dropdown-content">
                      <button onClick={() => handleCategoryClick("RPG")}>
                        RPG
                      </button>
                      <button onClick={() => handleCategoryClick("Acción")}>
                        Acción
                      </button>
                      <button onClick={() => handleCategoryClick("Aventura")}>
                        Aventura
                      </button>
                      <button onClick={() => handleCategoryClick("Deportes")}>
                        Deportes
                      </button>
                      <button onClick={() => handleCategoryClick("Estrategia")}>
                        Estrategia
                      </button>
                      <button onClick={() => handleCategoryClick("Simulación")}>
                        Simulación
                      </button>
                      <button onClick={() => handleCategoryClick("Carreras")}>
                        Carreras
                      </button>
                    </div>
                  )}
                </li>
                <li>
                  <Link to="/consoles">Plataforma</Link>
                </li>
                <li>
                  <Link to="/about">Nosotros</Link>
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
            <div className="relative">
              <img
                src={
                  user
                    ? `https://avatar.iran.liara.run/public/boy?username=${user.username}`
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Usuario"
                className="size-12 md:size-14 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setIsOpen(!isOpen)}
              />
              <div
                ref={cardRef}
                className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl transform transition-transform origin-top-right border border-gray-100
                  ${isOpen ? "scale-100" : "scale-0"}`}
              >
                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <Link
                        to={
                          user.type === "company"
                            ? "/company/dashboard"
                            : "/profile"
                        }
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {user.username || "Usuario"}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        {cartCount > 0 && (
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                            {cartCount}
                          </span>
                        )}
                      </Link>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <CiLogout className="text-lg text-gray-500" />
                      <span>Cerrar sesión</span>
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <CiLogin className="text-lg text-gray-500" />
                      <span>Iniciar sesión</span>
                    </a>
                    <a
                      href="/register"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                    >
                      <FaUserPlus className="text-lg text-gray-500" />
                      <span>Registrarse</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {cartCount > 0 && <span className="notification-badge">{cartCount}</span>}
    </header>
  );
};
