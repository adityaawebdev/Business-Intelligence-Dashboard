import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

export default function KpiCard({
  title,
  value,
  subvalue,
  change,
  isPositive = true,
  description = 'vs previous period',
  badgeText,
  icon: Icon,
  sparkline
}) {
  const displayChange = badgeText || `${isPositive ? '+' : ''}${change}%`;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-slate-300">
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {Icon ? (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-600 border border-slate-200/60">
            <Icon className="h-4.5 w-4.5" />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50/60 text-indigo-600">
            <TrendingUp className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
          {value}
        </h3>
        {subvalue && (
          <span className="text-xs text-slate-500 font-medium">
            {subvalue}
          </span>
        )}
      </div>

      <div className="mt-3.5 flex items-center gap-2 pt-2 border-t border-slate-100">
        <span
          className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold ${
            isPositive
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-rose-50 text-rose-700'
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {displayChange}
        </span>
        <span className="text-xs text-slate-500 truncate">
          {description}
        </span>
      </div>

      {/* Subtle bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 ${
          isPositive ? 'bg-emerald-500/40' : 'bg-rose-500/40'
        }`}
      />
    </div>
  );
}
