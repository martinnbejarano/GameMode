// pages/Page.tsx
import { FilterProvider } from "../context/index";
import { RenderGames, Sidebar } from "../components/index";

export const Catalogue = () => {
  return (
    <FilterProvider>
      <div className="flex">
        <Sidebar />
        <RenderGames />
      </div>
    </FilterProvider>
  );
};
