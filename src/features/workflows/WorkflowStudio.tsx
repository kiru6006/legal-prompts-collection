import React, { useState } from 'react';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { GitBranch, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

export const WorkflowStudio: React.FC = () => {
  const { catalogue } = useCatalogueStore();
  const { navigate } = useNavigationStore();
  const workflows = catalogue?.workflows || [];

  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(
    workflows[0]?.id || 'civil-recovery'
  );
  const [activeStep, setActiveStep] = useState<number>(1);

  const activeWorkflow = workflows.find((w) => w.id === selectedWorkflowId) || workflows[0];

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-slate-50">
      {/* Top Banner */}
      <div className="px-6 py-4 bg-white border-b border-legal-border shrink-0 shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <GitBranch className="w-5 h-5 text-legal-accent" />
          <h1 className="text-base font-bold text-slate-900">
            Legal Workflow Studio
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-legal-accentSubtle text-legal-accent">
            5 Multi-Step Workflows
          </span>
        </div>
        <p className="text-xs text-slate-500 max-w-3xl">
          Structured procedural pathways connecting discrete Claude skills into complete practice workflows with mandatory human verification gates.
        </p>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Workflow Selector */}
        <div className="w-72 bg-white border-r border-legal-border p-3 overflow-y-auto space-y-2 shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Available Workflows
          </div>
          {workflows.map((wf) => {
            const isSelected = wf.id === selectedWorkflowId;
            return (
              <button
                key={wf.id}
                onClick={() => {
                  setSelectedWorkflowId(wf.id);
                  setActiveStep(1);
                }}
                className={`w-full p-2.5 rounded-md text-left transition-all border ${
                  isSelected
                    ? 'bg-legal-accent text-white border-legal-accent shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold leading-snug">{wf.title}</div>
                <div className={`text-[10px] mt-1 ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                  {wf.practice_area} • {wf.steps.length} Steps
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Step Execution Workstation */}
        {activeWorkflow && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Workflow Header Info */}
            <div className="p-4 bg-white border border-slate-200 rounded-md shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-legal-accent uppercase tracking-wider">
                  {activeWorkflow.category}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Difficulty: <span className="font-semibold capitalize text-slate-700">{activeWorkflow.difficulty}</span>
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mb-2">{activeWorkflow.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{activeWorkflow.description}</p>
            </div>

            {/* Stepper Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {activeWorkflow.steps.map((st) => {
                const isCurrent = st.step_number === activeStep;
                return (
                  <button
                    key={st.step_number}
                    onClick={() => setActiveStep(st.step_number)}
                    className={`p-2.5 rounded border text-left transition-all ${
                      isCurrent
                        ? 'bg-white border-legal-accent ring-2 ring-legal-accent/20 shadow-xs'
                        : 'bg-white/80 border-slate-200 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent ? 'bg-legal-accent text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {st.step_number}
                      </span>
                      <span className="text-[11px] font-bold text-slate-800 truncate">
                        Step {st.step_number}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 line-clamp-1">{st.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Current Step Detail Card */}
            {(() => {
              const currentStep = activeWorkflow.steps.find((s) => s.step_number === activeStep) || activeWorkflow.steps[0];
              return (
                <div className="p-5 bg-white border border-slate-200 rounded-md shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Current Milestone (Step {currentStep.step_number} of {activeWorkflow.steps.length})
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{currentStep.title}</h3>
                    </div>

                    {currentStep.linked_skill_id && (
                      <button
                        onClick={() => navigate(`skill/${currentStep.linked_skill_id}`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-legal-accent rounded hover:bg-legal-accent/90 shadow-2xs"
                      >
                        <span>Open Linked Skill</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-3">
                      <div>
                        <div className="font-bold text-slate-800 mb-1">Milestone Objective</div>
                        <p className="text-slate-600 leading-relaxed text-[11px]">{currentStep.objective}</p>
                      </div>

                      <div>
                        <div className="font-bold text-slate-800 mb-1">Required Evidentiary Inputs</div>
                        <ul className="space-y-1 text-slate-600 text-[11px]">
                          {currentStep.required_inputs.map((inp, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="text-legal-accent font-bold">•</span>
                              <span>{inp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="font-bold text-slate-800 mb-1">Prompting Guidance</div>
                        <p className="text-slate-600 leading-relaxed text-[11px] bg-slate-50 p-2.5 rounded border border-slate-200 font-mono">
                          {currentStep.prompt_guidance}
                        </p>
                      </div>

                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-950">
                        <div className="flex items-center gap-1.5 font-bold mb-1">
                          <ShieldCheck className="w-4 h-4 text-emerald-700" />
                          <span>Professional Verification Gate</span>
                        </div>
                        <p className="text-[11px] text-emerald-900 leading-relaxed">
                          {currentStep.verification_gate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step navigation buttons */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <button
                      onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                      disabled={activeStep === 1}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded disabled:opacity-40 hover:bg-slate-200"
                    >
                      Previous Step
                    </button>
                    <button
                      onClick={() => setActiveStep(Math.min(activeWorkflow.steps.length, activeStep + 1))}
                      disabled={activeStep === activeWorkflow.steps.length}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-legal-accent rounded disabled:opacity-40 hover:bg-legal-accent/90"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
