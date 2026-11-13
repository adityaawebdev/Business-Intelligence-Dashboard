/**
 * Centralized Mock Data: Financial Analytics
 */

export const financialKpis = [
  {
    id: 'fin-revenue',
    title: 'Gross Revenue',
    value: '₹32.4M',
    change: 14.1,
    isPositive: true,
    description: 'YTD operating income',
    badgeText: '+14.1%'
  },
  {
    id: 'fin-profit',
    title: 'Net EBITDA Profit',
    value: '₹9.2M',
    change: 18.5,
    isPositive: true,
    description: '28.4% net margin',
    badgeText: '+18.5%'
  },
  {
    id: 'fin-expenses',
    title: 'Total Operating Expenses',
    value: '₹23.2M',
    change: -4.2,
    isPositive: true, // Reduced expenses is positive
    description: 'OPEX efficiency improved',
    badgeText: '-4.2% OPEX'
  },
  {
    id: 'fin-margin',
    title: 'Blended Gross Margin',
    value: '64.8%',
    change: 3.1,
    isPositive: true,
    description: 'vs 61.7% historical baseline',
    badgeText: '+3.1%'
  }
];

export const revenueVsExpenses = [
  { month: 'Jan', revenue: 2400000, expenses: 1750000, netMargin: 650000 },
  { month: 'Feb', revenue: 2550000, expenses: 1800000, netMargin: 750000 },
  { month: 'Mar', revenue: 2750000, expenses: 1900000, netMargin: 850000 },
  { month: 'Apr', revenue: 2600000, expenses: 1850000, netMargin: 750000 },
  { month: 'May', revenue: 2900000, expenses: 1950000, netMargin: 950000 },
  { month: 'Jun', revenue: 3100000, expenses: 2050000, netMargin: 1050000 },
  { month: 'Jul', revenue: 3000000, expenses: 2000000, netMargin: 1000000 },
  { month: 'Aug', revenue: 3250000, expenses: 2100000, netMargin: 1150000 },
  { month: 'Sep', revenue: 3400000, expenses: 2150000, netMargin: 1250000 },
  { month: 'Oct', revenue: 3600000, expenses: 2250000, netMargin: 1350000 },
  { month: 'Nov', revenue: 3900000, expenses: 2350000, netMargin: 1550000 },
  { month: 'Dec', revenue: 4200000, expenses: 2450000, netMargin: 1750000 },
];

export const expenseCategoryBreakdown = [
  { name: 'R&D / Product Engineering', value: 8500000, percentage: 36, color: '#4f46e5' },
  { name: 'Sales & Marketing', value: 6800000, percentage: 29, color: '#06b6d4' },
  { name: 'Cloud Infrastructure & Hosting', value: 3950000, percentage: 17, color: '#10b981' },
  { name: 'General & Administrative', value: 2550000, percentage: 11, color: '#f59e0b' },
  { name: 'Customer Success & Support', value: 1400000, percentage: 7, color: '#8b5cf6' },
];

export const cashflowSummary = [
  { metric: 'Operating Cash Flow', q1: '₹6.2M', q2: '₹7.1M', q3: '₹7.8M', q4: '₹8.9M', trend: '+14.1%' },
  { metric: 'Free Cash Flow (FCF)', q1: '₹4.8M', q2: '₹5.5M', q3: '₹6.2M', q4: '₹7.4M', trend: '+19.3%' },
  { metric: 'EBITDA', q1: '₹7.1M', q2: '₹7.9M', q3: '₹8.4M', q4: '₹9.2M', trend: '+18.5%' },
  { metric: 'Working Capital', q1: '₹14.2M', q2: '₹15.8M', q3: '₹16.5M', q4: '₹18.1M', trend: '+9.7%' },
];
