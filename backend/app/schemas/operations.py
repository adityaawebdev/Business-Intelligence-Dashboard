from typing import List
from pydantic import BaseModel, Field, ConfigDict


class OperationsSummary(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    fulfillment_sla_pct: float = Field(..., alias="fulfillmentSlaPct")
    avg_lead_time_hrs: float = Field(..., alias="avgLeadTimeHrs")
    defect_rate_pct: float = Field(..., alias="defectRatePct")
    inventory_turnover: float = Field(..., alias="inventoryTurnover")
    status_label: str = Field(..., alias="statusLabel")


class OperationsDailyMetric(BaseModel):
    day: str
    received: int
    processed: int
    backlogged: int


class RegionalFacilityPerformance(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    region: str
    capacity: str
    fulfillment_rate: str = Field(..., alias="fulfillmentRate")
    avg_dispatch_time: str = Field(..., alias="avgDispatchTime")
    status: str


class OperationalAlert(BaseModel):
    id: str
    severity: str
    title: str
    message: str
    timestamp: str
