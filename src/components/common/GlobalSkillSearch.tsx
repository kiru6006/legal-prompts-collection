import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { useSearchFilterStore } from '../../stores/searchFilterStore';
import { SkillRecord } from '../../types/skills';

export const GlobalSkillSearch: React.FC = () => {
  const { catalogue } = useCatalogueStore();
  const { navigateToSkill } = useNavigationStore();
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } = useSearchFilterStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut Cmd/Ctrl + K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  const skills: SkillRecord[] = catalogue?.skills || [];
  const query = searchQuery.trim().toLowerCase();

  const filtered = query
    ? skills.filter((s) => {
        const text = `${s.display_name} ${s.official_name} ${s.category_name} ${s.description} ${s.official_command || ''} ${s.india_context?.legislation_ids.join(' ') || ''}`.toLowerCase();
        return text.includes(query);
      }).slice(0, 12)
    : skills.slice(0, 8);

  const handleSelect = (skill: SkillRecord) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigateToSkill(skill.id);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-900/40 backdrop-blur-xs">
      <div
        className="fixed inset-0"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-legal-border overflow-hidden flex flex-col max-h-[80vh] z-10">
        {/* Search Input Bar */}
        <div className="flex items-center px-3.5 py-2.5 border-b border-legal-border gap-2 bg-slate-50/50">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search all 151 official legal skills, commands, statutes..."
            className="flex-1 text-sm bg-transparent border-0 outline-hidden text-legal-text placeholder:text-slate-400 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-1.5 divide-y divide-slate-50">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching legal skills found for &quot;{searchQuery}&quot;
            </div>
          ) : (
            filtered.map((skill, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={skill.id}
                  onClick={() => handleSelect(skill)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-start justify-between p-2.5 rounded text-left transition-colors text-xs ${
                    isSelected
                      ? 'bg-legal-selected text-legal-selectedText'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold truncate text-[13px]">{skill.display_name}</span>
                      <span className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 shrink-0">
                        {skill.category_name}
                      </span>
                      {skill.official_command && (
                        <span className="text-[10px] font-mono text-legal-primary truncate shrink-0">
                          {skill.official_command}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate leading-snug">
                      {skill.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                </button>
              );
            })
          )}
        </div>

        {/* Search Modal Footer */}
        <div className="px-3 py-1.5 bg-slate-50 border-t border-legal-border text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="font-mono text-[10px]">151 official skills indexed</span>
        </div>
      </div>
    </div>
  );
};
