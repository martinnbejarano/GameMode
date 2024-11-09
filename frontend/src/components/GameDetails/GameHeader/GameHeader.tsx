import { Game } from "../../../interfaces/Game";
import "./GameHeader.css";

interface Props {
  game: Game;
}

export const GameHeader = ({ game }: Props) => {
  return (
    <div className="game-header-container">
      <h2 className="game-title">{game.name}</h2>
      <span className="game-rating">
        {"⭐️".repeat(Math.round(game.averageRating || 0))}
        {" ".repeat(5 - Math.round(game.averageRating || 0))}
        {game.averageRating?.toFixed(1) || "0.0"}
      </span>
    </div>
  );
};
