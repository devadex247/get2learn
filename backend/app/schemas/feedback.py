import uuid
from datetime import datetime

from pydantic import BaseModel, Field

from app.db.models import FeedbackType
from app.schemas.common import ORMModel


class FeedbackCreate(BaseModel):
    video_id: uuid.UUID | None = None
    feedback_type: FeedbackType
    message: str = Field(min_length=3, max_length=2000)


class FeedbackRead(ORMModel):
    id: uuid.UUID
    user_id: uuid.UUID | None
    video_id: uuid.UUID | None
    feedback_type: FeedbackType
    message: str
    created_at: datetime
