/**
 * Centralized Mock Data: Sales Analytics
 */

export const salesKpis = [
  {
    id: 'sales-revenue',
    title: 'Gross Sales Revenue',
    value: '₹28.4M',
    change: 15.4,
    isPositive: true,
    description: 'vs target ₹26.0M',
    badgeText: '+15.4%'
  },
  {
    id: 'sales-orders',
    title: 'Total Sales Orders',
    value: '14,210',
    change: 11.2,
    isPositive: true,
    description: 'vs previous quarter',
    badgeText: '+11.2%'
  },
  {
    id: 'sales-profit',
    title: 'Net Sales Margin',
    value: '₹7.9M',
    change: 9.8,
    isPositive: true,
    description: '27.8% profit margin',
    badgeText: '+9.8%'
  },
  {
    id: 'sales-aov',
    title: 'Avg Deal Size (AOV)',
    value: '₹1,998',
    change: 3.7,
    isPositive: true,
    description: 'vs ₹1,926 last period',
    badgeText: '+3.7%'
  }
];

export const monthlySalesData = [
  { month: 'Jan', currentYear: 2100000, previousYear: 1800000, target: 2000000 },
  { month: 'Feb', currentYear: 2350000, previousYear: 1950000, target: 2200000 },
  { month: 'Mar', currentYear: 2600000, previousYear: 2100000, target: 2400000 },
  { month: 'Apr', currentYear: 2450000, previousYear: 2050000, target: 2350000 },
  { month: 'May', currentYear: 2800000, previousYear: 2250000, target: 2600000 },
  { month: 'Jun', currentYear: 2950000, previousYear: 2400000, target: 2800000 },
  { month: 'Jul', currentYear: 2850000, previousYear: 2300000, target: 2750000 },
  { month: 'Aug', currentYear: 3100000, previousYear: 2500000, target: 2900000 },
  { month: 'Sep', currentYear: 3250000, previousYear: 2650000, target: 3000000 },
  { month: 'Oct', currentYear: 3400000, previousYear: 2800000, target: 3200000 },
  { month: 'Nov', currentYear: 3750000, previousYear: 3050000, target: 3500000 },
  { month: 'Dec', currentYear: 4100000, previousYear: 3350000, target: 3800000 },
];

export const salesByChannelData = [
  { channel: 'Direct Sales', revenue: 11400000, deals: 420, conversionRate: '28.4%' },
  { channel: 'Online Portal', revenue: 8600000, deals: 8900, conversionRate: '4.2%' },
  { channel: 'Channel Partners', revenue: 5800000, deals: 210, conversionRate: '34.1%' },
  { channel: 'Inside Sales', revenue: 2600000, deals: 4680, conversionRate: '12.6%' },
];

export const salesRegionalBreakdown = [
  { region: 'West Region', salesRep: 'Ananya Deshmukh', quotaAttainment: '118%', revenue: '₹8.8M', growth: '+21.4%' },
  { region: 'North Region', salesRep: 'Rajesh Khanna', quotaAttainment: '106%', revenue: '₹7.6M', growth: '+14.2%' },
  { region: 'South Region', salesRep: 'Karthik Subramanian', quotaAttainment: '98%', revenue: '₹6.2M', growth: '+8.9%' },
  { region: 'East Region', salesRep: 'Subhashree Roy', quotaAttainment: '91%', revenue: '₹3.9M', growth: '+5.4%' },
  { region: 'Central Region', salesRep: 'Manoj Joshi', quotaAttainment: '86%', revenue: '₹1.9M', growth: '+2.1%' },
];
