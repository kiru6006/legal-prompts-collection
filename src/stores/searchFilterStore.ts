import { create } from 'zustand';

export interface FilterState {
  searchQuery: string;
  selectedCategory: string | null;
  selectedPersona: string | null;
  selectedJurisdiction: string;
  riskPosture: 'standard' | 'conservative' | 'high-risk';
  readinessFilter: 'all' | 'ready' | 'catalogue-only';
  
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedPersona: (persona: string | null) => void;
  setSelectedJurisdiction: (jurisdiction: string) => void;
  setRiskPosture: (posture: 'standard' | 'conservative' | 'high-risk') => void;
  setReadinessFilter: (filter: 'all' | 'ready' | 'catalogue-only') => void;
  resetFilters: () => void;
}

export const useSearchFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  selectedCategory: null,
  selectedPersona: null,
  selectedJurisdiction: 'India',
  riskPosture: 'standard',
  readinessFilter: 'all',

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSelectedPersona: (selectedPersona) => set({ selectedPersona }),
  setSelectedJurisdiction: (selectedJurisdiction) => set({ selectedJurisdiction }),
  setRiskPosture: (riskPosture) => set({ riskPosture }),
  setReadinessFilter: (readinessFilter) => set({ readinessFilter }),
  
  resetFilters: () => set({
    searchQuery: '',
    selectedCategory: null,
    selectedPersona: null,
    selectedJurisdiction: 'India',
    riskPosture: 'standard',
    readinessFilter: 'all'
  })
}));
