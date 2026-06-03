import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.dependencies import get_current_user
from app.core.errors import ResourceConflictError, ResourceNotFoundError
from app.db.models import Playlist, PlaylistItem, User, Video
from app.db.session import get_session
from app.schemas.playlists import PlaylistAddItem, PlaylistCreate, PlaylistItemRead, PlaylistRead, PlaylistReorder
from app.schemas.videos import VideoRead

router = APIRouter()


async def get_owned_playlist(session: AsyncSession, playlist_id: uuid.UUID, user_id: uuid.UUID) -> Playlist:
    result = await session.execute(
        select(Playlist).where(Playlist.id == playlist_id, Playlist.user_id == user_id)
    )
    playlist = result.scalar_one_or_none()
    if not playlist:
        raise ResourceNotFoundError("Playlist not found")
    return playlist


async def ensure_default_playlist(session: AsyncSession, user: User) -> Playlist:
    result = await session.execute(
        select(Playlist).where(
            Playlist.user_id == user.id,
            Playlist.is_default_save_for_later.is_(True),
        )
    )
    playlist = result.scalar_one_or_none()
    if playlist:
        return playlist

    playlist = Playlist(user_id=user.id, name="Save for Later", is_default_save_for_later=True)
    session.add(playlist)
    await session.commit()
    await session.refresh(playlist)
    return playlist


async def playlist_to_read(session: AsyncSession, playlist: Playlist) -> PlaylistRead:
    result = await session.execute(
        select(PlaylistItem, Video)
        .join(Video, PlaylistItem.video_id == Video.id)
        .where(PlaylistItem.playlist_id == playlist.id)
        .order_by(PlaylistItem.position.asc())
    )
    items = [
        PlaylistItemRead(
            id=item.id,
            video_id=item.video_id,
            position=item.position,
            added_at=item.added_at,
            video=VideoRead.model_validate(video),
        )
        for item, video in result.all()
    ]
    return PlaylistRead(
        id=playlist.id,
        user_id=playlist.user_id,
        name=playlist.name,
        is_default_save_for_later=playlist.is_default_save_for_later,
        created_at=playlist.created_at,
        updated_at=playlist.updated_at,
        items=items,
    )


@router.get("", response_model=list[PlaylistRead])
async def list_playlists(
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
) -> list[PlaylistRead]:
    await ensure_default_playlist(session, current_user)
    result = await session.execute(
        select(Playlist)
        .where(Playlist.user_id == current_user.id)
        .order_by(Playlist.is_default_save_for_later.desc(), Playlist.updated_at.desc())
    )
    playlists = result.scalars().all()
    return [await playlist_to_read(session, playlist) for playlist in playlists]


@router.post("", response_model=PlaylistRead, status_code=status.HTTP_201_CREATED)
async def create_playlist(
    payload: PlaylistCreate,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
) -> PlaylistRead:
    playlist = Playlist(user_id=current_user.id, name=payload.name.strip())
    session.add(playlist)
    try:
        await session.commit()
    except IntegrityError as exc:
        await session.rollback()
        raise ResourceConflictError("Playlist name already exists") from exc
    await session.refresh(playlist)
    return await playlist_to_read(session, playlist)


@router.post("/{playlist_id}/items", response_model=PlaylistRead)
async def add_playlist_item(
    playlist_id: uuid.UUID,
    payload: PlaylistAddItem,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
) -> PlaylistRead:
    playlist = await get_owned_playlist(session, playlist_id, current_user.id)
    video_result = await session.execute(select(Video.id).where(Video.id == payload.video_id))
    if video_result.scalar_one_or_none() is None:
        raise ResourceNotFoundError("Video not found")

    existing = await session.execute(
        select(PlaylistItem).where(
            PlaylistItem.playlist_id == playlist_id,
            PlaylistItem.video_id == payload.video_id,
        )
    )
    if existing.scalar_one_or_none():
        return await playlist_to_read(session, playlist)

    max_position = await session.execute(
        select(func.coalesce(func.max(PlaylistItem.position), -1)).where(PlaylistItem.playlist_id == playlist_id)
    )
    position = int(max_position.scalar_one()) + 1
    session.add(PlaylistItem(playlist_id=playlist_id, video_id=payload.video_id, position=position))
    await session.commit()
    await session.refresh(playlist)
    return await playlist_to_read(session, playlist)


@router.put("/{playlist_id}/reorder", response_model=PlaylistRead)
async def reorder_playlist(
    playlist_id: uuid.UUID,
    payload: PlaylistReorder,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
) -> PlaylistRead:
    if len(payload.ordered_video_ids) != len(set(payload.ordered_video_ids)):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Video IDs must be unique")

    playlist = await get_owned_playlist(session, playlist_id, current_user.id)
    result = await session.execute(select(PlaylistItem).where(PlaylistItem.playlist_id == playlist_id))
    items = result.scalars().all()
    by_video_id = {item.video_id: item for item in items}
    if set(by_video_id) != set(payload.ordered_video_ids):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reorder payload must contain every playlist video exactly once",
        )

    for index, video_id in enumerate(payload.ordered_video_ids):
        by_video_id[video_id].position = -index - 1
    await session.flush()

    for index, video_id in enumerate(payload.ordered_video_ids):
        by_video_id[video_id].position = index

    await session.commit()
    await session.refresh(playlist)
    return await playlist_to_read(session, playlist)
