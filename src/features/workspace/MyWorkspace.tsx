import React from 'react';
import { useBookmarkStore } from '../../stores/bookmarkStore';
import { useCatalogueStore } from '../../stores/catalogueStore';
import { useNavigationStore } from '../../stores/navigationStore';
import { useMatterStore } from '../../stores/matterStore';
import { Bookmark, Trash2, ChevronRight, ShieldAlert } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const MyWorkspace: React.FC = () => {
  const { bookmarkedSkillIds, clearBookmarks, toggleBookmark } = useBookmarkStore();
  const { getSkillById } = useCatalogueStore();
  const { navigate } = useNavigationStore();
  const { clearAllMatterData } = useMatterStore();

  const bookmarkedSkills = bookmarkedSkillIds
    .map((id) => getSkillById(id))
    .filter(Boolean);

  const handleClearEverything = () => {
    if (window.confirm('Clear all local bookmarks and in-memory matter form inputs?')) {
      clearBookmarks();
      clearAllMatterData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-legal-border">
        <div>
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-legal-accent" />
            <span>My Workspace</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your saved skills and locally stored preferences.
          </p>
        </div>

        <button
          onClick={handleClearEverything}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Local Data</span>
        </button>
      </div>

      {/* Confidentiality Reminder Banner */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start gap-2 text-xs text-slate-600">
        <ShieldAlert className="w-4 h-4 text-legal-accent shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800">Zero-Persistence Guarantee: </span>
          Matter variables and client inputs remain exclusively in transient browser memory. Only skill IDs are saved to your browser&apos;s local storage.
        </div>
      </div>

      {/* Saved Skills Section */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Bookmarked Skills ({bookmarkedSkills.length})
        </h2>

        {bookmarkedSkills.length === 0 ? (
          <div className="p-8 text-center bg-white border border-slate-200 rounded-md text-xs text-slate-500">
            No bookmarked skills yet. Browse the official skill catalogue and click &apos;Bookmark&apos; to pin skills here.
          </div>
        ) : (
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-md bg-white overflow-hidden shadow-2xs">
            {bookmarkedSkills.map((skill: any) => (
              <div
                key={skill.id}
                className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 truncate">
                  <button
                    onClick={() => navigate(`skill/${skill.id}`)}
                    className="text-xs font-bold text-slate-800 hover:text-legal-accent truncate text-left"
                  >
                    {skill.display_name}
                  </button>
                  <StatusBadge status={skill.educational_status} />
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                    {skill.id}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleBookmark(skill.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                    title="Remove from bookmarks"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate(`skill/${skill.id}`)}
                    className="p-1 text-slate-400 hover:text-legal-accent"
                    title="Open skill"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
