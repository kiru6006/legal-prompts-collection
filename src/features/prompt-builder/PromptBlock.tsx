import React, { useState } from 'react';
import { ExternalLink, ShieldAlert } from 'lucide-react';
import { CopyButton } from '../../components/common/CopyButton';
import { VariableSchema } from '../../types/skills';
import { interpolatePromptTemplate } from '../../utils/promptInterpolator';

interface PromptBlockProps {
  template: string;
  variables: VariableSchema[];
  values: Record<string, any>;
  officialCommand?: string | null;
  argumentHint?: string | null;
  confidentialityAccepted: boolean;
}

export const PromptBlock: React.FC<PromptBlockProps> = ({
  template,
  variables,
  values,
  confidentialityAccepted
}) => {
  const [showWarning, setShowWarning] = useState(false);

  // Robust deterministic interpolation with zero null/undefined leaks
  const interpolatedPrompt = interpolatePromptTemplate(template, variables, values);

  const handleCopyPromptAttempt = () => {
    if (!confidentialityAccepted) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 4000);
    }
  };

  return (
    <div className="border border-slate-200 rounded-md overflow-hidden bg-white shadow-2xs">
      <div className="flex items-center justify-between px-3 py-2 bg-slate-100/80 border-b border-slate-200">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Prompt Template
        </span>
        <div className="flex items-center gap-2">
          <CopyButton
            textToCopy={interpolatedPrompt}
            label="Copy Prompt"
            onCopySuccess={handleCopyPromptAttempt}
          />
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            title="Open external Claude chat"
          >
            <span>Open Claude</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {showWarning && (
        <div className="p-2 bg-amber-50 text-amber-900 text-[11px] flex items-center gap-1.5 border-b border-amber-200 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Reminder: Redact client confidential data before pasting into external AI tools.</span>
        </div>
      )}

      <pre className="p-3.5 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[65vh] overflow-y-auto bg-slate-50/50">
        {interpolatedPrompt}
      </pre>
    </div>
  );
};
