import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';
import {
  Download,
  Filter,
  RefreshCw,
  Sparkles,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Database,
  FileCheck
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/common/KpiCard';
import ChartCard from '../components/common/ChartCard';
import DataTable from '../components/common/DataTable';
import InsightCard from '../components/common/InsightCard';
import StatusBadge from '../components/common/StatusBadge';
import {
  dashboardKpis,
  revenueOverviewData,
  salesByRegionData,
  salesByCategoryData,
  topProductsData,
  topCustomersData,
  customerGrowthTrendData,
  businessInsightsData,
  recentActivityData
} from '../mockData/dashboardData';

const formatINR = (val) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
  return `₹${val}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg text-xs">
        <p className="font-semibold text-slate-800 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-bold text-slate-900 font-mono">
              {typeof entry.value === 'number' ? formatINR(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardOverview() {
  const [revenueView, setRevenueView] = useState('both'); // 'revenue' | 'profit' | 'both'
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const productColumns = [
    { key: 'product', header: 'Product Name', width: '32%' },
    { key: 'category', header: 'Category' },
    { key: 'revenue', header: 'Revenue', align: 'right' },
    { key: 'orders', header: 'Orders', align: 'right' },
    {
      key: 'growth',
      header: 'Growth',
      align: 'right',
      render: (val) => (
        <span className={`font-semibold ${val.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
          {val}
        </span>
      )
    },
    { key: 'margin', header: 'Margin', align: 'right' },
    { key: 'status', header: 'Status', align: 'center' }
  ];

  const customerColumns = [
    { key: 'customer', header: 'Customer Entity', width: '36%' },
    { key: 'orders', header: 'Orders', align: 'right' },
    { key: 'revenue', header: 'Total Value', align: 'right' },
    {
      key: 'growth',
      header: 'YoY Growth',
      align: 'right',
      render: (val) => (
        <span className="font-semibold text-emerald-600">{val}</span>
      )
    },
    {
      key: 'segment',
      header: 'Account Tier',
      align: 'center',
      render: (val) => <StatusBadge status={val} />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Executive Overview"
        subtitle="Consolidated business intelligence metrics, performance trends, and automated insights."
        badge="Live Telemetry"
        actions={
          <>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`} />
              Sync Data
            </button>
            <button
              onClick={() => alert('Exporting consolidated BI PDF report...')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
            >
              <Download className="h-3.5 w-3.5" />
              Export Brief
            </button>
          </>
        }
      />

      {/* SECTION 1 — KPI CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardKpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            isPositive={kpi.isPositive}
            description={kpi.description}
            badgeText={kpi.badgeText}
          />
        ))}
      </section>

      {/* SECTION 2 — REVENUE ANALYTICS */}
      <section>
        <ChartCard
          title="Revenue Overview"
          subtitle="Monthly gross revenue compared against net operating profit (FY26)"
          headerRight={
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50/80 p-0.5 text-xs font-medium text-slate-600">
              <button
                onClick={() => setRevenueView('revenue')}
                className={`px-3 py-1 rounded-md transition-all ${
                  revenueView === 'revenue'
                    ? 'bg-white text-indigo-700 font-semibold shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setRevenueView('profit')}
                className={`px-3 py-1 rounded-md transition-all ${
                  revenueView === 'profit'
                    ? 'bg-white text-indigo-700 font-semibold shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Profit
              </button>
              <button
                onClick={() => setRevenueView('both')}
                className={`px-3 py-1 rounded-md transition-all ${
                  revenueView === 'both'
                    ? 'bg-white text-indigo-700 font-semibold shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                Both
              </button>
            </div>
          }
        >
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueOverviewData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickFormatter={formatINR}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: 16, fontSize: 12 }}
                  iconType="circle"
                />

                {(revenueView === 'revenue' || revenueView === 'both') && (
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Gross Revenue"
                    stroke="#4f46e5"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                )}

                {(revenueView === 'profit' || revenueView === 'both') && (
                  <Area
                    type="monotone"
                    dataKey="profit"
                    name="Net Operating Profit"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorProfit)"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      {/* SECTION 3 — SALES PERFORMANCE (SIDE BY SIDE) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Region */}
        <ChartCard
          title="Sales by Region"
          subtitle="Regional distribution of revenue and order volume"
        >
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByRegionData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="region" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tickFormatter={formatINR} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" name="Revenue" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Sales by Category */}
        <ChartCard
          title="Sales by Category"
          subtitle="Portfolio share across product and service verticals"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between h-72">
            <div className="h-64 w-full sm:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {salesByCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Pie Legend */}
            <div className="w-full sm:w-1/2 flex flex-col gap-2.5 px-4 text-xs">
              {salesByCategoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="font-medium text-slate-700">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{cat.percentage}%</span>
                    <span className="text-[11px] text-slate-400">({formatINR(cat.value)})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </section>

      {/* SECTION 4 — TOP PRODUCTS */}
      <section>
        <DataTable
          title="Top Products"
          subtitle="Revenue generation, volume, and unit margin by product line"
          columns={productColumns}
          data={topProductsData}
          searchPlaceholder="Search product or category..."
          rowsPerPage={5}
        />
      </section>

      {/* SECTION 5 — CUSTOMER PERFORMANCE */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable
            title="Top Strategic Customers"
            subtitle="Highest value enterprise accounts and expansion metrics"
            columns={customerColumns}
            data={topCustomersData}
            searchable={false}
            rowsPerPage={5}
          />
        </div>

        {/* Small customer growth/trend chart */}
        <div className="lg:col-span-1">
          <ChartCard
            title="Customer Expansion Trend"
            subtitle="Active accounts vs new monthly additions"
          >
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customerGrowthTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="active"
                    name="Active Accounts"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="newCustomers"
                    name="New Additions"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </section>

      {/* SECTION 6 — BUSINESS INSIGHTS */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4.5 w-4.5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Automated Business Insights
          </h3>
          <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded-full px-2 py-0.5 ml-1">
            Engine Diagnostics
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {businessInsightsData.map((insight) => (
            <InsightCard
              key={insight.id}
              category={insight.category}
              title={insight.title}
              description={insight.description}
              tag={insight.tag}
              impact={insight.impact}
              type={insight.type}
            />
          ))}
        </div>
      </section>

      {/* SECTION 7 — RECENT ACTIVITY */}
      <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-slate-900 tracking-tight">
              Recent System & Pipeline Activity
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Audit log of dataset ingestions, report exports, and user administration
            </p>
          </div>
          <span className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">
            View Complete Audit Log &rarr;
          </span>
        </div>

        <div className="mt-4 divide-y divide-slate-100">
          {recentActivityData.map((item) => (
            <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-slate-50/60 rounded-lg px-2 transition-colors">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <Database className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">{item.event}</span>
                    <StatusBadge status={item.status} size="xs" />
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{item.details}</p>
                  <span className="text-[11px] text-slate-400">Initiated by {item.user}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-400 self-start sm:self-auto sm:text-right font-medium">
                <Clock className="h-3 w-3" />
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
