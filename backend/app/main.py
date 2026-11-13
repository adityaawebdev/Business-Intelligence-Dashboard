import logging
import sys
import time
from contextlib import asynccontextmanager
from typing import Dict, Any

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.api import api_router
from app.core.config import settings
from app.utils.responses import error_response, success_response

# Configure Logging
logging.basicConfig(
    level=settings.LOG_LEVEL,
    format="%(asctime)s | %(levelname)-8s | %(name)s : %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("insighthub.api")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler for application startup and shutdown."""
    logger.info("==================================================")
    logger.info(f"Starting {settings.APP_NAME} v{settings.VERSION}")
    logger.info(f"Environment: {settings.APP_ENV}")
    logger.info(f"Allowed CORS Origins: {settings.CORS_ORIGINS}")
    logger.info("Docs available at: /docs and /redoc")
    logger.info("==================================================")
    yield
    logger.info(f"Shutting down {settings.APP_NAME}. Cleaning up resources.")


# Initialize FastAPI Application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="Enterprise Business Intelligence & Analytics REST API layer for InsightHub",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
    lifespan=lifespan
)

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request Logging Middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    path = request.url.path
    method = request.method

    # Log incoming request
    if not path.endswith("/health") and not path.startswith("/docs") and not path.startswith("/openapi"):
        logger.info(f"Incoming Request: {method} {path}")

    try:
        response = await call_next(request)
        process_time = (time.time() - start_time) * 1000
        if not path.endswith("/health") and not path.startswith("/docs") and not path.startswith("/openapi"):
            logger.info(f"Completed Request: {method} {path} - Status: {response.status_code} ({process_time:.2f}ms)")
        return response
    except Exception as exc:
        process_time = (time.time() - start_time) * 1000
        logger.error(f"Unhandled Exception for {method} {path}: {str(exc)} ({process_time:.2f}ms)")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=error_response("An internal server error occurred while processing your request.")
        )


# Global Exception Handlers (Standardized error envelope)
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    logger.warning(f"HTTP {exc.status_code} on {request.method} {request.url.path}: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content=error_response(message=str(exc.detail))
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    first_error = errors[0]["msg"] if errors else "Invalid request payload."
    field_loc = " -> ".join([str(x) for x in errors[0].get("loc", [])]) if errors else ""
    error_msg = f"Validation Error on '{field_loc}': {first_error}" if field_loc else f"Validation Error: {first_error}"
    logger.warning(f"Validation failure on {request.method} {request.url.path}: {errors}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=error_response(message=error_msg, data=errors)
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unexpected Exception on {request.method} {request.url.path}: {exc}", exc_info=False)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=error_response(message="An unexpected internal server error occurred.")
    )


# Health Check & Root Endpoints
@app.get(
    f"{settings.API_V1_PREFIX}/health",
    tags=["System"],
    summary="Health check endpoint"
)
async def health_check():
    """Returns application health status and API version information."""
    return success_response(
        data={
            "status": "healthy",
            "service": settings.APP_NAME,
            "version": settings.VERSION
        },
        message="System telemetry is optimal."
    )


@app.get(
    f"{settings.API_V1_PREFIX}/health/database",
    tags=["System"],
    summary="Database connectivity health check"
)
async def database_health_check():
    """
    Checks database connection and telemetry.
    Returns status: healthy if connected, unreachable if disconnected.
    """
    from app.database.connection import is_database_connected
    connected = is_database_connected()
    db_name = settings.DATABASE_URL.rsplit("/", 1)[-1].split("?")[0] if "/" in settings.DATABASE_URL else "insighthub"

    return success_response(
        data={
            "status": "healthy" if connected else "unreachable",
            "connected": connected,
            "database": db_name,
            "engine": "PostgreSQL (psycopg3)",
            "poolSize": settings.DB_POOL_SIZE,
            "maxOverflow": settings.DB_MAX_OVERFLOW
        },
        message="Database connection verified successfully." if connected else "Database server is unreachable or credentials are not yet configured."
    )


@app.get(
    f"{settings.API_V1_PREFIX}/",
    tags=["System"],
    summary="API Root Information"
)
async def api_root():
    """Returns API descriptor."""
    return {
        "application": "InsightHub",
        "version": settings.VERSION,
        "status": "running"
    }


@app.get("/", tags=["System"], include_in_schema=False)
async def root_redirect():
    """Landing route returning API welcome message and documentation link."""
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "version": settings.VERSION,
        "docs": "/docs",
        "health": f"{settings.API_V1_PREFIX}/health"
    }


# Mount all API v1 domain routes
app.include_router(api_router, prefix=settings.API_V1_PREFIX)
