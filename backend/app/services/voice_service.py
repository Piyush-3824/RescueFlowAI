"""
Voice dispatch service interface using Twilio (Demo Mode).
"""

from abc import ABC, abstractmethod

from app.schemas.voice import TriggerVoiceCallRequest, VoiceCallResponse


class AbstractVoiceService(ABC):
    @abstractmethod
    async def trigger_call(
        self,
        request: TriggerVoiceCallRequest,
    ) -> VoiceCallResponse:
        """
        Trigger a demo automated voice call via Twilio.
        In DEMO_MODE, logs the call without actually dialling.
        """
        ...


class VoiceService(AbstractVoiceService):
    """Twilio-backed voice service in demo mode."""

    async def trigger_call(
        self,
        request: TriggerVoiceCallRequest,
    ) -> VoiceCallResponse:
        # TODO: implement Twilio Voice API call
        # IMPORTANT: Always run in DEMO MODE during development and tests
        raise NotImplementedError
