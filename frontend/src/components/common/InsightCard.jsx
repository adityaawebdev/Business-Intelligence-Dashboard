import React from 'react';
import { Sparkles, TrendingUp, Compass, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function InsightCard({
  category,
  title,
  description,
  tag,
  impact,
  type = 'positive'
}) {
  const getTheme = () => {
    switch (type) {
      case 'positive':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          iconBg: 'bg-emerald-100 text-emerald-700',
          border: 'border-l-4 border-l-emerald-500',
          icon: TrendingUp
        };
      case 'opportunity':
        return {
          badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
          iconBg: 'bg-indigo-100 text-indigo-700',
          border: 'border-l-4 border-l-indigo-500',
          icon: Compass
        };
      case 'warning':
        return {
          badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
          iconBg: 'bg-amber-100 text-amber-700',
          border: 'border-l-4 border-l-amber-500',
          icon: AlertCircle
        };
      default:
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-200/80',
          iconBg: 'bg-blue-100 text-blue-700',
          border: 'border-l-4 border-l-blue-500',
          icon: Sparkles
        };
    }
  };

  const theme = getTheme();
  const IconComponent = theme.icon;

  return (
    <div className={`relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs transition-all duration-200 hover:shadow-md ${theme.border}`}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider border ${theme.badge}`}>
            {category}
          </span>
          {impact && (
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-0.5">
              <ArrowUpRight className="h-3 w-3 text-slate-400" />
              {impact}
            </span>
          )}
        </div>

        <h4 className="text-sm font-semibold text-slate-900 tracking-tight mt-1">
          {title}
        </h4>

        <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      {tag && (
        <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span>Scope: {tag}</span>
          <span className="text-slate-500 font-semibold hover:text-indigo-600 cursor-pointer transition-colors">
            View Analytics &rarr;
          </span>
        </div>
      )}
    </div>
  );
}
