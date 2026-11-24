import { describe, it, expect } from 'vitest';
import { interpolatePromptTemplate } from '../utils/promptInterpolator';
import { VariableSchema } from '../types/skills';

describe('Prompt Template Interpolation Logic', () => {
  const sampleVariables: VariableSchema[] = [
    {
      key: 'CLIENT_ROLE',
      label: 'Our Party Role',
      type: 'select',
      options: ['Disclosing Party', 'Receiving Party'],
      default: 'Receiving Party',
      required: true
    },
    {
      key: 'GOVERNING_LAW',
      label: 'Governing Law',
      type: 'text',
      default: 'Laws of India',
      required: true
    },
    {
      key: 'TERM_YEARS',
      label: 'Duration',
      type: 'number',
      default: 3,
      required: true
    },
    {
      key: 'NON_COMPETE_FLAG',
      label: 'Include Non-Compete',
      type: 'boolean',
      default: true,
      required: false
    }
  ];

  it('correctly replaces variables with user values', () => {
    const template = 'Act as counsel for {{CLIENT_ROLE}} under {{GOVERNING_LAW}} for {{TERM_YEARS}} years. Non-compete: {{NON_COMPETE_FLAG}}.';
    const values = {
      CLIENT_ROLE: 'Disclosing Party',
      GOVERNING_LAW: 'Laws of India, courts at New Delhi',
      TERM_YEARS: 5,
      NON_COMPETE_FLAG: false
    };

    const result = interpolatePromptTemplate(template, sampleVariables, values);
    expect(result).toBe('Act as counsel for Disclosing Party under Laws of India, courts at New Delhi for 5 years. Non-compete: No.');
  });

  it('falls back to defaults when user values are null or undefined', () => {
    const template = 'Role: {{CLIENT_ROLE}}, Law: {{GOVERNING_LAW}}, Term: {{TERM_YEARS}}, Flag: {{NON_COMPETE_FLAG}}';
    const values = {
      CLIENT_ROLE: null,
      GOVERNING_LAW: undefined,
      TERM_YEARS: null,
      NON_COMPETE_FLAG: null
    };

    const result = interpolatePromptTemplate(template, sampleVariables, values);
    expect(result).toBe('Role: Receiving Party, Law: Laws of India, Term: 3, Flag: Yes');
  });

  it('handles boolean false and number 0 correctly without converting to default or empty', () => {
    const varsWithZero: VariableSchema[] = [
      { key: 'COUNT', label: 'Count', type: 'number', default: 5, required: true },
      { key: 'ENABLED', label: 'Enabled', type: 'boolean', default: true, required: false }
    ];
    const template = 'Count: {{COUNT}}, Enabled: {{ENABLED}}';
    const values = {
      COUNT: 0,
      ENABLED: false
    };

    const result = interpolatePromptTemplate(template, varsWithZero, values);
    expect(result).toBe('Count: 0, Enabled: No');
  });

  it('replaces undeclared leftover variables with clean brackets instead of raw mustache syntax', () => {
    const template = 'Review NDA for {{CLIENT_ROLE}} with {{UNDECLARED_EXTRA_VAR}}.';
    const values = { CLIENT_ROLE: 'Receiving Party' };

    const result = interpolatePromptTemplate(template, sampleVariables, values);
    expect(result).toBe('Review NDA for Receiving Party with [UNDECLARED_EXTRA_VAR].');
  });

  it('safely handles empty or null template and variables', () => {
    expect(interpolatePromptTemplate(null, null, null)).toBe('');
    expect(interpolatePromptTemplate('', [], {})).toBe('');
    expect(interpolatePromptTemplate('Plain prompt without vars', null, null)).toBe('Plain prompt without vars');
  });
});
