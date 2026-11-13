from typing import Dict, List, Any, Optional
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.reports import ReportCreateRequest
from app.repositories.report_repository import ReportRepository


class ReportService:
    _reports: List[Dict[str, Any]] = [
        {
            "id": "rep-001",
            "name": "Executive Board Performance Briefing",
            "type": "Executive Summary (PDF)",
            "frequency": "Monthly",
            "createdBy": "Vikram Mehta",
            "createdDate": "2026-11-10 10:00",
            "fileSize": "4.8 MB",
            "status": "Ready",
            "downloadUrl": "/api/v1/reports/rep-001/download"
        },
        {
            "id": "rep-002",
            "name": "Consolidated P&L & Regional EBITDA Analysis",
            "type": "Financial Audit (XLSX)",
            "frequency": "Quarterly",
            "createdBy": "Rohit Sen",
            "createdDate": "2026-11-08 15:30",
            "fileSize": "12.4 MB",
            "status": "Ready",
            "downloadUrl": "/api/v1/reports/rep-002/download"
        },
        {
            "id": "rep-003",
            "name": "Customer Cohort Retention & Churn Deepdive",
            "type": "Customer Analytics (PDF)",
            "frequency": "Bi-Weekly",
            "createdBy": "Priya Sharma",
            "createdDate": "2026-11-05 09:15",
            "fileSize": "6.1 MB",
            "status": "Ready",
            "downloadUrl": "/api/v1/reports/rep-003/download"
        },
        {
            "id": "rep-004",
            "name": "High-Volume SKU Margin Anomaly Diagnostics",
            "type": "Product Diagnostics (CSV)",
            "frequency": "Ad-hoc",
            "createdBy": "Aarav Patel",
            "createdDate": "2026-11-03 14:45",
            "fileSize": "1.9 MB",
            "status": "Scheduled",
            "downloadUrl": None
        },
        {
            "id": "rep-005",
            "name": "Logistics Fulfillment SLA & Warehouse Velocity",
            "type": "Operations Brief (PDF)",
            "frequency": "Weekly",
            "createdBy": "Karthik Subramanian",
            "createdDate": "2026-10-31 18:00",
            "fileSize": "3.4 MB",
            "status": "Ready",
            "downloadUrl": "/api/v1/reports/rep-005/download"
        }
    ]

    @classmethod
    def get_all(cls, db: Optional[Session] = None) -> List[Dict[str, Any]]:
        if db:
            try:
                db_reports = ReportRepository.list_reports(db)
                if db_reports:
                    return [
                        {
                            "id": f"rep-{r.id:03d}",
                            "name": r.name,
                            "type": r.report_type or "Executive Summary (PDF)",
                            "frequency": "Monthly",
                            "createdBy": "System Admin",
                            "createdDate": r.created_at.strftime("%Y-%m-%d %H:%M") if getattr(r, "created_at", None) else "Recently",
                            "fileSize": "3.2 MB",
                            "status": r.status or "Ready",
                            "downloadUrl": f"/api/v1/reports/rep-{r.id:03d}/download"
                        }
                        for r in db_reports
                    ]
            except Exception:
                pass
        return cls._reports

    @classmethod
    def get_by_id(cls, report_id: str, db: Optional[Session] = None) -> Dict[str, Any]:
        all_reps = cls.get_all(db)
        for rep in all_reps:
            if rep["id"] == report_id:
                return rep
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Report with ID '{report_id}' was not found."
        )

    @classmethod
    def create_report(cls, request: ReportCreateRequest, db: Optional[Session] = None) -> Dict[str, Any]:
        if db:
            try:
                r = ReportRepository.create_report(
                    db=db,
                    name=request.name,
                    report_type=request.type,
                    description=f"Generated report: {request.name}"
                )
                return {
                    "id": f"rep-{r.id:03d}",
                    "name": r.name,
                    "type": r.report_type,
                    "frequency": request.frequency or "Ad-hoc",
                    "createdBy": "Admin User",
                    "createdDate": "Just now",
                    "fileSize": "2.8 MB (Compiling)",
                    "status": "Ready",
                    "downloadUrl": f"/api/v1/reports/rep-{r.id:03d}/download"
                }
            except Exception:
                pass

        new_id = f"rep-{len(cls._reports) + 1:03d}"
        new_report = {
            "id": new_id,
            "name": request.name,
            "type": request.type,
            "frequency": request.frequency or "Ad-hoc",
            "createdBy": "Admin User",
            "createdDate": "Just now",
            "fileSize": "2.8 MB (Compiling)",
            "status": "Ready",
            "downloadUrl": f"/api/v1/reports/{new_id}/download"
        }
        cls._reports.insert(0, new_report)
        return new_report
