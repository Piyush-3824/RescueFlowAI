"""
Supabase client initialisation and lifecycle management.
Uses the service-role key for server-side operations.
"""

from functools import lru_cache

from supabase import Client, create_client

from app.core.config import settings


@lru_cache(maxsize=1)
def get_supabase_client() -> Client:
    """
    Returns a cached Supabase admin client (service-role key).
    This client bypasses Row Level Security – use only server-side.
    """
    return create_client(
        supabase_url=settings.SUPABASE_URL,
        supabase_key=settings.SUPABASE_SERVICE_ROLE_KEY,
    )


def get_supabase_anon_client() -> Client:
    """
    Returns an anonymous Supabase client.
    Respects Row Level Security – use for user-scoped operations.
    """
    return create_client(
        supabase_url=settings.SUPABASE_URL,
        supabase_key=settings.SUPABASE_ANON_KEY,
    )
