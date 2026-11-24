import { describe, it, expect } from 'vitest';

describe('Prompt Template Interpolation Logic', () => {
  it('correctly replaces double curly brace variables', () => {
    const template = 'Act as legal counsel for {{CLIENT_ROLE}} under {{GOVERNING_LAW}}.';
    const values: Record<string, any> = {
      CLIENT_ROLE: 'Receiving Party',
      GOVERNING_LAW: 'Laws of India'
    };

    let result = template;
    for (const [k, v] of Object.entries(values)) {
      result = result.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v));
    }

    expect(result).toBe('Act as legal counsel for Receiving Party under Laws of India.');
  });

  it('handles boolean variable replacement as Yes/No', () => {
    const template = 'Include Non-Compete Triage: {{NON_COMPETE_FLAG}}';
    const rawVal = true;
    const replacement = rawVal ? 'Yes' : 'No';
    const result = template.replace(/\{\{NON_COMPETE_FLAG\}\}/g, replacement);
    expect(result).toBe('Include Non-Compete Triage: Yes');
  });
});
