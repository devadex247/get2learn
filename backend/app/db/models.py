import enum
import uuid
from datetime import datetime, timezone

from sqlalchemy import Boolean, CheckConstraint, Column, DateTime, Enum, ForeignKey, Index, JSON, String, Text, UniqueConstraint, func, text
from sqlalchemy.dialects.postgresql import ARRAY, UUID as PG_UUID
from sqlmodel import Field, Relationship, SQLModel


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


class UserRole(str, enum.Enum):
    student = "student"
    curator = "curator"
    admin = "admin"


class VideoStatus(str, enum.Enum):
    approved = "approved"
    pending = "pending"
    rejected = "rejected"


class VideoLevel(str, enum.Enum):
    beginner = "Beginner"
    intermediate = "Intermediate"
    advanced = "Advanced"


class ReactionValue(str, enum.Enum):
    useful = "useful"
    skip = "skip"


class FeedbackType(str, enum.Enum):
    broken_link = "broken_link"
    topic_request = "topic_request"
    suggestion = "suggestion"


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, sa_column=Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4))
    email: str = Field(sa_column=Column(String(320), unique=True, index=True, nullable=False))
    hashed_password: str = Field(sa_column=Column(String(255), nullable=False))
    role: UserRole = Field(default=UserRole.student, sa_column=Column(Enum(UserRole, name="user_role"), nullable=False, index=True))
    created_at: datetime = Field(
        default_factory=utc_now,
        sa_column=Column(DateTime(timezone=True), nullable=False, server_default=func.now()),
    )

    interactions: list["UserInteraction"] = Relationship(back_populates="user")
    playlists: list["Playlist"] = Relationship(back_populates="user")
    private_notes: list["PrivateNote"] = Relationship(back_populates="user")
    feedback: list["Feedback"] = Relationship(back_populates="user")


class Video(SQLModel, table=True):
    __tablename__ = "videos"
    __table_args__ = (
        CheckConstraint("duration_minutes > 0", name="ck_videos_duration_positive"),
        CheckConstraint("year >= 2000", name="ck_videos_year_valid"),
        Index("ix_videos_status_topic_level", "status", "topic", "level"),
        Index("ix_videos_tags_gin", "tags", postgresql_using="gin"),
    )

    id: uuid.UUID = Field(default_factory=uuid.uuid4, sa_column=Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4))
    title: str = Field(sa_column=Column(String(180), nullable=False, index=True))
    url: str = Field(sa_column=Column(Text, unique=True, nullable=False))
    provider: str = Field(default="External", sa_column=Column(String(80), nullable=False, index=True))
    topic: str = Field(sa_column=Column(String(80), nullable=False, index=True))
    level: VideoLevel = Field(sa_column=Column(Enum(VideoLevel, name="video_level"), nullable=False, index=True))
    duration_minutes: int = Field(nullable=False)
    year: int = Field(nullable=False, index=True)
    description: str = Field(default="", sa_column=Column(Text, nullable=False, server_default=""))
    tags: list[str] = Field(
        default_factory=list,
        sa_column=Column(JSON().with_variant(ARRAY(String(60)), "postgresql"), nullable=False, server_default=text("'[]'")),
    )
    thumbnail_url: str | None = Field(default=None, sa_column=Column(Text, nullable=True))
    status: VideoStatus = Field(default=VideoStatus.pending, sa_column=Column(Enum(VideoStatus, name="video_status"), nullable=False, index=True))
    popularity_score: int = Field(default=0, nullable=False, index=True)
    submitted_by_id: uuid.UUID | None = Field(
        default=None,
        sa_column=Column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True),
    )
    created_at: datetime = Field(default_factory=utc_now, sa_column=Column(DateTime(timezone=True), nullable=False, server_default=func.now()))
    updated_at: datetime = Field(
        default_factory=utc_now,
        sa_column=Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now()),
    )

    interactions: list["UserInteraction"] = Relationship(back_populates="video")
    playlist_items: list["PlaylistItem"] = Relationship(back_populates="video")
    private_notes: list["PrivateNote"] = Relationship(back_populates="video")
    feedback: list["Feedback"] = Relationship(back_populates="video")


class UserInteraction(SQLModel, table=True):
    __tablename__ = "user_interactions"
    __table_args__ = (
        UniqueConstraint("user_id", "video_id", name="uq_user_interactions_user_video"),
        Index("ix_user_interactions_user_saved", "user_id", "is_saved"),
        Index("ix_user_interactions_user_completed", "user_id", "is_completed"),
    )

    id: uuid.UUID = Field(default_factory=uuid.uuid4, sa_column=Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4))
    user_id: uuid.UUID = Field(sa_column=Column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True))
    video_id: uuid.UUID = Field(sa_column=Column(PG_UUID(as_uuid=True), ForeignKey("videos.id", ondelete="CASCADE"), nullable=False, index=True))
    is_saved: bool = Field(default=False, sa_column=Column(Boolean, nullable=False, server_default="false"))
    reaction: ReactionValue | None = Field(default=None, sa_column=Column(Enum(ReactionValue, name="reaction_value"), nullable=True, index=True))
    is_completed: bool = Field(default=False, sa_column=Column(Boolean, nullable=False, server_default="false"))
    completed_at: datetime | None = Field(default=None, sa_column=Column(DateTime(timezone=True), nullable=True))
    updated_at: datetime = Field(
        default_factory=utc_now,
        sa_column=Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now()),
    )

    user: User = Relationship(back_populates="interactions")
    video: Video = Relationship(back_populates="interactions")


