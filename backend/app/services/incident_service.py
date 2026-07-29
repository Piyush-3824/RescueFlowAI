"""
Incident service interface.
Business logic will be implemented inside the method bodies.
"""

from abc import ABC, abstractmethod
from uuid import UUID

from app.schemas.incident import (
    CreateIncidentRequest,
    IncidentResponse,
    UpdateIncidentStatusRequest,
)
from app.schemas.response import PaginatedResponse


class AbstractIncidentService(ABC):
    @abstractmethod
    async def create_incident(
        self,
        payload: CreateIncidentRequest,
        reporter_id: UUID,
    ) -> IncidentResponse:
        """Persist a new incident and trigger the AI processing pipeline."""
        ...

    @abstractmethod
    async def get_incident(self, incident_id: UUID) -> IncidentResponse:
        """Retrieve a single incident by ID."""
        ...

    @abstractmethod
    async def list_incidents(
        self,
        page: int = 1,
        page_size: int = 20,
    ) -> PaginatedResponse[IncidentResponse]:
        """Return paginated list of incidents."""
        ...

    @abstractmethod
    async def update_status(
        self,
        incident_id: UUID,
        payload: UpdateIncidentStatusRequest,
    ) -> IncidentResponse:
        """Update the status of an incident."""
        ...


class IncidentService(AbstractIncidentService):
    """Concrete implementation backed by Supabase."""

    async def create_incident(
        self,
        payload: CreateIncidentRequest,
        reporter_id: UUID,
    ) -> IncidentResponse:
        # TODO: implement Supabase insert + enqueue AI task
        raise NotImplementedError

    async def get_incident(self, incident_id: UUID) -> IncidentResponse:
        # TODO: implement Supabase select
        raise NotImplementedError

    async def list_incidents(
        self,
        page: int = 1,
        page_size: int = 20,
    ) -> PaginatedResponse[IncidentResponse]:
        # TODO: implement Supabase select with pagination
        raise NotImplementedError

    async def update_status(
        self,
        incident_id: UUID,
        payload: UpdateIncidentStatusRequest,
    ) -> IncidentResponse:
        # TODO: implement Supabase update
        raise NotImplementedError
