import React, { useEffect } from 'react';
import { X, ShieldCheck, Scale, FileText, AlertTriangle, ExternalLink, BookCheck } from 'lucide-react';
import { SkillRecord } from '../../types/skills';

interface SkillInfoModalProps {
  skill: SkillRecord;
  isOpen: boolean;
  onClose: () => void;
}

export const SkillInfoModal: React.FC<SkillInfoModalProps> = ({ skill, isOpen, onClose }) => {
  const overlay = skill.educational_overlay;

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-legal-border overflow-hidden flex flex-col max-h-[88vh] z-10 animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-legal-border bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {skill.category_name}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] font-mono text-legal-primary font-semibold">
                {skill.id}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
              {skill.display_name} — Skill Details & Diligence
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700">
          {/* Purpose & Guidance */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
            <div className="font-bold text-slate-900 mb-1">Purpose & Objective</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {overlay?.purpose || skill.description}
            </p>
          </div>

          {/* When to use vs When not to use */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-md">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>When to Use</span>
              </div>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                {overlay?.when_to_use || 'Standard practice triage and document review situations.'}
              </p>
            </div>

            <div className="p-3 bg-rose-50/60 border border-rose-200 rounded-md">
              <div className="flex items-center gap-1.5 font-bold text-rose-900 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                <span>When Not to Use</span>
              </div>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                {overlay?.when_not_to_use || 'Do not use for final unverified court submissions or automated client signing.'}
              </p>
            </div>
          </div>

          {/* Indian Legal Adaptation if present */}
          {skill.india_context && (
            <div className="p-3.5 bg-amber-50/80 border border-amber-300 rounded-xl space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <Scale className="w-4 h-4 text-amber-700" />
                  <span>Indian Legal Framework & Statutes</span>
                </div>
                <span className="text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                  {skill.india_context.supported_jurisdictions.join(', ')}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {skill.india_context.legislation_ids.map((leg) => (
                  <span
                    key={leg}
                    className="px-2 py-0.5 font-mono text-[10px] font-bold bg-white text-slate-800 border border-amber-300 rounded shadow-2xs"
                  >
                    {leg}
                  </span>
                ))}
              </div>

              {skill.india_context.procedural_notes && (
                <p className="text-slate-800 text-[11px] leading-relaxed">
                  <strong>Procedural Notes: </strong>
                  {skill.india_context.procedural_notes}
                </p>
              )}

              {skill.india_context.transitional_notes && (
                <p className="text-amber-900 text-[11px] leading-relaxed pt-1 border-t border-amber-200">
                  <strong>Transitional Law: </strong>
                  {skill.india_context.transitional_notes}
                </p>
              )}
            </div>
          )}

          {/* Prerequisites & Supported Environments */}
          <div className="p-3.5 border border-legal-border rounded-md bg-white space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Prerequisites & Execution Details</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div>
                <span className="font-semibold text-slate-800">Supported Environments: </span>
                {skill.supported_environments.join(', ')}
              </div>
              <div>
                <span className="font-semibold text-slate-800">Practice Profile: </span>
                {skill.practice_profile_required ? 'Required (CLAUDE.md)' : 'Not strictly required'}
              </div>
              <div>
                <span className="font-semibold text-slate-800">Matter Workspace: </span>
                {skill.matter_workspace_required ? 'Supports matter isolation' : 'Practice-level'}
              </div>
              <div>
                <span className="font-semibold text-slate-800">Invocation Type: </span>
                {skill.invocation_type === 'explicit-command' ? 'Explicit Command' : 'Internal Router'}
              </div>
            </div>
          </div>

          {/* Professional Verification Checklist */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-2">
              <BookCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Professional Verification Checklist</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 text-[11px]">
              {(overlay?.verification_checklist || [
                'Confirm all factual assumptions against supplied primary documents.',
                'Verify statutory currency under relevant legislative gazettes or India Code.',
                'Verify case citations in official law reports (SCC / SCR / AIR).',
                'Confirm absence of conflicts of interest and preserve professional privilege.'
              ]).map((chk, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{chk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Upstream Provenance */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-[11px] space-y-1">
            <div className="font-bold text-slate-800">Source Provenance</div>
            <div className="text-slate-600">
              Upstream: <a href="https://github.com/anthropics/claude-for-legal" target="_blank" rel="noreferrer" className="text-legal-primary underline inline-flex items-center gap-0.5"><span>anthropics/claude-for-legal</span><ExternalLink className="w-2.5 h-2.5" /></a>
            </div>
            <div className="font-mono text-slate-500 truncate">
              Path: {skill.source_path}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2.5 border-t border-legal-border bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
