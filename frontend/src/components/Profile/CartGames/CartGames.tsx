import { Button } from "@nextui-org/react";
import { Game } from "../../../interfaces/Game";
import { PurchaseModal } from "../../PurchaseModal/PurchaseModal";
import "./CartGames.css";
import "../shared-styles.css";

interface Props {
  games: Game[];
  onPurchase: (gameIds: string[]) => void;
  onRemove: (gameId: string) => void;
  loading: boolean;
  onRefreshLibrary: () => void;
}

export const CartGames = ({
  games,
  onRemove,
  loading,
  onRefreshLibrary,
}: Props) => {
  const total = games.reduce((sum, game) => sum + game.price, 0);

  const handlePurchaseSuccess = () => {
    onRefreshLibrary();
    games.forEach((game) => onRemove(game._id as string));
  };

  return (
    <section className="cart-section">
      <div className="cart-header">
        <h3 className="cart-title">Carrito de compras</h3>
        {games.length > 0 && (
          <PurchaseModal
            gameId={games.map((game) => game._id as string).join(",")}
            price={total}
            onSuccess={handlePurchaseSuccess}
          />
        )}
      </div>

      {games.length === 0 ? (
        <div className="empty-section">
          <p className="empty-section-text">No tienes juegos en tu carrito.</p>
          <p className="empty-section-subtext">
            ¡Explora nuestro catálogo y agrega los juegos que te interesen!
          </p>
        </div>
      ) : (
        <div className="cart-grid">
          {games.map((game) => (
            <div key={game._id} className="cart-card">
              <img
                src={`/public/images/${game.images[0]}`}
                alt={game.name}
                className="cart-game-image"
              />
              <div className="cart-game-info">
                <h4 className="cart-game-title">{game.name}</h4>
                <p className="cart-game-price">${game.price} USD</p>
              </div>
              <div className="cart-game-actions">
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
