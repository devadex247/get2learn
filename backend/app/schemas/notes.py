import uuid
from datetime import datetime

from pydantic import BaseModel, Field

from app.schemas.common import ORMModel


class PrivateNoteUpsert(BaseModel):
    video_id: uuid.UUID
    note_text: str = Field(max_length=5000)


class PrivateNoteRead(ORMModel):
    id: uuid.UUID
    user_id: uuid.UUID
    video_id: uuid.UUID
    note_text: str
    updated_at: datetime
