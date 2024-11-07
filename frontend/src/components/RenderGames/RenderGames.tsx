// components/RenderGames/RenderGames.tsx
import { useFilterContext } from "../../contexts/filter.context";
import { useFetch } from "../../hooks/useFetch";
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
            {/* Render game information */}
          </div>
        ))
      )}
    </div>
  );
};
