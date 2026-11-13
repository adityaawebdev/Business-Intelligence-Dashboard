from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.dependencies import get_optional_db
from app.schemas.customers import (
    CustomerSummary,
    CustomerAcquisitionMonth,
    CustomerTopAccount,
    CustomerSegmentItem
)
from app.services.customer_service import CustomerService
from app.utils.responses import APIResponse, success_response

router = APIRouter(prefix="/customers", tags=["Customer Analytics"])


@router.get(
    "/summary",
    response_model=APIResponse[CustomerSummary],
    summary="Get customer counts, retention rates, and growth velocity"
)
async def get_customer_summary(db: Optional[Session] = Depends(get_optional_db)):
    data = CustomerService.get_summary(db=db)
    return success_response(data=data, message="Customer summary metrics retrieved successfully.")


@router.get(
    "/trends",
    response_model=APIResponse[List[CustomerAcquisitionMonth]],
    summary="Get customer acquisition trends across organic, paid, and referral channels"
)
async def get_customer_trends(db: Optional[Session] = Depends(get_optional_db)):
    data = CustomerService.get_trends(db=db)
    return success_response(data=data, message="Customer acquisition trends retrieved successfully.")


@router.get(
    "/top",
    response_model=APIResponse[List[CustomerTopAccount]],
    summary="Get highest value strategic client accounts"
)
async def get_top_customers(db: Optional[Session] = Depends(get_optional_db)):
    data = CustomerService.get_top(db=db)
    return success_response(data=data, message="Top enterprise customers retrieved successfully.")


@router.get(
    "/segments",
    response_model=APIResponse[List[CustomerSegmentItem]],
    summary="Get customer distribution across account tiers"
)
async def get_customer_segments(db: Optional[Session] = Depends(get_optional_db)):
    data = CustomerService.get_segments(db=db)
    return success_response(data=data, message="Customer segmentation retrieved successfully.")
