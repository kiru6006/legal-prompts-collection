import React, { useState } from 'react';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { useSearchFilterStore } from '../../stores/searchFilterStore';
import {
  Search,
  ChevronRight,
  CheckCircle2,
  LayoutGrid,
  List,
  Scale,
  Terminal,
  Filter,
  X
} from 'lucide-react';
import { SkillRecord } from '../../types/skills';

export const SkillDirectory: React.FC = () => {
  const { catalogue } = useCatalogueStore();
  const { navigateToSkill } = useNavigationStore();
  const { setIsSearchOpen } = useSearchFilterStore();

  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [localQuery, setLocalQuery] = useState<string>('');

  const skills: SkillRecord[] = catalogue?.skills || [];

  // Extract unique categories
  const categories = Array.from(new Set(skills.map((s) => s.category_id)));

  // Filter skills
  const filtered = skills.filter((s) => {
    if (filterCategory !== 'all' && s.category_id !== filterCategory) return false;
    if (filterStatus === 'ready' && s.educational_status !== 'ready') return false;
    if (filterStatus === 'india' && !s.india_context) return false;
    if (localQuery.trim()) {
      const q = localQuery.toLowerCase();
      const match = `${s.display_name} ${s.official_name} ${s.category_name} ${s.description} ${s.official_command || ''} ${s.india_context?.legislation_ids.join(' ') || ''}`.toLowerCase();
      if (!match.includes(q)) return false;
    }
    return true;
  });

  const clearFilters = () => {
    setFilterCategory('all');
    setFilterStatus('all');
    setLocalQuery('');
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-5 lg:p-6 space-y-4 max-w-7xl mx-auto w-full min-w-0">
      
      {/* 1. Header & Quick Stats */}
      <div className="bg-white border border-legal-border rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-legal-border">
          <div>
            <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Legal Skills Directory</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                {filtered.length} of {skills.length}
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Official Claude legal skills explorer. Browse by category, copy prompt commands, or inspect verified outputs and Indian statutory diligence.
            </p>
          </div>

          {/* Top Actions: Search Trigger & View Switcher */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            {/* View Mode Toggle: Cards vs List */}
            <div className="inline-flex items-center p-0.5 rounded-lg border border-slate-200 bg-slate-100/80">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
                  viewMode === 'cards'
                    ? 'bg-white text-legal-primary font-bold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid / Cards View"
                aria-label="Grid Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">Cards</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
                  viewMode === 'list'
                    ? 'bg-white text-legal-primary font-bold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Compact List View"
                aria-label="Compact List View"
              >
                <List className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">List</span>
              </button>
            </div>

            {/* Quick ⌘K Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-legal-primary rounded-lg hover:bg-legal-primaryHover transition-colors shadow-2xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline text-[10px] font-mono opacity-80 bg-blue-800/60 px-1 rounded">⌘K</kbd>
            </button>
          </div>
        </div>

        {/* 2. Interactive Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between pt-1">
          {/* Keyword Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Filter by skill, command, or statute..."
              className="w-full pl-8 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-legal-primary focus:border-legal-primary"
            />
            {localQuery && (
              <button
                onClick={() => setLocalQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters Bar: Category & Status */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 shrink-0">
            {/* Category Dropdown */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="text-xs bg-slate-50 px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-700 font-medium focus:bg-white focus:outline-hidden"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c.replace(/-/g, ' ').toUpperCase()}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs bg-slate-50 px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-700 font-medium focus:bg-white focus:outline-hidden"
            >
              <option value="all">All Skills ({skills.length})</option>
              <option value="ready">Validated Walkthroughs</option>
              <option value="india">Indian Law Overlays (18)</option>
            </select>

            {/* Reset Filters Button */}
            {(filterCategory !== 'all' || filterStatus !== 'all' || localQuery) && (
              <button
                onClick={clearFilters}
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 hover:underline px-2 py-1 whitespace-nowrap"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Category Quick Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none text-[11px]">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
              filterCategory === 'all'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const isSelected = filterCategory === cat;
            const displayName = cat.replace(/-legal$/, '').replace(/-/g, ' ');
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(isSelected ? 'all' : cat)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors capitalize ${
                  isSelected
                    ? 'bg-legal-primary text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {displayName}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Content Display: Cards vs List */}
      {viewMode === 'cards' ? (
        /* CARDS GRID STRUCTURE (Responsive 1-col mobile, 2-col tablet, 3-col web) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 min-w-0">
          {filtered.map((skill) => {
            const commandStr = skill.official_command || `/${skill.category_id}:${skill.official_name}`;
            return (
              <div
                key={skill.id}
                onClick={() => navigateToSkill(skill.id)}
                className="bg-white border border-legal-border rounded-xl p-4 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-3 min-w-0"
              >
                {/* Top Badges & Category */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 truncate">
                      {skill.category_name}
                    </span>

                    <div className="flex items-center gap-1 shrink-0">
                      {skill.india_context && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200" title="Indian Law Adaptation Available">
                          <Scale className="w-3 h-3 text-teal-700" />
                          <span>India</span>
                        </span>
                      )}

                      {skill.educational_status === 'ready' && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200" title="Validated Educational Walkthrough Ready">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Ready</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-sm font-bold text-slate-900 group-hover:text-legal-primary transition-colors line-clamp-1 tracking-tight">
                    {skill.display_name}
                  </h2>

                  {/* Description */}
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Bottom Card Footer: Command Chip + Open Action */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <code className="text-[11px] font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 truncate block">
                      {commandStr}
                    </code>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(commandStr);
                      }}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                      title="Copy official command"
                    >
                      <Terminal className="w-3.5 h-3.5 text-slate-400 group-hover:text-legal-primary" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToSkill(skill.id);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-legal-primary bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <span>Open</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST STRUCTURE (Responsive Dense Table with clean typography) */
        <div className="border border-legal-border rounded-xl bg-white overflow-hidden shadow-2xs">
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-legal-border text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Skill Name & Scope</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3 hidden sm:table-cell">Official Command</th>
                  <th className="py-3 px-3 hidden md:table-cell">Adaptations</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((skill) => {
                  const commandStr = skill.official_command || `/${skill.category_id}:${skill.official_name}`;
                  return (
                    <tr
                      key={skill.id}
                      onClick={() => navigateToSkill(skill.id)}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 group-hover:text-legal-primary text-xs">
                          {skill.display_name}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 max-w-md mt-0.5">
                          {skill.description}
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 uppercase tracking-wide border border-slate-200">
                          {skill.category_name}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-600 whitespace-nowrap hidden sm:table-cell">
                        <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                          {commandStr}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap hidden md:table-cell">
                        <div className="flex items-center gap-1.5">
                          {skill.india_context && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200">
                              <Scale className="w-3 h-3 text-teal-700" />
                              <span>India</span>
                            </span>
                          )}
                          {skill.educational_status === 'ready' && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Ready</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToSkill(skill.id);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-legal-primary bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <span>Open</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State when no results match filters */}
      {filtered.length === 0 && (
        <div className="bg-white border border-legal-border rounded-xl p-8 text-center space-y-3">
          <Filter className="w-8 h-8 text-slate-300 mx-auto" />
          <h2 className="text-sm font-bold text-slate-900">No matching skills found</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No skills matched your search query or filter combination. Try resetting your search filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-legal-primary rounded-lg hover:bg-legal-primaryHover transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
