import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CopyButton } from '../../components/common/CopyButton';
import { Code, Eye } from 'lucide-react';

interface ResponsePreviewPaneProps {
  sampleOutput?: string;
  fictionalScenario?: string;
  verificationChecklist?: string[];
  guardrails?: string[];
}

export const ResponsePreviewPane: React.FC<ResponsePreviewPaneProps> = ({
  sampleOutput
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');

  if (!sampleOutput) {
    return (
      <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-md">
        Sample output template pending for this skill. Execute command directly in Claude.
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-md overflow-hidden bg-white shadow-2xs">
      {/* Clean toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-100/80 border-b border-slate-200">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Sample Output (Illustrative)
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'preview' ? 'raw' : 'preview')}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
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

      {/* Output Deliverable Content */}
      <div className="p-4 text-xs leading-relaxed max-h-[65vh] overflow-y-auto">
        {viewMode === 'preview' ? (
          <div className="prose prose-sm max-w-none prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-table:text-xs">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {sampleOutput}
            </ReactMarkdown>
          </div>
        ) : (
          <pre className="font-mono text-slate-800 whitespace-pre-wrap text-[11px] bg-slate-50 p-3 rounded border border-slate-200">
            {sampleOutput}
          </pre>
        )}
      </div>
    </div>
  );
};
