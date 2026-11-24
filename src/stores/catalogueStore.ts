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

    // Robust multi-path resolution for both localhost and GitHub Pages (with/without subpath)
    const baseUrl = import.meta.env.BASE_URL || './';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    
    const candidatePaths = [
      `${cleanBase}data/skills.json`,
      './data/skills.json',
      'data/skills.json',
      '/legal-prompts-collection/data/skills.json',
      '/data/skills.json'
    ];

    let lastError = null;
    for (const path of candidatePaths) {
      try {
        const res = await fetch(path);
        if (res.ok) {
          const data: SkillsCatalogue = await res.json();
          if (data && Array.isArray(data.skills)) {
            set({ catalogue: data, isLoading: false, error: null });
            return;
          }
        }
      } catch (e: any) {
        lastError = e;
      }
    }

    console.error('Failed to load catalogue from candidate paths', lastError);
    set({
      error: 'Failed to load skills catalogue. Please refresh or check connection.',
      isLoading: false
    });
  },

  getSkillById: (id: string) => {
    const skills = get().catalogue?.skills || [];
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
