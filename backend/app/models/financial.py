from datetime import date
from decimal import Decimal
from typing import Optional
from sqlalchemy import String, Numeric, Date
from sqlalchemy.orm import Mapped, mapped_column
from app.database.base import Base, TimestampMixin


class FinancialTransaction(Base, TimestampMixin):
    """
    Financial ledger transactions capturing OPEX expenses and revenue inflows with Decimal precision.
    """
    __tablename__ = "financial_transactions"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    transaction_date: Mapped[date] = mapped_column(Date, index=True, nullable=False)
    transaction_type: Mapped[str] = mapped_column(String(50), index=True, nullable=False)  # revenue, expense
    category: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)
    amount: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False)
    region: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    def __repr__(self) -> str:
        return f"<FinancialTransaction id={self.id} type='{self.transaction_type}' amount={self.amount}>"
