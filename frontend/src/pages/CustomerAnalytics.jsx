import React from 'react';
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
  Legend
} from 'recharts';
import { Download, UserPlus, Filter } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/common/KpiCard';
import ChartCard from '../components/common/ChartCard';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import {
  customerKpis,
  customerAcquisitionTrend,
  customerSegmentation,
  customerRevenueDistribution
} from '../mockData/customerData';
import { topCustomersData } from '../mockData/dashboardData';

export default function CustomerAnalytics() {
  const customerColumns = [
    { key: 'customer', header: 'Client Enterprise' },
    { key: 'segment', header: 'Segment', align: 'center', render: (val) => <StatusBadge status={val} /> },
    { key: 'orders', header: 'Total Orders', align: 'right' },
    { key: 'revenue', header: 'LTV / Revenue', align: 'right' },
    {
      key: 'growth',
      header: 'Account Growth',
      align: 'right',
      render: (val) => <span className="font-semibold text-emerald-600">{val}</span>
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Intelligence & Retention"
        subtitle="Cohort behavior, acquisition channels, and revenue concentration across accounts."
        badge="Customer 360"
        actions={
          <button
            onClick={() => alert('Exporting customer analytics segment data')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
          >
            <Download className="h-3.5 w-3.5" />
            Export Customer Cohorts
          </button>
        }
      />

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {customerKpis.map((kpi) => (
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

      {/* Customer Acquisition Trend */}
      <section>
        <ChartCard
          title="Customer Acquisition Trend by Source"
          subtitle="Monthly net new accounts acquired via Organic, Paid Media, and Strategic Referrals"
        >
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={customerAcquisitionTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} iconType="circle" />
                <Area type="monotone" dataKey="organic" name="Organic Search / Direct" stackId="1" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.7} />
                <Area type="monotone" dataKey="paid" name="Paid Campaigns" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.7} />
                <Area type="monotone" dataKey="referral" name="Partner Referrals" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.7} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      {/* Customer Segmentation & Revenue Distribution */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Segmentation Donut */}
        <ChartCard
          title="Customer Segmentation Breakdown"
          subtitle="Account distribution across tier thresholds"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between h-72">
            <div className="h-64 w-full sm:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegmentation}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {customerSegmentation.map((entry, index) => (
                      <Cell key={`seg-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => [`${val}% of revenue`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-1/2 flex flex-col gap-2.5 px-4 text-xs">
              {customerSegmentation.map((seg) => (
                <div key={seg.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className="font-medium text-slate-700">{seg.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900">{seg.count} accounts</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Customer Revenue Distribution */}
        <ChartCard
          title="Customer Revenue Distribution"
          subtitle="Number of accounts categorized by annual spend tier"
        >
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerRevenueDistribution} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="bracket" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <Tooltip
                  formatter={(value) => [`${value} Accounts`, 'Count']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="count" name="Account Count" fill="#818cf8" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      {/* Top Customers Table */}
      <section>
        <DataTable
          title="High-Value Client Portfolio"
          subtitle="Top contributing strategic accounts ranked by annual contract value"
          columns={customerColumns}
          data={topCustomersData}
          searchPlaceholder="Search customer account..."
          rowsPerPage={5}
        />
      </section>
    </div>
  );
}
