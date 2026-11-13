/**
 * Centralized Mock Data: Main Overview Dashboard
 * Structured to cleanly interface with future Python FastAPI backend schemas.
 */

export const dashboardKpis = [
  {
    id: 'kpi-revenue',
    title: 'Total Revenue',
    value: '₹24.5M',
    rawNumericValue: 24500000,
    change: 12.8,
    isPositive: true,
    description: 'vs previous period',
    badgeText: '+12.8%',
    sparkline: [21.2, 22.0, 21.8, 23.4, 24.1, 24.5]
  },
  {
    id: 'kpi-profit',
    title: 'Total Profit',
    value: '₹6.8M',
    rawNumericValue: 6800000,
    change: 8.4,
    isPositive: true,
    description: 'vs previous period',
    badgeText: '+8.4%',
    sparkline: [5.8, 6.0, 5.9, 6.3, 6.5, 6.8]
  },
  {
    id: 'kpi-orders',
    title: 'Total Orders',
    value: '12,458',
    rawNumericValue: 12458,
    change: 14.2,
    isPositive: true,
    description: 'vs previous period',
    badgeText: '+14.2%',
    sparkline: [9800, 10400, 11100, 11600, 12050, 12458]
  },
  {
    id: 'kpi-aov',
    title: 'Average Order Value',
    value: '₹1,967',
    rawNumericValue: 1967,
    change: -2.1,
    isPositive: false,
    description: 'vs previous period',
    badgeText: '-2.1%',
    sparkline: [2050, 2020, 2000, 1980, 1975, 1967]
  }
];

export const revenueOverviewData = [
  { month: 'Jan', revenue: 1650000, profit: 460000, orders: 840 },
  { month: 'Feb', revenue: 1780000, profit: 510000, orders: 910 },
  { month: 'Mar', revenue: 1920000, profit: 540000, orders: 980 },
  { month: 'Apr', revenue: 1850000, profit: 490000, orders: 940 },
  { month: 'May', revenue: 2100000, profit: 590000, orders: 1060 },
  { month: 'Jun', revenue: 2250000, profit: 640000, orders: 1140 },
  { month: 'Jul', revenue: 2180000, profit: 610000, orders: 1100 },
  { month: 'Aug', revenue: 2320000, profit: 660000, orders: 1180 },
  { month: 'Sep', revenue: 2450000, profit: 710000, orders: 1240 },
  { month: 'Oct', revenue: 2600000, profit: 750000, orders: 1310 },
  { month: 'Nov', revenue: 2850000, profit: 820000, orders: 1450 },
  { month: 'Dec', revenue: 3100000, profit: 910000, orders: 1580 },
];

export const salesByRegionData = [
  { region: 'North', amount: 6850000, orders: 3480, share: 28 },
  { region: 'West', amount: 7600000, orders: 3820, share: 31 },
  { region: 'South', amount: 5120000, orders: 2610, share: 21 },
  { region: 'East', amount: 3180000, orders: 1620, share: 13 },
  { region: 'Central', amount: 1750000, orders: 928, share: 7 },
];

export const salesByCategoryData = [
  { name: 'Electronics', value: 8820000, percentage: 36, color: '#4f46e5' },
  { name: 'Software', value: 6615000, percentage: 27, color: '#06b6d4' },
  { name: 'Services', value: 4410000, percentage: 18, color: '#10b981' },
  { name: 'Accessories', value: 2940000, percentage: 12, color: '#f59e0b' },
  { name: 'Other', value: 1715000, percentage: 7, color: '#8b5cf6' },
];

export const topProductsData = [
  {
    id: 'prod-001',
    product: 'Enterprise Cloud Suite Pro',
    category: 'Software',
    revenue: '₹5,420,000',
    orders: 452,
    growth: '+24.5%',
    margin: '72%',
    status: 'High'
  },
  {
    id: 'prod-002',
    product: 'SmartEdge Server Gateway v2',
    category: 'Electronics',
    revenue: '₹4,180,000',
    orders: 209,
    growth: '+18.2%',
    margin: '46%',
    status: 'High'
  },
  {
    id: 'prod-003',
    product: 'Annual Managed DevOps Support',
    category: 'Services',
    revenue: '₹3,650,000',
    orders: 146,
    growth: '+8.7%',
    margin: '58%',
    status: 'Stable'
  },
  {
    id: 'prod-004',
    product: 'Industrial IoT Sensor Pack',
    category: 'Electronics',
    revenue: '₹2,840,000',
    orders: 710,
    growth: '+14.1%',
    margin: '38%',
    status: 'Stable'
  },
  {
    id: 'prod-005',
    product: 'Unified Analytics AI Add-on',
    category: 'Software',
    revenue: '₹2,320,000',
    orders: 580,
    growth: '+31.4%',
    margin: '81%',
    status: 'High'
  },
  {
    id: 'prod-006',
    product: 'High-Density Rack Mount Accessories',
    category: 'Accessories',
    revenue: '₹1,450,000',
    orders: 966,
    growth: '-3.8%',
    margin: '29%',
    status: 'Low'
  },
  {
    id: 'prod-007',
    product: 'Consulting Architecture Audit',
    category: 'Services',
    revenue: '₹1,240,000',
    orders: 62,
    growth: '+2.1%',
    margin: '64%',
    status: 'Stable'
  },
  {
    id: 'prod-008',
    product: 'Legacy Fiber Adapter Kit',
    category: 'Accessories',
    revenue: '₹840,000',
    orders: 420,
    growth: '-8.5%',
    margin: '22%',
    status: 'Low'
  }
];

