"""
API v1 – root router that aggregates all sub-routers.
"""

from fastapi import APIRouter

from app.api.v1.routers import ai, dispatch, health, incidents, voice

api_router = APIRouter()

api_router.include_router(health.router,    prefix="/health",    tags=["Health"])
api_router.include_router(incidents.router, prefix="/incidents", tags=["Incidents"])
api_router.include_router(ai.router,        prefix="/ai",        tags=["AI"])
api_router.include_router(dispatch.router,  prefix="/dispatch",  tags=["Dispatch"])
api_router.include_router(voice.router,     prefix="/voice",     tags=["Voice"])
