from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.report import Report


class ReportRepository:
    """Repository handling CRUD operations on reports."""

    @staticmethod
    def create_report(
        db: Session,
        name: str,
        report_type: str = "Executive Summary (PDF)",
        description: Optional[str] = None,
        created_by: Optional[int] = None
    ) -> Report:
        report = Report(
            name=name,
            report_type=report_type,
            description=description,
            status="Ready",
            created_by=created_by
        )
        db.add(report)
        db.commit()
        db.refresh(report)
        return report

    @staticmethod
    def get_report(db: Session, report_id: int) -> Optional[Report]:
        return db.scalar(select(Report).where(Report.id == report_id))

    @staticmethod
    def list_reports(db: Session, limit: int = 50) -> List[Report]:
        stmt = select(Report).order_by(Report.id.desc()).limit(limit)
        return list(db.scalars(stmt).all())
