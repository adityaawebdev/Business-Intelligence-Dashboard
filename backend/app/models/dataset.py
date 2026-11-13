from datetime import datetime
from typing import Optional, TYPE_CHECKING
from sqlalchemy import String, Integer, BigInteger, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.user import User


class Dataset(Base, TimestampMixin):
    """
    Datasets table storing uploaded tabular files (CSV, XLSX, XLS) and ETL processing states.
    """
    __tablename__ = "datasets"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    original_filename: Mapped[str] = mapped_column(String(255), nullable=False)
    file_type: Mapped[str] = mapped_column(String(20), nullable=False)  # csv, xlsx, xls
    file_size: Mapped[int] = mapped_column(BigInteger, default=0, nullable=False)
    record_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="uploaded", index=True, nullable=False)  # uploaded, processing, processed, failed
    uploaded_by: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"), index=True, nullable=True)
    uploaded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    processed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    uploader: Mapped[Optional["User"]] = relationship("User", back_populates="datasets")

    def __repr__(self) -> str:
        return f"<Dataset id={self.id} name='{self.name}' status='{self.status}'>"
