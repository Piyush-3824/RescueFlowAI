"""
AI service interface for Gemini multimodal analysis and Whisper transcription.
"""

from abc import ABC, abstractmethod
from uuid import UUID

from app.schemas.ai_report import AnalyzeIncidentRequest, AiIncidentReport


class AbstractAIService(ABC):
    @abstractmethod
    async def analyze_incident(
        self,
        request: AnalyzeIncidentRequest,
    ) -> AiIncidentReport:
        """
        Send multimodal input (text + media URLs) to Google Gemini and return
        a structured AiIncidentReport.
        """
        ...

    @abstractmethod
    async def transcribe_audio(self, audio_url: str) -> str:
        """
        Transcribe an audio file using OpenAI Whisper.
        Returns the transcribed text.
        """
        ...


class AIService(AbstractAIService):
    """Concrete implementation using Google Gemini and OpenAI Whisper."""

    async def analyze_incident(
        self,
        request: AnalyzeIncidentRequest,
    ) -> AiIncidentReport:
        # TODO: implement Gemini multimodal analysis
        # IMPORTANT: Always use demo/mock mode during tests
        raise NotImplementedError

    async def transcribe_audio(self, audio_url: str) -> str:
        # TODO: implement OpenAI Whisper transcription
        # IMPORTANT: Always use demo/mock mode during tests
        raise NotImplementedError
