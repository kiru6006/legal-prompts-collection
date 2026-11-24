import React from 'react';
import { VariableSchema } from '../../types/skills';
import { RotateCcw, Sparkles } from 'lucide-react';

interface DynamicVariableFormProps {
  variables: VariableSchema[];
  values: Record<string, any>;
  onChange: (key: string, val: any) => void;
  onResetDefaults: () => void;
  onLoadSample: () => void;
}

export const DynamicVariableForm: React.FC<DynamicVariableFormProps> = ({
  variables,
  values,
  onChange,
  onResetDefaults,
  onLoadSample
}) => {
  if (variables.length === 0) {
    return (
      <div className="p-3 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded">
        This skill does not require variable parameters.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Matter Variables
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onLoadSample}
            type="button"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-legal-accent hover:underline"
          >
            <Sparkles className="w-3 h-3" />
            <span>Load Fictional Sample</span>
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={onResetDefaults}
            type="button"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-700"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-md">
        {variables.map((v) => {
          const val = values[v.key] !== undefined ? values[v.key] : v.default;

          return (
            <div key={v.key} className={v.type === 'textarea' ? 'sm:col-span-2' : ''}>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {v.label} {v.required && <span className="text-rose-500">*</span>}
                <span className="ml-1 text-[10px] font-mono text-slate-400">
                  {`{{${v.key}}}`}
                </span>
              </label>

              {v.type === 'select' ? (
                <select
                  value={val}
                  onChange={(e) => onChange(v.key, e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded focus:ring-1 focus:ring-legal-accent focus:outline-hidden"
                >
                  {v.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : v.type === 'boolean' ? (
                <div className="flex items-center h-8">
                  <input
                    type="checkbox"
                    checked={!!val}
                    onChange={(e) => onChange(v.key, e.target.checked)}
                    id={`field-${v.key}`}
                    className="w-4 h-4 text-legal-accent border-slate-300 rounded focus:ring-legal-accent"
                  />
                  <label htmlFor={`field-${v.key}`} className="ml-2 text-xs text-slate-700">
                    Enable {v.label}
                  </label>
                </div>
              ) : v.type === 'textarea' ? (
                <textarea
                  rows={2}
                  value={val}
                  onChange={(e) => onChange(v.key, e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded focus:ring-1 focus:ring-legal-accent focus:outline-hidden"
                />
              ) : (
                <input
                  type={v.type === 'number' ? 'number' : 'text'}
                  value={val}
                  onChange={(e) =>
                    onChange(v.key, v.type === 'number' ? Number(e.target.value) : e.target.value)
                  }
                  className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded focus:ring-1 focus:ring-legal-accent focus:outline-hidden"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
