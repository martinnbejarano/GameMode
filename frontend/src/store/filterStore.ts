import { create } from "zustand";

interface FilterState {
  filteredUrl: string;
  selectedCategory: string | null;
  setFilteredUrl: (url: string) => void;
  setSelectedCategory: (category: string | null) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filteredUrl: "/games",
  selectedCategory: null,
  setFilteredUrl: (url) => set({ filteredUrl: url }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearFilters: () =>
    set({
      filteredUrl: "/games",
      selectedCategory: null,
    }),
}));
