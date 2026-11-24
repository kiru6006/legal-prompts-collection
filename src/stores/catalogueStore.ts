import { create } from 'zustand';
import { SkillsCatalogue, SkillRecord, WorkflowRecord, CaseStudyRecord } from '../types/skills';

interface CatalogueStore {
  catalogue: SkillsCatalogue | null;
  isLoading: boolean;
  error: string | null;
  loadCatalogue: () => Promise<void>;
  getSkillById: (id: string) => SkillRecord | undefined;
  getSkillsByCategory: (category: string) => SkillRecord[];
  getWorkflowById: (id: string) => WorkflowRecord | undefined;
  getCaseStudyById: (id: string) => CaseStudyRecord | undefined;
}

export const useCatalogueStore = create<CatalogueStore>((set, get) => ({
  catalogue: null,
  isLoading: false,
  error: null,

  loadCatalogue: async () => {
    if (get().catalogue) return;
    set({ isLoading: true, error: null });
    try {
      // Relative path works correctly in both local Vite dev and GitHub Pages base URL
      const res = await fetch('./data/skills.json');
      if (!res.ok) {
        throw new Error(`Failed to load skills catalogue (HTTP ${res.status})`);
      }
      const data: SkillsCatalogue = await res.json();
      set({ catalogue: data, isLoading: false });
    } catch (err: any) {
      console.error('Failed to load catalogue:', err);
      set({ error: err.message || 'Unknown network error', isLoading: false });
    }
  },

  getSkillById: (id: string) => {
    const skills = get().catalogue?.skills || [];
    // Normalise ID search to match colon or slash notation
    const cleanId = id.replace('/', ':');
    return skills.find((s) => s.id === cleanId || s.slug === cleanId || s.id.endsWith(`:${cleanId}`));
  },

  getSkillsByCategory: (category: string) => {
    const skills = get().catalogue?.skills || [];
    return skills.filter((s) => s.category_id === category || s.plugin_id === category);
  },

  getWorkflowById: (id: string) => {
    const workflows = get().catalogue?.workflows || [];
    return workflows.find((w) => w.id === id);
  },

  getCaseStudyById: (id: string) => {
    const caseStudies = get().catalogue?.case_studies || [];
    return caseStudies.find((c) => c.id === id);
  }
}));
