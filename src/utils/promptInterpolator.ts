import { VariableSchema } from '../types/skills';

/**
 * Robustly interpolates prompt templates with matter variables.
 * Guarantees zero null/undefined leaks and removes raw un-embedded tokens.
 */
export function interpolatePromptTemplate(
  template?: string | null,
  variables?: VariableSchema[] | null,
  values?: Record<string, any> | null
): string {
  if (!template) return '';
  if (!variables || variables.length === 0) {
    return template.replace(/\{\{([A-Za-z0-9_]+)\}\}/g, '[$1]');
  }

  let result = template;
  const safeValues = values || {};

  for (const v of variables) {
    if (!v || !v.key) continue;
    const userVal = safeValues[v.key];

    // Determine value: priority is userVal (if defined & not null & not empty string), then v.default
    const hasUserVal = userVal !== undefined && userVal !== null && userVal !== '';
    const rawVal = hasUserVal ? userVal : (v.default ?? (v.type === 'boolean' ? false : ''));

    let replacement = '';
    if (typeof rawVal === 'boolean') {
      replacement = rawVal ? 'Yes' : 'No';
    } else if (rawVal !== null && rawVal !== undefined) {
      replacement = String(rawVal);
    }

    if (replacement === '' && v.required) {
      replacement = `[Specify ${v.label || v.key}]`;
    }

    const regex = new RegExp(`\\{\\{${v.key}\\}\\}`, 'g');
    result = result.replace(regex, replacement);
  }

  // Final pass: clean up any remaining undeclared {{VAR}} tokens so no raw curly brace tags leak
  result = result.replace(/\{\{([A-Za-z0-9_]+)\}\}/g, '[$1]');

  return result;
}
