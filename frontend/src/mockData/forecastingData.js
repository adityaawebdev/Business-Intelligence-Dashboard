/**
 * Centralized Mock Data: Forecasting Dashboard
 * Visual presentation for future ML/Pandas model projections.
 */

export const forecastingKpis = [
  {
    id: 'fc-accuracy',
    title: 'Model Forecast Accuracy',
    value: '94.6%',
    change: 2.1,
    isPositive: true,
    description: 'Mean Absolute Error: 3.4%',
    badgeText: 'High Confidence'
  },
  {
    id: 'fc-expected-growth',
    title: 'Expected Next Quarter Growth',
    value: '+18.4%',
    change: 3.8,
    isPositive: true,
    description: 'projected trajectory',
    badgeText: '+18.4% QoQ'
  },
  {
    id: 'fc-projected-revenue',
    title: 'Projected Next 6M Revenue',
    value: '₹22.8M',
    change: 16.5,
    isPositive: true,
    description: '95% confidence interval bound',
    badgeText: '₹21.4M - ₹24.2M'
  },
  {
    id: 'fc-churn-risk',
    title: 'Forecasted Account Retention',
    value: '96.2%',
    change: 1.4,
    isPositive: true,
    description: 'projected customer stability',
    badgeText: 'Stable'
  }
];

// Historical months + Forecasted months
// Distinguish with separate properties or confidence bounds
export const historicalVsForecastData = [
  { month: 'Jul', actual: 2180000, forecast: null, lowerBound: null, upperBound: null, isHistorical: true },
  { month: 'Aug', actual: 2320000, forecast: null, lowerBound: null, upperBound: null, isHistorical: true },
  { month: 'Sep', actual: 2450000, forecast: null, lowerBound: null, upperBound: null, isHistorical: true },
  { month: 'Oct', actual: 2600000, forecast: null, lowerBound: null, upperBound: null, isHistorical: true },
  { month: 'Nov', actual: 2850000, forecast: null, lowerBound: null, upperBound: null, isHistorical: true },
  { month: 'Dec', actual: 3100000, forecast: 3100000, lowerBound: 3100000, upperBound: 3100000, isHistorical: true }, // Transition point
  { month: 'Jan (F)', actual: null, forecast: 3320000, lowerBound: 3150000, upperBound: 3480000, isHistorical: false },
  { month: 'Feb (F)', actual: null, forecast: 3540000, lowerBound: 3320000, upperBound: 3750000, isHistorical: false },
  { month: 'Mar (F)', actual: null, forecast: 3820000, lowerBound: 3550000, upperBound: 4090000, isHistorical: false },
  { month: 'Apr (F)', actual: null, forecast: 3980000, lowerBound: 3680000, upperBound: 4280000, isHistorical: false },
  { month: 'May (F)', actual: null, forecast: 4250000, lowerBound: 3910000, upperBound: 4590000, isHistorical: false },
  { month: 'Jun (F)', actual: null, forecast: 4510000, lowerBound: 4120000, upperBound: 4900000, isHistorical: false },
];

export const forecastScenarios = [
  {
    scenario: 'Optimistic Case (+25% Market Expansion)',
    projectedRevenue: '₹26.4M',
    probability: '35%',
    assumptions: 'Enterprise deal cycle shortens from 45 to 32 days, new SaaS SKU achieves rapid cross-sell adoption.'
  },
  {
    scenario: 'Baseline Case (Current Trajectory)',
    projectedRevenue: '₹22.8M',
    probability: '55%',
    assumptions: 'Current run-rate maintained with seasonal lift in Q1 and Q2. Churn remains contained below 4%.'
  },
  {
    scenario: 'Conservative Case (Macro Headwinds)',
    projectedRevenue: '₹19.5M',
    probability: '10%',
    assumptions: 'Enterprise procurement slowdown, 15% increase in sales cycle length, hardware inventory delays.'
  }
];
