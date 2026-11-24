import React, { useState } from 'react';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { Layers, ChevronRight, Scale, BookOpen } from 'lucide-react';

export const CaseStudyLibrary: React.FC = () => {
  const { catalogue } = useCatalogueStore();
  const { navigate } = useNavigationStore();
  const caseStudies = catalogue?.case_studies || [];

  const [selectedPracticeArea, setSelectedPracticeArea] = useState<string>('All');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(caseStudies[0]?.id || '');

  const practiceAreas = ['All', ...Array.from(new Set(caseStudies.map((c) => c.practice_area)))];

  const filtered = selectedPracticeArea === 'All'
    ? caseStudies
    : caseStudies.filter((c) => c.practice_area === selectedPracticeArea);

  const activeCase = caseStudies.find((c) => c.id === selectedCaseId) || caseStudies[0];

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-slate-50">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-legal-border shrink-0 shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-5 h-5 text-legal-accent" />
          <h1 className="text-base font-bold text-slate-900">
            Practical Legal Case Study Library
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
            15 Realistic Fictional Matters
          </span>
        </div>
        <p className="text-xs text-slate-500 max-w-3xl">
          Grounded case scenarios illustrating real-world application of Claude skills across Indian civil, criminal, corporate, banking, cyber, and property disputes.
        </p>

        {/* Practice Area Filter Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {practiceAreas.map((pa) => (
            <button
              key={pa}
              onClick={() => setSelectedPracticeArea(pa)}
              className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
                selectedPracticeArea === pa
                  ? 'bg-legal-accent text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {pa}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Case Index */}
        <div className="w-80 bg-white border-r border-legal-border p-3 overflow-y-auto space-y-2 shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Case Studies ({filtered.length})
          </div>
          {filtered.map((cs) => {
            const isSelected = cs.id === activeCase?.id;
            return (
              <button
                key={cs.id}
                onClick={() => setSelectedCaseId(cs.id)}
                className={`w-full p-3 rounded-md text-left transition-all border ${
                  isSelected
                    ? 'bg-legal-accent text-white border-legal-accent shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold leading-snug">{cs.title}</div>
                <div className={`text-[10px] mt-1 font-medium ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                  {cs.practice_area}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Case Detail Dossier */}
        {activeCase && (
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Title & Disclaimers */}
            <div className="p-4 bg-white border border-slate-200 rounded-md shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-legal-accent uppercase tracking-wider">
                  {activeCase.practice_area}
                </span>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  Fictional Case Scenario
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">{activeCase.title}</h2>
              <p className="text-xs text-slate-700 leading-relaxed">{activeCase.facts}</p>
            </div>

            {/* Parties & Excerpt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-slate-200 rounded-md text-xs space-y-2">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-legal-accent" />
                  <span>Parties to Dispute</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {Object.entries(activeCase.parties).map(([role, name]) => (
                    <div key={role} className="flex items-start gap-1">
                      <span className="font-semibold text-slate-700 shrink-0">{role}:</span>
                      <span className="text-slate-600">
                        {Array.isArray(name) ? name.join(', ') : String(name)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {activeCase.fictional_excerpt && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-md text-xs space-y-2 font-mono">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5 font-sans">
                    <BookOpen className="w-4 h-4 text-slate-600" />
                    <span>Sample Evidentiary Excerpt</span>
                  </div>
                  <pre className="text-[10px] text-slate-700 whitespace-pre-wrap bg-white p-2 rounded border border-slate-200">
                    {activeCase.fictional_excerpt}
                  </pre>
                </div>
              )}
            </div>

            {/* Substantial Legal Issues */}
            <div className="p-4 bg-white border border-slate-200 rounded-md text-xs space-y-2">
              <div className="font-bold text-slate-800">Key Substantive & Procedural Issues</div>
              <ul className="space-y-1 text-slate-600 text-[11px]">
                {activeCase.legal_issues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-legal-accent font-bold">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Legal Strategy */}
            {activeCase.recommended_strategy && (
              <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-lg text-xs space-y-1.5 shadow-2xs">
                <div className="font-bold text-amber-950">Recommended Advocate Action Strategy</div>
                <p className="text-[11px] text-amber-950 leading-relaxed">
                  {activeCase.recommended_strategy}
                </p>
              </div>
            )}

            {/* Relevant Linked Skills */}
            {activeCase.relevant_skill_ids.length > 0 && (
              <div className="p-4 bg-white border border-slate-200 rounded-md text-xs space-y-2">
                <div className="font-bold text-slate-800">Applicable Claude Legal Skills</div>
                <div className="flex flex-wrap gap-2">
                  {activeCase.relevant_skill_ids.map((skId) => (
                    <button
                      key={skId}
                      onClick={() => navigate(`skill/${skId}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 transition-colors"
                    >
                      <span>{skId}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
