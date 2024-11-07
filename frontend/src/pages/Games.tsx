// pages/Page.tsx
import { FilterProvider } from "../context/filter.context";
import Sidebar from "../components/Sidebar/Sidebar";
import { RenderGames } from "../components/index";

export const Games = () => {
  return (
    <FilterProvider>
      <div className="flex">
        <Sidebar />
        <RenderGames />
      </div>
    </FilterProvider>
  );
};
