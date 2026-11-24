import React, { useState } from 'react';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { useSearchFilterStore } from '../../stores/searchFilterStore';
import { Search, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SkillRecord } from '../../types/skills';

export const SkillDirectory: React.FC = () => {
  const { catalogue } = useCatalogueStore();
  const { navigateToSkill } = useNavigationStore();
  const { setIsSearchOpen } = useSearchFilterStore();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [localQuery, setLocalQuery] = useState<string>('');

  const skills: SkillRecord[] = catalogue?.skills || [];

  const categories = Array.from(new Set(skills.map((s) => s.category_id)));

  const filtered = skills.filter((s) => {
    if (filterCategory !== 'all' && s.category_id !== filterCategory) return false;
    if (filterStatus === 'ready' && s.educational_status !== 'ready') return false;
    if (filterStatus === 'catalogue' && s.educational_status === 'ready') return false;
    if (localQuery) {
      const q = localQuery.toLowerCase();
      const match = `${s.display_name} ${s.official_name} ${s.category_name} ${s.description} ${s.official_command || ''}`.toLowerCase();
      if (!match.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-w-5xl mx-auto w-full">
      {/* Directory Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-legal-border gap-3">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-legal-text tracking-tight flex items-center gap-2">
            <span>Legal Skills Directory</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
              {filtered.length} of {skills.length}
            </span>
          </h1>
          <p className="text-xs text-legal-muted mt-0.5">
            Select any official skill from the categories or table below to configure its prompt and inspect verified outputs.
          </p>
        </div>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-legal-primary rounded-md hover:bg-legal-primaryHover transition-colors shadow-xs self-start sm:self-auto"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Global Search</span>
          <kbd className="ml-1 text-[10px] font-mono opacity-80">⌘K</kbd>
        </button>
      </div>

      {/* Filter and Inline Search Controls */}
      <div className="flex flex-wrap items-center gap-2 text-xs bg-slate-50 p-2.5 rounded-md border border-legal-border">
        <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Filter list by keyword..."
            className="w-full text-xs bg-white px-2 py-1 border border-slate-200 rounded focus:outline-hidden focus:ring-1 focus:ring-legal-primary"
          />
        </div>

        {/* Category filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="text-xs bg-white px-2 py-1 border border-slate-200 rounded text-slate-700 font-medium focus:outline-hidden"
        >
          <option value="all">All Categories ({categories.length})</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.replace(/-/g, ' ').toUpperCase()}
            </option>
          ))}
        </select>

        {/* Ready status filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-xs bg-white px-2 py-1 border border-slate-200 rounded text-slate-700 font-medium focus:outline-hidden"
        >
          <option value="all">All Statuses</option>
          <option value="ready">Walkthrough Ready</option>
          <option value="catalogue">Catalogue Only</option>
        </select>

        {(filterCategory !== 'all' || filterStatus !== 'all' || localQuery) && (
          <button
            onClick={() => {
              setFilterCategory('all');
              setFilterStatus('all');
              setLocalQuery('');
            }}
            className="text-[11px] font-semibold text-legal-primary hover:underline px-1"
          >
            Reset
          </button>
        )}
      </div>

      {/* Skills Table / List */}
      <div className="border border-legal-border rounded-lg bg-white overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-legal-border text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-2.5 px-3.5">Skill Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 hidden sm:table-cell">Official Command</th>
                <th className="py-2.5 px-3 hidden md:table-cell">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((skill) => (
                <tr
                  key={skill.id}
                  onClick={() => navigateToSkill(skill.id)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                >
                  <td className="py-2.5 px-3.5">
                    <div className="font-bold text-slate-900 group-hover:text-legal-primary text-xs">
                      {skill.display_name}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 max-w-md mt-0.5">
                      {skill.description}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 uppercase tracking-wide">
                      {skill.category_name}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600 whitespace-nowrap hidden sm:table-cell">
                    {skill.official_command || '-'}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap hidden md:table-cell">
                    {skill.educational_status === 'ready' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-legal-success">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ready</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Catalogue</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToSkill(skill.id);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-legal-primary bg-legal-selected rounded hover:bg-blue-200 transition-colors"
                    >
                      <span>Open</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
