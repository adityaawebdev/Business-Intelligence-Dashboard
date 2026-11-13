"""
Security Architecture Placeholder for InsightHub API.

Note:
Full JWT / OAuth2 / API Token authentication will be integrated in a future phase
when PostgreSQL user credentials and session tables are connected.
This module establishes the architectural boundaries and dependency injection stubs.
"""

from typing import Optional
from fastapi import Request


async def get_current_user_optional(request: Request) -> Optional[dict]:
    """
    Placeholder dependency for resolving the current authenticated user.
    In this phase, returns a default mock admin user context.
    """
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
        return {
            "id": "usr-admin-01",
            "name": "Admin User",
            "email": "admin.lead@insighthub.internal",
            "role": "Super Admin",
            "token": token
        }
    return {
        "id": "usr-admin-01",
        "name": "Admin User",
        "email": "admin.lead@insighthub.internal",
        "role": "Super Admin"
    }
