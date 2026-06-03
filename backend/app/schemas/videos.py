import uuid
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, HttpUrl

from app.db.models import VideoLevel, VideoStatus
from app.schemas.common import ORMModel, Pagination


DurationBracket = Literal["short", "medium", "long"]
VideoSort = Literal["recommended", "newest", "shortest", "popular"]


class VideoRead(ORMModel):
    id: uuid.UUID
    title: str
    url: str
    provider: str
    topic: str
    level: VideoLevel
    duration_minutes: int
    year: int
    description: str
    tags: list[str]
    thumbnail_url: str | None
    status: VideoStatus
    popularity_score: int
    created_at: datetime
    updated_at: datetime


class VideoListResponse(BaseModel):
    items: list[VideoRead]
    pagination: Pagination


class VideoAddRequest(BaseModel):
    url: HttpUrl
    title: str | None = Field(default=None, max_length=180)
    topic: str | None = Field(default=None, max_length=80)
    level: VideoLevel | None = None
    duration_minutes: int | None = Field(default=None, ge=1, le=480)
    year: int | None = Field(default=None, ge=2000, le=2100)
    description: str | None = Field(default=None, max_length=2000)
    tags: list[str] = Field(default_factory=list, max_length=12)
    thumbnail_url: HttpUrl | None = None


class VideoModerationUpdate(BaseModel):
    status: VideoStatus
