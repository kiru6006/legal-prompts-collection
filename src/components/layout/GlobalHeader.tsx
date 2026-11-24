import React from 'react';
import {
  Scale,
  Search,
  Bookmark,
  Menu,
  ShieldAlert,
  Globe
} from 'lucide-react';
import { useSearchFilterStore } from '../../stores/searchFilterStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { useBookmarkStore } from '../../stores/bookmarkStore';

export const GlobalHeader: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedJurisdiction,
    setSelectedJurisdiction,
    riskPosture,
    setRiskPosture
  } = useSearchFilterStore();

  const { navigate, setMobileDrawer } = useNavigationStore();
  const { bookmarkedSkillIds } = useBookmarkStore();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-white border-b border-legal-border shadow-xs">
      {/* Left branding */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileDrawer(true)}
          className="p-1.5 text-slate-600 rounded md:hidden hover:bg-slate-100"
          title="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 text-left"
        >
          <div className="p-1.5 rounded bg-legal-accent text-white">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-slate-900 leading-tight">
              Claude Legal Skills
            </div>
            <div className="text-[10px] uppercase font-semibold text-legal-accent tracking-wider leading-none">
              Unofficial Visual Guide
            </div>
          </div>
        </button>
      </div>

      {/* Center Search Input */}
      <div className="hidden sm:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 151 official legal skills, commands, statutes..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-legal-accent focus:border-legal-accent"
          />
        </div>
      </div>

      {/* Right controls: Jurisdiction, Risk Posture, Bookmarks */}
      <div className="flex items-center gap-2">
        {/* Jurisdiction Selector */}
        <div className="hidden md:flex items-center gap-1.5 px-2 py-1 text-xs border border-slate-200 rounded-md bg-slate-50">
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={selectedJurisdiction}
            onChange={(e) => setSelectedJurisdiction(e.target.value)}
            className="bg-transparent text-xs text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="India">Jurisdiction: India</option>
            <option value="Tamil Nadu">India (Tamil Nadu)</option>
            <option value="Karnataka">India (Karnataka)</option>
            <option value="Delhi">India (Delhi NCT)</option>
            <option value="Global">Global / US</option>
          </select>
        </div>

        {/* Risk Posture Selector */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 text-xs border border-slate-200 rounded-md bg-slate-50">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <select
            value={riskPosture}
            onChange={(e) => setRiskPosture(e.target.value as any)}
            className="bg-transparent text-xs text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="standard">Posture: Standard</option>
            <option value="conservative">Conservative Review</option>
            <option value="high-risk">High-Risk Scrutiny</option>
          </select>
        </div>

        {/* Bookmarks Quick Link */}
        <button
          onClick={() => navigate('workspace')}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
          title="Saved Bookmarks"
        >
          <Bookmark className="w-3.5 h-3.5 text-legal-accent" />
          <span className="hidden sm:inline">Saved</span>
          {bookmarkedSkillIds.length > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-legal-accent text-white">
              {bookmarkedSkillIds.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
