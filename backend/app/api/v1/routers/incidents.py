"""
Incidents router – CRUD endpoints for emergency incidents.
"""

from uuid import UUID

from fastapi import APIRouter, Depends, Query, status

from app.core.security import get_current_user
from app.schemas.incident import (
    CreateIncidentRequest,
    IncidentResponse,
    UpdateIncidentStatusRequest,
)
from app.schemas.response import APIResponse, PaginatedResponse
from app.services.incident_service import IncidentService

router = APIRouter()


def get_incident_service() -> IncidentService:
    """Dependency factory – swap implementation in tests."""
    return IncidentService()


@router.post(
    "/",
    response_model=APIResponse[IncidentResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Report a new incident",
)
async def create_incident(
    payload: CreateIncidentRequest,
    current_user: dict = Depends(get_current_user),
    service: IncidentService = Depends(get_incident_service),
) -> APIResponse[IncidentResponse]:
    incident = await service.create_incident(
        payload=payload,
        reporter_id=UUID(current_user["id"]),
    )
    return APIResponse(data=incident, message="Incident reported successfully.")


@router.get(
    "/",
    response_model=PaginatedResponse[IncidentResponse],
    summary="List all incidents",
)
async def list_incidents(
    page:      int = Query(default=1,  ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    _: dict = Depends(get_current_user),
    service: IncidentService = Depends(get_incident_service),
) -> PaginatedResponse[IncidentResponse]:
    return await service.list_incidents(page=page, page_size=page_size)


@router.get(
    "/{incident_id}",
    response_model=APIResponse[IncidentResponse],
    summary="Get incident by ID",
)
async def get_incident(
    incident_id: UUID,
    _: dict = Depends(get_current_user),
    service: IncidentService = Depends(get_incident_service),
) -> APIResponse[IncidentResponse]:
    incident = await service.get_incident(incident_id=incident_id)
    return APIResponse(data=incident)


@router.patch(
    "/{incident_id}/status",
    response_model=APIResponse[IncidentResponse],
    summary="Update incident status",
)
async def update_incident_status(
    incident_id: UUID,
    payload: UpdateIncidentStatusRequest,
    _: dict = Depends(get_current_user),
    service: IncidentService = Depends(get_incident_service),
) -> APIResponse[IncidentResponse]:
    incident = await service.update_status(incident_id=incident_id, payload=payload)
    return APIResponse(data=incident, message="Status updated.")
