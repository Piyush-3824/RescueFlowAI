"""
RescueFlowAI – FastAPI Application Entry Point
"""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.api import api_router
from app.core.config import settings
from app.core.exceptions import (
    RescueFlowException,
    rescue_flow_exception_handler,
    unhandled_exception_handler,
)


# ──────────────────────────────────────────────────────────────────────────────
#  Lifespan – startup / shutdown hooks
# ──────────────────────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Initialise resources on startup; clean up on shutdown."""
    # TODO: initialise DB connection pool, warm AI models, etc.
    print(f"[{settings.APP_NAME}] Starting up (env={settings.APP_ENV})")
    yield
    print(f"[{settings.APP_NAME}] Shutting down")


# ──────────────────────────────────────────────────────────────────────────────
#  FastAPI app factory
# ──────────────────────────────────────────────────────────────────────────────

def create_application() -> FastAPI:
    application = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description="AI-Powered Emergency Response & Dispatch System",
        docs_url="/docs" if settings.DEBUG else None,
        redoc_url="/redoc" if settings.DEBUG else None,
        lifespan=lifespan,
    )

    # ── CORS ──────────────────────────────────────────────────────────────────
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Exception handlers ────────────────────────────────────────────────────
    application.add_exception_handler(RescueFlowException, rescue_flow_exception_handler)  # type: ignore[arg-type]
    application.add_exception_handler(Exception, unhandled_exception_handler)               # type: ignore[arg-type]

    # ── Routers ───────────────────────────────────────────────────────────────
    application.include_router(api_router, prefix="/api/v1")

    return application


app = create_application()


# ──────────────────────────────────────────────────────────────────────────────
#  Dev server entry-point
# ──────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info",
    )
