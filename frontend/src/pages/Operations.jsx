import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  Download,
  AlertTriangle,
  CheckCircle2,
  Info,
  Clock,
  Truck,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/common/KpiCard';
import ChartCard from '../components/common/ChartCard';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import {
  operationsKpis,
  operationsProcessingMetrics,
  regionalFulfillment,
  operationalAlerts
} from '../mockData/operationsData';

export default function Operations() {
  const regionalColumns = [
    { key: 'region', header: 'Fulfillment Facility Hub', width: '30%' },
    { key: 'capacity', header: 'Capacity Utilization' },
    {
      key: 'fulfillmentRate',
      header: 'On-Time SLA %',
      align: 'right',
      render: (val) => (
        <span className="font-semibold text-emerald-600">{val}</span>
      )
    },
    { key: 'avgDispatchTime', header: 'Avg Dispatch', align: 'right' },
    {
      key: 'status',
      header: 'Health Status',
      align: 'center',
      render: (val) => <StatusBadge status={val} />
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operations, Logistics & SLA Telemetry"
        subtitle="Real-time order throughput, regional fulfillment efficiency, and supply chain health."
        badge="Operations Live"
        actions={
          <button
            onClick={() => alert('Exporting operations logistics report')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
          >
            <Download className="h-3.5 w-3.5" />
            Export SLA Audit
          </button>
        }
      />

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {operationsKpis.map((kpi) => (
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

      {/* Daily Processing Metrics Chart */}
      <section>
        <ChartCard
          title="Daily Order Ingestion vs Processing Throughput"
          subtitle="Orders received, fulfilled, and backlog volume over the trailing 7 days"
        >
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={operationsProcessingMetrics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} iconType="circle" />
                <Bar dataKey="received" name="Orders Received" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="processed" name="Orders Processed" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="backlogged" name="Backlog Pending" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      {/* Operational Alerts & Regional Hubs */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Operational Alerts Column */}
        <div className="lg:col-span-1 rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Active Operational Alerts</h3>
              </div>
              <span className="text-[10px] font-semibold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200">
                1 Warning
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {operationalAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border text-xs ${
                    alert.severity === 'warning'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                      : alert.severity === 'info'
                      ? 'bg-blue-50/70 border-blue-200 text-blue-900'
                      : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span>{alert.title}</span>
                    <span className="text-[10px] opacity-75">{alert.timestamp}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Automated Incident Watch</span>
            <span className="text-indigo-600 font-semibold hover:underline cursor-pointer">
              Resolve Alerts &rarr;
            </span>
          </div>
        </div>

        {/* Regional Fulfillment Table */}
        <div className="lg:col-span-2">
          <DataTable
            title="Regional Hub SLA & Capacity Monitoring"
            subtitle="Warehouse throughput, dispatch efficiency, and courier response rates"
            columns={regionalColumns}
            data={regionalFulfillment}
            searchable={false}
            rowsPerPage={5}
          />
        </div>
      </section>
    </div>
  );
}
