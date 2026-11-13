from typing import List
from pydantic import BaseModel, Field, ConfigDict


class CustomerSummary(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    total_customers: int = Field(..., alias="totalCustomers")
    new_customers: int = Field(..., alias="newCustomers")
    returning_rate_pct: float = Field(..., alias="returningRatePct")
    customer_growth_rate: float = Field(..., alias="customerGrowthRate")
    churn_rate_pct: float = Field(..., alias="churnRatePct")


class CustomerAcquisitionMonth(BaseModel):
    month: str
    organic: int
    paid: int
    referral: int


class CustomerTopAccount(BaseModel):
    id: str
    customer: str
    segment: str
    orders: int
    revenue: str
    growth: str


class CustomerSegmentItem(BaseModel):
    name: str
    count: int
    value: int
    color: str
