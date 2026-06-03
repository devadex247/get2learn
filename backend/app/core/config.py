import json
from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "get2learn API"
    environment: str = "local"
    api_v1_prefix: str = "/api/v1"
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/get2learn"
    secret_key: str = "change-this-before-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    backend_cors_origins: str = "http://localhost:5500,http://127.0.0.1:5500,http://localhost:3000"
    db_pool_size: int = 10
    db_max_overflow: int = 20
    db_echo: bool = False
    db_prepared_statement_cache_size: int | None = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def cors_origins(self) -> list[str]:
        raw_value = self.backend_cors_origins.strip()
        if not raw_value:
            return []
        if raw_value.startswith("["):
            parsed = json.loads(raw_value)
            return [str(origin).strip() for origin in parsed if str(origin).strip()]
        return [origin.strip() for origin in raw_value.split(",") if origin.strip()]

    @field_validator("db_prepared_statement_cache_size", mode="before")
    @classmethod
    def blank_prepared_statement_cache_size(cls, value: object) -> object:
        if value == "":
            return None
        return value


@lru_cache
def get_settings() -> Settings:
    return Settings()
