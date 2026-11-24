import React, { useState } from 'react';
import { LawyerPrompt } from '../../types/lawyerPrompts';
import {
  ChevronRight,
  Copy,
  Check,
  Clock,
  Cpu
} from 'lucide-react';

interface PlaybookPromptCardProps {
  prompt: LawyerPrompt;
  onOpen: (prompt: LawyerPrompt) => void;
}

export const PlaybookPromptCard: React.FC<PlaybookPromptCardProps> = ({ prompt, onOpen }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt_template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasHindi = Boolean(prompt.language_variants.hindi);
  const hasTamil = Boolean(prompt.language_variants.tamil);

  return (
    <div
      onClick={() => onOpen(prompt)}
      className="h-full bg-white border border-slate-200 hover:border-[#1E3A8A] rounded-xl p-4 sm:p-5 shadow-2xs hover:shadow-md active:scale-[0.99] active:bg-slate-50/50 transition-all duration-150 cursor-pointer flex flex-col justify-between group min-w-0"
    >
      {/* Top Section */}
      <div className="space-y-2">
        {/* Category & Time Savings Badges: exactly 24px */}
        <div className="flex items-center justify-between gap-1.5 h-6">
          <div className="flex items-center gap-1.5 min-w-0 flex-1 truncate">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 truncate shrink-0 max-w-[65%]">
              {prompt.category_name}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 truncate hidden sm:inline">
              {prompt.practice_area}
            </span>
          </div>

          <div className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md shadow-2xs">
            <Clock className="w-3 h-3 text-amber-700" />
            <span>{prompt.expected_time_savings}</span>
          </div>
        </div>

        {/* Title: exactly 24px high */}
        <h2 className="text-sm font-bold text-slate-900 group-hover:text-[#1E3A8A] transition-colors truncate tracking-tight h-6 flex items-center">
          {prompt.title}
        </h2>

        {/* Use Case: exactly 40px high (2 lines) */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed h-10 overflow-hidden text-ellipsis">
          {prompt.use_case}
        </p>
      </div>

      {/* Bottom Section: Pinned to bottom by flex-col justify-between */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100 mt-3">
        {/* Full-width Prompt Snippet Box: uniform 48px height */}
        <div className="h-12 bg-slate-50 group-hover:bg-slate-100/70 border border-slate-200 rounded-lg px-2.5 py-1.5 flex items-center justify-between gap-2 transition-colors">
          <p className="text-[11px] font-mono text-slate-700 line-clamp-2 select-all flex-1 leading-snug overflow-hidden" title={prompt.prompt_template}>
            {prompt.prompt_template}
          </p>

          <button
            onClick={handleCopy}
            className="p-1 text-slate-400 hover:text-[#1E3A8A] hover:bg-slate-200/70 active:scale-90 rounded transition-all shrink-0"
            title={copied ? 'Copied Prompt!' : 'Copy prompt to clipboard'}
            aria-label="Copy prompt"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Model, Languages & Action Row: exactly 32px height */}
        <div className="h-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 min-w-0 flex-1 truncate">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md truncate">
              <Cpu className="w-3 h-3 text-[#1E3A8A]" />
              <span className="truncate">{prompt.best_ai_model.split(' ')[0]} {prompt.best_ai_model.split(' ')[1] || ''}</span>
            </span>

            <div className="flex items-center gap-1 text-[9px] font-bold font-mono text-slate-500">
              <span className="bg-slate-100 px-1 py-0.2 rounded border border-slate-200">EN</span>
              {hasHindi && <span className="bg-amber-100 text-amber-900 px-1 py-0.2 rounded border border-amber-300">HI</span>}
              {hasTamil && <span className="bg-blue-100 text-blue-900 px-1 py-0.2 rounded border border-blue-200">TA</span>}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(prompt);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] active:scale-95 active:bg-[#0f172a] focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:outline-none rounded-lg transition-all shadow-xs group-hover:shadow-sm shrink-0"
          >
            <span>Execute</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
