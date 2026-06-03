import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query, status
from sqlalchemy import func, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.dependencies import get_optional_current_user, require_roles
from app.core.errors import ResourceConflictError, ResourceNotFoundError
from app.db.models import User, UserRole, Video, VideoLevel, VideoStatus
from app.db.session import get_session
from app.schemas.common import Pagination
from app.schemas.videos import DurationBracket, VideoAddRequest, VideoListResponse, VideoModerationUpdate, VideoRead, VideoSort
from app.services.video_metadata import enqueue_metadata_refresh, parse_metadata_from_url

router = APIRouter()


def duration_condition(duration: DurationBracket | None):
    if duration == "short":
        return Video.duration_minutes < 20
    if duration == "medium":
        return (Video.duration_minutes >= 20) & (Video.duration_minutes <= 45)
    if duration == "long":
        return Video.duration_minutes > 45
    return None


def sort_expression(sort: VideoSort):
    if sort == "newest":
        return (Video.year.desc(), Video.created_at.desc())
    if sort == "shortest":
        return (Video.duration_minutes.asc(), Video.year.desc())
    if sort == "popular":
        return (Video.popularity_score.desc(), Video.year.desc())
    return (Video.popularity_score.desc(), Video.year.desc(), Video.created_at.desc())


@router.get("", response_model=VideoListResponse)
async def list_videos(
    session: AsyncSession = Depends(get_session),
    current_user: User | None = Depends(get_optional_current_user),
    topic: str | None = Query(default=None, max_length=80),
    level: VideoLevel | None = None,
    duration: DurationBracket | None = None,
    search: str | None = Query(default=None, min_length=1, max_length=120),
    sort: VideoSort = "recommended",
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=24, ge=1, le=100),
) -> VideoListResponse:
    _ = current_user
    conditions = [Video.status == VideoStatus.approved]
    if topic:
        conditions.append(Video.topic == topic)
    if level:
        conditions.append(Video.level == level)
    duration_filter = duration_condition(duration)
    if duration_filter is not None:
        conditions.append(duration_filter)
    if search:
        pattern = f"%{search.strip()}%"
        conditions.append(
            or_(
                Video.title.ilike(pattern),
                Video.description.ilike(pattern),
                Video.topic.ilike(pattern),
                Video.provider.ilike(pattern),
            )
        )

    total_result = await session.execute(select(func.count()).select_from(Video).where(*conditions))
    total = total_result.scalar_one()
    offset = (page - 1) * page_size
    result = await session.execute(
        select(Video)
        .where(*conditions)
        .order_by(*sort_expression(sort))
        .offset(offset)
        .limit(page_size)
    )
    videos = result.scalars().all()
    return VideoListResponse(
        items=[VideoRead.model_validate(video) for video in videos],
        pagination=Pagination(page=page, page_size=page_size, total=total),
    )


@router.post("/add", response_model=VideoRead, status_code=status.HTTP_202_ACCEPTED)
async def add_video(
    payload: VideoAddRequest,
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_roles(UserRole.curator, UserRole.admin)),
) -> Video:
    raw_url = str(payload.url)
    existing = await session.execute(select(Video).where(Video.url == raw_url))
    if existing.scalar_one_or_none():
        raise ResourceConflictError("This video URL already exists")

    metadata = await parse_metadata_from_url(payload.url)
    now_year = datetime.now(timezone.utc).year
    video = Video(
        title=payload.title or raw_url,
        url=raw_url,
        provider=metadata.provider,
        topic=payload.topic or "Unsorted",
        level=payload.level or VideoLevel.beginner,
        duration_minutes=payload.duration_minutes or 1,
        year=payload.year or now_year,
        description=payload.description or "",
        tags=payload.tags,
        thumbnail_url=str(payload.thumbnail_url) if payload.thumbnail_url else metadata.thumbnail_url,
        status=VideoStatus.approved,
        submitted_by_id=current_user.id,
    )
    session.add(video)
    await session.commit()
    await session.refresh(video)
    background_tasks.add_task(enqueue_metadata_refresh, str(video.id), raw_url)
    return video


@router.get("/moderation", response_model=list[VideoRead])
async def moderation_queue(
    session: AsyncSession = Depends(get_session),
    _: User = Depends(require_roles(UserRole.curator, UserRole.admin)),
    status_filter: VideoStatus = Query(default=VideoStatus.pending, alias="status"),
    limit: int = Query(default=50, ge=1, le=100),
) -> list[VideoRead]:
    result = await session.execute(
        select(Video)
        .where(Video.status == status_filter)
        .order_by(Video.created_at.asc())
        .limit(limit)
    )
    return [VideoRead.model_validate(video) for video in result.scalars().all()]


@router.put("/{video_id}/moderate", response_model=VideoRead)
async def moderate_video(
    video_id: uuid.UUID,
    payload: VideoModerationUpdate,
    session: AsyncSession = Depends(get_session),
    _: User = Depends(require_roles(UserRole.admin)),
) -> Video:
    result = await session.execute(select(Video).where(Video.id == video_id))
    video = result.scalar_one_or_none()
    if not video:
        raise ResourceNotFoundError("Video not found")
    video.status = payload.status
    await session.commit()
    await session.refresh(video)
    return video
