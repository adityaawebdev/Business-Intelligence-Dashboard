import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

const RANGES = [
  'Today',
  'Last 7 Days',
  'Last 30 Days',
  'Last 90 Days',
  'This Year',
  'Custom Range'
];

export default function DateRangePicker() {
  const { dateRange, setDateRange } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-2xs"
        aria-label="Select date range"
      >
        <Calendar className="h-3.5 w-3.5 text-slate-500" />
        <span className="font-semibold text-slate-800">{dateRange}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Time Horizon
          </div>
          <div className="space-y-0.5">
            {RANGES.map((range) => {
              const isSelected = dateRange === range;
              return (
                <button
                  key={range}
                  onClick={() => {
                    setDateRange(range);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-2.5 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{range}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-indigo-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
