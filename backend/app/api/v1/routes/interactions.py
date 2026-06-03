from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.dependencies import get_current_user
from app.core.errors import ResourceNotFoundError
from app.db.models import User, UserInteraction, Video
from app.db.session import get_session
from app.schemas.interactions import InteractionRead, InteractionUpdate

router = APIRouter()


@router.post("", response_model=InteractionRead)
async def update_interaction(
    payload: InteractionUpdate,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
) -> UserInteraction:
    has_update = any(
        [
            payload.is_saved is not None,
            payload.reaction is not None,
            payload.clear_reaction,
            payload.is_completed is not None,
        ]
    )
    if not has_update:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No interaction update supplied")

    video_result = await session.execute(select(Video.id).where(Video.id == payload.video_id))
    if video_result.scalar_one_or_none() is None:
        raise ResourceNotFoundError("Video not found")

    now = datetime.now(timezone.utc)
    insert_values = {
        "user_id": current_user.id,
        "video_id": payload.video_id,
        "is_saved": payload.is_saved if payload.is_saved is not None else False,
        "reaction": None if payload.clear_reaction else payload.reaction,
        "is_completed": payload.is_completed if payload.is_completed is not None else False,
        "completed_at": now if payload.is_completed else None,
        "updated_at": now,
    }
    update_values = {"updated_at": now}
    if payload.is_saved is not None:
        update_values["is_saved"] = payload.is_saved
    if payload.clear_reaction:
        update_values["reaction"] = None
    elif payload.reaction is not None:
        update_values["reaction"] = payload.reaction
    if payload.is_completed is not None:
        update_values["is_completed"] = payload.is_completed
        update_values["completed_at"] = now if payload.is_completed else None

    stmt = (
        pg_insert(UserInteraction)
        .values(**insert_values)
        .on_conflict_do_update(
            index_elements=[UserInteraction.user_id, UserInteraction.video_id],
            set_=update_values,
        )
    )
    await session.execute(stmt)
    await session.commit()

    result = await session.execute(
        select(UserInteraction).where(
            UserInteraction.user_id == current_user.id,
            UserInteraction.video_id == payload.video_id,
        )
    )
    return result.scalar_one()
