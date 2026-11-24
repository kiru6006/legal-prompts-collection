import React from 'react';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { useMatterStore } from '../../stores/matterStore';
import { useBookmarkStore } from '../../stores/bookmarkStore';
import { StatusBadge, LegalReviewBadge } from '../../components/common/StatusBadge';
import { DynamicVariableForm } from '../prompt-builder/DynamicVariableForm';
import { PromptBlock } from '../prompt-builder/PromptBlock';
import { ConfidentialityChecklist } from '../prompt-builder/ConfidentialityChecklist';
import { ResponsePreviewPane } from '../response-preview/ResponsePreviewPane';
import { IndiaOverlayPanel } from '../india/IndiaOverlayPanel';
import {
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

interface SkillDetailProps {
  skillId: string;
}

export const SkillDetail: React.FC<SkillDetailProps> = ({ skillId }) => {
  const { getSkillById } = useCatalogueStore();
  const { navigate, activeTab, setActiveTab } = useNavigationStore();
  const { matterValues, setVariableValue, resetSkillVariables, confidentialityAccepted, setConfidentialityAccepted } = useMatterStore();
  const { toggleBookmark, isBookmarked } = useBookmarkStore();

  const skill = getSkillById(skillId);

  if (!skill) {
    return (
      <div className="p-8 text-center">
        <HelpCircle className="w-12 h-12 mx-auto text-slate-300 mb-3" />
        <h2 className="text-base font-bold text-slate-800 mb-1">Skill Not Found</h2>
        <p className="text-xs text-slate-500 mb-4">
          Skill identifier &apos;{skillId}&apos; does not exist in the official catalogue.
        </p>
        <button
          onClick={() => navigate('home')}
          className="px-3 py-1.5 text-xs font-medium text-white bg-legal-accent rounded hover:bg-legal-accent/90"
        >
          Return to Explore
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

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Skill Top Bar */}
      <div className="px-4 py-2.5 bg-white border-b border-legal-border shrink-0 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2 truncate">
          <button
            onClick={() => navigate(`skills/${skill.category_id}`)}
            className="text-xs font-semibold text-slate-500 hover:text-legal-accent truncate capitalize"
          >
            {skill.category_name}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <h1 className="text-sm font-bold text-slate-900 truncate">
            {skill.display_name}
          </h1>
          <StatusBadge status={skill.educational_status} />
          <LegalReviewBadge status={skill.legal_review_status} />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => toggleBookmark(skill.id)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border transition-colors ${
              bookmarked
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
            }`}
            title="Save to bookmarks"
          >
            {bookmarked ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Bookmarked</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                <span>Bookmark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="flex md:hidden border-b border-slate-200 bg-slate-50 px-2 overflow-x-auto">
        {(['overview', 'prompt', 'output', 'india', 'sources'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap capitalize ${
              activeTab === tab
                ? 'border-legal-accent text-legal-accent'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dual Workstation Panels (Desktop: Centre 50%, Right 50%) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Centre Panel: Instructions, Form, Prompt Block */}
        <div
          className={`flex-1 overflow-y-auto p-4 space-y-4 border-r border-legal-border bg-white ${
            activeTab !== 'overview' && activeTab !== 'prompt' ? 'hidden md:block' : 'block'
          }`}
        >
          {/* Official Purpose & Scope */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs">
            <div className="font-bold text-slate-800 mb-1">Official Purpose & Context</div>
            <p className="text-slate-600 leading-relaxed text-[11px] mb-2">
              {overlay?.purpose || skill.description}
            </p>
            {overlay?.when_to_use && (
              <div className="mt-2 pt-2 border-t border-slate-200 text-[11px]">
                <span className="font-semibold text-slate-700">When to use: </span>
                <span className="text-slate-600">{overlay.when_to_use}</span>
              </div>
            )}
            {overlay?.when_not_to_use && (
              <div className="mt-1 text-[11px]">
                <span className="font-semibold text-rose-700">When not to use: </span>
                <span className="text-slate-600">{overlay.when_not_to_use}</span>
              </div>
            )}
          </div>

          {/* Interactive Form for Matter Variables */}
          {overlay?.variables && (
            <DynamicVariableForm
              variables={overlay.variables}
              values={currentValues}
              onChange={(k, v) => setVariableValue(skill.id, k, v)}
              onResetDefaults={handleResetDefaults}
              onLoadSample={handleLoadSample}
            />
          )}

          {/* Confidentiality Pre-Flight Checklist */}
          <ConfidentialityChecklist
            accepted={isAccepted}
            onToggleAccepted={(acc) => setConfidentialityAccepted(skill.id, acc)}
          />

          {/* Generated Prompt Block */}
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
            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-500">
              <div className="font-semibold text-slate-700 mb-1">
                Official Claude Invocation Command
              </div>
              <code className="text-xs font-mono text-legal-accent">
                {skill.official_command || `/${skill.category_id}:${skill.official_name}`}
              </code>
              <p className="mt-2 text-[11px] text-slate-500">
                Educational prompt walkthrough is pending authoring. Use official command in Claude Code or Claude Chat with plugin installed.
              </p>
            </div>
          )}

          {/* Upstream Official Excerpt */}
          <div className="border border-slate-200 rounded-md bg-slate-50/50 p-3 text-xs">
            <div className="flex items-center justify-between text-slate-700 font-bold mb-1.5">
              <span>Upstream Instructions (Excerpt)</span>
              <span className="text-[10px] font-mono text-slate-400">{skill.source_path}</span>
            </div>
            <pre className="text-[10px] font-mono text-slate-600 whitespace-pre-wrap max-h-36 overflow-y-auto bg-white p-2 rounded border border-slate-200">
              {skill.official_instructions}
            </pre>
          </div>
        </div>

        {/* Right Panel: Synthetic Output & Indian Legal Framework */}
        <div
          className={`flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40 ${
            activeTab !== 'output' && activeTab !== 'india' && activeTab !== 'sources'
              ? 'hidden md:block'
              : 'block'
          }`}
        >
          {/* Indian Legal Overlay Section */}
          <IndiaOverlayPanel context={skill.india_context} />

          {/* Synthetic Response Blueprint */}
          <ResponsePreviewPane
            sampleOutput={overlay?.sample_output}
            fictionalScenario={overlay?.fictional_scenario}
            verificationChecklist={overlay?.verification_checklist}
            guardrails={overlay?.guardrails}
          />
        </div>
      </div>
    </div>
  );
};
