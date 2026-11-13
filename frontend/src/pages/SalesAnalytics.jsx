import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Download, SlidersHorizontal, ArrowUpRight, DollarSign, ShoppingCart, Percent } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/common/KpiCard';
import ChartCard from '../components/common/ChartCard';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import {
  salesKpis,
  monthlySalesData,
  salesByChannelData,
  salesRegionalBreakdown
} from '../mockData/salesData';
import { topProductsData } from '../mockData/dashboardData';

const formatINR = (val) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
  return `₹${val}`;
};

export default function SalesAnalytics() {
  const regionalColumns = [
    { key: 'region', header: 'Sales Region' },
    { key: 'salesRep', header: 'Regional Lead' },
    { key: 'quotaAttainment', header: 'Quota Attainment', align: 'right' },
    { key: 'revenue', header: 'Revenue Generated', align: 'right' },
    {
      key: 'growth',
      header: 'YoY Velocity',
      align: 'right',
      render: (val) => (
        <span className="font-semibold text-emerald-600 flex items-center justify-end gap-0.5">
          <ArrowUpRight className="h-3 w-3" />
          {val}
        </span>
      )
    }
  ];

  const channelColumns = [
    { key: 'channel', header: 'Acquisition Channel' },
    { key: 'revenue', header: 'Revenue', align: 'right', render: (val) => formatINR(val) },
    { key: 'deals', header: 'Closed Deals', align: 'right' },
    { key: 'conversionRate', header: 'Conversion Rate', align: 'right' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales Analytics & Revenue Performance"
        subtitle="In-depth analysis of sales pipelines, quota attainments, and channel growth rates."
        badge="Q4 Fiscal Tracking"
        actions={
          <>
            <button
              onClick={() => alert('Filtering options')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
              Filter Channels
            </button>
            <button
              onClick={() => alert('Exporting sales dataset')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
            >
              <Download className="h-3.5 w-3.5" />
              Export Sales Report
            </button>
          </>
        }
      />

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {salesKpis.map((kpi) => (
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

      {/* Monthly Sales Trend vs Target */}
      <section>
        <ChartCard
          title="Monthly Sales Pace: Current Year vs Prior Year & Target"
          subtitle="Evaluation of annual quota pacing and seasonal surges"
        >
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySalesData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tickFormatter={formatINR} />
                <Tooltip
                  formatter={(value) => [formatINR(value), '']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} iconType="circle" />
                <Bar dataKey="currentYear" name="FY26 Actual" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="previousYear" name="FY25 Actual" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="FY26 Target Quota" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      {/* Two columns: Regional Performance & Acquisition Channels */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <DataTable
            title="Regional Sales Attainment"
            subtitle="Quota fulfillment across domestic operational zones"
            columns={regionalColumns}
            data={salesRegionalBreakdown}
            searchable={false}
            rowsPerPage={5}
          />
        </div>

        <div>
          <DataTable
            title="Sales Acquisition Channels"
            subtitle="Deal closing velocity by customer touchpoint"
            columns={channelColumns}
            data={salesByChannelData}
            searchable={false}
            rowsPerPage={5}
          />
        </div>
      </section>

      {/* Product Performance in Sales Context */}
      <section>
        <DataTable
          title="Product Sales Revenue & Unit Volumes"
          subtitle="Top generating product catalogs in descending order"
          columns={[
            { key: 'product', header: 'Product' },
            { key: 'category', header: 'Category' },
            { key: 'revenue', header: 'Revenue', align: 'right' },
            { key: 'orders', header: 'Total Orders', align: 'right' },
            { key: 'margin', header: 'Profit Margin', align: 'right' },
            { key: 'status', header: 'Performance Tier', align: 'center' }
          ]}
          data={topProductsData}
          searchPlaceholder="Search product catalog..."
          rowsPerPage={5}
        />
      </section>
    </div>
  );
}
