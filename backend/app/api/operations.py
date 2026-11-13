from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.dependencies import get_optional_db
from app.schemas.operations import (
    OperationsSummary,
    RegionalFacilityPerformance,
    OperationalAlert,
    OperationsDailyMetric
)
from app.services.operations_service import OperationsService
from app.utils.responses import APIResponse, success_response

router = APIRouter(prefix="/operations", tags=["Operations & Logistics"])


@router.get(
    "/summary",
    response_model=APIResponse[OperationsSummary],
    summary="Get operational KPIs including fulfillment SLA and lead times"
)
async def get_operations_summary(db: Optional[Session] = Depends(get_optional_db)):
    data = OperationsService.get_summary(db=db)
    return success_response(data=data, message="Operations summary KPIs retrieved successfully.")


@router.get(
    "/performance",
    response_model=APIResponse[List[RegionalFacilityPerformance]],
    summary="Get fulfillment hub SLAs and dispatch speeds"
)
async def get_operations_performance(db: Optional[Session] = Depends(get_optional_db)):
    data = OperationsService.get_performance(db=db)
    return success_response(data=data, message="Regional facility performance retrieved successfully.")


@router.get(
    "/alerts",
    response_model=APIResponse[List[OperationalAlert]],
    summary="Get active logistics and dispatch SLA incident alerts"
)
async def get_operations_alerts(db: Optional[Session] = Depends(get_optional_db)):
    data = OperationsService.get_alerts(db=db)
    return success_response(data=data, message="Operational alerts retrieved successfully.")


@router.get(
    "/trends",
    response_model=APIResponse[List[OperationsDailyMetric]],
    summary="Get daily order intake vs fulfilled throughput and backlogs"
)
async def get_operations_trends(db: Optional[Session] = Depends(get_optional_db)):
    data = OperationsService.get_trends(db=db)
    return success_response(data=data, message="Operations trends retrieved successfully.")
