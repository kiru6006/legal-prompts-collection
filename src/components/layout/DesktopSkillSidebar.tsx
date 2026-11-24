import React from 'react';
import { ChevronRight, ChevronDown, BookOpen, Scale, Bookmark, Info } from 'lucide-react';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { SkillRecord } from '../../types/skills';

// 12 core official first-party categories in prescribed order
const CORE_CATEGORIES = [
  { id: 'ai-governance-legal', name: 'AI Governance Legal' },
  { id: 'commercial-legal', name: 'Commercial Legal' },
  { id: 'corporate-legal', name: 'Corporate Legal' },
  { id: 'employment-legal', name: 'Employment Legal' },
  { id: 'ip-legal', name: 'Intellectual Property Legal' },
  { id: 'law-student', name: 'Law Student' },
  { id: 'legal-builder-hub', name: 'Legal Builder Hub' },
  { id: 'legal-clinic', name: 'Legal Clinic' },
  { id: 'litigation-legal', name: 'Litigation Legal' },
  { id: 'privacy-legal', name: 'Privacy Legal' },
  { id: 'product-legal', name: 'Product Legal' },
  { id: 'regulatory-legal', name: 'Regulatory Legal' }
];

interface SidebarContentProps {
  onItemClick?: () => void;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({ onItemClick }) => {
  const { catalogue } = useCatalogueStore();
  const { currentRoute, expandedCategory, toggleCategory, navigateToSkill, navigate } = useNavigationStore();

  const allSkills: SkillRecord[] = catalogue?.skills || [];

  // Group skills
  const skillsByCat: Record<string, SkillRecord[]> = {};
  for (const s of allSkills) {
    if (!skillsByCat[s.category_id]) skillsByCat[s.category_id] = [];
    skillsByCat[s.category_id].push(s);
  }

  const externalSkills = allSkills.filter((s) => s.source_type === 'external');

  const handleSkillSelect = (skillId: string) => {
    navigateToSkill(skillId);
    if (onItemClick) onItemClick();
  };

  const handleUtilitySelect = (path: string) => {
    navigate(path);
    if (onItemClick) onItemClick();
  };

  return (
    <div className="flex flex-col h-full bg-legal-sidebar text-xs select-none">
      {/* Category Tree Navigation */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        <div className="px-2 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Official Skill Suites
        </div>

        {CORE_CATEGORIES.map((cat) => {
          const skills = skillsByCat[cat.id] || [];
          const isExpanded = expandedCategory === cat.id;
          const isCategoryActive = currentRoute.skillId?.startsWith(cat.id + ':');

          return (
            <div key={cat.id} className="rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left transition-colors font-medium text-xs ${
                  isCategoryActive && !isExpanded
                    ? 'bg-blue-50 text-legal-primary font-semibold'
                    : 'text-slate-800 hover:bg-slate-200/60'
                }`}
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-1.5 truncate">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <span className="truncate">{cat.name}</span>
                </div>
                <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold bg-white border border-slate-200 text-slate-500 shrink-0">
                  {skills.length}
                </span>
              </button>

              {/* Collapsible Skills List */}
              {isExpanded && (
                <div className="pl-4 pr-1 py-1 space-y-0.5 border-l border-slate-200 ml-3.5 my-0.5">
                  {skills.map((skill) => {
                    const isActive = currentRoute.skillId === skill.id;
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => handleSkillSelect(skill.id)}
                        className={`w-full flex items-center justify-between px-2 py-1 rounded text-left text-[11px] transition-colors leading-snug ${
                          isActive
                            ? 'bg-legal-selected text-legal-selectedText font-bold shadow-2xs'
                            : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                        }`}
                        title={skill.display_name}
                      >
                        <span className="truncate">{skill.display_name}</span>
                        {skill.educational_status === 'ready' && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ml-1.5 ${
                              isActive ? 'bg-legal-primary' : 'bg-emerald-500'
                            }`}
                            title="Interactive prompt ready"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* External Plugins Section */}
        {externalSkills.length > 0 && (
          <div className="pt-2">
            <div className="px-2 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              External Plugins
            </div>
            {externalSkills.map((sk) => {
              const isActive = currentRoute.skillId === sk.id;
              return (
                <button
                  key={sk.id}
                  type="button"
                  onClick={() => handleSkillSelect(sk.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left text-xs transition-colors ${
                    isActive
                      ? 'bg-legal-selected text-legal-selectedText font-bold'
                      : 'text-slate-700 hover:bg-slate-200/60'
                  }`}
                >
                  <span className="truncate">{sk.display_name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">ext</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Secondary Utilities Footer */}
      <div className="p-2 border-t border-legal-border bg-white space-y-0.5 shrink-0">
        <div className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
          Secondary Utilities
        </div>

        <button
          onClick={() => handleUtilitySelect('quickstart')}
          className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left text-[11px] font-medium transition-colors ${
            currentRoute.path === 'quickstart' ? 'bg-legal-selected text-legal-selectedText font-semibold' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          <span>Quick Start Guide</span>
        </button>

        <button
          onClick={() => handleUtilitySelect('india')}
          className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left text-[11px] font-medium transition-colors ${
            currentRoute.path === 'india' ? 'bg-legal-selected text-legal-selectedText font-semibold' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-slate-400" />
          <span>Indian Legal Practice</span>
        </button>

        <button
          onClick={() => handleUtilitySelect('bookmarks')}
          className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left text-[11px] font-medium transition-colors ${
            currentRoute.path === 'bookmarks' ? 'bg-legal-selected text-legal-selectedText font-semibold' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 text-slate-400" />
          <span>Bookmarks</span>
        </button>

        <button
          onClick={() => handleUtilitySelect('about')}
          className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left text-[11px] font-medium transition-colors ${
            currentRoute.path === 'about' ? 'bg-legal-selected text-legal-selectedText font-semibold' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>About and Sources</span>
        </button>
      </div>
    </div>
  );
};

export const DesktopSkillSidebar: React.FC = () => {
  return (
    <aside
      className="hidden md:flex flex-col w-60 lg:w-64 border-r border-legal-border bg-legal-sidebar h-[calc(100vh-3rem)] shrink-0 overflow-hidden"
      aria-label="Legal Skill Categories"
    >
      <SidebarContent />
    </aside>
  );
};
