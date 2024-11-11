import { Button } from "@nextui-org/react";
import { Game } from "../../../interfaces/Game";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { axi } from "../../../utils/axiosInstance";
import "./GameLibrary.css";
import "../shared-styles.css";

interface Props {
  games: Game[];
  onRefresh?: () => void;
}

export const GameLibrary = ({ games, onRefresh }: Props) => {
  const [loading, setLoading] = useState(false);
  const [deletingGameId, setDeletingGameId] = useState<string | null>(null);

  const handleDelete = async (gameId: string) => {
    const confirmed = window.confirm(
      "¿Estás seguro que deseas eliminar este juego de tu biblioteca? Esta acción no genera reembolso."
    );

    if (!confirmed) return;

    setLoading(true);
    setDeletingGameId(gameId);

    try {
      await axi.delete(`/users/games/${gameId}`);
      toast.success("Juego eliminado de tu biblioteca");
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error("Error al eliminar el juego de tu biblioteca");
    } finally {
      setLoading(false);
      setDeletingGameId(null);
    }
  };

  const uniqueGames = games.filter(
    (game, index, self) => index === self.findIndex((g) => g._id === game._id)
  );

  return (
    <section className="library-section">
      <div className="library-header">
        <h3 className="library-title">Mi Biblioteca</h3>
        <span className="game-count">
          {uniqueGames.length} {uniqueGames.length === 1 ? "juego" : "juegos"}
        </span>
      </div>

      {uniqueGames.length === 0 ? (
        <div className="empty-section">
          <p className="empty-section-text">
            No tienes juegos en tu biblioteca.
          </p>
          <p className="empty-section-subtext">
            ¡Compra juegos para comenzar tu colección!
          </p>
        </div>
      ) : (
        <div className="library-grid">
          {uniqueGames.map((game, index) => (
            <div key={`${game._id}-${index}`} className="library-card">
              <img
                src={`/public/images/${game.images[0]}`}
                alt={game.name}
                className="library-game-image"
              />
              <div className="library-game-info">
                <h4 className="library-game-title">{game.name}</h4>
                <div className="library-game-actions">
                  <Button
                    className="download-button"
                    onClick={() => window.open(`/game/${game._id}`, "_blank")}
                  >
                    Descargar
                  </Button>
                  <Button
                    className="delete-button"
                    color="danger"
                    onClick={() => game._id && handleDelete(game._id)}
                    isLoading={deletingGameId === game._id}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
