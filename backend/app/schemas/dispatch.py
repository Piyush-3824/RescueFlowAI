"""
Pydantic v2 schemas for emergency responder dispatch.
"""

from datetime import datetime
from enum import StrEnum
from typing import List
from uuid import UUID

from pydantic import BaseModel, Field

from app.schemas.ai_report import ResponderType


class UnitStatus(StrEnum):
    EN_ROUTE  = "en_route"
    ON_SCENE  = "on_scene"
    AVAILABLE = "available"


class DispatchUnit(BaseModel):
    id:                        UUID
    incident_id:               UUID
    responder_type:            ResponderType
    unit_name:                 str
    status:                    UnitStatus
    estimated_arrival_minutes: int | None = None
    dispatched_at:             datetime

    model_config = {"from_attributes": True}


class DispatchRequest(BaseModel):
    incident_id:      UUID
    responder_types:  List[ResponderType] = Field(..., min_length=1)
    notes:            str | None = Field(default=None, max_length=500)


class DispatchResponse(BaseModel):
    incident_id:    UUID
    dispatched:     List[DispatchUnit]
    total_units:    int
    dispatched_at:  datetime
