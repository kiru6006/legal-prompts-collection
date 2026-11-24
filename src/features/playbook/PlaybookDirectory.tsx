import React, { useState, useEffect } from 'react';
import { usePlaybookStore } from '../../stores/playbookStore';
import { LawyerPrompt } from '../../types/lawyerPrompts';
import { PlaybookPromptCard } from './PlaybookPromptCard';
import { PlaybookPromptModal } from './PlaybookPromptModal';
import {
  Search,
  Filter,
  X,
  LayoutGrid,
  List,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

const PERSONAS = [
  { id: 'all', label: 'All Personas' },
  { id: 'advocate', label: 'Advocates' },
  { id: 'senior-counsel', label: 'Senior Counsel' },
  { id: 'corporate', label: 'Corporate Lawyers' },
  { id: 'in-house', label: 'In-House Counsel' },
  { id: 'student', label: 'Law Students' },
  { id: 'researcher', label: 'Researchers' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'legal-ops', label: 'Legal Ops' }
];

export const PlaybookDirectory: React.FC = () => {
  const {
    playbookData,
    loadPlaybook,
    filterCategory,
    setFilterCategory,
    filterPersona,
    setFilterPersona,
    filterPracticeArea,
    setFilterPracticeArea,
    filterModel,
    setFilterModel,
    searchQuery,
    setSearchQuery,
    clearFilters
  } = usePlaybookStore();

  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [activeModalPrompt, setActiveModalPrompt] = useState<LawyerPrompt | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadPlaybook();
  }, [loadPlaybook]);

  const prompts = playbookData?.prompts || [];
  const categories = playbookData?.categories || [];

  // Extract unique practice areas
  const practiceAreas = Array.from(new Set(prompts.map((p) => p.practice_area.trim()))).sort();

  // Filter prompts
  const filtered = prompts.filter((p) => {
    if (filterCategory !== 'all' && p.category_id !== filterCategory) return false;
    if (filterPersona !== 'all' && !p.target_personas.includes(filterPersona) && !p.target_personas.includes('all')) {
      return false;
    }
    if (filterPracticeArea !== 'all' && p.practice_area.trim() !== filterPracticeArea) return false;
    if (filterModel !== 'all') {
      if (filterModel === 'sonnet' && !p.best_ai_model.toLowerCase().includes('sonnet')) return false;
      if (filterModel === 'opus' && !p.best_ai_model.toLowerCase().includes('opus')) return false;
      if (filterModel === 'gpt' && !p.best_ai_model.toLowerCase().includes('gpt')) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = `${p.title} ${p.use_case} ${p.practice_area} ${p.prompt_template} ${p.category_name}`.toLowerCase();
      if (!match.includes(q)) return false;
    }
    return true;
  });

  const handleCopyPrompt = (e: React.MouseEvent, id: string, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isFiltered =
    filterCategory !== 'all' ||
    filterPersona !== 'all' ||
    filterPracticeArea !== 'all' ||
    filterModel !== 'all' ||
    Boolean(searchQuery);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-5 lg:p-6 pb-24 sm:pb-32 space-y-4 max-w-7xl mx-auto w-full min-w-0">
      
      {/* 1. Indian Court Header & Sovereign Emblem Accent */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]" title="Supreme Court Navy" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" title="Ashoka Gold" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]" title="Judicial Crimson" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Bharat Legal Practice Playbook
              </span>
            </div>

            <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Indian Lawyer AI Prompt Playbook</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-950 border border-amber-300 font-mono">
                {filtered.length} of {prompts.length} Prompts
              </span>
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              100 commercial prompts across 15 practice categories for Indian advocates, corporate counsel, and law students. Grounded in BNS, BNSS, BSA, DPDPA 2023, and Supreme Court jurisprudence.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
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
          </div>
        </div>

        {/* 2. Interactive Search & Dropdown Filters */}
        <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
          {/* Keyword Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts by statute, keyword, or use case (e.g., BNS, anticipatory bail, DPDPA)..."
              className="w-full h-9 pl-9 pr-8 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters Bar: Category, Practice Area & Model */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 shrink-0">
            {/* Category Dropdown */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-9 text-xs bg-slate-50 px-2.5 border border-slate-300 rounded-lg text-slate-800 font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-all cursor-pointer"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.prompt_count})
                </option>
              ))}
            </select>

            {/* Practice Area Dropdown */}
            <select
              value={filterPracticeArea}
              onChange={(e) => setFilterPracticeArea(e.target.value)}
              className="h-9 text-xs bg-slate-50 px-2.5 border border-slate-300 rounded-lg text-slate-800 font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-all cursor-pointer max-w-[160px] truncate"
            >
              <option value="all">All Practice Areas</option>
              {practiceAreas.map((pa) => (
                <option key={pa} value={pa}>
                  {pa}
                </option>
              ))}
            </select>

            {/* AI Model Dropdown */}
            <select
              value={filterModel}
              onChange={(e) => setFilterModel(e.target.value)}
              className="h-9 text-xs bg-slate-50 px-2.5 border border-slate-300 rounded-lg text-slate-800 font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-all cursor-pointer"
            >
              <option value="all">All AI Models</option>
              <option value="sonnet">Claude 3.5 Sonnet</option>
              <option value="opus">Claude 3 Opus</option>
              <option value="gpt">ChatGPT / GPT-4o</option>
            </select>

            {/* Reset Button */}
            {isFiltered && (
              <button
                onClick={clearFilters}
                className="h-9 text-[11px] font-bold text-[#B91C1C] bg-red-50 hover:bg-red-100 active:scale-95 border border-red-200 rounded-lg px-3 whitespace-nowrap transition-all shadow-2xs"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* 3. Persona Filter Chips */}
        <div className="pt-1 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-thin">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">
              Role:
            </span>
            {PERSONAS.map((p) => {
              const isSelected = filterPersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setFilterPersona(isSelected ? 'all' : p.id)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-all active:scale-95 text-xs ${
                    isSelected
                      ? 'bg-[#1E3A8A] text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. 15 Category Quick Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 text-[11px] scrollbar-thin">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all font-semibold active:scale-95 ${
              filterCategory === 'all'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All 15 Categories ({prompts.length})
          </button>
          {categories.map((c) => {
            const isSelected = filterCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setFilterCategory(isSelected ? 'all' : c.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-[#1E3A8A] text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium'
                }`}
              >
                {c.name} ({c.prompt_count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Content Views: Cards vs List */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 min-w-0 items-stretch">
          {filtered.map((prompt) => (
            <PlaybookPromptCard
              key={prompt.id}
              prompt={prompt}
              onOpen={(p) => setActiveModalPrompt(p)}
            />
          ))}
        </div>
      ) : (
        /* LIST STRUCTURE (Dense Table) */
        <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-2xs">
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/90 border-b border-slate-300 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Prompt Title & Use Case</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3 hidden sm:table-cell">Practice Area</th>
                  <th className="py-3 px-3 hidden md:table-cell">Model & Savings</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((prompt) => {
                  const isCopied = copiedId === prompt.id;
                  return (
                    <tr
                      key={prompt.id}
                      onClick={() => setActiveModalPrompt(prompt)}
                      className="hover:bg-blue-50/60 active:bg-blue-100/50 cursor-pointer transition-colors group"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-400">
                        {prompt.number}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 group-hover:text-[#1E3A8A] text-xs transition-colors">
                          {prompt.title}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 max-w-md mt-0.5">
                          {prompt.use_case}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800 uppercase tracking-wide border border-slate-200">
                          {prompt.category_name}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap hidden sm:table-cell">
                        <span className="text-slate-700 font-medium">
                          {prompt.practice_area}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                            {prompt.best_ai_model.split(' ')[0]} {prompt.best_ai_model.split(' ')[1] || ''}
                          </span>
                          <span className="text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded-md shadow-2xs">
                            {prompt.expected_time_savings}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={(e) => handleCopyPrompt(e, prompt.id, prompt.prompt_template)}
                            className="p-1.5 text-slate-400 hover:text-[#1E3A8A] hover:bg-slate-100 rounded-md transition-colors"
                            title="Copy prompt"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveModalPrompt(prompt);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] active:scale-95 rounded-lg transition-all shadow-xs"
                          >
                            <span>Open</span>
                            <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3 shadow-2xs">
          <Filter className="w-8 h-8 text-slate-300 mx-auto" />
          <h2 className="text-sm font-bold text-slate-900">No matching prompts found</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No prompts matched your search query or filter combination.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] active:scale-95 rounded-lg transition-all shadow-xs"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Interactive Modal */}
      <PlaybookPromptModal
        prompt={activeModalPrompt}
        isOpen={Boolean(activeModalPrompt)}
        onClose={() => setActiveModalPrompt(null)}
      />

    </div>
  );
};
