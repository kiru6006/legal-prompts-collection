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
    <header className="sticky top-0 z-30 h-12 px-3 sm:px-4 bg-white border-b border-legal-border flex items-center justify-between gap-3 shrink-0 shadow-2xs">
      {/* Brand, Drawer Toggle & Dual Mode Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={() => setMobileDrawer(true)}
          className="p-1.5 text-slate-700 rounded-md md:hidden hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-legal-courtNavy"
          aria-label="Open Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={() => navigate('directory')}
          className="flex items-center gap-2 text-left focus:outline-hidden group"
          title="Return to Skill Directory"
        >
          {/* Indian Judicial Blue & Gold Emblem */}
          <div className="w-7 h-7 rounded bg-[#1E3A8A] text-amber-300 flex items-center justify-center font-bold text-sm tracking-tight shadow-xs border border-blue-900 group-hover:bg-[#172554] transition-colors">
            §
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-tight group-hover:text-blue-900 transition-colors">
              Claude Legal Skills
            </span>
            <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider leading-none hidden sm:inline">
              Judicial Workbench
            </span>
          </div>
        </button>

        {/* Dual Workbench Mode Switcher: Skills vs Lawyer Playbook */}
        <div className="hidden lg:inline-flex items-center p-0.5 rounded-lg border border-slate-200 bg-slate-100 text-xs shrink-0 ml-1">
          <button
            onClick={() => navigate('directory')}
            className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 active:scale-95 ${
              currentRoute.path === 'directory' || currentRoute.path === 'skill'
                ? 'bg-[#1E3A8A] text-white font-bold shadow-2xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <span>Claude Skills</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
              currentRoute.path === 'directory' || currentRoute.path === 'skill'
                ? 'bg-blue-950 text-amber-300'
                : 'bg-slate-200 text-slate-700'
            }`}>151</span>
          </button>

          <button
            onClick={() => navigate('playbook')}
            className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 active:scale-95 ${
              currentRoute.path === 'playbook'
                ? 'bg-[#1E3A8A] text-white font-bold shadow-2xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <span>Lawyer Playbook</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
              currentRoute.path === 'playbook'
                ? 'bg-amber-400 text-slate-950'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>100</span>
          </button>
        </div>
      </div>

      {/* Center Search Input Trigger */}
      <div className="flex-1 max-w-md mx-2">
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-md hover:bg-white hover:border-blue-300 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 shadow-2xs"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">Search 151 skills & 100 lawyer prompts...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.2 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded">
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
              ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200 shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
          title="Getting Started & Setup Guide"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-900" />
          <span className="hidden sm:inline">Quick Start</span>
        </button>

        <button
          onClick={() => navigate('bookmarks')}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded transition-colors ${
            currentRoute.path === 'bookmarks'
              ? 'bg-amber-50 text-amber-900 font-bold border border-amber-300 shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
          title="Bookmarked Skills"
        >
          <Bookmark className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden sm:inline">Saved</span>
          {bookmarkedSkillIds.length > 0 && (
            <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-500 text-white font-mono">
              {bookmarkedSkillIds.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
