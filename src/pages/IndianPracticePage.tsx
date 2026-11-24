import React, { useState } from 'react';
import { useCatalogueStore } from '../stores/catalogueStore';
import { useNavigationStore } from '../stores/navigationStore';
import { Scale, BookCheck, ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { SkillRecord } from '../types/skills';

export const IndianPracticePage: React.FC = () => {
  const { catalogue } = useCatalogueStore();
  const { navigateToSkill } = useNavigationStore();
  const [selectedStatute, setSelectedStatute] = useState<string>('all');
  const [search, setSearch] = useState('');

  const skills: SkillRecord[] = catalogue?.skills || [];
  const indiaSkills = skills.filter((s) => Boolean(s.india_context));

  // Extract unique statutes across all Indian skills
  const allStatutes = Array.from(
    new Set(
      indiaSkills.flatMap((s) => s.india_context?.legislation_ids || [])
    )
  ).sort();

  const filteredSkills = indiaSkills.filter((s) => {
    if (selectedStatute !== 'all') {
      const matchStatute = s.india_context?.legislation_ids.includes(selectedStatute);
      if (!matchStatute) return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const text = `${s.display_name} ${s.official_name} ${s.description} ${s.india_context?.legislation_ids.join(' ')}`.toLowerCase();
      return text.includes(q);
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-4">
        {/* Header Banner */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-amber-400 flex items-center justify-center font-bold shadow-xs">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Indian Legal Practice Adaptation
                </h1>
                <p className="text-xs text-slate-500">
                  {indiaSkills.length} official Claude legal skills mapped to Indian substantive statutes, procedural forums, and High Court practice rules.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-amber-950 bg-amber-100 border border-amber-300 rounded-lg self-start sm:self-auto shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Supreme Court & High Court Diligence</span>
            </div>
          </div>

          {/* Statute Filter Chips & Search */}
          <div className="pt-3 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedStatute('all')}
                className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors ${
                  selectedStatute === 'all'
                    ? 'bg-[#1E3A8A] text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium'
                }`}
              >
                All Statutes ({indiaSkills.length})
              </button>
              {allStatutes.map((statute) => (
                <button
                  key={statute}
                  onClick={() => setSelectedStatute(statute)}
                  className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors ${
                    selectedStatute === statute
                      ? 'bg-[#1E3A8A] text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium'
                  }`}
                >
                  {statute}
                </button>
              ))}
            </div>

            <div className="relative shrink-0 w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search Indian skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
              />
            </div>
          </div>
        </div>

        {/* Skills List Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
            <span>Showing {filteredSkills.length} of {indiaSkills.length} Indian Adapted Skills</span>
            <span className="text-[11px] text-slate-400">Click any skill to open workbench & Indian diligence points</span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => navigateToSkill(skill.id, 'overview')}
                className="p-3.5 sm:p-4 hover:bg-blue-50/40 cursor-pointer transition-colors group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-[#1E3A8A] transition-colors">
                      {skill.display_name}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {skill.id}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-950 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                      {skill.category_name}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {skill.description}
                  </p>

                  {/* Statutes Chips */}
                  {skill.india_context?.legislation_ids && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <BookCheck className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" />
                      {skill.india_context.legislation_ids.map((leg) => (
                        <span
                          key={leg}
                          className="text-[10px] font-mono font-semibold text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded"
                        >
                          {leg}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-bold text-[#1E3A8A] opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                    Open Skill
                  </span>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#1E3A8A] transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}

            {filteredSkills.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500">
                No skills match the selected statute or search criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
