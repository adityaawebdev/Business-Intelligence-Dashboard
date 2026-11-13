from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict


class ForecastingSummary(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    forecasted_revenue: str = Field(..., alias="forecastedRevenue")
    expected_growth: str = Field(..., alias="expectedGrowth")
    forecast_accuracy_pct: float = Field(..., alias="forecastAccuracyPct")
    forecast_period: str = Field(..., alias="forecastPeriod")
    confidence_level: str = Field(..., alias="confidenceLevel")
    model_algorithm: str = Field(..., alias="modelAlgorithm")


class ForecastTimelinePoint(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    month: str
    actual: Optional[float] = None
    forecast: Optional[float] = None
    lower_bound: Optional[float] = Field(None, alias="lowerBound")
    upper_bound: Optional[float] = Field(None, alias="upperBound")
    is_historical: bool = Field(..., alias="isHistorical")


class ForecastScenario(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    scenario: str
    projected_revenue: str = Field(..., alias="projectedRevenue")
    probability: str
    assumptions: str


class ForecastingTrendsResponse(BaseModel):
    timeline: List[ForecastTimelinePoint]
    scenarios: List[ForecastScenario]
