"""
Pydantic v2 schemas for the Incident domain.
"""

from datetime import datetime
from enum import StrEnum
from typing import List
from uuid import UUID

from pydantic import BaseModel, Field


# ──────────────────────────────────────────────────────────────────────────────
#  Enumerations
# ──────────────────────────────────────────────────────────────────────────────

class IncidentSeverity(StrEnum):
    CRITICAL = "critical"
    HIGH     = "high"
    MODERATE = "moderate"
    LOW      = "low"


class IncidentStatus(StrEnum):
    PENDING       = "pending"
    AI_PROCESSING = "ai_processing"
    DISPATCHED    = "dispatched"
    ON_SCENE      = "on_scene"
    RESOLVED      = "resolved"
    CANCELLED     = "cancelled"


class IncidentType(StrEnum):
    ROAD_ACCIDENT    = "road_accident"
    FIRE             = "fire"
    MEDICAL          = "medical"
    INDUSTRIAL       = "industrial"
    NATURAL_DISASTER = "natural_disaster"
    SECURITY         = "security"
    OTHER            = "other"


class MediaType(StrEnum):
    IMAGE = "image"
    VIDEO = "video"
    AUDIO = "audio"
    TEXT  = "text"


# ──────────────────────────────────────────────────────────────────────────────
#  Sub-schemas
# ──────────────────────────────────────────────────────────────────────────────

class GeoLocation(BaseModel):
    latitude:  float = Field(..., ge=-90.0,  le=90.0)
    longitude: float = Field(..., ge=-180.0, le=180.0)
    address:   str | None = None


# ──────────────────────────────────────────────────────────────────────────────
#  Request schemas (inbound)
# ──────────────────────────────────────────────────────────────────────────────

class CreateIncidentRequest(BaseModel):
    description: str = Field(..., min_length=10, max_length=2000)
    location:    GeoLocation
    media_urls:  List[str] = Field(default_factory=list)
    media_types: List[MediaType] = Field(default_factory=list)


class UpdateIncidentStatusRequest(BaseModel):
    status: IncidentStatus


# ──────────────────────────────────────────────────────────────────────────────
#  Response schemas (outbound)
# ──────────────────────────────────────────────────────────────────────────────

class IncidentResponse(BaseModel):
    id:          UUID
    reported_by: UUID
    type:        IncidentType
    severity:    IncidentSeverity
    status:      IncidentStatus
    title:       str
    description: str
    location:    GeoLocation
    media_urls:  List[str]
    media_types: List[MediaType]
    created_at:  datetime
    updated_at:  datetime

    model_config = {"from_attributes": True}
