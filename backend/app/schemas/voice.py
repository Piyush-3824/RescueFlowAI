"""
Pydantic v2 schemas for Twilio demo voice calls.
"""

from datetime import datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, Field


class CallStatus(StrEnum):
    INITIATED  = "initiated"
    RINGING    = "ringing"
    IN_PROGRESS = "in-progress"
    COMPLETED  = "completed"
    FAILED     = "failed"
    DEMO       = "demo"          # Returned when DEMO_MODE=true


class TriggerVoiceCallRequest(BaseModel):
    incident_id:  UUID
    to_number:    str = Field(..., pattern=r"^\+?[1-9]\d{7,14}$")
    message:      str = Field(..., min_length=5, max_length=500)


class VoiceCallResponse(BaseModel):
    call_sid:    str
    incident_id: UUID
    to_number:   str
    status:      CallStatus
    is_demo:     bool
    initiated_at: datetime
