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
      
      {/* 1. Indian Court Header & Sovereign Emblem Accent */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]" title="Supreme Court Navy" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" title="Ashoka Gold" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]" title="Judicial Crimson" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Indian Judicial Tech Architecture
              </span>
            </div>

            <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Legal Skills Directory</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1E3A8A] border border-blue-200 font-mono">
                {filtered.length} of {skills.length} Skills
              </span>
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Explore 151 official Claude legal skills across 12 practice suites with Indian statutory adaptations, structured prompts, and verified deliverable blueprints.
            </p>
          </div>

          {/* Top Actions: Search Trigger & View Switcher */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            {/* View Mode Toggle: Cards vs List */}
            <div className="inline-flex items-center p-0.5 rounded-lg border border-slate-300 bg-slate-100">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
                  viewMode === 'cards'
                    ? 'bg-[#1E3A8A] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
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
                    ? 'bg-[#1E3A8A] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Compact List View"
                aria-label="Compact List View"
              >
                <List className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">List</span>
              </button>
            </div>

            {/* Quick ⌘K Search Button (Judicial Navy) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg transition-colors shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline text-[10px] font-mono text-amber-300 bg-blue-950 px-1 py-0.2 rounded border border-blue-900">⌘K</kbd>
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
              placeholder="Search by skill name, official command, or statute..."
              className="w-full pl-8 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
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
              className="text-xs bg-slate-50 px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-800 font-medium focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#1E3A8A]"
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
              className="text-xs bg-slate-50 px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-800 font-medium focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#1E3A8A]"
            >
              <option value="all">All Skills ({skills.length})</option>
              <option value="ready">Validated Walkthroughs</option>
              <option value="india">Indian Law Overlays (18)</option>
            </select>

            {/* Reset Filters Button (Court Crimson Red) */}
            {(filterCategory !== 'all' || filterStatus !== 'all' || localQuery) && (
              <button
                onClick={clearFilters}
                className="text-[11px] font-semibold text-[#B91C1C] bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg px-2.5 py-1 whitespace-nowrap transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Category Quick Chips with Court Colors */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none text-[11px]">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
              filterCategory === 'all'
                ? 'bg-slate-950 text-white font-bold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors capitalize ${
                  isSelected
                    ? 'bg-[#1E3A8A] text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0">
          {filtered.map((skill) => {
            const commandStr = skill.official_command || `/${skill.category_id}:${skill.official_name}`;
            return (
              <div
                key={skill.id}
                onClick={() => navigateToSkill(skill.id)}
                className="bg-white border border-slate-200 hover:border-[#1E3A8A] rounded-xl p-4.5 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-3 min-w-0"
              >
                {/* Top Badges & Category */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-300 truncate">
                      {skill.category_name}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Indian Law Badge: Ashoka Gold / Court Yellow */}
                      {skill.india_context && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300 shadow-2xs" title="Indian Substantive Law Grounding">
                          <Scale className="w-3 h-3 text-amber-700" />
                          <span>India</span>
                        </span>
                      )}

                      {/* Ready Badge: Supreme Court Navy */}
                      {skill.educational_status === 'ready' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-200 shadow-2xs" title="Verified Walkthrough Ready">
                          <CheckCircle2 className="w-3 h-3 text-[#1E3A8A]" />
                          <span>Ready</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title: Advocate Black typography */}
                  <h2 className="text-sm font-bold text-slate-900 group-hover:text-[#1E3A8A] transition-colors line-clamp-1 tracking-tight">
                    {skill.display_name}
                  </h2>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Bottom Card Footer: Command Chip + Open Action */}
                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <code className="text-[11px] font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 truncate block select-all">
                      {commandStr}
                    </code>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(commandStr);
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                      title="Copy official command"
                    >
                      <Terminal className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#1E3A8A]" />
                    </button>
                    {/* Open Button: Indian Court Navy */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToSkill(skill.id);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg transition-colors shadow-2xs"
                    >
                      <span>Open</span>
                      <ChevronRight className="w-3 h-3 text-amber-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST STRUCTURE (Responsive Dense Table with Court Colors) */
        <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-2xs">
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/90 border-b border-slate-300 text-[11px] font-bold uppercase tracking-wider text-slate-700">
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
                      className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 group-hover:text-[#1E3A8A] text-xs">
                          {skill.display_name}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 max-w-md mt-0.5">
                          {skill.description}
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 uppercase tracking-wide border border-slate-200">
                          {skill.category_name}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-700 whitespace-nowrap hidden sm:table-cell">
                        <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                          {commandStr}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap hidden md:table-cell">
                        <div className="flex items-center gap-1.5">
                          {skill.india_context && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300">
                              <Scale className="w-3 h-3 text-amber-700" />
                              <span>India</span>
                            </span>
                          )}
                          {skill.educational_status === 'ready' && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-200">
                              <CheckCircle2 className="w-3 h-3 text-[#1E3A8A]" />
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
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg transition-colors shadow-2xs"
                        >
                          <span>Open</span>
                          <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
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
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3">
          <Filter className="w-8 h-8 text-slate-300 mx-auto" />
          <h2 className="text-sm font-bold text-slate-900">No matching skills found</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No skills matched your search query or filter combination.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-1.5 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg transition-colors shadow-xs"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
