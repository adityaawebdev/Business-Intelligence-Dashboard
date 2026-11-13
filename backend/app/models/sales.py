from datetime import date
from decimal import Decimal
from typing import TYPE_CHECKING
from sqlalchemy import String, Integer, Numeric, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.customer import Customer
    from app.models.product import Product


class SalesTransaction(Base, TimestampMixin):
    """
    Sales transaction table capturing orders, line items, revenues, and unit margins.
    Uses exact NUMERIC precision for financial values.
    """
    __tablename__ = "sales_transactions"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    transaction_date: Mapped[date] = mapped_column(Date, index=True, nullable=False)
    order_number: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"), index=True, nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), index=True, nullable=False)
    region: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    unit_price: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    revenue: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False)
    cost: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False)
    profit: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False)

    # Relationships
    customer: Mapped["Customer"] = relationship("Customer", back_populates="sales")
    product: Mapped["Product"] = relationship("Product", back_populates="sales")

    def __repr__(self) -> str:
        return f"<SalesTransaction id={self.id} order='{self.order_number}' rev={self.revenue}>"
