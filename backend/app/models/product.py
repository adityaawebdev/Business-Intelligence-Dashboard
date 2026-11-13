from decimal import Decimal
from typing import List, Optional, TYPE_CHECKING
from sqlalchemy import String, Numeric, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.sales import SalesTransaction


class Product(Base, TimestampMixin):
    """
    Products catalog table with unit economics, price, and category classification.
    """
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    product_code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    unit_cost: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    unit_price: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    status: Mapped[str] = mapped_column(String(50), index=True, default="Active", nullable=False)

    # Relationships
    sales: Mapped[List["SalesTransaction"]] = relationship("SalesTransaction", back_populates="product")

    def __repr__(self) -> str:
        return f"<Product id={self.id} code='{self.product_code}' name='{self.name}'>"
