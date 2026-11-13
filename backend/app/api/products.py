from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.dependencies import get_optional_db
from app.schemas.products import (
    ProductSummary,
    ProductCategoryPerformance,
    ProductCategoryItem,
    ProductDetail
)
from app.services.product_service import ProductService
from app.utils.responses import APIResponse, success_response

router = APIRouter(prefix="/products", tags=["Product Analytics"])


@router.get(
    "/summary",
    response_model=APIResponse[ProductSummary],
    summary="Get product catalog KPIs, top margin SKU, and velocity"
)
async def get_product_summary(db: Optional[Session] = Depends(get_optional_db)):
    data = ProductService.get_summary(db=db)
    return success_response(data=data, message="Product summary KPIs retrieved successfully.")


@router.get(
    "/performance",
    response_model=APIResponse[List[ProductCategoryPerformance]],
    summary="Get product category revenue and margin efficiency"
)
async def get_product_performance(db: Optional[Session] = Depends(get_optional_db)):
    data = ProductService.get_performance(db=db)
    return success_response(data=data, message="Product performance metrics retrieved successfully.")


@router.get(
    "/categories",
    response_model=APIResponse[List[ProductCategoryItem]],
    summary="Get listing of product categories and catalog counts"
)
async def get_product_categories(db: Optional[Session] = Depends(get_optional_db)):
    data = ProductService.get_categories(db=db)
    return success_response(data=data, message="Product categories retrieved successfully.")


@router.get(
    "/list",
    response_model=APIResponse[List[ProductDetail]],
    summary="Get comprehensive product catalog and margin matrix"
)
async def get_product_list(category: Optional[str] = None, db: Optional[Session] = Depends(get_optional_db)):
    data = ProductService.get_list(category=category, db=db)
    return success_response(data=data, message="Product catalog list retrieved successfully.")
