import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  ChevronDown,
  Sparkles,
  Command
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import DateRangePicker from '../common/DateRangePicker';

const ROUTE_TITLES = {
  '/dashboard': 'Executive Overview',
  '/sales': 'Sales Analytics & Revenue',
  '/customers': 'Customer Cohorts & Retention',
  '/products': 'Product Catalog & Margin Intelligence',
  '/financial': 'Financial Analytics & Cashflow',
  '/operations': 'Operational Logistics & SLA',
  '/forecasting': 'Predictive Forecasting & Demand Scenarios',
  '/data-upload': 'Dataset ETL & File Ingestion',
  '/reports': 'BI Reports & Dispatches',
  '/settings': 'Platform Configuration & Settings',
};

export default function Header() {
  const { toggleMobileSidebar, toggleSidebar, searchQuery, setSearchQuery } = useDashboard();
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const notifRef = useRef(null);

  const currentTitle = ROUTE_TITLES[location.pathname] || 'Dashboard';

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Dataset Processed',
      desc: 'Q4_Consolidated_Sales_v3.csv ready for analysis',
      time: '12m ago',
      icon: CheckCircle2,
      color: 'text-emerald-500 bg-emerald-50'
    },
    {
      id: 2,
      title: 'Dispatch SLA Alert',
      desc: 'East Hub dispatch delay exceeds 4.5 hour threshold',
      time: '28m ago',
      icon: AlertTriangle,
      color: 'text-amber-500 bg-amber-50'
    },
    {
      id: 3,
      title: 'New Monthly Report',
      desc: 'Financial Ledger reconciliation ready for download',
      time: '1h ago',
      icon: FileSpreadsheet,
      color: 'text-blue-500 bg-blue-50'
    }
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/90 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile menu button */}
        <button
          onClick={toggleMobileSidebar}
          className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Page Title & Context */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 hidden sm:inline">
              InsightHub
            </span>
            <span className="text-slate-300 hidden sm:inline">/</span>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              {currentTitle}
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 hidden md:block">
            Good morning, Admin &bull; Enterprise Operations Live
          </span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search metrics, reports, products, customers... (Ctrl + K)"
            className="h-9 w-full rounded-lg border border-slate-200/90 bg-slate-50/80 pl-9 pr-8 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <kbd className="hidden lg:inline-flex absolute right-2.5 top-1/2 -translate-y-1/2 items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
            <Command className="h-2.5 w-2.5" /> K
          </kbd>
        </div>
      </div>

      {/* Right: Date Range Selector, Notifications, User Avatar */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Date Range Selector */}
        <DateRangePicker />

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              if (unreadCount > 0) setUnreadCount(0);
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Flyout */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Notifications & Alerts</span>
                <span className="text-[11px] text-indigo-600 font-medium hover:underline cursor-pointer">
                  Mark all as read
                </span>
              </div>
              <div className="divide-y divide-slate-100 mt-1 max-h-72 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} className="py-2.5 px-1 flex items-start gap-3 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className={`p-1.5 rounded-lg flex-shrink-0 ${n.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{n.title}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{n.desc}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-xs">
            AD
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold text-slate-800 leading-tight">
              Admin
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Enterprise Lead
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
