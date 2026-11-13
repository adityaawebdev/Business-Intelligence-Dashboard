from typing import List
from pydantic import BaseModel, Field, ConfigDict


class FinancialSummary(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    revenue: str
    raw_revenue: float = Field(..., alias="rawRevenue")
    profit: str
    raw_profit: float = Field(..., alias="rawProfit")
    expenses: str
    raw_expenses: float = Field(..., alias="rawExpenses")
    gross_margin_pct: float = Field(..., alias="grossMarginPct")
    net_margin_pct: float = Field(..., alias="netMarginPct")


class FinancialTrendMonth(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    month: str
    revenue: float
    expenses: float
    net_margin: float = Field(..., alias="netMargin")


class ExpenseCategoryItem(BaseModel):
    name: str
    value: float
    percentage: int
    color: str


class ProfitabilityMetric(BaseModel):
    metric: str
    q1: str
    q2: str
    q3: str
    q4: str
    trend: str
