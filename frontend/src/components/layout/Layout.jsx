import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useDashboard } from '../../context/DashboardContext';

export default function Layout() {
  const { sidebarCollapsed } = useDashboard();

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main App Canvas */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ease-in-out min-w-0 ${
          sidebarCollapsed ? 'lg:pl-0' : 'lg:pl-0'
        }`}
      >
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200/80 bg-white/60 py-4 px-6 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>InsightHub Business Intelligence & Analytics Platform &bull; v1.0.0 (Enterprise)</span>
            <span className="text-[11px] text-slate-400">Ready for Python FastAPI & Pandas Integration</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
