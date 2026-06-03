from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.dependencies import get_optional_current_user, require_roles
from app.core.errors import ResourceNotFoundError
from app.db.models import Feedback, FeedbackType, User, UserRole, Video
from app.db.session import get_session
from app.schemas.feedback import FeedbackCreate, FeedbackRead

router = APIRouter()


@router.post("", response_model=FeedbackRead, status_code=status.HTTP_201_CREATED)
async def create_feedback(
    payload: FeedbackCreate,
    session: AsyncSession = Depends(get_session),
    current_user: User | None = Depends(get_optional_current_user),
) -> Feedback:
    if payload.video_id:
        video_result = await session.execute(select(Video.id).where(Video.id == payload.video_id))
        if video_result.scalar_one_or_none() is None:
            raise ResourceNotFoundError("Video not found")

    feedback = Feedback(
        user_id=current_user.id if current_user else None,
        video_id=payload.video_id,
        feedback_type=payload.feedback_type,
        message=payload.message,
    )
    session.add(feedback)
    await session.commit()
    await session.refresh(feedback)
    return feedback


@router.get("", response_model=list[FeedbackRead])
async def list_feedback(
    session: AsyncSession = Depends(get_session),
    _: User = Depends(require_roles(UserRole.admin)),
    feedback_type: FeedbackType | None = None,
    limit: int = Query(default=50, ge=1, le=200),
) -> list[Feedback]:
    statement = select(Feedback).order_by(Feedback.created_at.desc()).limit(limit)
    if feedback_type:
        statement = statement.where(Feedback.feedback_type == feedback_type)
    result = await session.execute(statement)
    return list(result.scalars().all())
