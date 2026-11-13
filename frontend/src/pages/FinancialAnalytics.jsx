import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Download, FileSpreadsheet, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/common/KpiCard';
import ChartCard from '../components/common/ChartCard';
import DataTable from '../components/common/DataTable';
import {
  financialKpis,
  revenueVsExpenses,
  expenseCategoryBreakdown,
  cashflowSummary
} from '../mockData/financialData';

const formatINR = (val) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
  return `₹${val}`;
};

export default function FinancialAnalytics() {
  const cashflowColumns = [
    { key: 'metric', header: 'Financial Statement Line Item', width: '35%' },
    { key: 'q1', header: 'Q1 FY26', align: 'right' },
    { key: 'q2', header: 'Q2 FY26', align: 'right' },
    { key: 'q3', header: 'Q3 FY26', align: 'right' },
    { key: 'q4', header: 'Q4 FY26', align: 'right' },
    {
      key: 'trend',
      header: 'YoY Trajectory',
      align: 'right',
      render: (val) => (
        <span className="font-semibold text-emerald-600 flex items-center justify-end gap-0.5">
          <ArrowUpRight className="h-3 w-3" />
          {val}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Intelligence & Operating Margins"
        subtitle="EBITDA reconciliation, revenue vs operating expenses, and department cost allocation."
        badge="Audit & P&L"
        actions={
          <button
            onClick={() => alert('Exporting financial balance sheet & P&L statement')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
          >
            <Download className="h-3.5 w-3.5" />
            Export P&L Report
          </button>
        }
      />

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialKpis.map((kpi) => (
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

      {/* Revenue vs Expenses Composed Chart */}
      <section>
        <ChartCard
          title="Revenue vs Operating Expenses & Net Margin"
          subtitle="Monthly operating expense pacing relative to gross revenue inflows"
        >
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueVsExpenses} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tickFormatter={formatINR} />
                <Tooltip
                  formatter={(val) => [formatINR(val), '']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} iconType="circle" />
                <Bar dataKey="revenue" name="Gross Revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={22} />
                <Bar dataKey="expenses" name="Operating Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={22} />
                <Line type="monotone" dataKey="netMargin" name="Net Operating Margin" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      {/* Expense Category Breakdown & Department Allocation */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Donut Chart */}
        <ChartCard
          title="Operating Expense (OPEX) Allocation"
          subtitle="Cost distribution across departmental operational units"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between h-72">
            <div className="h-64 w-full sm:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategoryBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {expenseCategoryBreakdown.map((entry, index) => (
                      <Cell key={`exp-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => [formatINR(val), 'Budget Allocated']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-1/2 flex flex-col gap-2.5 px-4 text-xs">
              {expenseCategoryBreakdown.map((exp) => (
                <div key={exp.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: exp.color }} />
                    <span className="font-medium text-slate-700 truncate max-w-[120px]">{exp.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-900">{exp.percentage}%</span>
                    <span className="text-[10px] text-slate-400 font-mono">({formatINR(exp.value)})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Financial Highlights Card */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div>
            <h3 className="text-base font-semibold text-slate-900 tracking-tight">
              EBITDA & Cash Efficiency Summary
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Operating leverage highlights for Q4 board review
            </p>

            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-3">
                <span className="text-xs font-bold text-emerald-800">Gross Margin Expansion</span>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Blended gross margins widened to 64.8% due to software license ratio increase and vendor renegotiation.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                <span className="text-xs font-bold text-slate-800">Free Cash Flow Velocity</span>
                <p className="text-xs text-slate-600 mt-0.5">
                  FCF converted at 80.4% of net operating profit, maintaining healthy operational liquidity.
                </p>
              </div>

              <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-3">
                <span className="text-xs font-bold text-indigo-800">R&D Capital Efficiency</span>
                <p className="text-xs text-indigo-700 mt-0.5">
                  36% of OPEX committed to product engineering resulted in 4 new platform capabilities with zero external debt.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Fiscal Calendar: FY26 Q4</span>
            <span className="font-semibold text-indigo-600 hover:underline cursor-pointer">
              Download Audit Package &rarr;
            </span>
          </div>
        </div>
      </section>

      {/* Cashflow Summary Table */}
      <section>
        <DataTable
          title="Quarterly Cashflow & Balance Sheet Health"
          subtitle="Consolidated cash generation metrics tracked sequentially across quarters"
          columns={cashflowColumns}
          data={cashflowSummary}
          searchable={false}
          rowsPerPage={5}
        />
      </section>
    </div>
  );
}
