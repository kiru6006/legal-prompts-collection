import { create } from 'zustand';

export type SkillTab = 'overview' | 'prompt' | 'output' | 'verification' | 'source';

export interface RouteState {
  path: 'directory' | 'skill' | 'quickstart' | 'india' | 'bookmarks' | 'about' | 'playbook';
  skillId?: string;
  category?: string;
  promptId?: string;
}

const LAST_SKILL_KEY = 'claude_legal_last_skill_id';

export function getStoredLastSkill(): string | null {
  try {
    return localStorage.getItem(LAST_SKILL_KEY);
  } catch {
    return null;
  }
}

export function storeLastSkill(id: string) {
  try {
    localStorage.setItem(LAST_SKILL_KEY, id);
  } catch {}
}

function parseHash(hash: string): RouteState {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean || clean === 'directory' || clean === 'home') {
    return { path: 'directory' };
  }

  const segments = clean.split('/').filter(Boolean);
  const first = segments[0];

  if (first === 'skill' && segments.length >= 2) {
    const rawId = segments.slice(1).join(':').replace('/', ':');
    return { path: 'skill', skillId: rawId };
  }

  if (first === 'category' && segments.length >= 2) {
    return { path: 'directory', category: segments[1] };
  }

  if (first === 'playbook' || first === 'lawyer-prompts') {
    if (segments.length >= 2) {
      return { path: 'playbook', promptId: segments[1] };
    }
    return { path: 'playbook' };
  }

  if (first === 'quickstart') return { path: 'quickstart' };
  if (first === 'india') return { path: 'india' };
  if (first === 'bookmarks' || first === 'workspace') return { path: 'bookmarks' };
  if (first === 'about') return { path: 'about' };

  // Fallback: check if the segment itself is a skill ID
  if (first.includes(':')) {
    return { path: 'skill', skillId: first };
  }

  return { path: 'directory' };
}

interface NavigationStore {
  currentRoute: RouteState;
  activeTab: SkillTab;
  mobileDrawerOpen: boolean;
  expandedCategory: string | null;
  
  navigate: (routeString: string) => void;
  navigateToSkill: (skillId: string, tab?: SkillTab) => void;
  setActiveTab: (tab: SkillTab) => void;
  setMobileDrawer: (open: boolean) => void;
  setExpandedCategory: (cat: string | null) => void;
  toggleCategory: (cat: string) => void;
}

const initialRoute = parseHash(typeof window !== 'undefined' ? window.location.hash : '');

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  currentRoute: initialRoute,
  activeTab: 'overview',
  mobileDrawerOpen: false,
  expandedCategory: initialRoute.skillId ? initialRoute.skillId.split(':')[0] : 'commercial-legal',

  navigate: (routeString: string) => {
    const hash = routeString.startsWith('#') ? routeString : `#/${routeString.replace(/^\//, '')}`;
    if (typeof window !== 'undefined') {
      window.location.hash = hash;
    }
    const parsed = parseHash(hash);
    set({
      currentRoute: parsed,
      mobileDrawerOpen: false,
      expandedCategory: parsed.skillId ? parsed.skillId.split(':')[0] : get().expandedCategory
    });
  },

  navigateToSkill: (skillId: string, tab: SkillTab = 'overview') => {
    storeLastSkill(skillId);
    const category = skillId.split(':')[0];
    const hash = `#/skill/${skillId}`;
    if (typeof window !== 'undefined') {
      window.location.hash = hash;
    }
    set({
      currentRoute: { path: 'skill', skillId },
      activeTab: tab,
      mobileDrawerOpen: false,
      expandedCategory: category
    });
  },

  setActiveTab: (tab: SkillTab) => set({ activeTab: tab }),
  setMobileDrawer: (open: boolean) => set({ mobileDrawerOpen: open }),
  setExpandedCategory: (cat: string | null) => set({ expandedCategory: cat }),
  toggleCategory: (cat: string) => set((state) => ({
    expandedCategory: state.expandedCategory === cat ? null : cat
  }))
}));

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    const parsed = parseHash(window.location.hash);
    useNavigationStore.setState({
      currentRoute: parsed,
      expandedCategory: parsed.skillId ? parsed.skillId.split(':')[0] : useNavigationStore.getState().expandedCategory
    });
  });
}
