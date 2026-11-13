from typing import Generic, TypeVar, Optional, Any
from pydantic import BaseModel

T = TypeVar("T")


class APIResponse(BaseModel, Generic[T]):
    """
    Standardized API Response Envelope for InsightHub API.
    Used across all endpoints for uniform payload structure.
    """
    success: bool = True
    data: Optional[T] = None
    message: str = "Request completed successfully"


class ErrorResponse(BaseModel):
    """
    Standardized Error Response Envelope for InsightHub API.
    """
    success: bool = False
    data: Optional[Any] = None
    message: str


def success_response(data: Any = None, message: str = "Request completed successfully") -> dict:
    """Helper function to create a success response dictionary."""
    return {
        "success": True,
        "data": data,
        "message": message
    }


def error_response(message: str, data: Any = None) -> dict:
    """Helper function to create an error response dictionary."""
    return {
        "success": False,
        "data": data,
        "message": message
    }
