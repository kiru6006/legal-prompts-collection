import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  GitBranch,
  Layers,
  Sparkles,
  BookmarkCheck,
  Info,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  X,
  FileCheck
} from 'lucide-react';
import { useNavigationStore } from '../../stores/navigationStore';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useSearchFilterStore } from '../../stores/searchFilterStore';

import { SkillRecord } from '../../types/skills';

export const CategorySidebar: React.FC = () => {
  const { currentRoute, navigate, isSidebarCollapsed, toggleSidebar, mobileDrawerOpen, setMobileDrawer } = useNavigationStore();
  const { catalogue } = useCatalogueStore();
  const { selectedCategory, selectedPersona, setSelectedPersona } = useSearchFilterStore();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'commercial-legal': true,
    'litigation-legal': true,
    'privacy-legal': true
  });

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  // Group skills by category
  const skillsByCategory: Record<string, SkillRecord[]> = {};
  if (catalogue) {
    for (const skill of catalogue.skills) {
      const cat = skill.category_id;
      if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
      skillsByCategory[cat].push(skill);
    }
  }

  const navLinks = [
    { id: 'home', label: 'Explore Home', icon: Compass },
    { id: 'getting-started', label: 'Getting Started', icon: BookOpen },
    { id: 'workflows', label: 'Guided Workflows (5)', icon: GitBranch },
    { id: 'case-studies', label: 'Case Studies (15)', icon: Layers },
    { id: 'prompt-builder', label: 'Prompt Builder', icon: Sparkles },
    { id: 'learning', label: 'Learning & PEAS', icon: FileCheck },
    { id: 'workspace', label: 'My Workspace', icon: BookmarkCheck },
    { id: 'about', label: 'About & Disclaimer', icon: Info }
  ];

  const personas = [
    { id: 'independent-advocate', label: 'Independent Advocate' },
    { id: 'in-house-counsel', label: 'In-House Counsel' },
    { id: 'litigation-lawyer', label: 'Litigation Lawyer' },
    { id: 'law-student', label: 'Law Student' },
    { id: 'compliance-officer', label: 'Compliance Officer' }
  ];

  const content = (
    <div className="flex flex-col h-full bg-slate-50 border-r border-legal-border text-xs">
      {/* Primary Navigation */}
      <div className="p-3 border-b border-slate-200">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Navigation
        </div>
        <div className="space-y-0.5">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute.path === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.id);
                  setMobileDrawer(false);
                }}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded font-medium text-left transition-colors ${
                  isActive
                    ? 'bg-legal-accent text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Role / Persona Filters */}
      <div className="p-3 border-b border-slate-200">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
          Filter by Role
        </div>
        <div className="flex flex-wrap gap-1">
          {personas.map((p) => {
            const isSelected = selectedPersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(isSelected ? null : p.id)}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                  isSelected
                    ? 'bg-legal-accent text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories & Skills Tree */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          <span>Official Skill Plugins</span>
          <span>{catalogue?.skill_count || 151}</span>
        </div>

        {Object.entries(skillsByCategory).map(([catId, skills]) => {
          const isExpanded = !!expandedCategories[catId];
          const isCatSelected = selectedCategory === catId;
          const readyCount = skills.filter((s) => s.educational_status === 'ready').length;

          return (
            <div key={catId} className="border border-slate-200/80 rounded bg-white overflow-hidden shadow-2xs">
              <button
                onClick={() => toggleCategoryExpand(catId)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left font-semibold text-slate-800 hover:bg-slate-100 transition-colors ${
                  isCatSelected ? 'bg-legal-accentSubtle text-legal-accent' : ''
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <span className="truncate capitalize">{catId.replace(/-/g, ' ')}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 shrink-0">
                  {readyCount > 0 && (
                    <span className="px-1 rounded bg-emerald-100 text-emerald-700 font-bold">
                      {readyCount}
                    </span>
                  )}
                  <span className="px-1 rounded bg-slate-100 font-semibold">{skills.length}</span>
                </div>
              </button>

              {isExpanded && (
                <div className="py-1 px-2 border-t border-slate-100 space-y-0.5 bg-slate-50/50">
                  {skills.map((skill) => {
                    const isSkillActive = currentRoute.path === 'skill' && currentRoute.skillId === skill.id;
                    return (
                      <button
                        key={skill.id}
                        onClick={() => {
                          navigate(`skill/${skill.id}`);
                          setMobileDrawer(false);
                        }}
                        className={`w-full flex items-center justify-between px-2 py-1 rounded text-left text-[11px] transition-colors ${
                          isSkillActive
                            ? 'bg-legal-accent text-white font-medium shadow-2xs'
                            : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                        }`}
                        title={skill.display_name}
                      >
                        <span className="truncate">{skill.display_name}</span>
                        {skill.educational_status === 'ready' && (
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ml-1.5 ${
                            isSkillActive ? 'bg-emerald-300' : 'bg-emerald-500'
                          }`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer provenance */}
      <div className="p-2.5 border-t border-slate-200 bg-white text-[10px] text-slate-500 flex items-center justify-between">
        <span className="truncate font-mono">SHA: {catalogue?.source_commit_sha?.slice(0, 7) || '4a6c651'}</span>
        <button
          onClick={toggleSidebar}
          className="hidden md:flex p-1 rounded hover:bg-slate-100 text-slate-500"
          title="Collapse Sidebar"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block transition-all duration-200 ease-in-out shrink-0 h-[calc(100vh-3.5rem)] ${
          isSidebarCollapsed ? 'w-0 overflow-hidden' : 'w-72'
        }`}
      >
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setMobileDrawer(false)}
          />
          <div className="relative flex flex-col w-4/5 max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between p-3 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-900">Menu Navigation</span>
              <button
                onClick={() => setMobileDrawer(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">{content}</div>
          </div>
        </div>
      )}
    </>
  );
};
