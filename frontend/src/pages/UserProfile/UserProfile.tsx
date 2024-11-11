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

export const UserProfile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: wishlistGames, refetch } = useFetch<{ data: Game[] }>(
    "/users/wishlist"
  );
  const { setWishlist, removeFromWishlist } = useWishlistStore();

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
      refetch();
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

  return (
    <div className="profile-container">
      <ProfileHeader user={user} onLogout={handleLogout} />
      <WishlistGames
        games={wishlistGames?.data || []}
        onBuy={handleBuyGame}
        onRemove={handleRemoveFromWishlist}
        loading={loading}
      />
    </div>
  );
};
