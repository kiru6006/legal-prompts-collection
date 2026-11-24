import React from 'react';
import { Menu, Search, Bookmark, BookOpen } from 'lucide-react';
import { useNavigationStore } from '../../stores/navigationStore';
import { useSearchFilterStore } from '../../stores/searchFilterStore';
import { useBookmarkStore } from '../../stores/bookmarkStore';

export const CompactHeader: React.FC = () => {
  const { navigate, setMobileDrawer, currentRoute } = useNavigationStore();
  const { setIsSearchOpen } = useSearchFilterStore();
  const { bookmarkedSkillIds } = useBookmarkStore();

  return (
    <header className="sticky top-0 z-30 h-12 px-3 sm:px-4 bg-white border-b border-legal-border flex items-center justify-between gap-3 shrink-0">
      {/* Brand & Drawer Toggle */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={() => setMobileDrawer(true)}
          className="p-1.5 text-slate-600 rounded-md md:hidden hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-legal-primary"
          aria-label="Open Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={() => navigate('directory')}
          className="flex items-center gap-2 text-left focus:outline-hidden"
          title="Return to Skill Directory"
        >
          <div className="w-7 h-7 rounded bg-legal-primary text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
            §
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-legal-text tracking-tight leading-tight">
              Claude Legal Skills
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-none hidden sm:inline">
              Workbench
            </span>
          </div>
        </button>
      </div>

      {/* Center Search Input Trigger */}
      <div className="flex-1 max-w-md mx-2">
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-md hover:bg-white hover:border-slate-300 transition-colors focus:outline-hidden focus:ring-2 focus:ring-legal-primary/20"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">Search 151 legal skills, commands, statutes...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.2 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Action Utilities: Quick Start, Bookmarks */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => navigate('quickstart')}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded transition-colors ${
            currentRoute.path === 'quickstart'
              ? 'bg-legal-selected text-legal-selectedText font-semibold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          title="Getting Started & Setup Guide"
        >
          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Quick Start</span>
        </button>

        <button
          onClick={() => navigate('bookmarks')}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded transition-colors ${
            currentRoute.path === 'bookmarks'
              ? 'bg-legal-selected text-legal-selectedText font-semibold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          title="Saved Skills"
        >
          <Bookmark className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Saved</span>
          {bookmarkedSkillIds.length > 0 && (
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-legal-primary text-white">
              {bookmarkedSkillIds.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
