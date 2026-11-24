import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CopyButton } from '../../components/common/CopyButton';
import { AlertCircle, CheckCircle2, ShieldCheck, Code, Eye } from 'lucide-react';

interface ResponsePreviewPaneProps {
  sampleOutput?: string;
  fictionalScenario?: string;
  verificationChecklist?: string[];
  guardrails?: string[];
}

export const ResponsePreviewPane: React.FC<ResponsePreviewPaneProps> = ({
  sampleOutput,
  fictionalScenario,
  verificationChecklist = [],
  guardrails = []
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');

  if (!sampleOutput) {
    return (
      <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-md">
        Educational response blueprint pending for this catalogue entry.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Prominent Synthetic Blueprint Banner */}
      <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-md flex items-center gap-2 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="font-semibold">
          Illustrative, synthetic example. Not actual Claude output.
        </span>
      </div>

      {/* Fictional Scenario Context */}
      {fictionalScenario && (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs">
          <div className="font-bold text-slate-800 mb-1">Fictional Case Scenario</div>
          <p className="text-slate-600 leading-relaxed text-[11px]">{fictionalScenario}</p>
        </div>
      )}

      {/* Output Deliverable */}
      <div className="border border-slate-200 rounded-md overflow-hidden bg-white shadow-2xs">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-100 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-800">
            Structured Deliverable Blueprint
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'preview' ? 'raw' : 'preview')}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-50"
            >
              {viewMode === 'preview' ? (
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
            <CopyButton textToCopy={sampleOutput} label="Copy Output" />
          </div>
        </div>

        <div className="p-4 text-xs leading-relaxed max-h-96 overflow-y-auto">
          {viewMode === 'preview' ? (
            <div className="prose prose-sm max-w-none prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-table:text-xs">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {sampleOutput}
              </ReactMarkdown>
            </div>
          ) : (
            <pre className="font-mono text-slate-800 whitespace-pre-wrap text-[11px] bg-slate-50 p-2 rounded">
              {sampleOutput}
            </pre>
          )}
        </div>
      </div>

      {/* Mandatory Verification Checklist */}
      {verificationChecklist.length > 0 && (
        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-md text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Professional Legal Verification Steps</span>
          </div>
          <ul className="space-y-1 text-slate-700 text-[11px]">
            {verificationChecklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Operational Guardrails */}
      {guardrails.length > 0 && (
        <div className="p-3 bg-slate-100 border border-slate-200 rounded-md text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1.5">
            <ShieldCheck className="w-4 h-4 text-slate-600" />
            <span>Operational Guardrails</span>
          </div>
          <ul className="space-y-1 text-slate-600 text-[11px]">
            {guardrails.map((g, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-slate-400 font-bold">•</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
