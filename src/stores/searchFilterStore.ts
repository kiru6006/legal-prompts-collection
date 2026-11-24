import { create } from 'zustand';

export interface SearchFilterState {
  searchQuery: string;
  isSearchOpen: boolean;
  selectedJurisdiction: string;
  setSearchQuery: (q: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setSelectedJurisdiction: (j: string) => void;
  clearSearch: () => void;
}

export const useSearchFilterStore = create<SearchFilterState>((set) => ({
  searchQuery: '',
  isSearchOpen: false,
  selectedJurisdiction: 'India',

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setIsSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
  setSelectedJurisdiction: (selectedJurisdiction) => set({ selectedJurisdiction }),
  clearSearch: () => set({ searchQuery: '', isSearchOpen: false })
}));
