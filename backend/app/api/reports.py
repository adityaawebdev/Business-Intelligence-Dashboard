from typing import List, Optional
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database.dependencies import get_optional_db
from app.schemas.reports import ReportItem, ReportCreateRequest, ReportDetail
from app.services.report_service import ReportService
from app.utils.responses import APIResponse, success_response

router = APIRouter(prefix="/reports", tags=["BI Reports"])


@router.get(
    "",
    response_model=APIResponse[List[ReportItem]],
    summary="Get listing of generated reports and scheduled dispatches"
)
async def get_reports(db: Optional[Session] = Depends(get_optional_db)):
    reports = ReportService.get_all(db=db)
    return success_response(data=reports, message="Reports list retrieved successfully.")


@router.get(
    "/{report_id}",
    response_model=APIResponse[ReportDetail],
    summary="Get specific report details and download links"
)
async def get_report_by_id(report_id: str, db: Optional[Session] = Depends(get_optional_db)):
    report = ReportService.get_by_id(report_id, db=db)
    return success_response(data=report, message=f"Report '{report_id}' retrieved successfully.")


@router.post(
    "",
    response_model=APIResponse[ReportDetail],
    status_code=status.HTTP_201_CREATED,
    summary="Generate or schedule a new business intelligence report"
)
async def create_report(request: ReportCreateRequest, db: Optional[Session] = Depends(get_optional_db)):
    new_report = ReportService.create_report(request, db=db)
    return success_response(
        data=new_report,
        message="BI report job registered and initialized successfully."
    )
