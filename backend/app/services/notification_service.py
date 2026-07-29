"""
Notification service interface for Firebase Cloud Messaging.
"""

from abc import ABC, abstractmethod
from typing import List
from uuid import UUID


class AbstractNotificationService(ABC):
    @abstractmethod
    async def send_push(
        self,
        user_ids: List[UUID],
        title: str,
        body: str,
        data: dict | None = None,
    ) -> None:
        """Send a push notification to a list of users via FCM."""
        ...

    @abstractmethod
    async def broadcast_incident_alert(self, incident_id: UUID) -> None:
        """Broadcast a new-incident alert to all dispatchers."""
        ...


class NotificationService(AbstractNotificationService):
    """Firebase Cloud Messaging implementation."""

    async def send_push(
        self,
        user_ids: List[UUID],
        title: str,
        body: str,
        data: dict | None = None,
    ) -> None:
        # TODO: implement FCM send
        raise NotImplementedError

    async def broadcast_incident_alert(self, incident_id: UUID) -> None:
        # TODO: implement dispatcher broadcast
        raise NotImplementedError
