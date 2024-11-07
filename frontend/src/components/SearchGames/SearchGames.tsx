import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../Hooks";
import { Game } from "../../interfaces/Game";
import { useNavigate } from "react-router-dom";
import "./SearchGames.css";

export const SearchGames = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { data, loading, error } = useFetch<Game[]>("/games");

  useEffect(() => {
    if (data && search.length > 0) {
      const filtered = data.filter((game) =>
        game.name.toLowerCase().startsWith(search.toLowerCase())
      );
      setFilteredGames(filtered);
      setShowResults(true);
    } else {
      setFilteredGames([]);
      setShowResults(false);
    }
  }, [search, data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGameClick = (gameId: string) => {
    navigate(`/game/${gameId}`);
    setShowResults(false);
    setSearch("");
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="search-section" ref={searchContainerRef}>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Buscar juegos..."
        className="search-input"
      />
      {showResults && filteredGames.length > 0 && (
        <div className="search-results">
          {filteredGames.map((game) => (
            <div
              key={game._id}
              className="search-result-item"
              onClick={() => game._id && handleGameClick(game._id)}
            >
              <img
                src={typeof game.images[0] === "string" ? game.images[0] : ""}
                alt={game.name}
                className="search-result-image"
              />
              <div className="search-result-info">
                <span className="search-result-name">{game.name}</span>
                <span className="search-result-price">${game.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
