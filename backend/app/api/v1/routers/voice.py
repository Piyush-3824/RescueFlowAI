"""
Voice router – trigger demo automated calls via Twilio.
"""

from fastapi import APIRouter, Depends, status

from app.core.security import require_dispatcher
from app.schemas.response import APIResponse
from app.schemas.voice import TriggerVoiceCallRequest, VoiceCallResponse
from app.services.voice_service import VoiceService

router = APIRouter()


def get_voice_service() -> VoiceService:
    return VoiceService()


@router.post(
    "/call",
    response_model=APIResponse[VoiceCallResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Trigger an automated demo voice call",
)
async def trigger_voice_call(
    payload: TriggerVoiceCallRequest,
    _: dict = Depends(require_dispatcher),
    service: VoiceService = Depends(get_voice_service),
) -> APIResponse[VoiceCallResponse]:
    result = await service.trigger_call(request=payload)
    return APIResponse(data=result, message="Demo call triggered.")
