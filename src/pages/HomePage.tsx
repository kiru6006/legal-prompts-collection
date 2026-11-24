import React from 'react';
import { useCatalogueStore } from '../stores/catalogueStore';
import { useNavigationStore } from '../stores/navigationStore';
import { useSearchFilterStore } from '../stores/searchFilterStore';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  ArrowRight,
  GitBranch,
  Sparkles
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { catalogue } = useCatalogueStore();
  const { navigate } = useNavigationStore();
  const { setSelectedPersona } = useSearchFilterStore();

  const featuredSkillIds = [
    'commercial-legal:nda-review',
    'commercial-legal:vendor-agreement-review',
    'litigation-legal:chronology',
    'privacy-legal:dpa-review',
    'ai-governance-legal:use-case-triage',
    'employment-legal:termination-review'
  ];

  const featuredSkills = (catalogue?.skills || []).filter((s) =>
    featuredSkillIds.includes(s.id)
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/50">
      {/* Hero Welcome Banner */}
      <div className="bg-white border border-legal-border rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-legal-accentSubtle text-legal-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unofficial Visual Guide & Legal Prompt Workbench</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Master Official Claude Legal Skills with Grounded Workflows
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            An independent educational workstation enabling advocates, corporate counsel, and law students to understand, configure, and safely apply official Claude legal skills with Indian statutory adaptations.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => navigate('getting-started')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-legal-accent rounded-md hover:bg-legal-accent/90 shadow-xs"
            >
              <span>Quickstart Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('workflows')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 border border-slate-200"
            >
              <GitBranch className="w-3.5 h-3.5 text-slate-500" />
              <span>Explore 5 Workflows</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-legal-border shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Official Skills</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{catalogue?.skill_count || 151}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Across 13 Plugin Suites</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-legal-border shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Walkthroughs Ready</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{catalogue?.educational_ready_count || 18}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">With Interactive Prompts</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-legal-border shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Indian Adaptations</div>
          <div className="text-2xl font-bold text-legal-accent mt-1">{catalogue?.india_overlay_count || 18}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">BNS, BNSS, BSA, DPDPA, ICA</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-legal-border shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Case Studies</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">{catalogue?.case_studies.length || 15}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Realistic Fictional Matters</div>
        </div>
      </div>

      {/* Explore by Professional Role */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          Explore by Professional Role
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'independent-advocate', label: 'Independent Advocate', desc: 'Notices, litigation chronology, cross-examination & bail' },
            { id: 'in-house-counsel', label: 'In-House Counsel', desc: 'NDA triage, vendor MSAs, SaaS terms & compliance' },
            { id: 'litigation-lawyer', label: 'Litigation Lawyer', desc: 'Commercial claims, subpoena triage & issue charts' },
            { id: 'law-student', label: 'Law Student', desc: 'Socratic reasoning, case briefs (IRAC) & clinic intake' }
          ].map((role) => (
            <button
              key={role.id}
              onClick={() => {
                setSelectedPersona(role.id);
                navigate('skills/commercial-legal');
              }}
              className="p-3 bg-white border border-slate-200 rounded-lg text-left hover:border-legal-accent hover:shadow-xs transition-all"
            >
              <div className="text-xs font-bold text-slate-900">{role.label}</div>
              <div className="text-[11px] text-slate-500 mt-1 leading-snug">{role.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Educational Walkthroughs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Featured Educational Walkthroughs
          </h2>
          <span className="text-xs text-slate-400">Showing top interactive templates</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredSkills.map((sk) => (
            <div
              key={sk.id}
              onClick={() => navigate(`skill/${sk.id}`)}
              className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs hover:border-legal-accent cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {sk.category_name}
                  </span>
                  <StatusBadge status={sk.educational_status} />
                </div>
                <h3 className="text-xs font-bold text-slate-900 mb-1.5">{sk.display_name}</h3>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {sk.educational_overlay?.purpose || sk.description}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-legal-accent">
                  {sk.official_command || `/${sk.category_id}:${sk.official_name}`}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
