import { Button, Divider } from "@nextui-org/react";
import { Game } from "../../../interfaces/Game";
import "./GameInfo.css";

interface Props {
  game: Game;
}

export const GameInfo = ({ game }: Props) => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return "No disponible";
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="game-info">
      <p className="game-description">{game.description}</p>
      <p className="game-price">${game.price} US$</p>
      <div className="game-buttons">
        <Button className="buy-button">Comprar</Button>
        <Button className="wishlist-button">A la lista de deseos</Button>
      </div>
      <div className="game-details">
        <DetailRow
          label="Desarrolladora"
          value={game.companyId || "No disponible"}
        />
        <DetailRow
          label="Fecha de lanzamiento"
          value={formatDate(game.createdAt)}
        />
        <DetailRow label="Plataformas" value={game.platforms.join(", ")} />
        <DetailRow label="Idiomas" value={game.languages.join(", ")} />
        <DetailRow label="Categoría" value={game.category} />
        <DetailRow label="Ventas" value={`${game.totalSales || 0}`} />
      </div>
    </article>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <>
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
    <Divider />
  </>
);
