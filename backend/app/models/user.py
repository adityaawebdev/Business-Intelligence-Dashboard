from typing import List, TYPE_CHECKING
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.dataset import Dataset
    from app.models.report import Report


class User(Base, TimestampMixin):
    """
    Users table for future authentication, authorization, and audit logs.
    """
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    role: Mapped[str] = mapped_column(String(50), default="viewer", nullable=False)  # admin, analyst, viewer
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Relationships
    datasets: Mapped[List["Dataset"]] = relationship("Dataset", back_populates="uploader")
    reports: Mapped[List["Report"]] = relationship("Report", back_populates="creator")

    def __repr__(self) -> str:
        return f"<User id={self.id} email='{self.email}' role='{self.role}'>"