export const topCustomersData = [
  {
    id: 'cust-101',
    customer: 'Apex Global Logistics Pvt Ltd',
    orders: 48,
    revenue: '₹1,840,000',
    growth: '+22.4%',
    segment: 'Enterprise'
  },
  {
    id: 'cust-102',
    customer: 'Zenith FinTech Systems',
    orders: 34,
    revenue: '₹1,420,000',
    growth: '+18.1%',
    segment: 'Enterprise'
  },
  {
    id: 'cust-103',
    customer: 'Nexus Telecommunications Ltd',
    orders: 62,
    revenue: '₹1,280,000',
    growth: '+9.5%',
    segment: 'Mid-Market'
  },
  {
    id: 'cust-104',
    customer: 'Infinitum Retail India',
    orders: 84,
    revenue: '₹950,000',
    growth: '+31.0%',
    segment: 'Strategic'
  },
  {
    id: 'cust-105',
    customer: 'Quantum Health Networks',
    orders: 26,
    revenue: '₹810,000',
    growth: '+5.2%',
    segment: 'Mid-Market'
  }
];

export const customerGrowthTrendData = [
  { month: 'Jan', active: 320, newCustomers: 45 },
  { month: 'Feb', active: 348, newCustomers: 52 },
  { month: 'Mar', active: 382, newCustomers: 64 },
  { month: 'Apr', active: 415, newCustomers: 58 },
  { month: 'May', active: 460, newCustomers: 72 },
  { month: 'Jun', active: 510, newCustomers: 85 },
];

export const businessInsightsData = [
  {
    id: 'insight-1',
    type: 'positive',
    category: 'Revenue Growth',
    title: 'Accelerated Q4 Revenue Trajectory',
    description: 'Revenue increased by 12.8% compared with the previous period, driven primarily by enterprise software recurring licenses.',
    tag: 'Revenue',
    impact: '+₹2.8M potential'
  },
  {
    id: 'insight-2',
    type: 'opportunity',
    category: 'Regional Opportunity',
    title: 'West Region Showing Strong Surge',
    description: 'The West region has shown strong recent growth (+31% share of total revenue). Expanding localized sales engineering can capture unmet demand.',
    tag: 'Regional',
    impact: 'High Growth'
  },
  {
    id: 'insight-3',
    type: 'product',
    category: 'Product Performance',
    title: 'Enterprise Cloud Suite Pro Momentum',
    description: 'Product X is currently one of the fastest-growing products with +24.5% QoQ expansion and industry-leading 72% gross margin.',
    tag: 'Products',
    impact: 'Top Performer'
  },
  {
    id: 'insight-4',
    type: 'warning',
    category: 'Margin Alert',
    title: 'Hardware Accessory Margins Slipping',
    description: 'Legacy hardware accessories contracted by 8.5% with margins down to 22%. Consider bundling with high-margin managed service agreements.',
    tag: 'Operations',
    impact: 'Action Required'
  }
];

export const recentActivityData = [
  {
    id: 'act-01',
    event: 'Dataset uploaded',
    details: 'Q4_Consolidated_Sales_v3.csv (42,500 records)',
    user: 'Priya Sharma (Data Analyst)',
    time: '12 mins ago',
    type: 'upload',
    status: 'Completed'
  },
  {
    id: 'act-02',
    event: 'Sales dataset processed',
    details: 'Pandas ETL completed automated anomaly filtering and deduplication.',
    user: 'System Worker (Pipeline #402)',
    time: '45 mins ago',
    type: 'system',
    status: 'Processed'
  },
  {
    id: 'act-03',
    event: 'Dashboard report generated',
    details: 'Executive Monthly Performance Brief (PDF & XLSX exported).',
    user: 'Vikram Mehta (VP Operations)',
    time: '2 hours ago',
    type: 'report',
    status: 'Generated'
  },
  {
    id: 'act-04',
    event: 'New user added',
    details: 'Aarav Patel assigned role "Senior Business Intelligence Analyst".',
    user: 'Admin (System)',
    time: 'Yesterday at 4:30 PM',
    type: 'user',
    status: 'Active'
  },
  {
    id: 'act-05',
    event: 'Monthly report exported',
    details: 'Financial Ledger & EBITDA reconciliation package dispatched.',
    user: 'Rohit Sen (Finance Controller)',
    time: '2 days ago',
    type: 'export',
    status: 'Dispatched'
  }
];
