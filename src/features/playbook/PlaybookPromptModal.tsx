import React, { useState, useEffect } from 'react';
import { LawyerPrompt } from '../../types/lawyerPrompts';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Clock,
  Cpu,
  BookOpen,
  Scale,
  FileText
} from 'lucide-react';

interface PlaybookPromptModalProps {
  prompt: LawyerPrompt | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlaybookPromptModal: React.FC<PlaybookPromptModalProps> = ({
  prompt,
  isOpen,
  onClose
}) => {
  const [selectedLang, setSelectedLang] = useState<'english' | 'hindi' | 'tamil'>('english');
  const [isCopied, setIsCopied] = useState(false);
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    // Reset state on prompt change
    setSelectedLang('english');
    setIsCopied(false);
    setCustomInputs({});
  }, [prompt?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !prompt) return null;

  // Extract bracketed variables like [Input Section] or [Court Name]
  const activeTemplate =
    selectedLang === 'hindi' && prompt.language_variants.hindi
      ? prompt.language_variants.hindi
      : selectedLang === 'tamil' && prompt.language_variants.tamil
      ? prompt.language_variants.tamil
      : prompt.prompt_template;

  const bracketMatches = Array.from(new Set(activeTemplate.match(/\[([A-Za-z0-9\s/–—_-]+)\]/g) || []));

  // Compute interpolated prompt if user has typed values
  let renderedPrompt = activeTemplate;
  for (const token of bracketMatches) {
    const key = token.slice(1, -1).trim();
    if (customInputs[key] !== undefined && customInputs[key].trim() !== '') {
      renderedPrompt = renderedPrompt.split(token).join(customInputs[key]);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(renderedPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const hasHindi = Boolean(prompt.language_variants.hindi);
  const hasTamil = Boolean(prompt.language_variants.tamil);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl my-auto shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Modal Header Bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-start justify-between gap-3 shrink-0">
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
              <span className="px-2 py-0.5 rounded bg-blue-900 text-blue-200 border border-blue-800">
                {prompt.category_name}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                {prompt.practice_area}
              </span>
              <span className="text-slate-400 font-mono">
                Prompt #{prompt.number}
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              {prompt.title}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
              {prompt.use_case}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Key Metadata Badges */}
        <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold text-[#1E3A8A]">
              <Cpu className="w-3.5 h-3.5 text-amber-600" />
              <span>Recommended: {prompt.best_ai_model}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Saves ~{prompt.expected_time_savings}</span>
            </div>
          </div>

          {/* Multilingual Tabs */}
          <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-200/80 border border-slate-300">
            <button
              onClick={() => setSelectedLang('english')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                selectedLang === 'english'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            {hasHindi && (
              <button
                onClick={() => setSelectedLang('hindi')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  selectedLang === 'hindi'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
            )}
            {hasTamil && (
              <button
                onClick={() => setSelectedLang('tamil')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  selectedLang === 'tamil'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                தமிழ்
              </button>
            )}
          </div>
        </div>

        {/* 3. Modal Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 min-w-0 flex-1">
          {/* Interactive Parameters customizer if bracketed inputs exist */}
          {bracketMatches.length > 0 && (
            <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 sm:p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Customize Matter Parameters</span>
                </span>
                <button
                  type="button"
                  onClick={() => setCustomInputs({})}
                  className="text-[11px] font-semibold text-amber-800 hover:underline"
                >
                  Reset Parameters
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {bracketMatches.map((token) => {
                  const key = token.slice(1, -1).trim();
                  return (
                    <div key={key} className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-700">
                        {key}
                      </label>
                      <input
                        type="text"
                        placeholder={`e.g. ${prompt.example_input.slice(0, 30)}`}
                        value={customInputs[key] || ''}
                        onChange={(e) =>
                          setCustomInputs((prev) => ({ ...prev, [key]: e.target.value }))
                        }
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Prompt Template Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-100 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#1E3A8A]" />
                <span>Ready-To-Run Prompt ({selectedLang.toUpperCase()})</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] active:scale-95 rounded-lg transition-all shadow-xs"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>

                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-2xs"
                >
                  <span>Open Claude</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            <pre className="p-4 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[35vh] overflow-y-auto bg-white select-all">
              {renderedPrompt}
            </pre>
          </div>

          {/* Example Input & Expected Output Blueprint */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Example Input */}
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-blue-900" />
                <span>Example Matter Input</span>
              </span>
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono leading-relaxed">
                {prompt.example_input}
              </p>
            </div>

            {/* Expected Output Structure */}
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Scale className="w-3 h-3 text-amber-600" />
                <span>Expected Output Blueprint</span>
              </span>
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono leading-relaxed">
                {prompt.example_output_structure}
              </p>
            </div>
          </div>
        </div>

        {/* 4. Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-500 hidden sm:block">
            <span>Preserves advocate-client privilege: Zero matter data stored in browser.</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 active:scale-95 rounded-lg transition-all"
            >
              Close
            </button>

            <button
              onClick={handleCopy}
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] active:scale-95 rounded-lg transition-all shadow-xs"
            >
              {isCopied ? 'Copied Prompt!' : 'Copy Prompt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
