from datetime import date
from decimal import Decimal
from sqlalchemy import String, Numeric, Date
from sqlalchemy.orm import Mapped, mapped_column
from app.database.base import Base, TimestampMixin


class OperationsMetric(Base, TimestampMixin):
    """
    Operations and logistics telemetry table supporting facility SLA tracking and throughput.
    """
    __tablename__ = "operations_metrics"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    metric_date: Mapped[date] = mapped_column(Date, index=True, nullable=False)
    region: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    metric_name: Mapped[str] = mapped_column(String(100), nullable=False)
    metric_value: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="Optimal", nullable=False)

    def __repr__(self) -> str:
        return f"<OperationsMetric id={self.id} region='{self.region}' metric='{self.metric_name}'>"
