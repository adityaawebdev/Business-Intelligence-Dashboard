from typing import Optional, TYPE_CHECKING
from sqlalchemy import String, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.user import User


class Report(Base, TimestampMixin):
    """
    Generated and scheduled BI reports registry table.
    """
    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    report_type: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="Ready", nullable=False)
    created_by: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"), index=True, nullable=True)

    # Relationships
    creator: Mapped[Optional["User"]] = relationship("User", back_populates="reports")

    def __repr__(self) -> str:
        return f"<Report id={self.id} name='{self.name}' status='{self.status}'>"
