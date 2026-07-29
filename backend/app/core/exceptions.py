"""
Custom exception taxonomy and global HTTP exception handlers.
"""

from fastapi import Request, status
from fastapi.responses import JSONResponse


# ──────────────────────────────────────────────────────────────────────────────
#  Domain exceptions
# ──────────────────────────────────────────────────────────────────────────────

class RescueFlowException(Exception):
    """Base domain exception. All service-layer errors inherit from this."""

    def __init__(
        self,
        detail: str,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        code: str | None = None,
    ) -> None:
        super().__init__(detail)
        self.detail = detail
        self.status_code = status_code
        self.code = code


class NotFoundException(RescueFlowException):
    def __init__(self, resource: str, resource_id: str) -> None:
        super().__init__(
            detail=f"{resource} with id '{resource_id}' was not found.",
            status_code=status.HTTP_404_NOT_FOUND,
            code="NOT_FOUND",
        )


class UnauthorizedException(RescueFlowException):
    def __init__(self, detail: str = "Authentication required.") -> None:
        super().__init__(detail=detail, status_code=status.HTTP_401_UNAUTHORIZED, code="UNAUTHORIZED")


class ForbiddenException(RescueFlowException):
    def __init__(self, detail: str = "You do not have permission to perform this action.") -> None:
        super().__init__(detail=detail, status_code=status.HTTP_403_FORBIDDEN, code="FORBIDDEN")


class ValidationException(RescueFlowException):
    def __init__(self, detail: str) -> None:
        super().__init__(detail=detail, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, code="VALIDATION_ERROR")


class AIServiceException(RescueFlowException):
    def __init__(self, detail: str = "AI service is temporarily unavailable.") -> None:
        super().__init__(detail=detail, status_code=status.HTTP_503_SERVICE_UNAVAILABLE, code="AI_SERVICE_ERROR")


class VoiceDispatchException(RescueFlowException):
    def __init__(self, detail: str = "Voice dispatch service failed.") -> None:
        super().__init__(detail=detail, status_code=status.HTTP_503_SERVICE_UNAVAILABLE, code="VOICE_DISPATCH_ERROR")


class StorageException(RescueFlowException):
    def __init__(self, detail: str = "File storage operation failed.") -> None:
        super().__init__(detail=detail, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, code="STORAGE_ERROR")


# ──────────────────────────────────────────────────────────────────────────────
#  Exception handlers (registered in main.py)
# ──────────────────────────────────────────────────────────────────────────────

async def rescue_flow_exception_handler(
    request: Request,
    exc: RescueFlowException,
) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.detail,
            "code": exc.code,
        },
    )


async def unhandled_exception_handler(
    request: Request,
    exc: Exception,
) -> JSONResponse:
    # In production, log to Sentry / monitoring tool here
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "message": "An unexpected internal error occurred.",
            "code": "INTERNAL_SERVER_ERROR",
        },
    )
