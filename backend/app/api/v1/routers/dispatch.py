"""
Dispatch router – assign responders to incidents.
"""

from fastapi import APIRouter, Depends, status

from app.core.security import get_current_user, require_dispatcher
from app.schemas.dispatch import DispatchRequest, DispatchResponse
from app.schemas.response import APIResponse

router = APIRouter()


@router.post(
    "/",
    response_model=APIResponse[DispatchResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Dispatch responders to an incident",
)
async def dispatch_responders(
    payload: DispatchRequest,
    dispatcher: dict = Depends(require_dispatcher),
) -> APIResponse[DispatchResponse]:
    # TODO: implement DispatchService.dispatch()
    raise NotImplementedError("Dispatch logic not yet implemented.")
