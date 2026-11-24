import React, { useState } from 'react';
import { useNavigationStore } from '../stores/navigationStore';
import { CopyButton } from '../components/common/CopyButton';
import {
  BookOpen,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  Scale,
  Sparkles,
  Lock,
  Layers,
  ExternalLink,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

export const GettingStartedPage: React.FC = () => {
  const { navigate, navigateToSkill } = useNavigationStore();
  const [activeExampleTab, setActiveExampleTab] = useState<'command' | 'prompt' | 'output'>('command');

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 text-slate-800 min-w-0">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 min-w-0">
        
        {/* 1. Header Banner */}
        <div className="bg-white border border-legal-border rounded-xl p-5 sm:p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-legal-border">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-legal-primary border border-blue-200">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Practitioner Field Guide</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Getting Started with Claude Legal Skills
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                A complete operational guide for advocates, corporate counsel, and legal operations teams on discovering, configuring, and executing AI legal skills safely.
              </p>
            </div>

            <button
              onClick={() => navigate('directory')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-legal-primary rounded-lg hover:bg-legal-primaryHover shadow-xs transition-colors shrink-0 self-start sm:self-center"
            >
              <span>Explore 151 Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-center">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-lg font-bold text-slate-900">151</div>
              <div className="text-[11px] text-slate-500 font-medium">Official Skills</div>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-lg font-bold text-legal-primary">12</div>
              <div className="text-[11px] text-slate-500 font-medium">Core Categories</div>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-lg font-bold text-teal-700">18</div>
              <div className="text-[11px] text-slate-500 font-medium">Indian Legal Overlays</div>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-lg font-bold text-emerald-700">100%</div>
              <div className="text-[11px] text-slate-500 font-medium">Zero-Persistence Local</div>
            </div>
          </div>
        </div>

        {/* 2. What is a Claude Legal Skill? */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-blue-100 text-legal-primary flex items-center justify-center font-bold text-xs">
              ?
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              What is a Claude Legal Skill?
            </h2>
          </div>

          <div className="bg-white border border-legal-border rounded-xl p-5 shadow-2xs space-y-3 text-xs leading-relaxed text-slate-700">
            <p>
              A <strong>Claude Legal Skill</strong> is a deterministic, prompt-engineered domain capability published by Anthropic in the official <a href="https://github.com/anthropics/claude-for-legal" target="_blank" rel="noreferrer" className="text-legal-primary underline font-medium inline-flex items-center gap-0.5"><span>claude-for-legal</span><ExternalLink className="w-2.5 h-2.5" /></a> architecture. Rather than relying on generic conversational chat, skills turn Claude into an AI workbench specialized for specific legal disciplines:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-legal-primary" />
                  <span>Slash Commands</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Pre-configured invocation commands (e.g. <code>/commercial-legal:nda-review</code>) callable in Claude Code and Claude Chat.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal-700" />
                  <span>Practice Profiles</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Configured via <code>CLAUDE.md</code> files so Claude automatically adopts your law firm&apos;s risk tolerance, preferred forums, and standard fallbacks.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Matter Isolation</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Runs in isolated workspace folders (<code>matters/&lt;slug&gt;/</code>) to preserve professional privilege and prevent fact cross-contamination.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Why Use Them? (The Strategic Value) */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
              ★
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Why Use Claude Legal Skills?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-legal-border rounded-xl p-4 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Standardized & Repeatable Quality</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Junior associates and senior partners apply the same rigorous review checklists every time. AI models adhere to systematic methodologies instead of generating unpredictable narrative answers.
              </p>
            </div>

            <div className="bg-white border border-legal-border rounded-xl p-4 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-legal-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">10x Accelerated First-Pass Triage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Triage a 40-page vendor Master Services Agreement or complex Non-Disclosure Agreement in under 90 seconds, flagging deviations from market standards and non-negotiable clauses.
              </p>
            </div>

            <div className="bg-white border border-legal-border rounded-xl p-4 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Indian Legal & Statutory Adaptations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Skills map to the Digital Personal Data Protection Act 2023 (DPDP), Bharatiya Nyaya Sanhita 2023 (BNS), Arbitration and Conciliation Act 1996, and Companies Act 2013 with High Court practice notes.
              </p>
            </div>

            <div className="bg-white border border-legal-border rounded-xl p-4 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Strict Data Privacy & Zero-Persistence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When using this workbench, prompts and client facts are processed transiently in your local browser memory. No client matter facts or confidential identifiers are stored on remote servers.
              </p>
            </div>
          </div>
        </section>

        {/* 4. What is the Expected Outcome? */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              ✓
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              What Would Be the Expected Outcome?
            </h2>
          </div>

          <div className="bg-white border border-legal-border rounded-xl p-5 shadow-2xs space-y-3 text-xs text-slate-700">
            <p className="leading-relaxed">
              Every skill delivers structured, audit-ready legal work product designed for immediate human practitioner review:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-900 mb-1">1. Clause Risk Matrix</div>
                <p className="text-[11px] text-slate-600">
                  Tabular breakdown classifying clauses into High, Medium, and Low risk, highlighting deviations from agreed standard terms.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-900 mb-1">2. Redline Markups</div>
                <p className="text-[11px] text-slate-600">
                  Specific fallback drafting proposals, strike-through replacements, and protective carve-outs for client negotiations.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-900 mb-1">3. Diligence Checklist</div>
                <p className="text-[11px] text-slate-600">
                  Explicit legal verification points reminding the reviewing advocate to confirm primary documents, gazettes, and official law reports.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. How to Install and Use (4 Practical Steps) */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs">
              #
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              How to Install and Execute Skills
            </h2>
          </div>

          <div className="bg-white border border-legal-border rounded-xl p-5 shadow-2xs space-y-4">
            {/* Step 1 */}
            <div className="flex gap-3.5 items-start">
              <div className="w-6 h-6 rounded-full bg-legal-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                1
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 className="text-xs font-bold text-slate-900">Install Official Anthropic Plugin</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In Claude Code terminal or Claude Chat with plugin support, install the desired category plugin:
                </p>
                <div className="p-2.5 bg-slate-900 rounded-lg flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>/plugin install commercial-legal</span>
                  <CopyButton textToCopy="/plugin install commercial-legal" label="Copy" className="bg-slate-800 text-slate-200 border-slate-700" />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3.5 items-start pt-3 border-t border-legal-border">
              <div className="w-6 h-6 rounded-full bg-legal-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 className="text-xs font-bold text-slate-900">Run Cold-Start Interview (Configure Practice Profile)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Run the cold start interview to generate your firm&apos;s <code>CLAUDE.md</code> practice profile:
                </p>
                <div className="p-2.5 bg-slate-900 rounded-lg flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>/commercial-legal:cold-start-interview --side sales</span>
                  <CopyButton textToCopy="/commercial-legal:cold-start-interview --side sales" label="Copy" className="bg-slate-800 text-slate-200 border-slate-700" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-3.5 items-start pt-3 border-t border-legal-border">
              <div className="w-6 h-6 rounded-full bg-legal-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                3
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 className="text-xs font-bold text-slate-900">Execute Specific Skill in Matter Workspace</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Run the skill targeting your contract file or client brief:
                </p>
                <div className="p-2.5 bg-slate-900 rounded-lg flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>/commercial-legal:nda-review contracts/vendor_nda.pdf</span>
                  <CopyButton textToCopy="/commercial-legal:nda-review contracts/vendor_nda.pdf" label="Copy" className="bg-slate-800 text-slate-200 border-slate-700" />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-3.5 items-start pt-3 border-t border-legal-border">
              <div className="w-6 h-6 rounded-full bg-legal-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                4
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 className="text-xs font-bold text-slate-900">Or Copy Standalone Prompt Directly</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Don&apos;t have Claude Code CLI installed? Use this workbench to copy the standalone prompt template directly into regular web chat at <a href="https://claude.ai" target="_blank" rel="noreferrer" className="text-legal-primary underline font-medium">claude.ai</a>!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Simple Interactive Example (NDA Review Walkthrough) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                ⚡
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Simple Example: NDA Triage & Review
              </h2>
            </div>

            <button
              onClick={() => navigateToSkill('commercial-legal:nda-review')}
              className="text-xs font-semibold text-legal-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Open NDA Skill</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white border border-legal-border rounded-xl overflow-hidden shadow-2xs">
            {/* Tab switch for example */}
            <div className="flex items-center border-b border-legal-border bg-slate-100/80 px-3 pt-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => setActiveExampleTab('command')}
                className={`py-2 px-3 border-b-2 transition-colors ${
                  activeExampleTab === 'command'
                    ? 'border-legal-primary text-legal-primary font-bold bg-white rounded-t'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                1. CLI Execution Command
              </button>
              <button
                onClick={() => setActiveExampleTab('prompt')}
                className={`py-2 px-3 border-b-2 transition-colors ${
                  activeExampleTab === 'prompt'
                    ? 'border-legal-primary text-legal-primary font-bold bg-white rounded-t'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                2. Standalone Web Prompt
              </button>
              <button
                onClick={() => setActiveExampleTab('output')}
                className={`py-2 px-3 border-b-2 transition-colors ${
                  activeExampleTab === 'output'
                    ? 'border-legal-primary text-legal-primary font-bold bg-white rounded-t'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                3. Realistic Expected Deliverable
              </button>
            </div>

            <div className="p-4 sm:p-5 text-xs">
              {activeExampleTab === 'command' && (
                <div className="space-y-3">
                  <p className="text-slate-600 leading-relaxed">
                    Execute in your project workspace where your client matter files live:
                  </p>
                  <pre className="p-3.5 bg-slate-900 text-emerald-400 font-mono text-xs rounded-lg overflow-x-auto select-all">
                    /commercial-legal:nda-review contracts/Acme_Bilateral_NDA.pdf --side vendor
                  </pre>
                  <div className="text-[11px] text-slate-500">
                    Claude reads the agreement, compares definitions against your sales profile, and generates a structured issue list.
                  </div>
                </div>
              )}

              {activeExampleTab === 'prompt' && (
                <div className="space-y-3">
                  <p className="text-slate-600 leading-relaxed">
                    Paste this standalone prompt into Claude web chat along with your agreement text:
                  </p>
                  <pre className="p-3.5 bg-slate-50 text-slate-800 font-mono text-[11px] leading-relaxed rounded-lg border border-slate-200 overflow-x-auto max-h-60">
{`You are an expert commercial technology lawyer conducting a first-pass review of a Non-Disclosure Agreement.

Review the attached agreement on behalf of Acme Corp (Disclosing Party).
Jurisdiction: Common Law / India (Companies Act & Contract Act compliant).
Risk Tolerance: Conservative.

Identify:
1. Definition of Confidential Information (marking non-standard inclusions/exclusions)
2. Duration of non-disclosure obligation (standard: 2-3 years; trade secrets: perpetual)
3. Permitted recipients and standard of care
4. Return/destruction requirements and carved-out archival retention rights
5. Dispute forum, governing law, and injunctive relief clauses`}
                  </pre>
                </div>
              )}

              {activeExampleTab === 'output' && (
                <div className="space-y-3">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-legal-primary" />
                    <span>Expected Review Table Generated by Claude</span>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-[11px] text-left border-collapse">
                      <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-2 border-r border-slate-200">Clause</th>
                          <th className="p-2 border-r border-slate-200">Risk</th>
                          <th className="p-2 border-r border-slate-200">Drafting Issue</th>
                          <th className="p-2">Recommended Mark-up</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-700">
                        <tr className="bg-rose-50/50">
                          <td className="p-2 font-mono font-semibold border-r border-slate-200">§ 1.2 Definition</td>
                          <td className="p-2 border-r border-slate-200 font-bold text-rose-700">HIGH</td>
                          <td className="p-2 border-r border-slate-200">Includes oral disclosures without written confirmation within 30 days.</td>
                          <td className="p-2">Insert requirement: <em>&ldquo;marked as confidential at disclosure or confirmed in writing within 15 days.&rdquo;</em></td>
                        </tr>
                        <tr className="bg-amber-50/50">
                          <td className="p-2 font-mono font-semibold border-r border-slate-200">§ 3.1 Term</td>
                          <td className="p-2 border-r border-slate-200 font-bold text-amber-700">MEDIUM</td>
                          <td className="p-2 border-r border-slate-200">5-year indefinite confidentiality duration for commercial quotes.</td>
                          <td className="p-2">Reduce to standard 3 years from effective date. Carve out trade secrets as perpetual.</td>
                        </tr>
                        <tr className="bg-emerald-50/30">
                          <td className="p-2 font-mono font-semibold border-r border-slate-200">§ 8 Governing Law</td>
                          <td className="p-2 border-r border-slate-200 font-bold text-emerald-700">LOW</td>
                          <td className="p-2 border-r border-slate-200">New Delhi jurisdiction agreed; aligns with firm policy.</td>
                          <td className="p-2 text-slate-500">Acceptable as drafted under Indian Contract Act 1872.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 7. Responsible AI & Legal Verification Guardrails */}
        <div className="p-4 sm:p-5 bg-amber-50/80 border border-amber-300/80 rounded-xl text-amber-950 space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-sm">Mandatory Legal Verification & Ethics Guardrails</span>
          </div>
          <ul className="space-y-1.5 text-xs text-amber-900/90 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-700">•</span>
              <span><strong>Human-in-the-Loop Requirement:</strong> AI outputs are draft analytical work products strictly requiring human advocate sign-off before client delivery or court filing.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-700">•</span>
              <span><strong>Client Confidentiality:</strong> Always redact client names, sensitive financial figures, and non-public identifiers before pasting into cloud AI services.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-700">•</span>
              <span><strong>Statute & Citation Currency:</strong> Verify every statutory section against the official gazette (e.g. India Code) and case citations against official law reports (SCC / SCR / AIR).</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};
