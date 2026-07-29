"""
Application configuration via Pydantic Settings.
All values are read from environment variables (or .env file).
"""

from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # ── Application ───────────────────────────────────────────────────────────
    APP_ENV: str = "development"
    APP_NAME: str = "RescueFlowAI"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    SECRET_KEY: str = "change-me"

    # ── CORS ──────────────────────────────────────────────────────────────────
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    # ── Supabase ──────────────────────────────────────────────────────────────
    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str

    # ── Gemini ────────────────────────────────────────────────────────────────
    GEMINI_API_KEY: str

    # ── OpenAI ───────────────────────────────────────────────────────────────
    OPENAI_API_KEY: str

    # ── Twilio ────────────────────────────────────────────────────────────────
    TWILIO_ACCOUNT_SID: str
    TWILIO_AUTH_TOKEN: str
    TWILIO_PHONE_NUMBER: str

    # ── Firebase ─────────────────────────────────────────────────────────────
    FIREBASE_PROJECT_ID: str = ""
    FIREBASE_SERVICE_ACCOUNT_JSON: str = "{}"

    # ── Google Maps ───────────────────────────────────────────────────────────
    GOOGLE_MAPS_API_KEY: str = ""


@lru_cache
def get_settings() -> Settings:
    """Cached settings singleton – call this everywhere instead of constructing Settings()."""
    return Settings()  # type: ignore[call-arg]


settings: Settings = get_settings()
