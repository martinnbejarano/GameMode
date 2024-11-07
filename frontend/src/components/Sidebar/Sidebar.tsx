// components/Sidebar/Sidebar.tsx
import { useFilterContext } from "../../context";

const Sidebar = () => {
  const { setFilteredUrl } = useFilterContext();

  const handleFilterChange = (newFilter: string) => {
    setFilteredUrl(`/games?filter=${newFilter}`);
  };

  return (
    <div className="sidebar">
      <button onClick={() => handleFilterChange("action")}>Action Games</button>
      <button onClick={() => handleFilterChange("adventure")}>
        Adventure Games
      </button>
      {/* Add more filter options */}
    </div>
  );
};

export default Sidebar;
