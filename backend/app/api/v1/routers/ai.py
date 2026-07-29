"""
AI router – multimodal incident analysis and audio transcription endpoints.
"""

from fastapi import APIRouter, Depends, status

from app.core.security import get_current_user
from app.schemas.ai_report import AnalyzeIncidentRequest, AiIncidentReport
from app.schemas.response import APIResponse
from app.services.ai_service import AIService

router = APIRouter()


def get_ai_service() -> AIService:
    return AIService()


@router.post(
    "/analyze",
    response_model=APIResponse[AiIncidentReport],
    status_code=status.HTTP_200_OK,
    summary="Analyze an incident with Gemini AI",
)
async def analyze_incident(
    payload: AnalyzeIncidentRequest,
    _: dict = Depends(get_current_user),
    service: AIService = Depends(get_ai_service),
) -> APIResponse[AiIncidentReport]:
    report = await service.analyze_incident(request=payload)
    return APIResponse(data=report, message="AI analysis complete.")


@router.post(
    "/transcribe",
    response_model=APIResponse[str],
    status_code=status.HTTP_200_OK,
    summary="Transcribe audio with OpenAI Whisper",
)
async def transcribe_audio(
    audio_url: str,
    _: dict = Depends(get_current_user),
    service: AIService = Depends(get_ai_service),
) -> APIResponse[str]:
    transcript = await service.transcribe_audio(audio_url=audio_url)
    return APIResponse(data=transcript, message="Transcription complete.")
