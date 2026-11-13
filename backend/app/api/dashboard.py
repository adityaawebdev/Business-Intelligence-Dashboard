from typing import Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.dependencies import get_optional_db
from app.schemas.dashboard import DashboardOverviewResponse
from app.services.dashboard_service import DashboardService
from app.utils.responses import APIResponse, success_response

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get(
    "/overview",
    response_model=APIResponse[DashboardOverviewResponse],
    summary="Get consolidated dashboard overview metrics and telemetry"
)
async def get_dashboard_overview(db: Optional[Session] = Depends(get_optional_db)):
    data = DashboardService.get_overview_data(db=db)
    return success_response(
        data=data,
        message="Dashboard overview metrics retrieved successfully."
    )
