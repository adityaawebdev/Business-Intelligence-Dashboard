import React from 'react';

export default function StatusBadge({ status, size = 'sm' }) {
  if (!status) return null;

  const normalized = status.toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';

  if (['high', 'processed', 'active', 'optimal', 'ready', 'completed'].includes(normalized)) {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    dotColor = 'bg-emerald-500';
  } else if (['stable', 'processing', 'scheduled', 'mid-market', 'in progress'].includes(normalized)) {
    styles = 'bg-blue-50 text-blue-700 border-blue-200/80';
    dotColor = 'bg-blue-500 animate-pulse';
  } else if (['low', 'failed', 'attention', 'warning', 'critical'].includes(normalized)) {
    styles = 'bg-rose-50 text-rose-700 border-rose-200/80';
    dotColor = 'bg-rose-500';
  } else if (['enterprise', 'strategic'].includes(normalized)) {
    styles = 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
    dotColor = 'bg-indigo-500';
  } else if (['archived'].includes(normalized)) {
    styles = 'bg-slate-100 text-slate-600 border-slate-200';
    dotColor = 'bg-slate-400';
  }

  const sizeClasses = size === 'xs' 
    ? 'px-2 py-0.5 text-xs font-medium' 
    : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${styles} ${sizeClasses}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
}
