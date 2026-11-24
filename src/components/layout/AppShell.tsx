import React, { useEffect } from 'react';
import { CompactHeader } from './CompactHeader';
import { DesktopSkillSidebar } from './DesktopSkillSidebar';
import { MobileNavigationDrawer } from './MobileNavigationDrawer';
import { GlobalSkillSearch } from '../common/GlobalSkillSearch';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { SkillDirectory } from '../../features/skills/SkillDirectory';
import { SkillDetail } from '../../features/skills/SkillDetail';
import { PlaybookDirectory } from '../../features/playbook/PlaybookDirectory';
import { GettingStartedPage } from '../../pages/GettingStartedPage';
import { IndianPracticePage } from '../../pages/IndianPracticePage';
import { AboutPage } from '../../pages/AboutPage';
import { MyWorkspace } from '../../features/workspace/MyWorkspace';
import { Loader2, AlertCircle } from 'lucide-react';

export const AppShell: React.FC = () => {
  const { isLoading, error, loadCatalogue } = useCatalogueStore();
  const { currentRoute, navigate } = useNavigationStore();

  useEffect(() => {
    loadCatalogue();
  }, [loadCatalogue]);

  // Sync hash changes with navigation store
  useEffect(() => {
    const handleHashChange = () => {
      navigate(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [navigate]);

  const renderCurrentView = () => {
    if (isLoading) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-legal-primary mb-2" />
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
            className="px-3 py-1.5 text-xs font-medium text-white bg-legal-primary rounded hover:bg-legal-primaryHover transition-colors"
          >
            Retry Loading
          </button>
        </div>
      );
    }

    switch (currentRoute.path) {
      case 'directory':
        return <SkillDirectory />;
      case 'playbook':
        return <PlaybookDirectory />;
      case 'skill':
        return <SkillDetail skillId={currentRoute.skillId || 'commercial-legal:nda-review'} />;
      case 'quickstart':
        return <GettingStartedPage />;
      case 'india':
        return <IndianPracticePage />;
      case 'bookmarks':
        return <MyWorkspace />;
      case 'about':
        return <AboutPage />;
      default:
        return <SkillDirectory />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white text-slate-900 antialiased">
      {/* 48-52px Compact Header */}
      <CompactHeader />

      {/* Main Body: Desktop Sidebar + View Container */}
      <div className="flex-1 flex overflow-hidden">
        <DesktopSkillSidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
          {renderCurrentView()}
        </main>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNavigationDrawer />

      {/* Global Cmd+K Search Modal */}
      <GlobalSkillSearch />
    </div>
  );
};
