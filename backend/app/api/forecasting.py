from fastapi import APIRouter
from app.schemas.forecasting import ForecastingSummary, ForecastingTrendsResponse
from app.services.forecasting_service import ForecastingService
from app.utils.responses import APIResponse, success_response

router = APIRouter(prefix="/forecasting", tags=["Predictive Forecasting"])


@router.get(
    "/summary",
    response_model=APIResponse[ForecastingSummary],
    summary="Get projected revenue, expected growth, and model accuracy"
)
async def get_forecasting_summary():
    data = ForecastingService.get_summary()
    return success_response(data=data, message="Forecasting summary metrics retrieved successfully.")


@router.get(
    "/trends",
    response_model=APIResponse[ForecastingTrendsResponse],
    summary="Get historical actuals vs forward-looking ML forecast bounds and scenarios"
)
async def get_forecasting_trends():
    data = ForecastingService.get_trends()
    return success_response(data=data, message="Forecasting trends and scenario projections retrieved successfully.")
