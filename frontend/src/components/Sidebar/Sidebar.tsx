// components/Sidebar/Sidebar.tsx
import { useFilterStore } from "../../store/filterStore";
import { Slider } from "@nextui-org/react";
import { gameCategories } from "../../constants/gameCategories";
import { useState } from "react";
import "./Sidebar.css";
import { languages } from "../../constants/languages";

export const Sidebar = () => {
  const {
    setFilteredUrl,
    selectedCategory,
    setSelectedCategory,
    selectedLanguage,
    setSelectedLanguage,
    selectedOS,
    setSelectedOS,
  } = useFilterStore();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [rating, setRating] = useState(0);

  const operatingSystems = ["Windows", "MacOS", "Linux"];

  const handleFilterChange = (
    newCategory?: string | null,
    newRating?: number,
    newLanguage?: string | null,
    newOS?: string | null
  ) => {
    const params = new URLSearchParams();
    const categoryValue =
      newCategory !== undefined ? newCategory : selectedCategory;
    if (categoryValue) {
      params.append("category", categoryValue);
    }
    if (priceRange[0] !== 0 || priceRange[1] !== 100) {
      params.append("minPrice", priceRange[0].toString());
      params.append("maxPrice", priceRange[1].toString());
    }
    const ratingValue = newRating !== undefined ? newRating : rating;
    if (ratingValue > 0) {
      params.append("minRating", ratingValue.toString());
    }

    const languageValue =
      newLanguage !== undefined ? newLanguage : selectedLanguage;
    if (languageValue) {
      params.append("language", languageValue);
    }

    const osValue = newOS !== undefined ? newOS : selectedOS;
    if (osValue) {
      params.append("os", osValue);
    }

    console.log("URL generada:", `/games?${params.toString()}`);
    setFilteredUrl(
      params.toString() ? `/games?${params.toString()}` : "/games"
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 100]);
    setRating(0);
    setSelectedCategory(null);
    setSelectedLanguage(null);
    setSelectedOS(null);
    setFilteredUrl("/games");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Categorías</h3>
        <div className="flex flex-col gap-2">
          {gameCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                const newCategory =
                  category === selectedCategory ? null : category;
                setSelectedCategory(newCategory);
                handleFilterChange(newCategory);
              }}
              className={`category-button ${
                category === selectedCategory ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Rango de Precio</h3>
        <Slider
          label="Precio"
          step={1}
          minValue={0}
          maxValue={100}
          value={priceRange}
          onChange={(value) => {
            setPriceRange(
              Array.isArray(value) ? value : [value, priceRange[1]]
            );
            handleFilterChange();
          }}
          className="max-w-md"
        />
        <div className="price-labels">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Calificación Mínima</h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => {
                const newRating = star === rating ? 0 : star;
                setRating(newRating);
                handleFilterChange(undefined, newRating);
              }}
              className={`star-button ${
                star <= rating ? "active" : "inactive"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Idioma</h3>
        <div className="flex flex-col gap-2">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => {
                const newLanguage =
                  language === selectedLanguage ? null : language;
                setSelectedLanguage(newLanguage);
                handleFilterChange(undefined, undefined, newLanguage);
              }}
              className={`category-button ${
                language === selectedLanguage ? "active" : ""
              }`}
            >
              {language}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Sistema Operativo</h3>
        <div className="flex flex-col gap-2">
          {operatingSystems.map((os) => (
            <button
              key={os}
              onClick={() => {
                const newOS = os === selectedOS ? null : os;
                setSelectedOS(newOS);
                handleFilterChange(undefined, undefined, undefined, newOS);
              }}
              className={`category-button ${os === selectedOS ? "active" : ""}`}
            >
              {os}
            </button>
          ))}
        </div>
      </div>

      <button onClick={clearFilters} className="clear-filters">
        Limpiar Filtros
      </button>
    </div>
  );
};
