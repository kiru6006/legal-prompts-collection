import React, { useState } from 'react';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore, SkillTab } from '../../stores/navigationStore';
import { useMatterStore } from '../../stores/matterStore';
import { useBookmarkStore } from '../../stores/bookmarkStore';
import { DynamicVariableForm } from '../prompt-builder/DynamicVariableForm';
import { PromptBlock } from '../prompt-builder/PromptBlock';
import { ConfidentialityChecklist } from '../prompt-builder/ConfidentialityChecklist';
import { ResponsePreviewPane } from '../response-preview/ResponsePreviewPane';
import {
  Bookmark,
  BookmarkCheck,
  ShieldCheck,
  Scale,
  HelpCircle,
  Columns
} from 'lucide-react';
import { SkillRecord } from '../../types/skills';

interface SkillDetailProps {
  skillId: string;
}

export const SkillDetail: React.FC<SkillDetailProps> = ({ skillId }) => {
  const { getSkillById, catalogue } = useCatalogueStore();
  const { navigate, activeTab, setActiveTab } = useNavigationStore();
  const { matterValues, setVariableValue, resetSkillVariables, confidentialityAccepted, setConfidentialityAccepted } = useMatterStore();
  const { toggleBookmark, isBookmarked } = useBookmarkStore();
  const [splitWorkbench, setSplitWorkbench] = useState<boolean>(true);

  const skill: SkillRecord | undefined = getSkillById(skillId);

  if (!skill) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
        <HelpCircle className="w-10 h-10 text-slate-300 mb-2" />
        <h2 className="text-sm font-bold text-slate-800">Skill Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
          Skill identifier &apos;{skillId}&apos; does not exist in the official catalogue.
        </p>
        <button
          onClick={() => navigate('directory')}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-legal-primary rounded hover:bg-legal-primaryHover"
        >
          View Skill Directory
        </button>
      </div>
    );
  }

  const overlay = skill.educational_overlay;
  const currentValues = matterValues[skill.id] || {};
  const isAccepted = !!confidentialityAccepted[skill.id];
  const bookmarked = isBookmarked(skill.id);

  const handleResetDefaults = () => resetSkillVariables(skill.id);
  const handleLoadSample = () => {
    if (overlay?.variables) {
      for (const v of overlay.variables) {
        setVariableValue(skill.id, v.key, v.default);
      }
    }
  };

  const tabs: { id: SkillTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'prompt', label: 'Prompt' },
    { id: 'output', label: 'Example Output' },
    { id: 'verification', label: 'Verification' },
    { id: 'source', label: 'Source' }
  ];

  // Find related case study if any
  const relatedCaseStudy = catalogue?.case_studies?.find((cs) =>
    cs.relevant_skill_ids?.includes(skill.id) || skill.case_study_ids?.includes(cs.id)
  );

  // Find related workflow if any
  const relatedWorkflow = catalogue?.workflows?.find((wf) =>
    wf.steps.some((st) => st.linked_skill_id === skill.id)
  );

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3rem)] overflow-hidden bg-white text-legal-text">
      {/* Skill Top Bar & Metadata */}
      <div className="px-4 py-3 border-b border-legal-border bg-white shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {skill.category_name}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] font-mono text-legal-primary">
                {skill.official_command || `/${skill.category_id}:${skill.official_name}`}
              </span>
              {skill.educational_status === 'ready' && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-50 text-legal-success border border-emerald-200">
                  Ready
                </span>
              )}
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {skill.display_name}
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => toggleBookmark(skill.id)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border transition-colors ${
                bookmarked
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {bookmarked ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Short Purpose Description */}
        <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
          {overlay?.purpose || skill.description}
        </p>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-legal-border mt-3 -mb-3 overflow-x-auto">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const isCurrent = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                    isCurrent
                      ? 'border-legal-primary text-legal-primary font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Wide-screen Split Toggle for Prompt/Output */}
          {(activeTab === 'prompt' || activeTab === 'output') && (
            <button
              onClick={() => setSplitWorkbench(!splitWorkbench)}
              className="hidden xl:inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 px-2 py-1 rounded"
              title="Toggle side-by-side prompt & output"
            >
              <Columns className="w-3.5 h-3.5 text-slate-400" />
              <span>{splitWorkbench ? 'Full View' : 'Split View'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tab Content Region */}
      <div className="flex-1 overflow-y-auto">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="p-4 sm:p-6 space-y-5 max-w-4xl">
            {/* When to use & when not to use */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-emerald-50/50 border border-emerald-200/80 rounded-md">
                <div className="font-bold text-emerald-900 mb-1">When to Use</div>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {overlay?.when_to_use || 'Standard practice triage and document review situations.'}
                </p>
              </div>

              <div className="p-3.5 bg-rose-50/50 border border-rose-200/80 rounded-md">
                <div className="font-bold text-rose-900 mb-1">When Not to Use</div>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {overlay?.when_not_to_use || 'Do not use for final unverified court submissions or automated client signing.'}
                </p>
              </div>
            </div>

            {/* Inputs & Official Execution */}
            <div className="p-4 border border-legal-border rounded-md bg-white text-xs space-y-2">
              <div className="font-bold text-slate-900">Execution Prerequisites & Inputs</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>
                  <span className="font-semibold text-slate-800">Supported Environments: </span>
                  {skill.supported_environments.join(', ')}
                </div>
                <div>
                  <span className="font-semibold text-slate-800">Practice Profile: </span>
                  {skill.practice_profile_required ? 'Required (CLAUDE.md)' : 'Not strictly required'}
                </div>
                <div>
                  <span className="font-semibold text-slate-800">Matter Workspace: </span>
                  {skill.matter_workspace_required ? 'Supports matter isolation' : 'Practice-level'}
                </div>
                <div>
                  <span className="font-semibold text-slate-800">Invocation Type: </span>
                  {skill.invocation_type === 'explicit-command' ? 'Explicit Command' : 'Internal Router'}
                </div>
              </div>
            </div>

            {/* Practical Fictional Scenario */}
            {overlay?.fictional_scenario && (
              <div className="p-4 bg-slate-50 border border-legal-border rounded-md text-xs space-y-1.5">
                <div className="font-bold text-slate-900">Practical Fictional Use Case</div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {overlay.fictional_scenario}
                </p>
              </div>
            )}

            {/* Contextual Indian Legal Framework */}
            {skill.india_context && (
              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-md text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-blue-950">
                  <Scale className="w-4 h-4 text-legal-primary" />
                  <span>Indian Legal Considerations</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.india_context.legislation_ids.map((leg) => (
                    <span key={leg} className="px-2 py-0.5 font-mono text-[10px] font-bold bg-white text-blue-900 border border-blue-200 rounded">
                      {leg}
                    </span>
                  ))}
                </div>
                <p className="text-blue-900/90 leading-relaxed text-[11px]">
                  {skill.india_context.procedural_notes}
                </p>
                {skill.india_context.transitional_notes && (
                  <p className="text-amber-900 text-[11px] pt-1 border-t border-blue-200/60">
                    <span className="font-semibold">Transitional Law: </span>
                    {skill.india_context.transitional_notes}
                  </p>
                )}
              </div>
            )}

            {/* Contextual Next Steps / Workflows */}
            {relatedWorkflow && (
              <div className="p-3.5 bg-slate-50 border border-legal-border rounded-md text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Next Action: Part of Workflow</div>
                  <div className="text-[11px] text-slate-500">{relatedWorkflow.title}</div>
                </div>
                <button
                  onClick={() => navigate('directory')}
                  className="px-2.5 py-1 text-xs font-semibold text-legal-primary bg-white border border-slate-200 rounded hover:bg-slate-100"
                >
                  View Workflow
                </button>
              </div>
            )}

            {/* Contextual Case Study */}
            {relatedCaseStudy && (
              <div className="p-3.5 bg-slate-50 border border-legal-border rounded-md text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Practical Case Study</div>
                  <div className="text-[11px] text-slate-500">{relatedCaseStudy.title}</div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  {relatedCaseStudy.practice_area}
                </span>
              </div>
            )}
          </div>
        )}

        {/* PROMPT & OUTPUT TABS (Single or Split) */}
        {(activeTab === 'prompt' || activeTab === 'output') && (
          <div className="p-4 sm:p-6">
            <div className={`grid gap-6 ${splitWorkbench ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 max-w-4xl'}`}>
              {/* Left Side: Prompt Configuration & Block */}
              {(activeTab === 'prompt' || splitWorkbench) && (
                <div className="space-y-4">
                  {overlay?.variables && overlay.variables.length > 0 && (
                    <DynamicVariableForm
                      variables={overlay.variables}
                      values={currentValues}
                      onChange={(k, v) => setVariableValue(skill.id, k, v)}
                      onResetDefaults={handleResetDefaults}
                      onLoadSample={handleLoadSample}
                    />
                  )}

                  <ConfidentialityChecklist
                    accepted={isAccepted}
                    onToggleAccepted={(acc) => setConfidentialityAccepted(skill.id, acc)}
                  />

                  {overlay?.prompt_template ? (
                    <PromptBlock
                      template={overlay.prompt_template}
                      variables={overlay.variables || []}
                      values={currentValues}
                      officialCommand={skill.official_command}
                      argumentHint={skill.argument_hint}
                      confidentialityAccepted={isAccepted}
                    />
                  ) : (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
                      <div className="font-bold text-slate-800 mb-1">Official Invocation Command</div>
                      <code className="text-xs font-mono text-legal-primary bg-white px-2 py-1 rounded border border-slate-200 inline-block">
                        {skill.official_command || `/${skill.category_id}:${skill.official_name}`}
                      </code>
                      <p className="mt-2 text-[11px] text-slate-500">
                        Educational prompt template pending authoring. Execute official command in Claude with plugin enabled.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Right Side: Example Output */}
              {(activeTab === 'output' || splitWorkbench) && (
                <div className="space-y-4">
                  <ResponsePreviewPane
                    sampleOutput={overlay?.sample_output}
                    fictionalScenario={overlay?.fictional_scenario}
                    verificationChecklist={overlay?.verification_checklist}
                    guardrails={overlay?.guardrails}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* VERIFICATION TAB */}
        {activeTab === 'verification' && (
          <div className="p-4 sm:p-6 space-y-4 max-w-4xl text-xs">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-md">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Mandatory Legal Verification Checklist</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 text-[11px]">
                {(overlay?.verification_checklist || [
                  'Confirm all factual assumptions against supplied documents.',
                  'Verify statutory currency under relevant legislative gazettes.',
                  'Verify case citations in official law reports (SCC / SCR).',
                  'Confirm client identity and absence of conflicts of interest.'
                ]).map((chk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{chk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {overlay?.ai_risk_warning && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-md text-amber-950">
                <div className="font-bold mb-1">AI Limitation & Governance Warning</div>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  {overlay.ai_risk_warning}
                </p>
              </div>
            )}
          </div>
        )}

        {/* SOURCE TAB */}
        {activeTab === 'source' && (
          <div className="p-4 sm:p-6 space-y-4 max-w-4xl text-xs">
            <div className="p-4 border border-legal-border rounded-md bg-slate-50 space-y-2">
              <div className="font-bold text-slate-900 text-sm">Official Source Provenance</div>
              <div className="space-y-1 text-[11px] text-slate-600 font-mono">
                <div>Source Repo: <a href="https://github.com/anthropics/claude-for-legal" target="_blank" rel="noreferrer" className="text-legal-primary underline">anthropics/claude-for-legal</a></div>
                <div>Source Path: {skill.source_path}</div>
                <div>Commit SHA: {skill.source_commit_sha || '4a6c651889c97cc9140580363c73e0eb17379c2b'}</div>
                <div>Licence: {skill.licence}</div>
                <div>Educational Status: {skill.educational_status}</div>
                <div>Legal Review Status: {skill.legal_review_status}</div>
              </div>
            </div>

            {skill.official_instructions && (
              <div className="border border-legal-border rounded-md p-4 bg-white space-y-1.5">
                <div className="font-bold text-slate-800">Raw Upstream Instructions Excerpt</div>
                <pre className="text-[11px] font-mono text-slate-700 whitespace-pre-wrap bg-slate-50 p-3 rounded border border-slate-200 max-h-72 overflow-y-auto">
                  {skill.official_instructions}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
