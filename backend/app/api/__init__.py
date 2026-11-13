from fastapi import APIRouter
from app.api.dashboard import router as dashboard_router
from app.api.sales import router as sales_router
from app.api.customers import router as customers_router
from app.api.products import router as products_router
from app.api.financial import router as financial_router
from app.api.operations import router as operations_router
from app.api.forecasting import router as forecasting_router
from app.api.uploads import router as uploads_router
from app.api.reports import router as reports_router

api_router = APIRouter()

api_router.include_router(dashboard_router)
api_router.include_router(sales_router)
api_router.include_router(customers_router)
api_router.include_router(products_router)
api_router.include_router(financial_router)
api_router.include_router(operations_router)
api_router.include_router(forecasting_router)
api_router.include_router(uploads_router)
api_router.include_router(reports_router)

__all__ = ["api_router"]
