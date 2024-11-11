import { Game } from "../../../interfaces/Game";

interface Props {
  game: Game;
}

export const GameHeader = ({ game }: Props) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-semibold">{game.name}</h2>
      <span className="text-yellow-400">
        {"★".repeat(Math.round(game.averageRating || 0))}
        {"☆".repeat(5 - Math.round(game.averageRating || 0))}
        <span className="ml-2 text-gray-600">
          {game.averageRating?.toFixed(1) || "0.0"}
        </span>
      </span>
    </div>
  );
};
