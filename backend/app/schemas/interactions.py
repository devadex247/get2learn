import uuid
from datetime import datetime

from pydantic import BaseModel

from app.db.models import ReactionValue
from app.schemas.common import ORMModel


class InteractionUpdate(BaseModel):
    video_id: uuid.UUID
    is_saved: bool | None = None
    reaction: ReactionValue | None = None
    clear_reaction: bool = False
    is_completed: bool | None = None


class InteractionRead(ORMModel):
    id: uuid.UUID
    user_id: uuid.UUID
    video_id: uuid.UUID
    is_saved: bool
    reaction: ReactionValue | None
    is_completed: bool
    completed_at: datetime | None
    updated_at: datetime
