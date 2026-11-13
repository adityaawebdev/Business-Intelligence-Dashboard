import React from 'react';

export default function ChartCard({
  title,
  subtitle,
  children,
  action,
  headerRight,
  className = '',
  bodyClassName = 'p-5 pt-3'
}) {
  return (
    <div className={`flex flex-col rounded-xl border border-slate-200/80 bg-white shadow-xs ${className}`}>
      <div className="flex flex-col gap-2 p-5 pb-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {(action || headerRight) && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {headerRight || action}
          </div>
        )}
      </div>

      <div className={`flex-1 w-full ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
