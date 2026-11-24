import React from 'react';
import { EducationalStatus, LegalReviewStatus } from '../../types/skills';

export const StatusBadge: React.FC<{ status: EducationalStatus }> = ({ status }) => {
  switch (status) {
    case 'ready':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          Walkthrough Ready
        </span>
      );
    case 'draft':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
          Draft
        </span>
      );
    case 'needs-update':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
          Needs Update
        </span>
      );
    case 'catalogue-only':
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
          Catalogue Only
        </span>
      );
  }
};

export const LegalReviewBadge: React.FC<{ status: LegalReviewStatus }> = ({ status }) => {
  switch (status) {
    case 'reviewed':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
          Verified Law
        </span>
      );
    case 'review-pending':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
          Review Pending
        </span>
      );
    case 'needs-revalidation':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-rose-100 text-rose-800">
          Revalidation Required
        </span>
      );
    case 'not-reviewed':
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
          Unreviewed
        </span>
      );
  }
};
