"""
Basic test configuration and fixtures for RescueFlowAI backend.
"""

import pytest
from fastapi.testclient import TestClient

from main import app


@pytest.fixture(scope="session")
def client() -> TestClient:
    """Synchronous FastAPI test client (session-scoped)."""
    return TestClient(app)
