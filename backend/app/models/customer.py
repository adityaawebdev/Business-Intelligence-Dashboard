from datetime import date
from typing import List, Optional, TYPE_CHECKING
from sqlalchemy import String, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.sales import SalesTransaction


class Customer(Base, TimestampMixin):
    """
    Customers entity table tracking accounts, segments, and operational regions.
    """
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    customer_code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    phone: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    region: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    segment: Mapped[str] = mapped_column(String(50), index=True, nullable=False)  # Enterprise, Business, Retail, SMB
    registration_date: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String(50), index=True, default="Active", nullable=False)

    # Relationships
    sales: Mapped[List["SalesTransaction"]] = relationship("SalesTransaction", back_populates="customer")

    def __repr__(self) -> str:
        return f"<Customer id={self.id} code='{self.customer_code}' name='{self.name}'>"
