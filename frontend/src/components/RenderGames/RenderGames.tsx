// components/RenderGames/RenderGames.tsx
import { useFilterContext } from "../../context";
import { useFetch } from "../../Hooks";
import { Game } from "../../interfaces/Game";
import { Link } from "react-router-dom";
import "./RenderGames.css";

export const RenderGames = () => {
  const { filteredUrl } = useFilterContext();
  const { data: games, loading, error } = useFetch<Game[]>(filteredUrl);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (!games?.length) {
    return (
      <div className="no-results">
        No se encontraron juegos con los filtros seleccionados
      </div>
    );
  }

  return (
    <div className="games-grid">
      {games.map((game) => (
        <Link to={`/game/${game._id}`} key={game._id} className="game-card">
          <div className="game-image-container">
            <img
              src={
                typeof game.images[0] === "string"
                  ? `../public/images/${game.images[0]}`
                  : ""
              }
              alt={game.name}
              className="game-image"
            />
          </div>
          <div className="game-content">
            <div className="game-header">
              <h2 className="game-title">{game.name}</h2>
              <span className="game-rating">
                {"★".repeat(Math.round(game.averageRating || 0))}
                {"☆".repeat(5 - Math.round(game.averageRating || 0))}
              </span>
            </div>
            <p className="game-description">{game.description}</p>
            <div className="game-footer">
              <span className="game-price">${game.price}</span>
              <span className="game-category">{game.category}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
