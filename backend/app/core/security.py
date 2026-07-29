"""
Security utilities – JWT verification and FastAPI auth dependencies.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.db.supabase import get_supabase_client

_bearer_scheme = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(_bearer_scheme),
) -> dict:
    """
    FastAPI dependency that validates the Supabase JWT bearer token.

    Returns the decoded user payload (id, email, role).
    Raises 401 if the token is missing or invalid.

    Usage:
        @router.get("/protected")
        async def protected_route(user: dict = Depends(get_current_user)):
            ...
    """
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials were not provided.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials
    supabase = get_supabase_client()

    try:
        response = supabase.auth.get_user(token)
        if response.user is None:
            raise ValueError("User not found in token")
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = response.user
    return {
        "id":    user.id,
        "email": user.email,
        "role":  user.user_metadata.get("role", "citizen"),
    }


async def require_dispatcher(user: dict = Depends(get_current_user)) -> dict:
    """Requires the authenticated user to have 'dispatcher' or 'admin' role."""
    if user["role"] not in ("dispatcher", "admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Dispatcher or admin role required.",
        )
    return user


async def require_admin(user: dict = Depends(get_current_user)) -> dict:
    """Requires the authenticated user to have 'admin' role."""
    if user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin role required.",
        )
    return user
