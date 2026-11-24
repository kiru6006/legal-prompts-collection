import React from 'react';
import { IndianLegalContext } from '../../types/skills';
import { Scale, BookCheck, AlertCircle, FileText } from 'lucide-react';

interface IndiaOverlayPanelProps {
  context?: IndianLegalContext | null;
}

export const IndiaOverlayPanel: React.FC<IndiaOverlayPanelProps> = ({ context }) => {
  if (!context) {
    return (
      <div className="p-5 text-center text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-md">
        India legal adaptation overlay pending for this skill. Applicable under general common law frameworks.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Badge */}
      <div className="p-3 bg-teal-50 border border-teal-200 rounded-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-teal-700" />
          <span className="text-xs font-bold text-teal-900">
            Indian Legal Practice Adaptation
          </span>
        </div>
        <span className="text-[11px] font-semibold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
          {context.supported_jurisdictions.join(', ')}
        </span>
      </div>

      {/* Relevant Statutes & Legislation */}
      {context.legislation_ids.length > 0 && (
        <div className="p-3 bg-white border border-slate-200 rounded-md">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
            <BookCheck className="w-4 h-4 text-legal-accent" />
            <span>Governing Indian Legislation</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {context.legislation_ids.map((leg) => (
              <span
                key={leg}
                className="px-2 py-1 text-xs font-mono font-semibold bg-slate-100 text-slate-800 border border-slate-200 rounded"
              >
                {leg}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Procedural Considerations */}
      {context.procedural_notes && (
        <div className="p-3 bg-white border border-slate-200 rounded-md text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1.5">
            <FileText className="w-4 h-4 text-slate-600" />
            <span>Procedural Court & Forum Considerations</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            {context.procedural_notes}
          </p>
        </div>
      )}

      {/* Transitional Law Considerations */}
      {context.transitional_notes && (
        <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-md text-xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1.5">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Transitional Law & Statutory Succession</span>
          </div>
          <p className="text-amber-900/90 leading-relaxed text-[11px]">
            {context.transitional_notes}
          </p>
        </div>
      )}

      {/* Mandatory Local Verification */}
      {context.verification_requirements.length > 0 && (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs">
          <div className="font-bold text-slate-800 mb-1.5">
            Mandatory India Diligence Points
          </div>
          <ul className="space-y-1 text-slate-600 text-[11px]">
            {context.verification_requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-legal-accent font-bold">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
