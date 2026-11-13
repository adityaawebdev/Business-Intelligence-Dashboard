from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.dependencies import get_optional_db
from app.schemas.sales import (
    SalesSummary,
    SalesTrendMonth,
    SalesRegionItem,
    SalesChannelCategory,
    SalesTopProduct
)
from app.services.sales_service import SalesService
from app.utils.responses import APIResponse, success_response

router = APIRouter(prefix="/sales", tags=["Sales Analytics"])


@router.get(
    "/summary",
    response_model=APIResponse[SalesSummary],
    summary="Get high-level sales KPIs and quota attainments"
)
async def get_sales_summary(db: Optional[Session] = Depends(get_optional_db)):
    data = SalesService.get_summary(db=db)
    return success_response(data=data, message="Sales summary KPIs retrieved successfully.")


@router.get(
    "/trends",
    response_model=APIResponse[List[SalesTrendMonth]],
    summary="Get monthly sales pacing vs target and prior year"
)
async def get_sales_trends(db: Optional[Session] = Depends(get_optional_db)):
    data = SalesService.get_trends(db=db)
    return success_response(data=data, message="Monthly sales trends retrieved successfully.")


@router.get(
    "/by-region",
    response_model=APIResponse[List[SalesRegionItem]],
    summary="Get sales distribution across geographic regions"
)
async def get_sales_by_region(db: Optional[Session] = Depends(get_optional_db)):
    data = SalesService.get_by_region(db=db)
    return success_response(data=data, message="Regional sales breakdown retrieved successfully.")


@router.get(
    "/by-category",
    response_model=APIResponse[List[SalesChannelCategory]],
    summary="Get sales breakdown across acquisition channels"
)
async def get_sales_by_category(db: Optional[Session] = Depends(get_optional_db)):
    data = SalesService.get_by_category(db=db)
    return success_response(data=data, message="Channel sales breakdown retrieved successfully.")


@router.get(
    "/top-products",
    response_model=APIResponse[List[SalesTopProduct]],
    summary="Get highest performing products by sales volume and margin"
)
async def get_top_products(db: Optional[Session] = Depends(get_optional_db)):
    data = SalesService.get_top_products(db=db)
    return success_response(data=data, message="Top products retrieved successfully.")
