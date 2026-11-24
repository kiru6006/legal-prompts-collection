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
    <div className="flex flex-col h-full bg-slate-50 text-xs select-none">
      {/* Category Tree Navigation */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5">
        <div className="px-2 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
          <span>Court Skill Suites</span>
          <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-slate-200/70 text-slate-700">12</span>
        </div>

        {CORE_CATEGORIES.map((cat) => {
          const skills = skillsByCat[cat.id] || [];
          const isExpanded = expandedCategory === cat.id;
          const isCategoryActive = currentRoute.skillId?.startsWith(cat.id + ':');

          return (
            <div key={cat.id} className="rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all font-medium text-xs active:scale-[0.98] ${
                  isCategoryActive && !isExpanded
                    ? 'bg-blue-100/70 text-blue-950 font-bold border border-blue-200 shadow-2xs'
                    : 'text-slate-800 hover:bg-slate-200/60'
                }`}
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-1.5 truncate">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <span className="truncate">{cat.name}</span>
                </div>
                <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-white border border-slate-200 text-slate-600 shrink-0">
                  {skills.length}
                </span>
              </button>

              {/* Collapsible Skills List */}
              {isExpanded && (
                <div className="pl-3 pr-1 py-1 space-y-0.5 border-l-2 border-blue-900/30 ml-3.5 my-1">
                  {skills.map((skill) => {
                    const isActive = currentRoute.skillId === skill.id;
                    const hasIndia = Boolean(skill.india_context);
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => handleSkillSelect(skill.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-left text-[11px] transition-all leading-snug active:scale-[0.98] ${
                          isActive
                            ? 'bg-[#1E3A8A] text-white font-bold shadow-xs'
                            : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-900'
                        }`}
                        title={skill.display_name}
                      >
                        <span className="truncate">{skill.display_name}</span>
                        <div className="flex items-center gap-1 shrink-0 ml-1.5">
                          {hasIndia && (
                            <span
                              className={`text-[9px] font-bold px-1 rounded ${
                                isActive ? 'bg-amber-400 text-slate-950 font-mono' : 'bg-amber-100 text-amber-900 border border-amber-300'
                              }`}
                              title="Indian Statutory Adaptation"
                            >
                              IND
                            </span>
                          )}
                          {skill.educational_status === 'ready' && (
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isActive ? 'bg-amber-300' : 'bg-blue-800'
                              }`}
                              title="Interactive prompt ready"
                            />
                          )}
                        </div>
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
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
                    isActive
                      ? 'bg-[#1E3A8A] text-white font-bold shadow-xs'
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

      {/* Secondary Utilities Footer: Indian Court Accents */}
      <div className="p-2.5 border-t border-legal-border bg-white space-y-1 shrink-0">
        <div className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
          Secondary Utilities
        </div>

        <button
          onClick={() => handleUtilitySelect('quickstart')}
          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left text-[11px] font-medium transition-colors ${
            currentRoute.path === 'quickstart'
              ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200 shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-900" />
          <span>Quick Start Guide</span>
        </button>

        <button
          onClick={() => handleUtilitySelect('india')}
          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left text-[11px] font-medium transition-colors ${
            currentRoute.path === 'india'
              ? 'bg-amber-50 text-amber-950 font-bold border border-amber-300 shadow-2xs'
              : 'text-slate-700 hover:bg-amber-50/60 hover:text-amber-900'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-amber-700" />
          <span>Indian Legal Practice</span>
        </button>

        <button
          onClick={() => handleUtilitySelect('bookmarks')}
          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left text-[11px] font-medium transition-colors ${
            currentRoute.path === 'bookmarks'
              ? 'bg-amber-50 text-amber-900 font-bold border border-amber-300 shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 text-amber-600" />
          <span>Bookmarks</span>
        </button>

        <button
          onClick={() => handleUtilitySelect('about')}
          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left text-[11px] font-medium transition-colors ${
            currentRoute.path === 'about'
              ? 'bg-slate-100 text-slate-900 font-bold border border-slate-300 shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>About and Sources</span>
        </button>
      </div>
    </div>
  );
};

export const DesktopSkillSidebar: React.FC = () => {
  return (
    <aside
      className="hidden md:flex flex-col w-64 lg:w-72 border-r border-slate-200 bg-slate-50 h-[calc(100vh-3rem)] shrink-0 overflow-hidden"
      aria-label="Legal Skill Categories"
    >
      <SidebarContent />
    </aside>
  );
};
