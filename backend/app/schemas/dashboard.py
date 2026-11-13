from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict


class KpiMetric(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    title: str
    value: str
    raw_numeric_value: float = Field(..., alias="rawNumericValue")
    change: float
    is_positive: bool = Field(..., alias="isPositive")
    description: str
    badge_text: str = Field(..., alias="badgeText")
    sparkline: Optional[List[float]] = None


class MonthlyFinancialData(BaseModel):
    month: str
    revenue: float
    profit: float
    orders: int


class RegionalSalesData(BaseModel):
    region: str
    amount: float
    orders: int
    share: int


class CategorySalesData(BaseModel):
    name: str
    value: float
    percentage: int
    color: str


class ProductItem(BaseModel):
    id: str
    product: str
    category: str
    revenue: str
    orders: int
    growth: str
    margin: str
    status: str


class CustomerItem(BaseModel):
    id: str
    customer: str
    orders: int
    revenue: str
    growth: str
    segment: str


class CustomerGrowthMonth(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    month: str
    active: int
    new_customers: int = Field(..., alias="newCustomers")


class BusinessInsight(BaseModel):
    id: str
    type: str
    category: str
    title: str
    description: str
    tag: str
    impact: str


class ActivityLog(BaseModel):
    id: str
    event: str
    details: str
    user: str
    time: str
    type: str
    status: str


class DashboardOverviewResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    kpis: List[KpiMetric]
    revenue_growth: float = Field(..., alias="revenueGrowth")
    profit_growth: float = Field(..., alias="profitGrowth")
    orders_growth: float = Field(..., alias="ordersGrowth")
    revenue_trend: List[MonthlyFinancialData] = Field(..., alias="revenueTrend")
    sales_by_region: List[RegionalSalesData] = Field(..., alias="salesByRegion")
    sales_by_category: List[CategorySalesData] = Field(..., alias="salesByCategory")
    top_products: List[ProductItem] = Field(..., alias="topProducts")
    top_customers: List[CustomerItem] = Field(..., alias="topCustomers")
    customer_growth_trend: List[CustomerGrowthMonth] = Field(..., alias="customerGrowthTrend")
    business_insights: List[BusinessInsight] = Field(..., alias="businessInsights")
    recent_activity: List[ActivityLog] = Field(..., alias="recentActivity")
