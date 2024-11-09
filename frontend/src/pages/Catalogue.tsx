// pages/Page.tsx
import { FilterProvider } from "../context/index";
import { RenderGames, Sidebar } from "../components/index";
import "./Catalogue.css";

export const Catalogue = () => {
  return (
    <FilterProvider>
      <div className="catalogue-container">
        <h1 className="catalogue-title">Catálogo de Juegos</h1>
        <div className="catalogue-content">
          <div className="catalogue-sidebar">
            <Sidebar />
          </div>
          <div className="catalogue-games">
            <RenderGames />
          </div>
        </div>
      </div>
    </FilterProvider>
  );
};
