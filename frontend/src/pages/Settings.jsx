import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  User,
  Sliders,
  LayoutGrid,
  Bell,
  ShieldCheck,
  Save,
  CheckCircle2,
  Key,
  Database,
  Lock,
  Mail,
  Building
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function Settings() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [savedNotice, setSavedNotice] = useState(false);

  // Mock Form States
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin.lead@insighthub.internal',
    department: 'Enterprise Business Intelligence',
    role: 'Lead BI Architect',
    timezone: 'Asia/Kolkata (IST +05:30)'
  });

  const [preferences, setPreferences] = useState({
    currency: 'INR (₹)',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'Indian Lakhs & Crores',
    autoRefreshInterval: '30 seconds',
    defaultLandingPage: '/dashboard'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyDigest: true,
    etlFailureAlerts: true,
    slaBreachPush: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Sliders },
    { id: 'dashboard', label: 'Dashboard Preferences', icon: LayoutGrid },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Access', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Configuration & Settings"
        subtitle="Manage user profiles, dashboard view preferences, notification policies, and security credentials."
        badge="Enterprise Controls"
      />

      {savedNotice && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Configuration preferences saved successfully.</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation Tabs */}
        <aside className="w-full md:w-60 flex-shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto rounded-xl border border-slate-200/80 bg-white p-2 shadow-xs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap text-left ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs">
          {/* PROFILE SECTION */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">User Profile</h3>
                <p className="text-xs text-slate-500">Identity details and system role allocation</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Role</label>
                  <input
                    type="text"
                    disabled
                    value={profile.role}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Timezone</label>
                  <input
                    type="text"
                    value={profile.timezone}
                    onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* PREFERENCES SECTION */}
          {activeTab === 'preferences' && (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Regional & Locale Preferences</h3>
                <p className="text-xs text-slate-500">Formatting standards for currency and date calculations</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Base Currency</label>
                  <select
                    value={preferences.currency}
                    onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                    <option value="USD ($)">USD ($) - US Dollar</option>
                    <option value="EUR (€)">EUR (€) - Euro</option>
                    <option value="GBP (£)">GBP (£) - British Pound</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Numeric Number Scale</label>
                  <select
                    value={preferences.numberFormat}
                    onChange={(e) => setPreferences({ ...preferences, numberFormat: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="Indian Lakhs & Crores">Indian (Lakhs & Crores: ₹24.5M / ₹2.45Cr)</option>
                    <option value="International Standard">International (Thousands & Millions)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Calendar Date Format</label>
                  <select
                    value={preferences.dateFormat}
                    onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Preferences
                </button>
              </div>
            </form>
          )}

          {/* DASHBOARD PREFERENCES */}
          {activeTab === 'dashboard' && (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Dashboard View Preferences</h3>
                <p className="text-xs text-slate-500">Configure default widgets, refresh pacing, and layout density</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Auto-Telemetry Refresh Cadence</label>
                  <select
                    value={preferences.autoRefreshInterval}
                    onChange={(e) => setPreferences({ ...preferences, autoRefreshInterval: e.target.value })}
                    className="w-full sm:w-80 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="Disabled">Manual Only (Disabled)</option>
                    <option value="30 seconds">Every 30 seconds</option>
                    <option value="1 minute">Every 1 minute</option>
                    <option value="5 minutes">Every 5 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Default Landing Route</label>
                  <select
                    value={preferences.defaultLandingPage}
                    onChange={(e) => setPreferences({ ...preferences, defaultLandingPage: e.target.value })}
                    className="w-full sm:w-80 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="/dashboard">Overview (/dashboard)</option>
                    <option value="/sales">Sales Analytics (/sales)</option>
                    <option value="/operations">Operations (/operations)</option>
                    <option value="/data-upload">Data Ingestion (/data-upload)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <span className="block text-xs font-semibold text-slate-700 mb-2">Display Widgets</span>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-xs text-slate-700">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                      Show Automated Business Insights by default
                    </label>
                    <label className="flex items-center gap-2.5 text-xs text-slate-700">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                      Render interactive sparklines in KPI cards
                    </label>
                    <label className="flex items-center gap-2.5 text-xs text-slate-700">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                      Enable high-contrast chart palettes for accessibility
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Dashboard Settings
                </button>
              </div>
            </form>
          )}

          {/* NOTIFICATIONS SECTION */}
          {activeTab === 'notifications' && (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Notification Policies</h3>
                <p className="text-xs text-slate-500">Configure alert rules for ETL processing and KPI thresholds</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.etlFailureAlerts}
                    onChange={(e) => setNotifications({ ...notifications, etlFailureAlerts: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">ETL Pipeline Alerts</span>
                    <span className="text-xs text-slate-500">Instant notification when a dataset ingestion encounters schema errors or missing columns.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.slaBreachPush}
                    onChange={(e) => setNotifications({ ...notifications, slaBreachPush: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">SLA Threshold Alerts</span>
                    <span className="text-xs text-slate-500">Push notification when regional fulfillment dips below 97.5% SLA guarantee.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.weeklyDigest}
                    onChange={(e) => setNotifications({ ...notifications, weeklyDigest: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Weekly Executive Digest</span>
                    <span className="text-xs text-slate-500">Automated summary of top revenue gainers, margins, and churn metrics sent on Monday mornings.</span>
                  </div>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Notifications
                </button>
              </div>
            </form>
          )}

          {/* SECURITY SECTION */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Security & RBAC Administration</h3>
                <p className="text-xs text-slate-500">Role-based access controls and future FastAPI authentication readiness</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-800">Enterprise Authentication Status</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Authentication is intentionally bypassed in this UI-only prototype phase. The application architecture includes an Axios client interceptor template prepared for JWT bearer tokens once the Python FastAPI backend is introduced.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Role-Based User Permissions
                </h4>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden text-xs">
                  <div className="p-3 flex items-center justify-between bg-white">
                    <div>
                      <span className="font-bold text-slate-800 block">Lead BI Architect (You)</span>
                      <span className="text-[11px] text-slate-400">Full administrative access, ETL uploads, and config settings</span>
                    </div>
                    <span className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-200">
                      Super Admin
                    </span>
                  </div>

                  <div className="p-3 flex items-center justify-between bg-white">
                    <div>
                      <span className="font-bold text-slate-800 block">Data Analyst</span>
                      <span className="text-[11px] text-slate-400">Upload datasets, explore metrics, and export reports</span>
                    </div>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                      Analyst
                    </span>
                  </div>

                  <div className="p-3 flex items-center justify-between bg-white">
                    <div>
                      <span className="font-bold text-slate-800 block">Executive Viewer</span>
                      <span className="text-[11px] text-slate-400">Read-only overview dashboards and PDF briefing downloads</span>
                    </div>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                      Viewer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
