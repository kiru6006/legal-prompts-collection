import React, { useState } from 'react';
import { BookOpen, Cpu, Sparkles, Brain, CheckCircle } from 'lucide-react';

export const LearningCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'peas' | 'prompting' | 'glossary'>('concepts');

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-y-auto bg-slate-50 p-6 space-y-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full bg-white p-6 border border-legal-border rounded-lg shadow-2xs">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-6 h-6 text-legal-accent" />
          <h1 className="text-xl font-bold text-slate-900">
            Legal AI Learning Centre & PEAS Framework
          </h1>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
          Educational guide for advocates, corporate lawyers, and students to master large language model capabilities, prompt architecture, and agentic governance.
        </p>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 mt-6 gap-2">
          {[
            { id: 'concepts', label: 'AI/ML Legal Concepts', icon: Cpu },
            { id: 'peas', label: 'PEAS Framework', icon: Brain },
            { id: 'prompting', label: 'Prompt Standards', icon: Sparkles },
            { id: 'glossary', label: 'Legal AI Glossary', icon: BookOpen }
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  isCurrent
                    ? 'border-legal-accent text-legal-accent'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-6">
        {activeTab === 'concepts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white border border-slate-200 rounded-md shadow-2xs space-y-2">
              <div className="font-bold text-slate-900 text-sm">Large Language Models in Law</div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                LLMs operate on probabilistic next-token prediction rather than deterministic statutory deduction. They are powerful semantic pattern recognizers and summarizers, but cannot verify statutory currency or court rules without human intervention.
              </p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-md shadow-2xs space-y-2">
              <div className="font-bold text-slate-900 text-sm">Hallucination & Fabrication Risks</div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Language models can generate realistic-sounding case citations, paragraph numbers, and judge names that do not exist. Always ground prompts in supplied text and independently verify citations in official law reporters (SCC / SCR).
              </p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-md shadow-2xs space-y-2">
              <div className="font-bold text-slate-900 text-sm">Skills vs Prompts vs Agents</div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                <strong>Prompts</strong> are single-turn natural language instructions. <strong>Skills</strong> are packaged instructions with specialized argument schemas and practice profiles. <strong>Agents</strong> are autonomous entities executing multi-turn tool loops with external connectors.
              </p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-md shadow-2xs space-y-2">
              <div className="font-bold text-slate-900 text-sm">Human-in-the-Loop Safeguards</div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                AI must never autonomously file documents in court, issue binding client notices, or execute commercial agreements. Every deliverable produced is a draft strictly requiring professional attorney review.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'peas' && (
          <div className="p-5 bg-white border border-slate-200 rounded-md shadow-2xs space-y-4 text-xs">
            <div>
              <h2 className="text-sm font-bold text-slate-900">The PEAS Framework for Legal AI Systems</h2>
              <p className="text-slate-600 text-[11px] mt-1">
                Classical Artificial Intelligence architecture models autonomous systems across Performance Measure, Environment, Actuators, and Sensors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                <div className="font-bold text-legal-accent mb-1">Performance Measure (P)</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Precision in clause extraction, zero fabricated citations, comprehensive risk flag recall, and grounded evidentiary references.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                <div className="font-bold text-legal-accent mb-1">Environment (E)</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Supplied contract text, client practice playbook, applicable jurisdictional statutes (e.g. Indian Contract Act 1872), and attorney oversight.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                <div className="font-bold text-legal-accent mb-1">Actuators (A)</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Structured triage memorandums, redline fallback suggestions, risk scorecards, and human review clarification questions.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                <div className="font-bold text-legal-accent mb-1">Sensors (S)</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  User prompt instructions, document text inputs, practice profile configuration files, and verified connector feeds.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prompting' && (
          <div className="p-5 bg-white border border-slate-200 rounded-md shadow-2xs space-y-4 text-xs">
            <h2 className="text-sm font-bold text-slate-900">Legal Prompt Engineering Standards</h2>
            <div className="space-y-3 text-[11px] text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Role & Objective First</strong>: Always begin by anchoring the persona (&apos;Act as commercial legal counsel for {'{{CLIENT_ROLE}}'}&apos;).
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Explicit Statutory Jurisdiction</strong>: State governing law clearly (&apos;Under the Laws of India and Commercial Courts Act 2015&apos;).
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Anti-Hallucination Guardrails</strong>: Instruct the model explicitly: &apos;Do not invent case citations. Mark unverified factual assumptions with [VERIFY]&apos;.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Structured Deliverable Type</strong>: Specify output format (e.g. markdown table, executive triage memo, clause-by-clause fallback matrix).
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'glossary' && (
          <div className="p-5 bg-white border border-slate-200 rounded-md shadow-2xs space-y-3 text-xs">
            <h2 className="text-sm font-bold text-slate-900 mb-2">Legal AI Glossary</h2>
            <div className="divide-y divide-slate-100 text-[11px]">
              <div className="py-2">
                <span className="font-bold text-slate-800">Grounding:</span> Providing source documents in context to restrict model responses to facts present in the record.
              </div>
              <div className="py-2">
                <span className="font-bold text-slate-800">RAG (Retrieval-Augmented Generation):</span> Architecture that dynamically searches a document repository to insert relevant excerpts into prompt context.
              </div>
              <div className="py-2">
                <span className="font-bold text-slate-800">Practice Profile:</span> A configuration file (such as CLAUDE.md) recording preferred firm playbooks, negotiation tolerances, and style guides.
              </div>
              <div className="py-2">
                <span className="font-bold text-slate-800">Redline:</span> Document revision markup indicating proposed additions and deletions to contractual terms.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
