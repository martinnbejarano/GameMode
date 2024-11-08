// components/RenderGames/RenderGames.tsx
import { useFilterContext } from "../../context";
import { useFetch } from "../../Hooks";
import { Game } from "../../interfaces/Game";

export const RenderGames = () => {
  const { filteredUrl } = useFilterContext();
  const { data: games, loading, error } = useFetch<Game[]>(filteredUrl);

  // Render the games
  return (
    <div className="game-list">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        games &&
        games.map((game) => (
          <div key={game._id} className="game-card">
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <p>{game.category}</p>
          </div>
        ))
      )}
    </div>
  );
};
