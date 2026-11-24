import React, { useState } from 'react';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { useMatterStore } from '../../stores/matterStore';
import { useBookmarkStore } from '../../stores/bookmarkStore';
import { DynamicVariableForm } from '../prompt-builder/DynamicVariableForm';
import { PromptBlock } from '../prompt-builder/PromptBlock';
import { ResponsePreviewPane } from '../response-preview/ResponsePreviewPane';
import { SkillInfoModal } from './SkillInfoModal';
import { CopyButton } from '../../components/common/CopyButton';
import {
  Bookmark,
  BookmarkCheck,
  HelpCircle,
  Info,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { SkillRecord } from '../../types/skills';

interface SkillDetailProps {
  skillId: string;
}

export const SkillDetail: React.FC<SkillDetailProps> = ({ skillId }) => {
  const { getSkillById } = useCatalogueStore();
  const { navigate } = useNavigationStore();
  const { matterValues, setVariableValue, resetSkillVariables, confidentialityAccepted } = useMatterStore();
  const { toggleBookmark, isBookmarked } = useBookmarkStore();
  const [infoModalOpen, setInfoModalOpen] = useState(false);

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

  const commandString = skill.official_command
    ? `${skill.official_command} ${skill.argument_hint || ''}`.trim()
    : `/${skill.category_id}:${skill.official_name}`;

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3rem)] overflow-hidden bg-slate-50 text-legal-text">
      {/* Skill Top Bar & Metadata */}
      <div className="px-4 py-3 border-b border-legal-border bg-white shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Left Metadata & Title */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {skill.category_name}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] font-mono text-legal-primary font-semibold truncate">
                {commandString}
              </span>
              {skill.educational_status === 'ready' && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-50 text-legal-success border border-emerald-200">
                  Ready
                </span>
              )}
            </div>

            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
              {skill.display_name}
            </h1>

            <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
              {overlay?.purpose || skill.description}
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-center">
            {/* Quick Copy Command */}
            <CopyButton
              textToCopy={commandString}
              label="Copy Command"
              className="text-xs"
            />

            {/* Top Right Skill Info & Diligence Popup Button */}
            <button
              onClick={() => setInfoModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
              title="View when to use, Indian legal context, prerequisites, and verification steps"
            >
              <Info className="w-3.5 h-3.5 text-legal-primary" />
              <span>Skill Info & Checks</span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={() => toggleBookmark(skill.id)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border transition-colors ${
                bookmarked
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
              title={bookmarked ? 'Saved to bookmarks' : 'Save skill'}
            >
              {bookmarked ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Save</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Body: Clean Split View (Prompt on Left, Sample Output on Right) */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto h-full items-start">
          {/* Prompt Column */}
          <div className="space-y-3 bg-white p-4 border border-legal-border rounded-lg shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-legal-border">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-legal-primary" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Prompt & Execution
                </h2>
              </div>
              <span className="text-[11px] text-slate-400">Copy & paste into Claude</span>
            </div>

            {/* Variables Form if present */}
            {overlay?.variables && overlay.variables.length > 0 && (
              <div className="border border-slate-200 rounded-md p-3 bg-slate-50/50">
                <DynamicVariableForm
                  variables={overlay.variables}
                  values={currentValues}
                  onChange={(k, v) => setVariableValue(skill.id, k, v)}
                  onResetDefaults={handleResetDefaults}
                  onLoadSample={handleLoadSample}
                />
              </div>
            )}

            {/* Prompt Block */}
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
              <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 space-y-2">
                <div className="font-bold text-slate-800">Official Invocation Command</div>
                <pre className="text-xs font-mono text-legal-primary bg-white p-2.5 rounded border border-slate-200">
                  {commandString}
                </pre>
                <div className="flex items-center gap-2 pt-1">
                  <CopyButton textToCopy={commandString} label="Copy Command" />
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  >
                    <span>Open Claude</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Sample Output Column */}
          <div className="space-y-3 bg-white p-4 border border-legal-border rounded-lg shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-legal-border">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Sample Output Deliverable
              </h2>
              <span className="text-[11px] text-slate-400">Expected Claude format</span>
            </div>

            <ResponsePreviewPane
              sampleOutput={overlay?.sample_output}
              fictionalScenario={overlay?.fictional_scenario}
              verificationChecklist={overlay?.verification_checklist}
              guardrails={overlay?.guardrails}
            />
          </div>
        </div>
      </div>

      {/* Details & Diligence Popup Modal */}
      <SkillInfoModal
        skill={skill}
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
      />
    </div>
  );
};
