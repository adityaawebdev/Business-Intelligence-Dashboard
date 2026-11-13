from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict


class SalesSummary(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    revenue: str
    raw_revenue: float = Field(..., alias="rawRevenue")
    orders: int
    profit: str
    raw_profit: float = Field(..., alias="rawProfit")
    average_order_value: str = Field(..., alias="averageOrderValue")
    raw_aov: float = Field(..., alias="rawAov")
    growth_rate: float = Field(..., alias="growthRate")
    target_attainment_pct: float = Field(..., alias="targetAttainmentPct")


class SalesTrendMonth(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    month: str
    current_year: float = Field(..., alias="currentYear")
    previous_year: float = Field(..., alias="previousYear")
    target: float


class SalesRegionItem(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    region: str
    sales_rep: str = Field(..., alias="salesRep")
    quota_attainment: str = Field(..., alias="quotaAttainment")
    revenue: str
    growth: str


class SalesChannelCategory(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    channel: str
    revenue: float
    deals: int
    conversion_rate: str = Field(..., alias="conversionRate")


class SalesTopProduct(BaseModel):
    product: str
    category: str
    revenue: str
    orders: int
    margin: str
    status: str
