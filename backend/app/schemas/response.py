"""
Generic API response wrapper schemas.
"""

from typing import Generic, List, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class APIResponse(BaseModel, Generic[T]):
    """Standard envelope for every API response."""
    success: bool = True
    message: str  = "OK"
    data:    T


class PaginatedResponse(BaseModel, Generic[T]):
    """Paginated list response envelope."""
    success:   bool = True
    message:   str  = "OK"
    data:      List[T]
    total:     int
    page:      int
    page_size: int
    has_next:  bool
