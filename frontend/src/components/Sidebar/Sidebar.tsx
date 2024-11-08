// components/Sidebar/Sidebar.tsx
import { useFilterContext } from "../../context";

export const Sidebar = () => {
  const { setFilteredUrl } = useFilterContext();

  const handleFilterChange = (newFilter: string) => {
    setFilteredUrl(`/games?category=${newFilter}`);
  };

  return (
    <div className="sidebar">
      <button onClick={() => handleFilterChange("deportes")}>Deportes</button>
      <button onClick={() => handleFilterChange("adventure")}>
        Adventure Games
      </button>
      {/* Add more filter options */}
    </div>
  );
};
