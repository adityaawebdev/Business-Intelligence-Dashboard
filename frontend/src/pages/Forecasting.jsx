import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Download, Sparkles, TrendingUp, Sliders, ArrowUpRight, Cpu } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/common/KpiCard';
import ChartCard from '../components/common/ChartCard';
import {
  forecastingKpis,
  historicalVsForecastData,
  forecastScenarios
} from '../mockData/forecastingData';

const formatINR = (val) => {
  if (!val) return '—';
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
  return `₹${val}`;
};

const ForecastTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const isForecastMonth = label.includes('(F)');
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg text-xs">
        <div className="flex items-center justify-between gap-3 mb-1 border-b border-slate-100 pb-1">
          <span className="font-bold text-slate-800">{label}</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
            isForecastMonth ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-700'
          }`}>
            {isForecastMonth ? 'Projected ML Forecast' : 'Historical Ground Truth'}
          </span>
        </div>
        {payload.map((entry, index) => {
          if (!entry.value) return null;
          return (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-bold text-slate-900 font-mono">
                {formatINR(entry.value)}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default function Forecasting() {
  const [selectedConfidence, setSelectedConfidence] = useState('95%');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Predictive Forecasting & Demand Scenarios"
        subtitle="Forward-looking revenue projections, variance intervals, and business scenario simulations."
        badge="ML Prediction Layer"
        actions={
          <button
            onClick={() => alert('Exporting predictive forecast scenario matrix')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
          >
            <Download className="h-3.5 w-3.5" />
            Export Forecast Package
          </button>
        }
      />

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {forecastingKpis.map((kpi) => (
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

      {/* Historical vs Forecasted Chart */}
      <section>
        <ChartCard
          title="Revenue Projection: Historical Ground Truth → ML Forecast Runway"
          subtitle="Solid line indicates verified actuals; dashed indigo line indicates projected forecast with confidence intervals"
          headerRight={
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Confidence Interval:</span>
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50/80 p-0.5 text-xs font-medium text-slate-600">
                {['90%', '95%', '99%'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedConfidence(lvl)}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      selectedConfidence === lvl
                        ? 'bg-white text-indigo-700 font-semibold shadow-xs'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          }
        >
          <div className="h-84 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={historicalVsForecastData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="forecastArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tickFormatter={formatINR} />
                <Tooltip content={<ForecastTooltip />} />
                <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} iconType="circle" />

                {/* Upper and Lower Confidence Bounds Area */}
                <Area
                  type="monotone"
                  dataKey="upperBound"
                  name="Upper CI Bound"
                  stroke="transparent"
                  fill="url(#forecastArea)"
                />

                {/* Historical Actual Revenue */}
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Historical Actuals"
                  stroke="#334155"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#334155' }}
                  connectNulls={false}
                />

                {/* Projected ML Forecast Revenue */}
                <Line
                  type="monotone"
                  dataKey="forecast"
                  name="ML Forecast Run"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: '#4f46e5' }}
                  connectNulls={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      {/* Forecast Scenarios Cards */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Sliders className="h-4.5 w-4.5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Sensitivity Analysis & Scenario Models
          </h3>
          <span className="text-xs text-slate-500">
            (Estimated outcomes calibrated by macro demand factors)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {forecastScenarios.map((sc, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">{sc.scenario}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-600">
                    {sc.probability} Prob.
                  </span>
                </div>

                <div className="my-3">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                    6-Month Projected Run
                  </span>
                  <span className="text-2xl font-bold text-slate-900 font-sans">
                    {sc.projectedRevenue}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {sc.assumptions}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Model Engine: ARIMA + Prophet</span>
                <span className="font-semibold text-indigo-600 hover:underline cursor-pointer">
                  Inspect &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
