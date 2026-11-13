from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.dependencies import get_optional_db
from app.schemas.financial import (
    FinancialSummary,
    FinancialTrendMonth,
    ExpenseCategoryItem,
    ProfitabilityMetric
)
from app.services.financial_service import FinancialService
from app.utils.responses import APIResponse, success_response

router = APIRouter(prefix="/financial", tags=["Financial Analytics"])


@router.get(
    "/summary",
    response_model=APIResponse[FinancialSummary],
    summary="Get headline revenue, OPEX, EBITDA profit, and gross margins"
)
async def get_financial_summary(db: Optional[Session] = Depends(get_optional_db)):
    data = FinancialService.get_summary(db=db)
    return success_response(data=data, message="Financial summary metrics retrieved successfully.")


@router.get(
    "/trends",
    response_model=APIResponse[List[FinancialTrendMonth]],
    summary="Get monthly revenue pacing vs operating expenses"
)
async def get_financial_trends(db: Optional[Session] = Depends(get_optional_db)):
    data = FinancialService.get_trends(db=db)
    return success_response(data=data, message="Financial trends retrieved successfully.")


@router.get(
    "/expenses",
    response_model=APIResponse[List[ExpenseCategoryItem]],
    summary="Get operating expense allocation across corporate departments"
)
async def get_financial_expenses(db: Optional[Session] = Depends(get_optional_db)):
    data = FinancialService.get_expenses(db=db)
    return success_response(data=data, message="Expense breakdown retrieved successfully.")


@router.get(
    "/profitability",
    response_model=APIResponse[List[ProfitabilityMetric]],
    summary="Get quarterly cashflow, EBITDA, and working capital metrics"
)
async def get_financial_profitability():
    data = FinancialService.get_profitability()
    return success_response(data=data, message="Profitability and cashflow summary retrieved successfully.")
