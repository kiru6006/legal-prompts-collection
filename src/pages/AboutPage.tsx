import React from 'react';
import { Info, Scale, ExternalLink } from 'lucide-react';
import { useCatalogueStore } from '../stores/catalogueStore';

export const AboutPage: React.FC = () => {
  const { catalogue } = useCatalogueStore();

  return (
    <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto space-y-6 text-xs bg-white">
      <div className="pb-4 border-b border-legal-border">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-legal-accent" />
          <span>About Claude Legal Skills Workbench</span>
        </h1>
        <p className="text-slate-500 mt-1">
          Provenance, architecture decisions, licensing, and professional disclaimer.
        </p>
      </div>

      {/* Upstream Provenance */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Upstream Source Provenance
        </h2>
        <div className="space-y-1 text-[11px] text-slate-700">
          <div>
            <strong>Upstream Repository: </strong>
            <a
              href="https://github.com/anthropics/claude-for-legal"
              target="_blank"
              rel="noreferrer"
              className="text-legal-accent hover:underline inline-flex items-center gap-1"
            >
              <span>anthropics/claude-for-legal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div>
            <strong>Pinned Commit SHA: </strong>
            <code className="font-mono text-slate-800 bg-white px-1 py-0.5 rounded border border-slate-200">
              {catalogue?.source_commit_sha || '4a6c651889c97cc9140580363c73e0eb17379c2b'}
            </code>
          </div>
          <div>
            <strong>Upstream Licence: </strong> Apache-2.0
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-rose-50 border border-rose-200 rounded-md text-rose-950 space-y-2">
        <div className="flex items-center gap-1.5 font-bold">
          <Scale className="w-4 h-4 text-rose-700" />
          <span>Legal Disclaimer & Non-Affiliation</span>
        </div>
        <p className="text-[11px] text-rose-900 leading-relaxed">
          This platform is an independent educational and research tool. It is not affiliated with, endorsed by, or sponsored by Anthropic, PBC, courts, bar councils, or regulatory authorities. Nothing on this website constitutes legal advice. All users must exercise independent professional diligence.
        </p>
      </div>

      {/* Privacy Policy Summary */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Data Privacy & Zero-Persistence Model
        </h2>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          This application operates as a static client-side single page application hosted on GitHub Pages. Prompts, draft notices, and matter inputs are processed in-memory in your local web browser. No client facts, documents, or personal data are stored on servers or transmitted to remote analytics services.
        </p>
      </div>
    </div>
  );
};