class Playlist(SQLModel, table=True):
    __tablename__ = "playlists"
    __table_args__ = (
        UniqueConstraint("user_id", "name", name="uq_playlists_user_name"),
        Index(
            "uq_playlists_default_save_for_later",
            "user_id",
            unique=True,
            postgresql_where=text("is_default_save_for_later = true"),
            sqlite_where=text("is_default_save_for_later = 1"),
        ),
    )

    id: uuid.UUID = Field(default_factory=uuid.uuid4, sa_column=Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4))
    user_id: uuid.UUID = Field(sa_column=Column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True))
    name: str = Field(sa_column=Column(String(80), nullable=False))
    is_default_save_for_later: bool = Field(default=False, sa_column=Column(Boolean, nullable=False, server_default="false"))
    created_at: datetime = Field(default_factory=utc_now, sa_column=Column(DateTime(timezone=True), nullable=False, server_default=func.now()))
    updated_at: datetime = Field(
        default_factory=utc_now,
        sa_column=Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now()),
    )

    user: User = Relationship(back_populates="playlists")
    items: list["PlaylistItem"] = Relationship(back_populates="playlist")


class PlaylistItem(SQLModel, table=True):
    __tablename__ = "playlist_items"
    __table_args__ = (
        UniqueConstraint("playlist_id", "video_id", name="uq_playlist_items_playlist_video"),
        UniqueConstraint("playlist_id", "position", name="uq_playlist_items_playlist_position"),
        Index("ix_playlist_items_playlist_position", "playlist_id", "position"),
    )

    id: uuid.UUID = Field(default_factory=uuid.uuid4, sa_column=Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4))
    playlist_id: uuid.UUID = Field(sa_column=Column(PG_UUID(as_uuid=True), ForeignKey("playlists.id", ondelete="CASCADE"), nullable=False, index=True))
    video_id: uuid.UUID = Field(sa_column=Column(PG_UUID(as_uuid=True), ForeignKey("videos.id", ondelete="CASCADE"), nullable=False, index=True))
    position: int = Field(nullable=False)
    added_at: datetime = Field(default_factory=utc_now, sa_column=Column(DateTime(timezone=True), nullable=False, server_default=func.now()))

    playlist: Playlist = Relationship(back_populates="items")
    video: Video = Relationship(back_populates="playlist_items")


class PrivateNote(SQLModel, table=True):
    __tablename__ = "private_notes"
    __table_args__ = (
        UniqueConstraint("user_id", "video_id", name="uq_private_notes_user_video"),
        Index("ix_private_notes_user_updated", "user_id", "updated_at"),
    )

    id: uuid.UUID = Field(default_factory=uuid.uuid4, sa_column=Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4))
    user_id: uuid.UUID = Field(sa_column=Column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True))
    video_id: uuid.UUID = Field(sa_column=Column(PG_UUID(as_uuid=True), ForeignKey("videos.id", ondelete="CASCADE"), nullable=False, index=True))
    note_text: str = Field(default="", sa_column=Column(Text, nullable=False, server_default=""))
    updated_at: datetime = Field(
        default_factory=utc_now,
        sa_column=Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now()),
    )

    user: User = Relationship(back_populates="private_notes")
    video: Video = Relationship(back_populates="private_notes")


class Feedback(SQLModel, table=True):
    __tablename__ = "feedback"
    __table_args__ = (
        Index("ix_feedback_type_created", "feedback_type", "created_at"),
        Index("ix_feedback_video_created", "video_id", "created_at"),
    )

    id: uuid.UUID = Field(default_factory=uuid.uuid4, sa_column=Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4))
    user_id: uuid.UUID | None = Field(
        default=None,
        sa_column=Column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True),
    )
    video_id: uuid.UUID | None = Field(
        default=None,
        sa_column=Column(PG_UUID(as_uuid=True), ForeignKey("videos.id", ondelete="SET NULL"), nullable=True, index=True),
    )
    feedback_type: FeedbackType = Field(sa_column=Column(Enum(FeedbackType, name="feedback_type"), nullable=False, index=True))
    message: str = Field(sa_column=Column(Text, nullable=False))
    created_at: datetime = Field(default_factory=utc_now, sa_column=Column(DateTime(timezone=True), nullable=False, server_default=func.now()))

    user: User | None = Relationship(back_populates="feedback")
    video: Video | None = Relationship(back_populates="feedback")
