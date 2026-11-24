import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigationStore } from '../../stores/navigationStore';
import { SidebarContent } from './DesktopSkillSidebar';

export const MobileNavigationDrawer: React.FC = () => {
  const { mobileDrawerOpen, setMobileDrawer } = useNavigationStore();

  // Escape key and body scroll lock
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileDrawer(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileDrawerOpen, setMobileDrawer]);

  if (!mobileDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true" aria-label="Navigation Menu">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={() => setMobileDrawer(false)}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10">
        <div className="h-12 px-3 border-b border-legal-border flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-legal-primary text-white flex items-center justify-center font-bold text-xs">
              §
            </div>
            <span className="text-xs font-bold text-legal-text">Legal Skills</span>
          </div>
          <button
            onClick={() => setMobileDrawer(false)}
            className="p-1.5 text-slate-500 hover:text-slate-700 rounded-md"
            aria-label="Close Navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <SidebarContent onItemClick={() => setMobileDrawer(false)} />
        </div>
      </div>
    </div>
  );
};
