import uuid

from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.dependencies import get_current_user
from app.core.errors import ResourceNotFoundError
from app.db.models import PrivateNote, User, Video
from app.db.session import get_session
from app.schemas.notes import PrivateNoteRead, PrivateNoteUpsert

router = APIRouter()


@router.get("", response_model=list[PrivateNoteRead])
async def list_notes(
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
) -> list[PrivateNote]:
    result = await session.execute(
        select(PrivateNote)
        .where(PrivateNote.user_id == current_user.id)
        .order_by(PrivateNote.updated_at.desc())
    )
    return list(result.scalars().all())


@router.put("", response_model=PrivateNoteRead)
async def upsert_note(
    payload: PrivateNoteUpsert,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
) -> PrivateNote:
    video_result = await session.execute(select(Video.id).where(Video.id == payload.video_id))
    if video_result.scalar_one_or_none() is None:
        raise ResourceNotFoundError("Video not found")

    result = await session.execute(
        select(PrivateNote).where(
            PrivateNote.user_id == current_user.id,
            PrivateNote.video_id == payload.video_id,
        )
    )
    note = result.scalar_one_or_none()
    if note:
        note.note_text = payload.note_text
    else:
        note = PrivateNote(user_id=current_user.id, video_id=payload.video_id, note_text=payload.note_text)
        session.add(note)
    await session.commit()
    await session.refresh(note)
    return note


@router.delete("/{video_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_note(
    video_id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
) -> Response:
    result = await session.execute(
        select(PrivateNote).where(
            PrivateNote.user_id == current_user.id,
            PrivateNote.video_id == video_id,
        )
    )
    note = result.scalar_one_or_none()
    if note:
        await session.delete(note)
        await session.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
