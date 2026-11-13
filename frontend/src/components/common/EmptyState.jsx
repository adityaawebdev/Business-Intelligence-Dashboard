import React from 'react';
import { Database, FolderSearch } from 'lucide-react';

export default function EmptyState({
  title = 'No data available',
  description = 'There are no records matching your current filter criteria or dataset.',
  actionText,
  onAction,
  icon: Icon = FolderSearch
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-slate-300 bg-white/60">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3.5">
        <Icon className="h-6 w-6" />
      </div>
      <h4 className="text-sm font-semibold text-slate-800 tracking-tight">
        {title}
      </h4>
      <p className="mt-1 text-xs text-slate-500 max-w-sm">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-xs"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
