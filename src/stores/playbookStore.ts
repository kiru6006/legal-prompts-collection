import { create } from 'zustand';
import { LawyerPlaybookData, LawyerPrompt } from '../types/lawyerPrompts';

interface PlaybookStore {
  playbookData: LawyerPlaybookData | null;
  isLoading: boolean;
  error: string | null;
  loadPlaybook: () => Promise<void>;

  selectedPromptId: string | null;
  setSelectedPromptId: (id: string | null) => void;

  filterCategory: string;
  setFilterCategory: (cat: string) => void;

  filterPersona: string;
  setFilterPersona: (persona: string) => void;

  filterPracticeArea: string;
  setFilterPracticeArea: (area: string) => void;

  filterModel: string;
  setFilterModel: (model: string) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  clearFilters: () => void;

  getPromptById: (id: string) => LawyerPrompt | undefined;
}

export const usePlaybookStore = create<PlaybookStore>((set, get) => ({
  playbookData: null,
  isLoading: false,
  error: null,

  loadPlaybook: async () => {
    if (get().playbookData || get().isLoading) return;
    set({ isLoading: true, error: null });

    const paths = [
      `${import.meta.env.BASE_URL}data/lawyer_prompts.json`,
      './data/lawyer_prompts.json',
      '/data/lawyer_prompts.json'
    ];

    for (const p of paths) {
      try {
        const res = await fetch(p);
        if (res.ok) {
          const data: LawyerPlaybookData = await res.json();
          set({ playbookData: data, isLoading: false, error: null });
          return;
        }
      } catch {
        // try next path
      }
    }

    set({ error: 'Failed to load Indian Lawyer Prompts Playbook', isLoading: false });
  },

  selectedPromptId: null,
  setSelectedPromptId: (id) => set({ selectedPromptId: id }),

  filterCategory: 'all',
  setFilterCategory: (cat) => set({ filterCategory: cat }),

  filterPersona: 'all',
  setFilterPersona: (persona) => set({ filterPersona: persona }),

  filterPracticeArea: 'all',
  setFilterPracticeArea: (area) => set({ filterPracticeArea: area }),

  filterModel: 'all',
  setFilterModel: (model) => set({ filterModel: model }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  clearFilters: () => set({
    filterCategory: 'all',
    filterPersona: 'all',
    filterPracticeArea: 'all',
    filterModel: 'all',
    searchQuery: ''
  }),

  getPromptById: (id: string) => {
    const data = get().playbookData;
    if (!data) return undefined;
    return data.prompts.find((p) => p.id === id);
  }
}));
