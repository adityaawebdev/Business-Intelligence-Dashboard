import React, { useState } from 'react';
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
import { Download, PackagePlus, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/common/KpiCard';
import ChartCard from '../components/common/ChartCard';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import {
  productKpis,
  productCategoryPerformance,
  productSalesTrend,
  fullProductList
} from '../mockData/productData';

const formatINR = (val) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
  return `₹${val}`;
};

export default function ProductAnalytics() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? fullProductList
    : fullProductList.filter(p => p.category === selectedCategory);

  const productTableColumns = [
    { key: 'name', header: 'Product & SKU', width: '30%' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Unit Price' },
    { key: 'unitsSold', header: 'Units Sold', align: 'right' },
    { key: 'revenue', header: 'Total Revenue', align: 'right' },
    {
      key: 'margin',
      header: 'Gross Margin',
      align: 'right',
      render: (val) => (
        <span className="font-semibold text-emerald-600">{val}</span>
      )
    },
    { key: 'status', header: 'Demand Tier', align: 'center' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Analytics & Margin Intelligence"
        subtitle="Catalog velocity, SKU gross profit contributions, and category growth vectors."
        badge="SKU Intelligence"
        actions={
          <button
            onClick={() => alert('Exporting product catalog intelligence report')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
          >
            <Download className="h-3.5 w-3.5" />
            Export Catalog Report
          </button>
        }
      />

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {productKpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            subvalue={kpi.subvalue}
            change={kpi.change}
            isPositive={kpi.isPositive}
            description={kpi.description}
            badgeText={kpi.badgeText}
          />
        ))}
      </section>

      {/* Product Category Velocity & Trend */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Revenue & Margin */}
        <ChartCard
          title="Category Revenue vs Margin %"
          subtitle="Comparison of revenue scale against profitability by vertical"
        >
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productCategoryPerformance} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tickFormatter={formatINR} />
                <Tooltip
                  formatter={(val, name) => [name === 'Revenue' ? formatINR(val) : `${val}%`, name]}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} iconType="circle" />
                <Bar dataKey="revenue" name="Revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Product Sales Trend Over Time */}
        <ChartCard
          title="Product Sales Trend by Category"
          subtitle="Monthly run-rate trajectory across the fiscal year"
        >
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productSalesTrend} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tickFormatter={formatINR} />
                <Tooltip
                  formatter={(val) => [formatINR(val), '']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} iconType="circle" />
                <Line type="monotone" dataKey="software" name="Software" stroke="#4f46e5" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="electronics" name="Electronics" stroke="#06b6d4" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="services" name="Services" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="accessories" name="Accessories" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      {/* Full Product Catalog Table with Category Filters */}
      <section>
        <DataTable
          title="Product Catalog & Margin Matrix"
          subtitle="Detailed breakdown of sales volumes, pricing structures, and margins"
          columns={productTableColumns}
          data={filteredProducts}
          searchPlaceholder="Search product by title or SKU..."
          headerAction={
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {['All', 'Software', 'Electronics', 'Services', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          }
          rowsPerPage={6}
        />
      </section>
    </div>
  );
}
