import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useAuthStore } from "../../../store/authStore";
import { Game } from "../../../interfaces/Game";
import { axi } from "../../../utils/axiosInstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { PurchaseModal } from "../../PurchaseModal/PurchaseModal";
import { useWishlistStore } from "../../../store/wishlistStore";

interface Props {
  game: Game;
}

export const GameInfo = ({ game }: Props) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasGame, setHasGame] = useState(false);
  const { user } = useAuthStore();
  const { addToWishlist, removeFromWishlist } = useWishlistStore();

  useEffect(() => {
    const checkUserGame = async () => {
      if (!user) return;
      try {
        const response = await axi.get("/users/games");
        const userGames = response.data.data;
        setHasGame(
          userGames.some((userGame: Game) => userGame._id === game._id)
        );
      } catch (error) {
        console.error("Error al verificar juegos del usuario:", error);
      }
    };

    checkUserGame();
  }, [game._id, user]);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!user) return;
      try {
        const response = await axi.get("/users/wishlist");
        const wishlist = response.data.data;
        setIsInWishlist(wishlist.some((item: Game) => item._id === game._id));
      } catch (error) {
        console.error("Error al verificar wishlist:", error);
      }
    };

    checkWishlistStatus();
  }, [game._id, user]);

  const handleWishlistClick = async () => {
    if (!user) {
      toast.error("Debes iniciar sesión para agregar a la lista de deseos");
      return;
    }

    setLoading(true);
    try {
      if (isInWishlist) {
        await axi.delete(`/users/wishlist/${game._id}`);
        removeFromWishlist(game._id);
        toast.success("Juego eliminado de la lista de deseos");
      } else {
        await axi.post(`/users/wishlist/${game._id}`);
        addToWishlist(game);
        toast.success("Juego agregado a la lista de deseos");
      }
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "No disponible";
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCompanyName = (
    companyId: string | { _id: string; name: string }
  ) => {
    if (typeof companyId === "string") {
      return "No disponible";
    }
    return companyId.name;
  };

  return (
    <article className="flex flex-col gap-4 w-full lg:w-2/5 bg-primaryv1 p-6 rounded-lg text-white">
      <p className="line-clamp-3">{game.description}</p>
      <p className="text-xl font-bold">${game.price} US$</p>

      <div className="flex flex-col gap-2">
        {hasGame ? (
          <Button disabled className="bg-gray-500 text-white w-full">
            Ya tienes este juego
          </Button>
        ) : (
          <PurchaseModal gameId={game._id || ""} price={game.price} />
        )}
        {user ? (
          <Button
            className={`${
              isInWishlist ? "bg-red-500" : "bg-slate-400"
            } text-white`}
            onClick={handleWishlistClick}
            isLoading={loading}
          >
            {isInWishlist
              ? "Quitar de la lista de deseos"
              : "Agregar a la lista de deseos"}
          </Button>
        ) : (
          <Link to="/login">
            <Button className="bg-slate-400 text-white w-full">
              Inicia sesión para agregar a la lista de deseos
            </Button>
          </Link>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between py-2 border-b border-gray-600">
          <span>Desarrolladora</span>
          <span>{getCompanyName(game.companyId as string)}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-600">
          <span>Fecha de lanzamiento</span>
          <span>{formatDate(game.createdAt)}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-600">
          <span>Plataformas</span>
          <span>{game.platforms.join(", ")}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-600">
          <span>Idiomas</span>
          <span>{game.languages.join(", ")}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-600">
          <span>Categoría</span>
          <span>{game.category}</span>
        </div>
      </div>
    </article>
  );
};
