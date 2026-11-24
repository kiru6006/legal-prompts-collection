import React from 'react';
import { BookOpen, ShieldAlert } from 'lucide-react';

export const GettingStartedPage: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto space-y-6 text-xs bg-white">
      <div className="pb-4 border-b border-legal-border">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-legal-accent" />
          <span>Getting Started with Claude Legal Skills</span>
        </h1>
        <p className="text-slate-500 mt-1">
          Comprehensive setup guide: from official Anthropic plugin installation to practice profile configuration.
        </p>
      </div>

      {/* Step 1: Plugin Installation */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-legal-accent text-white flex items-center justify-center text-xs">1</span>
          <span>Official Plugin Installation</span>
        </h2>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          Claude legal skills are distributed through Anthropic&apos;s plugin architecture for Claude Code and Claude Chat. Install plugins by referencing the marketplace repository:
        </p>
        <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-md overflow-x-auto">
          /plugin install commercial-legal
        </pre>
      </div>

      {/* Step 2: Practice Profile & CLAUDE.md */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-legal-accent text-white flex items-center justify-center text-xs">2</span>
          <span>Practice Profile & CLAUDE.md Setup</span>
        </h2>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          Before triaging agreements or drafting pleadings, skills read local configuration files (e.g. <code>~/.claude/plugins/config/claude-for-legal/commercial-legal/CLAUDE.md</code>) to learn your firm&apos;s preferred risk tolerance, dispute forums, and fallback positions.
        </p>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          Run the cold-start interview skill to configure your firm&apos;s practice profile:
        </p>
        <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-md overflow-x-auto">
          /commercial-legal:cold-start-interview --side sales
        </pre>
      </div>

      {/* Step 3: Matter Workspaces */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-legal-accent text-white flex items-center justify-center text-xs">3</span>
          <span>Matter Workspaces & Privilege Isolation</span>
        </h2>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          Skills support isolated matter folders under <code>matters/&lt;slug&gt;/</code>. Claude will never cross-contaminate facts across matters unless cross-matter context is explicitly activated.
        </p>
      </div>

      {/* Step 4: Responsible AI Guardrails */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-950 space-y-2">
        <div className="flex items-center gap-1.5 font-bold">
          <ShieldAlert className="w-4 h-4 text-amber-700" />
          <span>Professional Verification Rules</span>
        </div>
        <ul className="space-y-1 text-[11px] leading-relaxed text-amber-900">
          <li>• Never paste unredacted confidential client identifiers into cloud AI services without consent.</li>
          <li>• Verify every statutory reference against the official gazette or India Code.</li>
          <li>• Verify every case citation in official law reports (SCC / SCR).</li>
          <li>• AI outputs are drafts strictly requiring human advocate sign-off.</li>
        </ul>
      </div>
    </div>
  );
};
