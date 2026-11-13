import React from 'react';

export default function LoadingState({ rows = 4, type = 'card' }) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl border border-slate-200 bg-white p-5">
            <div className="h-3 w-24 bg-slate-200 rounded mb-4" />
            <div className="h-7 w-32 bg-slate-200 rounded mb-4" />
            <div className="h-3 w-40 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 animate-pulse space-y-4">
      <div className="h-5 w-48 bg-slate-200 rounded" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-9 w-full bg-slate-100 rounded" />
        ))}
      </div>
    </div>
  );
}
