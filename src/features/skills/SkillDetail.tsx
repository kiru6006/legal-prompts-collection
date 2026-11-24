import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { useMatterStore } from '../../stores/matterStore';
import { useBookmarkStore } from '../../stores/bookmarkStore';
import { DynamicVariableForm } from '../prompt-builder/DynamicVariableForm';
import { ResponsePreviewPane } from '../response-preview/ResponsePreviewPane';
import { SkillInfoModal } from './SkillInfoModal';
import { CopyButton } from '../../components/common/CopyButton';
import {
  Bookmark,
  BookmarkCheck,
  HelpCircle,
  Info,
  Terminal,
  ExternalLink,
  Code,
  Eye,
  FileText,
  Scale
} from 'lucide-react';
import { SkillRecord } from '../../types/skills';

interface SkillDetailProps {
  skillId: string;
}

export const SkillDetail: React.FC<SkillDetailProps> = ({ skillId }) => {
  const { getSkillById } = useCatalogueStore();
  const { navigate } = useNavigationStore();
  const { matterValues, setVariableValue, resetSkillVariables } = useMatterStore();
  const { toggleBookmark, isBookmarked } = useBookmarkStore();
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [instructionViewMode, setInstructionViewMode] = useState<'formatted' | 'raw'>('formatted');

  const skill: SkillRecord | undefined = getSkillById(skillId);

  if (!skill) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white min-w-0">
        <HelpCircle className="w-10 h-10 text-slate-300 mb-2" />
        <h2 className="text-sm font-bold text-slate-900">Skill Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
          Skill identifier &apos;{skillId}&apos; does not exist in the official catalogue.
        </p>
        <button
          onClick={() => navigate('directory')}
          className="px-4 py-2 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] rounded-lg shadow-xs transition-colors"
        >
          View Skill Directory
        </button>
      </div>
    );
  }

  const overlay = skill.educational_overlay;
  const currentValues = matterValues[skill.id] || {};
  const bookmarked = isBookmarked(skill.id);
  const hasSampleOutput = Boolean(overlay?.sample_output);
  const hasPromptTemplate = Boolean(overlay?.prompt_template);
  const instructions = skill.official_instructions || '';

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

  // Interpolate variables into prompt template if template exists
  let interpolatedPrompt = overlay?.prompt_template || '';
  if (overlay?.variables && overlay.prompt_template) {
    for (const v of overlay.variables) {
      const rawVal = currentValues[v.key] !== undefined ? currentValues[v.key] : v.default;
      const replacement = typeof rawVal === 'boolean' ? (rawVal ? 'Yes' : 'No') : String(rawVal);
      const regex = new RegExp(`\\{\\{${v.key}\\}\\}`, 'g');
      interpolatedPrompt = interpolatedPrompt.replace(regex, replacement);
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-slate-50 text-slate-900">
      {/* 1. Header Bar: Indian Court Identity */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4 shrink-0 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left Metadata & Breadcrumb */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-300 whitespace-nowrap">
                {skill.category_name}
              </span>

              {/* Indian Law Badge: Ashoka Gold */}
              {skill.india_context && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300 shadow-2xs whitespace-nowrap">
                  <Scale className="w-3 h-3 text-amber-700" />
                  <span>Indian Law Grounding</span>
                </span>
              )}

              {/* Ready Status: Supreme Court Blue */}
              {skill.educational_status === 'ready' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-200 shadow-2xs whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]"></span>
                  Ready
                </span>
              )}

              <code className="hidden sm:inline-flex px-2 py-0.5 rounded text-[11px] font-mono font-medium text-slate-700 bg-slate-50 border border-slate-200 truncate max-w-sm">
                {commandString}
              </code>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {skill.display_name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1 max-w-4xl">
              {overlay?.purpose || skill.description}
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
            {/* Quick Copy Command: Supreme Court Navy Blue */}
            <CopyButton
              textToCopy={commandString}
              label="Copy Command"
              className="bg-[#1E3A8A] text-white border-blue-900 hover:bg-[#172554] shadow-xs font-bold"
            />

            {/* Skill Info & Diligence Popup Button */}
            <button
              onClick={() => setInfoModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs"
              title="View prerequisites, Indian legal context, and verification steps"
            >
              <Info className="w-3.5 h-3.5 text-[#1E3A8A]" />
              <span>Skill Info & Checks</span>
            </button>

            {/* Save / Bookmark Button */}
            <button
              onClick={() => toggleBookmark(skill.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg border transition-colors shadow-2xs ${
                bookmarked
                  ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              title={bookmarked ? 'Saved to bookmarks' : 'Save skill'}
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
      </div>

      {/* 2. Main Scrollable Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 min-w-0">
        <div className="max-w-7xl mx-auto space-y-6 min-w-0">
          {/* Terminal Command Bar: Advocate Black with Ashoka Gold Command Text */}
          <div className="bg-slate-950 text-slate-100 rounded-xl p-3.5 sm:p-4 border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center text-amber-400 shrink-0">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Official Slash Command Shortcut
                </div>
                <code className="text-xs sm:text-sm font-mono text-amber-300 font-bold block truncate select-all">
                  {commandString}
                </code>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <CopyButton
                textToCopy={commandString}
                label="Copy Command"
                className="bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700"
              />
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-amber-300 bg-blue-950 border border-blue-800 rounded-lg hover:bg-blue-900 transition-colors"
                title="Launch Claude Chat"
              >
                <span>Open Claude</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>
          </div>

          {/* Adaptive Content Layout */}
          <div className={hasSampleOutput ? 'grid grid-cols-1 xl:grid-cols-2 gap-6 min-w-0' : 'max-w-4xl min-w-0 space-y-6'}>
            {/* Left / Primary Column: Prompt & Execution */}
            <div className="space-y-4 min-w-0">
              {/* Optional Dynamic Variables Customizer */}
              {overlay?.variables && overlay.variables.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs min-w-0">
                  <DynamicVariableForm
                    variables={overlay.variables}
                    values={currentValues}
                    onChange={(k, v) => setVariableValue(skill.id, k, v)}
                    onResetDefaults={handleResetDefaults}
                    onLoadSample={handleLoadSample}
                  />
                </div>
              )}

              {/* Educational Standalone Prompt */}
              {hasPromptTemplate ? (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs min-w-0">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/90 border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#1E3A8A]" />
                      <span>Standalone Educational Prompt</span>
                    </span>
                    <CopyButton textToCopy={interpolatedPrompt} label="Copy Prompt" className="bg-[#1E3A8A] text-white hover:bg-[#172554]" />
                  </div>

                  <pre className="p-4 text-xs font-mono text-slate-800 whitespace-pre-wrap break-words leading-relaxed max-h-[60vh] overflow-y-auto bg-slate-50/50">
                    {interpolatedPrompt}
                  </pre>
                </div>
              ) : instructions ? (
                /* Official Upstream Instructions */
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs min-w-0">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/90 border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#1E3A8A]" />
                      <span>Skill Workflow & Execution Instructions</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setInstructionViewMode(instructionViewMode === 'formatted' ? 'raw' : 'formatted')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors shadow-2xs"
                      >
                        {instructionViewMode === 'formatted' ? (
                          <>
                            <Code className="w-3 h-3 text-slate-500" />
                            <span>Raw Markdown</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3 text-slate-500" />
                            <span>Formatted</span>
                          </>
                        )}
                      </button>
                      <CopyButton textToCopy={instructions} label="Copy Instructions" className="bg-[#1E3A8A] text-white hover:bg-[#172554]" />
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 text-xs text-slate-800 leading-relaxed max-h-[65vh] overflow-y-auto min-w-0">
                    {instructionViewMode === 'formatted' ? (
                      <div className="prose prose-sm max-w-none text-slate-800 prose-headings:font-bold prose-headings:text-slate-900 prose-code:font-mono prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-table:text-xs">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {instructions}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <pre className="font-mono text-slate-800 whitespace-pre-wrap break-words text-[11px] bg-slate-50 p-3 rounded border border-slate-200">
                        {instructions}
                      </pre>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Right Column: Sample Deliverable Preview */}
            {hasSampleOutput && (
              <div className="space-y-4 min-w-0">
                <ResponsePreviewPane
                  sampleOutput={overlay?.sample_output}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Skill Details & Diligence Modal Popup */}
      <SkillInfoModal
        skill={skill}
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
      />
    </div>
  );
};
