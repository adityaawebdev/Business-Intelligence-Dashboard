from typing import Dict, Any


class ForecastingService:
    """
    Forecasting Service.
    In later phases, this will trigger Scikit-learn / ARIMA / Prophet pipelines
    to compute predictive demand intervals from PostgreSQL datasets.
    """

    @staticmethod
    def get_summary() -> Dict[str, Any]:
        return {
            "forecastedRevenue": "₹22.8M",
            "expectedGrowth": "+18.4% QoQ",
            "forecastAccuracyPct": 94.6,
            "forecastPeriod": "Next 6 Months (H1)",
            "confidenceLevel": "95%",
            "modelAlgorithm": "Hybrid ARIMA + Prophet ML"
        }

    @staticmethod
    def get_trends() -> Dict[str, Any]:
        return {
            "timeline": [
                {"month": "Jul", "actual": 2180000.0, "forecast": None, "lowerBound": None, "upperBound": None, "isHistorical": True},
                {"month": "Aug", "actual": 2320000.0, "forecast": None, "lowerBound": None, "upperBound": None, "isHistorical": True},
                {"month": "Sep", "actual": 2450000.0, "forecast": None, "lowerBound": None, "upperBound": None, "isHistorical": True},
                {"month": "Oct", "actual": 2600000.0, "forecast": None, "lowerBound": None, "upperBound": None, "isHistorical": True},
                {"month": "Nov", "actual": 2850000.0, "forecast": None, "lowerBound": None, "upperBound": None, "isHistorical": True},
                {"month": "Dec", "actual": 3100000.0, "forecast": 3100000.0, "lowerBound": 3100000.0, "upperBound": 3100000.0, "isHistorical": True},
                {"month": "Jan (F)", "actual": None, "forecast": 3320000.0, "lowerBound": 3150000.0, "upperBound": 3480000.0, "isHistorical": False},
                {"month": "Feb (F)", "actual": None, "forecast": 3540000.0, "lowerBound": 3320000.0, "upperBound": 3750000.0, "isHistorical": False},
                {"month": "Mar (F)", "actual": None, "forecast": 3820000.0, "lowerBound": 3550000.0, "upperBound": 4090000.0, "isHistorical": False},
                {"month": "Apr (F)", "actual": None, "forecast": 3980000.0, "lowerBound": 3680000.0, "upperBound": 4280000.0, "isHistorical": False},
                {"month": "May (F)", "actual": None, "forecast": 4250000.0, "lowerBound": 3910000.0, "upperBound": 4590000.0, "isHistorical": False},
                {"month": "Jun (F)", "actual": None, "forecast": 4510000.0, "lowerBound": 4120000.0, "upperBound": 4900000.0, "isHistorical": False}
            ],
            "scenarios": [
                {
                    "scenario": "Optimistic Case (+25% Market Expansion)",
                    "projectedRevenue": "₹26.4M",
                    "probability": "35%",
                    "assumptions": "Enterprise deal cycle shortens from 45 to 32 days, new SaaS SKU achieves rapid cross-sell adoption."
                },
                {
                    "scenario": "Baseline Case (Current Trajectory)",
                    "projectedRevenue": "₹22.8M",
                    "probability": "55%",
                    "assumptions": "Current run-rate maintained with seasonal lift in Q1 and Q2. Churn remains contained below 4%."
                },
                {
                    "scenario": "Conservative Case (Macro Headwinds)",
                    "projectedRevenue": "₹19.5M",
                    "probability": "10%",
                    "assumptions": "Enterprise procurement slowdown, 15% increase in sales cycle length, hardware inventory delays."
                }
            ]
        }
