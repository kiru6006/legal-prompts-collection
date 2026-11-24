import React, { useState } from 'react';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { useSearchFilterStore } from '../../stores/searchFilterStore';
import { getCategoryTheme } from '../../utils/categoryTheme';
import {
  Search,
  ChevronRight,
  CheckCircle2,
  LayoutGrid,
  List,
  Scale,
  Terminal,
  Filter,
  X,
  Check
} from 'lucide-react';
import { SkillRecord } from '../../types/skills';

const CATEGORY_NAMES: Record<string, string> = {
  'ai-governance-legal': 'AI Governance',
  'commercial-legal': 'Commercial',
  'corporate-legal': 'Corporate',
  'employment-legal': 'Employment',
  'ip-legal': 'Intellectual Property',
  'law-student': 'Law Student',
  'legal-builder-hub': 'Builder Hub',
  'legal-clinic': 'Legal Clinic',
  'litigation-legal': 'Litigation',
  'privacy-legal': 'Privacy',
  'product-legal': 'Product',
  'regulatory-legal': 'Regulatory'
};

export const SkillDirectory: React.FC = () => {
  const { catalogue } = useCatalogueStore();
  const { navigateToSkill } = useNavigationStore();
  const { setIsSearchOpen } = useSearchFilterStore();

  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [localQuery, setLocalQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const skills: SkillRecord[] = catalogue?.skills || [];

  // Extract unique categories preserving canonical order
  const rawCategories = Array.from(new Set(skills.map((s) => s.category_id)));
  const categories = Object.keys(CATEGORY_NAMES).filter((c) => rawCategories.includes(c));
  for (const c of rawCategories) {
    if (!categories.includes(c)) categories.push(c);
  }

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

  const handleCopyCommand = (e: React.MouseEvent, skillId: string, cmd: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cmd);
    setCopiedId(skillId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-5 lg:p-6 pb-24 sm:pb-32 space-y-4 max-w-7xl mx-auto w-full min-w-0">
      
      {/* 1. Indian Court Header & Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3.5">
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
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1E3A8A] border border-blue-200 font-mono">
                {filtered.length} of {skills.length} Skills
              </span>
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Explore official Claude legal skills across 12 practice suites with Indian statutory adaptations, structured prompts, and verified deliverable blueprints.
            </p>
          </div>

          {/* Top Actions: Search Trigger & View Switcher */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            {/* View Mode Toggle: Cards vs List */}
            <div className="inline-flex items-center p-0.5 rounded-lg border border-slate-300 bg-slate-100">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-md text-xs transition-all flex items-center gap-1 active:scale-95 ${
                  viewMode === 'cards'
                    ? 'bg-[#1E3A8A] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
                title="Grid / Cards View"
                aria-label="Grid Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">Cards</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md text-xs transition-all flex items-center gap-1 active:scale-95 ${
                  viewMode === 'list'
                    ? 'bg-[#1E3A8A] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] active:scale-95 active:bg-[#0f172a] rounded-lg transition-all shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline text-[10px] font-mono text-amber-300 bg-blue-950 px-1 py-0.2 rounded border border-blue-900">⌘K</kbd>
            </button>
          </div>
        </div>

        {/* 2. Interactive Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
          {/* Keyword Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search by skill name, official command, or statute..."
              className="w-full h-9 pl-9 pr-8 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-all"
            />
            {localQuery && (
              <button
                onClick={() => setLocalQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
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
              className="h-9 text-xs bg-slate-50 px-2.5 border border-slate-300 rounded-lg text-slate-800 font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-all cursor-pointer"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_NAMES[c] || c.replace(/-/g, ' ').toUpperCase()}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-9 text-xs bg-slate-50 px-2.5 border border-slate-300 rounded-lg text-slate-800 font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-all cursor-pointer"
            >
              <option value="all">All Skills ({skills.length})</option>
              <option value="ready">Validated Walkthroughs</option>
              <option value="india">Indian Law Overlays (18)</option>
            </select>

            {/* Reset Filters Button */}
            {(filterCategory !== 'all' || filterStatus !== 'all' || localQuery) && (
              <button
                onClick={clearFilters}
                className="h-9 text-[11px] font-bold text-[#B91C1C] bg-red-50 hover:bg-red-100 active:scale-95 border border-red-200 rounded-lg px-3 whitespace-nowrap transition-all shadow-2xs"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Category Quick Chips with Active Highlights */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 text-[11px] scrollbar-thin">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all font-semibold active:scale-95 ${
              filterCategory === 'all'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Skills ({skills.length})
          </button>
          {categories.map((cat) => {
            const isSelected = filterCategory === cat;
            const displayName = CATEGORY_NAMES[cat] || cat.replace(/-legal$/, '').replace(/-/g, ' ');
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(isSelected ? 'all' : cat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-[#1E3A8A] text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium'
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 min-w-0 items-stretch">
          {filtered.map((skill) => {
            const commandStr = skill.official_command || `/${skill.category_id}:${skill.official_name}`;
            const isCopied = copiedId === skill.id;
            const theme = getCategoryTheme(skill.category_id);

            return (
              <div
                key={skill.id}
                onClick={() => navigateToSkill(skill.id)}
                style={{
                  '--cat-shadow': theme.shadowBase,
                  '--cat-shadow-hover': theme.shadowHover,
                  borderLeftColor: theme.borderLeftColor,
                } as React.CSSProperties}
                className="card-left-shadow h-full bg-white border border-slate-200 hover:border-slate-300 border-l-4 rounded-xl p-4 sm:p-5 active:scale-[0.99] active:bg-slate-50/50 transition-all duration-150 cursor-pointer flex flex-col justify-between group min-w-0"
              >
                {/* Top Section: Badges & Info */}
                <div className="space-y-2">
                  {/* Category & Status Badges Row */}
                  <div className="flex items-center justify-between gap-1.5 h-6">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder} border truncate shrink-0 max-w-[60%]`}>
                      {CATEGORY_NAMES[skill.category_id] || skill.category_name}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Indian Law Badge */}
                      {skill.india_context && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300 shadow-2xs" title="Indian Substantive Law Grounding">
                          <Scale className="w-3 h-3 text-amber-700" />
                          <span>India</span>
                        </span>
                      )}

                      {/* Ready Badge */}
                      {skill.educational_status === 'ready' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-200 shadow-2xs" title="Verified Walkthrough Ready">
                          <CheckCircle2 className="w-3 h-3 text-[#1E3A8A]" />
                          <span>Ready</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-sm font-bold text-slate-900 group-hover:text-[#1E3A8A] transition-colors truncate tracking-tight h-6 flex items-center">
                    {skill.display_name}
                  </h2>

                  {/* Description: Uniform 2-line height */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed h-10 overflow-hidden text-ellipsis">
                    {skill.description}
                  </p>
                </div>

                {/* Bottom Section: Command Bar + Action */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100 mt-3">
                  {/* Full-width Official Command Bar */}
                  <div className="h-10 bg-slate-50 group-hover:bg-slate-100/70 border border-slate-200 rounded-lg px-2.5 py-1.5 flex items-center justify-between gap-2 transition-colors">
                    <code className="text-[11px] font-mono text-slate-700 truncate block select-all flex-1" title={commandStr}>
                      {commandStr}
                    </code>
                    <button
                      onClick={(e) => handleCopyCommand(e, skill.id, commandStr)}
                      className="p-1 text-slate-400 hover:text-[#1E3A8A] hover:bg-slate-200/70 active:scale-90 rounded transition-all shrink-0"
                      title={isCopied ? 'Command Copied!' : 'Copy command to clipboard'}
                      aria-label="Copy command"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Terminal className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Action Bar */}
                  <div className="h-8 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
                      <span>Workbench Ready</span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToSkill(skill.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] active:scale-95 active:bg-[#0f172a] focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:outline-none rounded-lg transition-all shadow-xs group-hover:shadow-sm"
                    >
                      <span>Open Skill</span>
                      <ChevronRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
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
                  const isCopied = copiedId === skill.id;

                  return (
                    <tr
                      key={skill.id}
                      onClick={() => navigateToSkill(skill.id)}
                      className="hover:bg-blue-50/60 active:bg-blue-100/50 cursor-pointer transition-colors group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 group-hover:text-[#1E3A8A] text-xs transition-colors">
                          {skill.display_name}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 max-w-md mt-0.5">
                          {skill.description}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800 uppercase tracking-wide border border-slate-200">
                          {CATEGORY_NAMES[skill.category_id] || skill.category_name}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono text-[11px] text-slate-700 whitespace-nowrap hidden sm:table-cell">
                        <div className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 px-2 py-0.5 rounded border border-slate-200 transition-colors">
                          <span>{commandStr}</span>
                          <button
                            onClick={(e) => handleCopyCommand(e, skill.id, commandStr)}
                            className="text-slate-400 hover:text-[#1E3A8A] p-0.5 rounded transition-colors"
                            title="Copy command"
                          >
                            {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Terminal className="w-3 h-3" />}
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap hidden md:table-cell">
                        <div className="flex items-center gap-1.5">
                          {skill.india_context && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300 shadow-2xs">
                              <Scale className="w-3 h-3 text-amber-700" />
                              <span>India</span>
                            </span>
                          )}
                          {skill.educational_status === 'ready' && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-200 shadow-2xs">
                              <CheckCircle2 className="w-3 h-3 text-[#1E3A8A]" />
                              <span>Ready</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToSkill(skill.id);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] active:scale-95 active:bg-[#0f172a] focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:outline-none rounded-lg transition-all shadow-xs"
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
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3 shadow-2xs">
          <Filter className="w-8 h-8 text-slate-300 mx-auto" />
          <h2 className="text-sm font-bold text-slate-900">No matching skills found</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No skills matched your search query or filter combination.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] active:scale-95 rounded-lg transition-all shadow-xs"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
