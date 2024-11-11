import React, { useState, useEffect } from "react";
import "./Header.css";
import { SearchGames } from "../../components/index";
import { useAuthStore } from "../../store/authStore";
import { useCardToggle } from "../../Hooks/useCardToggle";
import { CiLogout, CiLogin } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWishlistStore } from "../../store/wishlistStore";
import { axi } from "../../utils/axiosInstance";
import { Game } from "../../interfaces/Game";

export const Header: React.FC = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cardRef, isOpen, setIsOpen } = useCardToggle();
  const { user, logout } = useAuthStore();
  const { wishlist, setWishlist } = useWishlistStore();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setWishlist([]);
        return;
      }
      try {
        const response = await axi.get<{ data: Game[] }>("/users/wishlist");
        setWishlist(response.data.data);
      } catch (error) {
        console.error("Error al cargar la wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user, setWishlist]);

  console.log(wishlist);
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
                        to="/profile"
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
                        {wishlist.length > 0 && (
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                            {wishlist.length}
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
    </header>
  );
};
