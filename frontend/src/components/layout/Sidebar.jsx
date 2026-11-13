import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Package,
  CircleDollarSign,
  Cpu,
  LineChart,
  UploadCloud,
  FileText,
  Settings,
  ShieldCheck,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  DatabaseZap,
  UserCheck
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

const NAV_MAIN = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Sales Analytics', path: '/sales', icon: TrendingUp },
  { name: 'Customer Analytics', path: '/customers', icon: Users },
  { name: 'Product Analytics', path: '/products', icon: Package },
  { name: 'Financial Analytics', path: '/financial', icon: CircleDollarSign },
  { name: 'Operations', path: '/operations', icon: Cpu },
  { name: 'Forecasting', path: '/forecasting', icon: LineChart },
  { name: 'Data Upload', path: '/data-upload', icon: UploadCloud, badge: 'ETL' },
  { name: 'Reports', path: '/reports', icon: FileText },
];

const NAV_ADMIN = [
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'User Management', path: '/settings?tab=security', icon: ShieldCheck, badge: 'Role' },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, mobileSidebarOpen, closeMobileSidebar } = useDashboard();
  const location = useLocation();

  const renderNavLink = (item) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

    return (
      <div key={item.name} className="relative group">
        <NavLink
          to={item.path}
          onClick={closeMobileSidebar}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
            isActive
              ? 'bg-indigo-600 text-white shadow-xs font-semibold'
              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
          } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
        >
          <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
          
          {!sidebarCollapsed && (
            <span className="truncate flex-1">{item.name}</span>
          )}

          {!sidebarCollapsed && item.badge && (
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                isActive
                  ? 'bg-indigo-700/80 text-white'
                  : 'bg-slate-800 text-indigo-400 border border-indigo-900/40'
              }`}
            >
              {item.badge}
            </span>
          )}
        </NavLink>

        {/* Tooltip for collapsed mode */}
        {sidebarCollapsed && (
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 hidden group-hover:flex items-center">
            <div className="rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-xl whitespace-nowrap border border-slate-700 pointer-events-none">
              {item.name}
              {item.badge && <span className="ml-1.5 text-[10px] text-indigo-400">({item.badge})</span>}
            </div>
          </div>
        )}
      </div>
    );
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between overflow-y-auto overflow-x-hidden bg-slate-950 text-slate-300">
      {/* Brand Header */}
      <div>
        <div className={`flex items-center justify-between border-b border-slate-800/80 px-4 h-16 ${sidebarCollapsed ? 'justify-center px-2' : ''}`}>
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold">
                <DatabaseZap className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white font-sans flex items-center gap-1.5">
                  InsightHub
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                </span>
                <span className="text-[10px] text-slate-400 font-normal truncate max-w-[150px]">
                  BI & Analytics Platform
                </span>
              </div>
            </div>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold">
              <DatabaseZap className="h-5 w-5" />
            </div>
          )}

          {/* Desktop collapse toggle */}
          <button
            onClick={toggleSidebar}
            className={`hidden lg:flex h-7 w-7 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
              sidebarCollapsed ? 'absolute -right-3.5 top-5 z-40 rounded-full bg-slate-900 border-slate-700 shadow-lg' : ''
            }`}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="px-3 py-4 space-y-6">
          {/* Main Navigation */}
          <div>
            {!sidebarCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Analytics & Data
              </div>
            )}
            <nav className="space-y-1">
              {NAV_MAIN.map(renderNavLink)}
            </nav>
          </div>

          {/* Administration Section */}
          <div>
            {!sidebarCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Administration
              </div>
            )}
            <nav className="space-y-1">
              {NAV_ADMIN.map(renderNavLink)}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Section: Help & User Profile */}
      <div className="border-t border-slate-800/80 p-3 space-y-2">
        {/* Help & Support link */}
        <div className="relative group">
          <a
            href="#help"
            onClick={(e) => { e.preventDefault(); alert('InsightHub Knowledge Base: Python FastAPI + Pandas backend documentation ready for connection.'); }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 transition-colors ${
              sidebarCollapsed ? 'justify-center px-2' : ''
            }`}
          >
            <HelpCircle className="h-4.5 w-4.5 text-slate-400 group-hover:text-slate-200" />
            {!sidebarCollapsed && <span>Help & Documentation</span>}
          </a>
          {sidebarCollapsed && (
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 hidden group-hover:flex">
              <div className="rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-xl whitespace-nowrap border border-slate-700 pointer-events-none">
                Help & Documentation
              </div>
            </div>
          )}
        </div>

        {/* User Profile Card */}
        <div
          className={`flex items-center gap-3 rounded-lg border border-slate-800/80 bg-slate-900/80 p-2.5 ${
            sidebarCollapsed ? 'justify-center p-2' : ''
          }`}
        >
          <div className="relative flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-xs font-bold text-white shadow-xs">
              AD
            </div>
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
          </div>

          {!sidebarCollapsed && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-slate-200 truncate">
                Admin User
              </span>
              <span className="text-[10px] text-slate-400 font-mono truncate">
                Lead BI Analyst
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block relative z-20 flex-shrink-0 transition-all duration-300 ease-in-out border-r border-slate-800/80 ${
          sidebarCollapsed ? 'w-18' : 'w-64'
        }`}
      >
        <div className="fixed top-0 bottom-0 left-0 z-20 h-screen transition-all duration-300 ease-in-out"
          style={{ width: sidebarCollapsed ? '4.5rem' : '16rem' }}
        >
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
