import React, { useEffect } from 'react';
import { GlobalHeader } from './GlobalHeader';
import { CategorySidebar } from './CategorySidebar';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { HomePage } from '../../pages/HomePage';
import { GettingStartedPage } from '../../pages/GettingStartedPage';
import { AboutPage } from '../../pages/AboutPage';
import { SkillDetail } from '../../features/skills/SkillDetail';
import { WorkflowStudio } from '../../features/workflows/WorkflowStudio';
import { CaseStudyLibrary } from '../../features/case-studies/CaseStudyLibrary';
import { LearningCenter } from '../../features/learning/LearningCenter';
import { MyWorkspace } from '../../features/workspace/MyWorkspace';
import { Loader2, AlertCircle } from 'lucide-react';

export const AppShell: React.FC = () => {
  const { isLoading, error, loadCatalogue } = useCatalogueStore();
  const { currentRoute } = useNavigationStore();

  useEffect(() => {
    loadCatalogue();
  }, [loadCatalogue]);

  const renderCurrentView = () => {
    if (isLoading) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-legal-accent mb-2" />
          <span className="text-xs font-semibold">Loading official legal skills catalogue...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-700">
          <AlertCircle className="w-10 h-10 text-rose-500 mb-2" />
          <h2 className="text-sm font-bold text-slate-900 mb-1">Failed to Load Catalogue</h2>
          <p className="text-xs text-slate-500 max-w-md text-center mb-4">{error}</p>
          <button
            onClick={() => loadCatalogue()}
            className="px-3 py-1.5 text-xs font-medium text-white bg-legal-accent rounded hover:bg-legal-accent/90"
          >
            Retry Loading
          </button>
        </div>
      );
    }

    switch (currentRoute.path) {
      case 'home':
        return <HomePage />;
      case 'getting-started':
        return <GettingStartedPage />;
      case 'about':
        return <AboutPage />;
      case 'workflows':
        return <WorkflowStudio />;
      case 'case-studies':
        return <CaseStudyLibrary />;
      case 'learning':
        return <LearningCenter />;
      case 'workspace':
        return <MyWorkspace />;
      case 'prompt-builder':
        // Default to first ready skill for prompt builder
        return <SkillDetail skillId={currentRoute.skillId || 'commercial-legal:nda-review'} />;
      case 'skill':
        return <SkillDetail skillId={currentRoute.skillId || 'commercial-legal:nda-review'} />;
      case 'skills':
        // Show category view or home
        return <HomePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white text-slate-900">
      <GlobalHeader />
      <div className="flex-1 flex overflow-hidden">
        <CategorySidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};
