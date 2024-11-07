import { createContext, useState, FC, ReactNode, useContext } from "react";

interface FilterContextType {
  filteredUrl: string;
  setFilteredUrl: (url: string) => void;
}

export const FilterContext = createContext<FilterContextType>({
  filteredUrl: "/games",
  setFilteredUrl: () => {},
});

export const useFilterContext = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error(
      "useFilterContext must be used within a FilterContextProvider"
    );
  }

  return context;
};

export const FilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [filteredUrl, setFilteredUrl] = useState("/games");

  return (
    <FilterContext.Provider value={{ filteredUrl, setFilteredUrl }}>
      {children}
    </FilterContext.Provider>
  );
};
