import { create } from "zustand";

interface FilterState {
  filteredUrl: string;
  selectedCategory: string | null;
  selectedLanguage: string | null;
  selectedOS: string | null;
  setFilteredUrl: (url: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedLanguage: (language: string | null) => void;
  setSelectedOS: (os: string | null) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filteredUrl: "/games",
  selectedCategory: null,
  selectedLanguage: null,
  selectedOS: null,
  setFilteredUrl: (url) => set({ filteredUrl: url }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
  setSelectedOS: (os) => set({ selectedOS: os }),
  clearFilters: () =>
    set({
      filteredUrl: "/games",
      selectedCategory: null,
      selectedLanguage: null,
      selectedOS: null,
    }),
}));
