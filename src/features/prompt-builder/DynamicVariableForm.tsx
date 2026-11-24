import React from 'react';
import { VariableSchema } from '../../types/skills';
import { RotateCcw, Sparkles } from 'lucide-react';

interface DynamicVariableFormProps {
  variables: VariableSchema[];
  values: Record<string, any>;
  onChange: (key: string, val: any) => void;
  onResetDefaults: () => void;
  onLoadSample: () => void;
  fictionalScenario?: string;
}

export const DynamicVariableForm: React.FC<DynamicVariableFormProps> = ({
  variables,
  values,
  onChange,
  onResetDefaults,
  onLoadSample,
  fictionalScenario
}) => {
  if (!variables || variables.length === 0) {
    return (
      <div className="p-3 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg">
        This skill does not require variable parameters.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Matter Variables
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onLoadSample}
            type="button"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1E3A8A] hover:underline cursor-pointer"
            title="Load realistic sample parameters from case scenario"
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Load Fictional Sample</span>
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={onResetDefaults}
            type="button"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-700 cursor-pointer"
            title="Reset variables to baseline defaults"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Fictional Scenario Context Box if available */}
      {fictionalScenario && (
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs space-y-1 shadow-2xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-950">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Matter Scenario Context</span>
          </div>
          <p className="text-[11px] text-slate-700 leading-relaxed">
            {fictionalScenario}
          </p>
        </div>
      )}

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
        {variables.map((v) => {
          const rawVal = values[v.key];
          const val = (rawVal !== undefined && rawVal !== null && rawVal !== '')
            ? rawVal
            : (v.default ?? (v.type === 'boolean' ? false : ''));

          return (
            <div key={v.key} className={v.type === 'textarea' ? 'sm:col-span-2' : ''}>
              <label className="block text-[11px] font-bold text-slate-800 mb-1">
                {v.label} {v.required && <span className="text-rose-500">*</span>}
              </label>

              {v.type === 'select' ? (
                <select
                  value={val ?? ''}
                  onChange={(e) => onChange(v.key, e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden"
                >
                  {v.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : v.type === 'boolean' ? (
                <div className="flex items-center gap-2 h-9 pt-1">
                  <input
                    type="checkbox"
                    checked={Boolean(val)}
                    onChange={(e) => onChange(v.key, e.target.checked)}
                    id={`field-${v.key}`}
                    className="w-4 h-4 text-[#1E3A8A] border-slate-300 rounded focus:ring-[#1E3A8A] cursor-pointer"
                  />
                  <label htmlFor={`field-${v.key}`} className="text-xs text-slate-700 cursor-pointer select-none">
                    <span className="font-medium text-slate-800">
                      {Boolean(val) ? 'Included in prompt analysis' : 'Excluded from prompt analysis'}
                    </span>
                  </label>
                </div>
              ) : v.type === 'textarea' ? (
                <textarea
                  rows={2}
                  value={val ?? ''}
                  onChange={(e) => onChange(v.key, e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden"
                />
              ) : (
                <input
                  type={v.type === 'number' ? 'number' : 'text'}
                  value={val ?? ''}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (v.type === 'number') {
                      onChange(v.key, raw === '' ? '' : Number(raw));
                    } else {
                      onChange(v.key, raw);
                    }
                  }}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] focus:outline-hidden"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
