import React, { useState } from 'react';
import { ExternalLink, Terminal, ShieldAlert } from 'lucide-react';
import { CopyButton } from '../../components/common/CopyButton';
import { VariableSchema } from '../../types/skills';

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
  officialCommand,
  argumentHint,
  confidentialityAccepted
}) => {
  const [showWarning, setShowWarning] = useState(false);

  // Deterministic interpolation of {{VAR}} variables
  let interpolatedPrompt = template;
  for (const v of variables) {
    const rawVal = values[v.key] !== undefined ? values[v.key] : v.default;
    const replacement = typeof rawVal === 'boolean' ? (rawVal ? 'Yes' : 'No') : String(rawVal);
    const regex = new RegExp(`\\{\\{${v.key}\\}\\}`, 'g');
    interpolatedPrompt = interpolatedPrompt.replace(regex, replacement);
  }

  const handleCopyPromptAttempt = () => {
    if (!confidentialityAccepted) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 4000);
    }
  };

  return (
    <div className="space-y-3">
      {/* Official Invocation Header if present */}
      {officialCommand && (
        <div className="p-2.5 bg-slate-900 text-slate-100 rounded-md text-xs font-mono flex items-center justify-between border border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 truncate">
            <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-emerald-400 font-bold">{officialCommand}</span>
            {argumentHint && <span className="text-slate-400 text-[11px] truncate">{argumentHint}</span>}
          </div>
          <CopyButton
            textToCopy={`${officialCommand} ${argumentHint || ''}`.trim()}
            label="Copy Command"
            className="bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
          />
        </div>
      )}

      {/* Standalone Educational Prompt Block */}
      <div className="border border-slate-300 rounded-md overflow-hidden bg-white shadow-2xs">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-100/80 border-b border-slate-200">
          <div className="text-xs font-bold text-slate-800">
            Standalone Educational Prompt
          </div>
          <div className="flex items-center gap-2">
            <CopyButton
              textToCopy={interpolatedPrompt}
              label="Copy Standalone Prompt"
              onCopySuccess={handleCopyPromptAttempt}
            />
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
              title="Navigate to external Claude web service"
            >
              <span>Open Claude</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {showWarning && (
          <div className="p-2 bg-amber-100 text-amber-900 text-[11px] flex items-center gap-1.5 border-b border-amber-200 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
            <span>Reminder: Verify all client details are anonymized before pasting into external services.</span>
          </div>
        )}

        <pre className="p-3 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto bg-slate-50/50">
          {interpolatedPrompt}
        </pre>
      </div>
    </div>
  );
};
