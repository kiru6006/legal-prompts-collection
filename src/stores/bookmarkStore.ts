import { create } from 'zustand';

interface BookmarkStore {
  bookmarkedSkillIds: string[];
  toggleBookmark: (skillId: string) => void;
  isBookmarked: (skillId: string) => boolean;
  clearBookmarks: () => void;
}

const STORAGE_KEY = 'claude_legal_bookmarks_v1';

function getStoredBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarkedSkillIds: getStoredBookmarks(),

  toggleBookmark: (skillId: string) => {
    const current = get().bookmarkedSkillIds;
    const exists = current.includes(skillId);
    const updated = exists ? current.filter((id) => id !== skillId) : [...current, skillId];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save bookmark to storage', e);
    }
    set({ bookmarkedSkillIds: updated });
  },

  isBookmarked: (skillId: string) => {
    return get().bookmarkedSkillIds.includes(skillId);
  },

  clearBookmarks: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    set({ bookmarkedSkillIds: [] });
  }
}));
