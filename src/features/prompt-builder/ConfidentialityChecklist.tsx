import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ConfidentialityChecklistProps {
  accepted: boolean;
  onToggleAccepted: (accepted: boolean) => void;
}

export const ConfidentialityChecklist: React.FC<ConfidentialityChecklistProps> = ({
  accepted,
  onToggleAccepted
}) => {
  return (
    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-md text-xs">
      <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1.5">
        <ShieldCheck className="w-4 h-4 text-amber-700" />
        <span>Confidentiality Pre-Flight Checklist</span>
      </div>

      <div className="space-y-1 text-slate-700 text-[11px] mb-2.5">
        <div className="flex items-start gap-1.5">
          <span className="text-amber-600 font-bold">•</span>
          <span>Actual client names & identifiers anonymised (or fictional samples used).</span>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="text-amber-600 font-bold">•</span>
          <span>Privileged attorney-client communications vetted before pasting into external AI tools.</span>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="text-amber-600 font-bold">•</span>
          <span>Statutory and jurisdictional assumptions identified for independent verification.</span>
        </div>
      </div>

      <label className="flex items-center gap-2 pt-2 border-t border-amber-200/80 cursor-pointer">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => onToggleAccepted(e.target.checked)}
          className="w-4 h-4 text-legal-accent rounded border-amber-300 focus:ring-legal-accent"
        />
        <span className="text-[11px] font-semibold text-amber-950">
          I confirm inputs are sanitized / fictional for educational use.
        </span>
      </label>
    </div>
  );
};
