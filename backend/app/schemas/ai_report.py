"""
Pydantic v2 schemas for AI incident analysis results.
"""

from datetime import datetime
from enum import StrEnum
from typing import List
from uuid import UUID

from pydantic import BaseModel, Field


class ResponderType(StrEnum):
    AMBULANCE    = "ambulance"
    FIRE_BRIGADE = "fire_brigade"
    POLICE       = "police"
    RESCUE       = "rescue"


class AiIncidentReport(BaseModel):
    incident_id:             UUID
    incident_type:           str
    severity:                str
    summary:                 str
    recommended_responders:  List[ResponderType]
    estimated_casualties:    int | None = None
    immediate_actions:       List[str] = Field(default_factory=list)
    confidence_score:        float = Field(..., ge=0.0, le=1.0)
    generated_at:            datetime

    model_config = {"from_attributes": True}


class AnalyzeIncidentRequest(BaseModel):
    """Request body for the /ai/analyze endpoint."""
    incident_id: UUID
    text_input:  str | None = Field(default=None, max_length=2000)
    media_urls:  List[str] = Field(default_factory=list)
