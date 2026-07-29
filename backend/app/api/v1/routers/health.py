"""
Health-check router.
"""

from datetime import datetime, timezone

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class HealthResponse(BaseModel):
    status:  str
    version: str
    timestamp: str


@router.get("/", response_model=HealthResponse, summary="System health check")
async def health_check() -> HealthResponse:
    """Returns system status and current server timestamp."""
    from app.core.config import settings
    return HealthResponse(
        status="ok",
        version=settings.APP_VERSION,
        timestamp=datetime.now(tz=timezone.utc).isoformat(),
    )
