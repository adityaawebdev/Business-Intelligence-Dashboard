/**
 * Centralized Mock Data: Customer Analytics
 */

export const customerKpis = [
  {
    id: 'cust-total',
    title: 'Total Active Customers',
    value: '4,892',
    change: 18.6,
    isPositive: true,
    description: 'accounts active in past 90d',
    badgeText: '+18.6%'
  },
  {
    id: 'cust-new',
    title: 'New Customers Acquired',
    value: '642',
    change: 24.1,
    isPositive: true,
    description: 'in current period',
    badgeText: '+24.1%'
  },
  {
    id: 'cust-returning',
    title: 'Returning Rate',
    value: '84.3%',
    change: 3.2,
    isPositive: true,
    description: '30-day cohort retention',
    badgeText: '+3.2%'
  },
  {
    id: 'cust-growth',
    title: 'Net Customer Growth',
    value: '+12.4%',
    change: 4.8,
    isPositive: true,
    description: 'net churn vs additions',
    badgeText: '+4.8%'
  }
];

export const customerAcquisitionTrend = [
  { month: 'Jan', organic: 140, paid: 95, referral: 45 },
  { month: 'Feb', organic: 165, paid: 110, referral: 55 },
  { month: 'Mar', organic: 190, paid: 125, referral: 70 },
  { month: 'Apr', organic: 180, paid: 115, referral: 65 },
  { month: 'May', organic: 215, paid: 140, referral: 85 },
  { month: 'Jun', organic: 240, paid: 160, referral: 95 },
  { month: 'Jul', organic: 235, paid: 155, referral: 90 },
  { month: 'Aug', organic: 260, paid: 175, referral: 105 },
  { month: 'Sep', organic: 285, paid: 190, referral: 115 },
  { month: 'Oct', organic: 310, paid: 205, referral: 125 },
  { month: 'Nov', organic: 340, paid: 220, referral: 140 },
  { month: 'Dec', organic: 375, paid: 245, referral: 160 },
];

export const customerSegmentation = [
  { name: 'Enterprise (> ₹1M/yr)', count: 184, value: 52, color: '#4f46e5' },
  { name: 'Mid-Market (₹250k - ₹1M)', count: 620, value: 28, color: '#06b6d4' },
  { name: 'SMB / Growth (< ₹250k)', count: 2840, value: 14, color: '#10b981' },
  { name: 'Starter / Trial', count: 1248, value: 6, color: '#f59e0b' }
];

export const customerCohortRetention = [
  { cohort: 'Cohort Q1', month1: 100, month2: 92, month3: 88, month4: 85, month5: 84 },
  { cohort: 'Cohort Q2', month1: 100, month2: 94, month3: 90, month4: 87, month5: 86 },
  { cohort: 'Cohort Q3', month1: 100, month2: 95, month3: 91, month4: 89, month5: 88 },
  { cohort: 'Cohort Q4', month1: 100, month2: 96, month3: 93, month4: 91, month5: 90 },
];

export const customerRevenueDistribution = [
  { bracket: '< ₹10k', count: 1820, percentage: 37 },
  { bracket: '₹10k - ₹50k', count: 1430, percentage: 29 },
  { bracket: '₹50k - ₹200k', count: 980, percentage: 20 },
  { bracket: '₹200k - ₹1M', count: 480, percentage: 10 },
  { bracket: '> ₹1M', count: 182, percentage: 4 },
];
