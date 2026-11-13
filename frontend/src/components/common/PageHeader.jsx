import React from 'react';

export default function PageHeader({
  title,
  subtitle,
  badge,
  actions,
  children
}) {
  return (
    <div className="flex flex-col gap-4 pb-6 pt-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 mb-6">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-sans">
            {title}
          </h1>
          {badge && (
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-200/60">
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {(actions || children) && (
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {actions || children}
        </div>
      )}
    </div>
  );
}
