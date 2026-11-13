/**
 * Centralized Mock Data: Product Analytics
 */

export const productKpis = [
  {
    id: 'prod-total',
    title: 'Total Active Products',
    value: '148',
    change: 6.5,
    isPositive: true,
    description: '12 new SKUs launched',
    badgeText: '+6.5%'
  },
  {
    id: 'prod-best',
    title: 'Best Performing SKU',
    value: 'Cloud Suite Pro',
    subvalue: '452 units (MoM +24.5%)',
    change: 24.5,
    isPositive: true,
    description: 'highest growth velocity',
    badgeText: 'Top Performer'
  },
  {
    id: 'prod-high-rev',
    title: 'Highest Revenue SKU',
    value: '₹5.42M',
    subvalue: 'Cloud Suite Pro',
    change: 18.2,
    isPositive: true,
    description: '22.1% of portfolio revenue',
    badgeText: '+18.2%'
  },
  {
    id: 'prod-high-margin',
    title: 'Highest Margin SKU',
    value: '81.0%',
    subvalue: 'Unified AI Add-on',
    change: 5.4,
    isPositive: true,
    description: 'gross margin efficiency',
    badgeText: '+5.4%'
  }
];

export const productCategoryPerformance = [
  { category: 'Software', revenue: 9800000, margin: 76, volume: 4820 },
  { category: 'Electronics', revenue: 7600000, margin: 44, volume: 3200 },
  { category: 'Services', revenue: 5400000, margin: 62, volume: 1450 },
  { category: 'Accessories', revenue: 3100000, margin: 31, volume: 6890 },
  { category: 'Other', revenue: 1600000, margin: 28, volume: 1100 },
];

export const productSalesTrend = [
  { month: 'Jan', software: 680000, electronics: 560000, services: 410000, accessories: 240000 },
  { month: 'Feb', software: 720000, electronics: 590000, services: 430000, accessories: 250000 },
  { month: 'Mar', software: 790000, electronics: 630000, services: 450000, accessories: 260000 },
  { month: 'Apr', software: 770000, electronics: 610000, services: 440000, accessories: 255000 },
  { month: 'May', software: 850000, electronics: 670000, services: 470000, accessories: 270000 },
  { month: 'Jun', software: 910000, electronics: 710000, services: 500000, accessories: 285000 },
  { month: 'Jul', software: 890000, electronics: 690000, services: 490000, accessories: 280000 },
  { month: 'Aug', software: 950000, electronics: 740000, services: 520000, accessories: 295000 },
  { month: 'Sep', software: 1020000, electronics: 780000, services: 550000, accessories: 310000 },
  { month: 'Oct', software: 1100000, electronics: 820000, services: 590000, accessories: 330000 },
  { month: 'Nov', software: 1190000, electronics: 890000, services: 640000, accessories: 360000 },
  { month: 'Dec', software: 1280000, electronics: 960000, services: 710000, accessories: 390000 },
];

export const fullProductList = [
  {
    id: 'SKU-001',
    name: 'Enterprise Cloud Suite Pro',
    category: 'Software',
    price: '₹12,000 / seat',
    unitsSold: 452,
    revenue: '₹5,420,000',
    margin: '72%',
    stock: 'Unlimited (SaaS)',
    status: 'High'
  },
  {
    id: 'SKU-002',
    name: 'SmartEdge Server Gateway v2',
    category: 'Electronics',
    price: '₹20,000 / unit',
    unitsSold: 209,
    revenue: '₹4,180,000',
    margin: '46%',
    stock: '142 units in warehouse',
    status: 'High'
  },
  {
    id: 'SKU-003',
    name: 'Annual Managed DevOps Support',
    category: 'Services',
    price: '₹25,000 / contract',
    unitsSold: 146,
    revenue: '₹3,650,000',
    margin: '58%',
    stock: 'Service Capacity: 88%',
    status: 'Stable'
  },
  {
    id: 'SKU-004',
    name: 'Industrial IoT Sensor Pack',
    category: 'Electronics',
    price: '₹4,000 / pack',
    unitsSold: 710,
    revenue: '₹2,840,000',
    margin: '38%',
    stock: '580 packs in warehouse',
    status: 'Stable'
  },
  {
    id: 'SKU-005',
    name: 'Unified Analytics AI Add-on',
    category: 'Software',
    price: '₹4,000 / license',
    unitsSold: 580,
    revenue: '₹2,320,000',
    margin: '81%',
    stock: 'Unlimited (SaaS)',
    status: 'High'
  },
  {
    id: 'SKU-006',
    name: 'High-Density Rack Mount Accessories',
    category: 'Accessories',
    price: '₹1,500 / kit',
    unitsSold: 966,
    revenue: '₹1,450,000',
    margin: '29%',
    stock: '1,240 kits in warehouse',
    status: 'Low'
  },
  {
    id: 'SKU-007',
    name: 'Consulting Architecture Audit',
    category: 'Services',
    price: '₹20,000 / audit',
    unitsSold: 62,
    revenue: '₹1,240,000',
    margin: '64%',
    stock: 'Available on-demand',
    status: 'Stable'
  },
  {
    id: 'SKU-008',
    name: 'Legacy Fiber Adapter Kit',
    category: 'Accessories',
    price: '₹2,000 / kit',
    unitsSold: 420,
    revenue: '₹840,000',
    margin: '22%',
    stock: '110 kits (Deprecating)',
    status: 'Low'
  }
];
