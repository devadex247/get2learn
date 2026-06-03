import uuid
from datetime import datetime

from pydantic import BaseModel, Field

from app.schemas.common import ORMModel
from app.schemas.videos import VideoRead


class PlaylistCreate(BaseModel):
    name: str = Field(min_length=1, max_length=80)


class PlaylistItemRead(ORMModel):
    id: uuid.UUID
    video_id: uuid.UUID
    position: int
    added_at: datetime
    video: VideoRead | None = None


class PlaylistRead(ORMModel):
    id: uuid.UUID
    user_id: uuid.UUID
    name: str
    is_default_save_for_later: bool
    created_at: datetime
    updated_at: datetime
    items: list[PlaylistItemRead] = Field(default_factory=list)


class PlaylistAddItem(BaseModel):
    video_id: uuid.UUID


class PlaylistReorder(BaseModel):
    ordered_video_ids: list[uuid.UUID] = Field(min_length=1)
