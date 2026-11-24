/**
 * categoryTheme.ts
 *
 * Distinct visual theme mapping for Indian Lawyer AI Playbook and Claude Legal Skills.
 * Provides custom category-specific left-border colors, matching left-side colored shadows,
 * and harmonious badge styling.
 */

export interface CategoryTheme {
  borderLeftColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  shadowBase: string;
  shadowHover: string;
}

const DEFAULT_THEME: CategoryTheme = {
  borderLeftColor: '#1E3A8A', // Judicial Navy
  badgeBg: 'bg-slate-100',
  badgeText: 'text-slate-800',
  badgeBorder: 'border-slate-200',
  shadowBase: '-5px 0 16px -2px rgba(30, 58, 138, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
  shadowHover: '-7px 0 22px -1px rgba(30, 58, 138, 0.32), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
};

const THEMES: Record<string, CategoryTheme> = {
  // 1. Legal Research / Corporate Legal (Judicial Navy)
  'legal-research': {
    borderLeftColor: '#1E3A8A',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-900',
    badgeBorder: 'border-blue-200',
    shadowBase: '-5px 0 16px -2px rgba(30, 58, 138, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(30, 58, 138, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
  'corporate-legal': {
    borderLeftColor: '#1E3A8A',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-900',
    badgeBorder: 'border-blue-200',
    shadowBase: '-5px 0 16px -2px rgba(30, 58, 138, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(30, 58, 138, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 2. Case Analysis / Law Student (Cobalt Blue)
  'case-analysis': {
    borderLeftColor: '#2563EB',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-800',
    badgeBorder: 'border-blue-200',
    shadowBase: '-5px 0 16px -2px rgba(37, 99, 235, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(37, 99, 235, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
  'law-student-legal': {
    borderLeftColor: '#2563EB',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-800',
    badgeBorder: 'border-blue-200',
    shadowBase: '-5px 0 16px -2px rgba(37, 99, 235, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(37, 99, 235, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 3. Case Law Summarization / Co-Counsel (Constitutional Indigo)
  'case-law-summarization': {
    borderLeftColor: '#4338CA',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-900',
    badgeBorder: 'border-indigo-200',
    shadowBase: '-5px 0 16px -2px rgba(67, 56, 202, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(67, 56, 202, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
  'cocounsel-legal': {
    borderLeftColor: '#4338CA',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-900',
    badgeBorder: 'border-indigo-200',
    shadowBase: '-5px 0 16px -2px rgba(67, 56, 202, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(67, 56, 202, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 4. Drafting / Employment Legal (Supreme Court Emerald)
  'drafting': {
    borderLeftColor: '#047857',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-900',
    badgeBorder: 'border-emerald-200',
    shadowBase: '-5px 0 16px -2px rgba(4, 120, 87, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(4, 120, 87, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
  'employment-legal': {
    borderLeftColor: '#047857',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-900',
    badgeBorder: 'border-emerald-200',
    shadowBase: '-5px 0 16px -2px rgba(4, 120, 87, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(4, 120, 87, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 5. Litigation / Litigation Legal (Indian Court Crimson)
  'litigation': {
    borderLeftColor: '#B91C1C',
    badgeBg: 'bg-red-50',
    badgeText: 'text-red-900',
    badgeBorder: 'border-red-200',
    shadowBase: '-5px 0 16px -2px rgba(185, 28, 28, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(185, 28, 28, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
  'litigation-legal': {
    borderLeftColor: '#B91C1C',
    badgeBg: 'bg-red-50',
    badgeText: 'text-red-900',
    badgeBorder: 'border-red-200',
    shadowBase: '-5px 0 16px -2px rgba(185, 28, 28, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(185, 28, 28, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 6. Contracts / Commercial Legal (Ashoka Gold / Amber)
  'contracts': {
    borderLeftColor: '#D97706',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-950',
    badgeBorder: 'border-amber-200',
    shadowBase: '-5px 0 16px -2px rgba(217, 119, 6, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(217, 119, 6, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
  'commercial-legal': {
    borderLeftColor: '#D97706',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-950',
    badgeBorder: 'border-amber-200',
    shadowBase: '-5px 0 16px -2px rgba(217, 119, 6, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(217, 119, 6, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 7. Compliance / IP Legal (Statutory Purple)
  'compliance': {
    borderLeftColor: '#7E22CE',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-900',
    badgeBorder: 'border-purple-200',
    shadowBase: '-5px 0 16px -2px rgba(126, 34, 206, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(126, 34, 206, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
  'ip-legal': {
    borderLeftColor: '#7E22CE',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-900',
    badgeBorder: 'border-purple-200',
    shadowBase: '-5px 0 16px -2px rgba(126, 34, 206, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(126, 34, 206, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 8. Due Diligence / Data Privacy Legal (Regulatory Teal)
  'due-diligence': {
    borderLeftColor: '#0D9488',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-900',
    badgeBorder: 'border-teal-200',
    shadowBase: '-5px 0 16px -2px rgba(13, 148, 136, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(13, 148, 136, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
  'privacy-legal': {
    borderLeftColor: '#0D9488',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-900',
    badgeBorder: 'border-teal-200',
    shadowBase: '-5px 0 16px -2px rgba(13, 148, 136, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(13, 148, 136, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 9. Arbitration / Legal Builder Hub (Dispute Orange / Ochre)
  'arbitration': {
    borderLeftColor: '#EA580C',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-900',
    badgeBorder: 'border-orange-200',
    shadowBase: '-5px 0 16px -2px rgba(234, 88, 12, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(234, 88, 12, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
  'legal-builder-hub': {
    borderLeftColor: '#EA580C',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-900',
    badgeBorder: 'border-orange-200',
    shadowBase: '-5px 0 16px -2px rgba(234, 88, 12, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(234, 88, 12, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 10. Client Communication / Legal Clinic (Advocate Rose)
  'client-communication': {
    borderLeftColor: '#E11D48',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-900',
    badgeBorder: 'border-rose-200',
    shadowBase: '-5px 0 16px -2px rgba(225, 29, 72, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(225, 29, 72, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
  'legal-clinic-legal': {
    borderLeftColor: '#E11D48',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-900',
    badgeBorder: 'border-rose-200',
    shadowBase: '-5px 0 16px -2px rgba(225, 29, 72, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(225, 29, 72, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 11. Court Preparation (High Court Slate)
  'court-preparation': {
    borderLeftColor: '#334155',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-900',
    badgeBorder: 'border-slate-300',
    shadowBase: '-5px 0 16px -2px rgba(51, 65, 85, 0.26), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(51, 65, 85, 0.38), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 12. Evidence Analysis / Product Legal (Forensic Cyan)
  'evidence-analysis': {
    borderLeftColor: '#0891B2',
    badgeBg: 'bg-cyan-50',
    badgeText: 'text-cyan-900',
    badgeBorder: 'border-cyan-200',
    shadowBase: '-5px 0 16px -2px rgba(8, 145, 178, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(8, 145, 178, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
  'product-legal': {
    borderLeftColor: '#0891B2',
    badgeBg: 'bg-cyan-50',
    badgeText: 'text-cyan-900',
    badgeBorder: 'border-cyan-200',
    shadowBase: '-5px 0 16px -2px rgba(8, 145, 178, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(8, 145, 178, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 13. Legal Marketing (Fuchsia / Magenta)
  'legal-marketing': {
    borderLeftColor: '#A21CAF',
    badgeBg: 'bg-fuchsia-50',
    badgeText: 'text-fuchsia-900',
    badgeBorder: 'border-fuchsia-200',
    shadowBase: '-5px 0 16px -2px rgba(162, 28, 175, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(162, 28, 175, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 14. Law Firm Operations (Steel Zinc)
  'law-firm-operations': {
    borderLeftColor: '#52525B',
    badgeBg: 'bg-zinc-100',
    badgeText: 'text-zinc-900',
    badgeBorder: 'border-zinc-300',
    shadowBase: '-5px 0 16px -2px rgba(82, 82, 91, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(82, 82, 91, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },

  // 15. AI Agents for Lawyers / AI Governance Legal (Electric Sky)
  'ai-agents': {
    borderLeftColor: '#0284C7',
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-900',
    badgeBorder: 'border-sky-200',
    shadowBase: '-5px 0 16px -2px rgba(2, 132, 199, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(2, 132, 199, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
  'ai-governance-legal': {
    borderLeftColor: '#0284C7',
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-900',
    badgeBorder: 'border-sky-200',
    shadowBase: '-5px 0 16px -2px rgba(2, 132, 199, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    shadowHover: '-7px 0 22px -1px rgba(2, 132, 199, 0.36), 0 4px 6px -1px rgba(0, 0, 0, 0.08)',
  },
};

/**
 * Returns the distinct category visual theme. Normalizes category ID / name string.
 */
export function getCategoryTheme(categoryKey: string): CategoryTheme {
  if (!categoryKey) return DEFAULT_THEME;

  const normalized = categoryKey.toLowerCase().trim().replace(/_/g, '-');
  if (THEMES[normalized]) {
    return THEMES[normalized];
  }

  // Check matching by category name substring or loose match
  for (const [key, theme] of Object.entries(THEMES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return theme;
    }
  }

  return DEFAULT_THEME;
}
