import { create } from 'zustand';

export interface RouteState {
  path: string;
  category?: string;
  skillId?: string;
  workflowId?: string;
  caseStudyId?: string;
}

interface NavigationStore {
  currentRoute: RouteState;
  isSidebarCollapsed: boolean;
  mobileDrawerOpen: boolean;
  activeTab: 'overview' | 'prompt' | 'output' | 'india' | 'sources';
  navigate: (hash: string) => void;
  toggleSidebar: () => void;
  setMobileDrawer: (open: boolean) => void;
  setActiveTab: (tab: 'overview' | 'prompt' | 'output' | 'india' | 'sources') => void;
}

function parseHash(hash: string): RouteState {
  const clean = hash.replace(/^#\/?/, '');
  const segments = clean.split('/').filter(Boolean);
  
  if (segments.length === 0 || segments[0] === 'home') {
    return { path: 'home' };
  }
  
  if (segments[0] === 'skill' && segments.length >= 2) {
    // #/skill/commercial-legal:nda-review or #/skill/commercial-legal/nda-review
    const skillId = segments.slice(1).join(':').replace('/', ':');
    return { path: 'skill', skillId };
  }
  
  if (segments[0] === 'workflows') {
    return { path: 'workflows', workflowId: segments[1] };
  }
  
  if (segments[0] === 'case-studies') {
    return { path: 'case-studies', caseStudyId: segments[1] };
  }

  if (segments[0] === 'skills' && segments.length >= 2) {
    return { path: 'skills', category: segments[1] };
  }
  
  return { path: segments[0] };
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentRoute: parseHash(window.location.hash || '#/home'),
  isSidebarCollapsed: false,
  mobileDrawerOpen: false,
  activeTab: 'overview',
  
  navigate: (hash: string) => {
    window.location.hash = hash.startsWith('#') ? hash : `#/${hash}`;
    set({ currentRoute: parseHash(window.location.hash), mobileDrawerOpen: false });
  },
  
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setMobileDrawer: (open: boolean) => set({ mobileDrawerOpen: open }),
  setActiveTab: (tab) => set({ activeTab: tab })
}));

// Listen for browser back/forward navigation
if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    useNavigationStore.setState({
      currentRoute: parseHash(window.location.hash || '#/home')
    });
  });
}
