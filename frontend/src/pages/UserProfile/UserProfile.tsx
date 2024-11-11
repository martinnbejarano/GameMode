import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useFetch } from "../../Hooks/useFetch";
import { Game } from "../../interfaces/Game";
import { axi } from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ProfileHeader } from "../../components/Profile/ProfileHeader/ProfileHeader";
import { WishlistGames } from "../../components/Profile/WishlistGames/WishlistGames";
import "./UserProfile.css";
import { useWishlistStore } from "../../store/wishlistStore";
import { CartGames } from "../../components/Profile/CartGames/CartGames";
import { GameLibrary } from "../../components/Profile/GameLibrary/GameLibrary";
import { useCartStore } from "../../store/cartStore";

export const UserProfile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: wishlistGames, refetch: refetchWishlist } = useFetch<{
    data: Game[];
  }>("/users/wishlist");
  const { data: cartGames, refetch: refetchCart } = useFetch<{ data: Game[] }>(
    "/users/cart"
  );
  const { data: libraryGames, refetch: refetchLibrary } = useFetch<{
    data: Game[];
  }>("/users/games");
  const { setWishlist, removeFromWishlist } = useWishlistStore();
  const { incrementCartCount, decrementCartCount } = useCartStore();

  useEffect(() => {
    if (wishlistGames?.data) {
      setWishlist(wishlistGames.data);
    }
  }, [wishlistGames?.data, setWishlist]);

  const handleRemoveFromWishlist = async (gameId: string) => {
    try {
      setLoading(true);
      await axi.delete(`/users/wishlist/${gameId}`);
      removeFromWishlist(gameId);
      toast.success("Juego eliminado de la lista de deseos");
      refetchWishlist();
    } catch (error) {
      toast.error("Error al eliminar el juego de la lista de deseos");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyGame = async (gameId: string) => {
    try {
      navigate(`/game/${gameId}`);
    } catch (error) {
      toast.error("Error al procesar la compra");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleRemoveFromCart = async (gameId: string) => {
    try {
      setLoading(true);
      await axi.delete(`/users/cart/${gameId}`);
      decrementCartCount();
      toast.success("Juego eliminado del carrito");
      refetchCart();
    } catch (error) {
      toast.error("Error al eliminar el juego del carrito");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseGames = async (gameIds: string[]) => {
    try {
      setLoading(true);
      for (const gameId of gameIds) {
        await axi.post(`/purchases/${gameId}`);
        await axi.delete(`/users/cart/${gameId}`);
      }
      toast.success("¡Compra realizada con éxito!");
      refetchCart();
    } catch (error) {
      toast.error("Error al procesar la compra");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (gameId: string) => {
    try {
      setLoading(true);
      await axi.post(`/users/cart/${gameId}`);
      await axi.delete(`/users/wishlist/${gameId}`);
      removeFromWishlist(gameId);
      incrementCartCount();

      toast.success(
        "Juego agregado al carrito y eliminado de la lista de deseos"
      );

      refetchCart();
      refetchWishlist();
    } catch (error) {
      toast.error("Error al procesar la operación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <ProfileHeader user={user} onLogout={handleLogout} />
      <GameLibrary
        games={libraryGames?.data || []}
        onRefresh={refetchLibrary}
      />
      <CartGames
        games={cartGames?.data || []}
        onPurchase={handlePurchaseGames}
        onRemove={handleRemoveFromCart}
        loading={loading}
        onRefreshLibrary={refetchLibrary}
      />
      <WishlistGames
        games={wishlistGames?.data || []}
        onAddToCart={handleAddToCart}
        onRemove={handleRemoveFromWishlist}
        loading={loading}
      />
    </div>
  );
};
