import { Button } from "@nextui-org/react";
import { Game } from "../../../interfaces/Game";
import "./WishlistGames.css";
import "../shared-styles.css";

interface Props {
  games: Game[];
  onAddToCart: (gameId: string) => void;
  onRemove: (gameId: string) => void;
  loading: boolean;
}

export const WishlistGames = ({
  games,
  onAddToCart,
  onRemove,
  loading,
}: Props) => {
  return (
    <section className="wishlist-section">
      <h3 className="wishlist-title">Lista de deseos</h3>
      {games.length === 0 ? (
        <div className="empty-section">
          <p className="empty-section-text">
            No tienes juegos en tu lista de deseos.
          </p>
          <p className="empty-section-subtext">
            ¡Explora nuestro catálogo y agrega los juegos que te interesen!
          </p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {games.map((game) => (
            <div key={game._id} className="wishlist-card">
              <img
                src={`/public/images/${game.images[0]}`}
                alt={game.name}
                className="wishlist-game-image"
              />
              <div className="wishlist-game-info">
                <h4 className="wishlist-game-title">{game.name}</h4>
                <p className="wishlist-game-price">${game.price} USD</p>
              </div>
              <div className="wishlist-game-actions">
                <Button
                  className="cart-button"
                  onClick={() => onAddToCart(game._id as string)}
                >
                  Agregar al carrito
                </Button>
                <Button
                  className="remove-button"
                  onClick={() => onRemove(game._id as string)}
                  isLoading={loading}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
