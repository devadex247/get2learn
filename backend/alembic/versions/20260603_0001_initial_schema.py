"""initial schema

Revision ID: 20260603_0001
Revises:
Create Date: 2026-06-03
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "20260603_0001"
down_revision = None
branch_labels = None
depends_on = None


user_role = postgresql.ENUM("student", "curator", "admin", name="user_role")
video_status = postgresql.ENUM("approved", "pending", "rejected", name="video_status")
video_level = postgresql.ENUM("beginner", "intermediate", "advanced", name="video_level")
reaction_value = postgresql.ENUM("useful", "skip", name="reaction_value")
feedback_type = postgresql.ENUM("broken_link", "topic_request", "suggestion", name="feedback_type")


def upgrade() -> None:
    bind = op.get_bind()
    user_role.create(bind, checkfirst=True)
    video_status.create(bind, checkfirst=True)
    video_level.create(bind, checkfirst=True)
    reaction_value.create(bind, checkfirst=True)
    feedback_type.create(bind, checkfirst=True)

    op.create_table(
        "users",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("email", sa.String(length=320), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("role", user_role, nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_users_email", "users", ["email"], unique=True)
    op.create_index("ix_users_role", "users", ["role"], unique=False)

    op.create_table(
        "videos",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("title", sa.String(length=180), nullable=False),
        sa.Column("url", sa.Text(), nullable=False),
        sa.Column("provider", sa.String(length=80), nullable=False),
        sa.Column("topic", sa.String(length=80), nullable=False),
        sa.Column("level", video_level, nullable=False),
        sa.Column("duration_minutes", sa.Integer(), nullable=False),
        sa.Column("year", sa.Integer(), nullable=False),
        sa.Column("description", sa.Text(), server_default="", nullable=False),
        sa.Column("tags", postgresql.ARRAY(sa.String(length=60)), server_default="{}", nullable=False),
        sa.Column("thumbnail_url", sa.Text(), nullable=True),
        sa.Column("status", video_status, nullable=False),
        sa.Column("popularity_score", sa.Integer(), nullable=False),
        sa.Column("submitted_by_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.CheckConstraint("duration_minutes > 0", name="ck_videos_duration_positive"),
        sa.CheckConstraint("year >= 2000", name="ck_videos_year_valid"),
        sa.ForeignKeyConstraint(["submitted_by_id"], ["users.id"], ondelete="SET NULL"),
    )
    op.create_index("ix_videos_title", "videos", ["title"], unique=False)
    op.create_index("ix_videos_provider", "videos", ["provider"], unique=False)
    op.create_index("ix_videos_topic", "videos", ["topic"], unique=False)
    op.create_index("ix_videos_level", "videos", ["level"], unique=False)
    op.create_index("ix_videos_year", "videos", ["year"], unique=False)
    op.create_index("ix_videos_status", "videos", ["status"], unique=False)
    op.create_index("ix_videos_popularity_score", "videos", ["popularity_score"], unique=False)
    op.create_index("ix_videos_submitted_by_id", "videos", ["submitted_by_id"], unique=False)
    op.create_index("ix_videos_status_topic_level", "videos", ["status", "topic", "level"], unique=False)
    op.create_index("ix_videos_tags_gin", "videos", ["tags"], unique=False, postgresql_using="gin")
    op.create_unique_constraint("uq_videos_url", "videos", ["url"])

    op.create_table(
        "user_interactions",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("video_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("is_saved", sa.Boolean(), server_default="false", nullable=False),
        sa.Column("reaction", reaction_value, nullable=True),
        sa.Column("is_completed", sa.Boolean(), server_default="false", nullable=False),
        sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["video_id"], ["videos.id"], ondelete="CASCADE"),
        sa.UniqueConstraint("user_id", "video_id", name="uq_user_interactions_user_video"),
    )
    op.create_index("ix_user_interactions_user_id", "user_interactions", ["user_id"], unique=False)
    op.create_index("ix_user_interactions_video_id", "user_interactions", ["video_id"], unique=False)
    op.create_index("ix_user_interactions_reaction", "user_interactions", ["reaction"], unique=False)
    op.create_index("ix_user_interactions_user_saved", "user_interactions", ["user_id", "is_saved"], unique=False)
    op.create_index("ix_user_interactions_user_completed", "user_interactions", ["user_id", "is_completed"], unique=False)

    op.create_table(
        "playlists",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("name", sa.String(length=80), nullable=False),
        sa.Column("is_default_save_for_later", sa.Boolean(), server_default="false", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.UniqueConstraint("user_id", "name", name="uq_playlists_user_name"),
    )
    op.create_index("ix_playlists_user_id", "playlists", ["user_id"], unique=False)
    op.create_index(
        "uq_playlists_default_save_for_later",
        "playlists",
        ["user_id"],
        unique=True,
        postgresql_where=sa.text("is_default_save_for_later = true"),
    )

    op.create_table(
        "playlist_items",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("playlist_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("video_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("position", sa.Integer(), nullable=False),
        sa.Column("added_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["playlist_id"], ["playlists.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["video_id"], ["videos.id"], ondelete="CASCADE"),
        sa.UniqueConstraint("playlist_id", "video_id", name="uq_playlist_items_playlist_video"),
        sa.UniqueConstraint("playlist_id", "position", name="uq_playlist_items_playlist_position"),
    )
    op.create_index("ix_playlist_items_playlist_id", "playlist_items", ["playlist_id"], unique=False)
    op.create_index("ix_playlist_items_video_id", "playlist_items", ["video_id"], unique=False)
    op.create_index("ix_playlist_items_playlist_position", "playlist_items", ["playlist_id", "position"], unique=False)

    op.create_table(
        "private_notes",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("video_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("note_text", sa.Text(), server_default="", nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["video_id"], ["videos.id"], ondelete="CASCADE"),
        sa.UniqueConstraint("user_id", "video_id", name="uq_private_notes_user_video"),
    )
    op.create_index("ix_private_notes_user_id", "private_notes", ["user_id"], unique=False)
    op.create_index("ix_private_notes_video_id", "private_notes", ["video_id"], unique=False)
    op.create_index("ix_private_notes_user_updated", "private_notes", ["user_id", "updated_at"], unique=False)

    op.create_table(
        "feedback",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("video_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("feedback_type", feedback_type, nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="SET NULL"),
        sa.ForeignKeyConstraint(["video_id"], ["videos.id"], ondelete="SET NULL"),
    )
    op.create_index("ix_feedback_user_id", "feedback", ["user_id"], unique=False)
    op.create_index("ix_feedback_video_id", "feedback", ["video_id"], unique=False)
    op.create_index("ix_feedback_feedback_type", "feedback", ["feedback_type"], unique=False)
    op.create_index("ix_feedback_type_created", "feedback", ["feedback_type", "created_at"], unique=False)
    op.create_index("ix_feedback_video_created", "feedback", ["video_id", "created_at"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_feedback_video_created", table_name="feedback")
    op.drop_index("ix_feedback_type_created", table_name="feedback")
    op.drop_index("ix_feedback_feedback_type", table_name="feedback")
    op.drop_index("ix_feedback_video_id", table_name="feedback")
    op.drop_index("ix_feedback_user_id", table_name="feedback")
    op.drop_table("feedback")

    op.drop_index("ix_private_notes_user_updated", table_name="private_notes")
    op.drop_index("ix_private_notes_video_id", table_name="private_notes")
    op.drop_index("ix_private_notes_user_id", table_name="private_notes")
    op.drop_table("private_notes")

    op.drop_index("ix_playlist_items_playlist_position", table_name="playlist_items")
    op.drop_index("ix_playlist_items_video_id", table_name="playlist_items")
    op.drop_index("ix_playlist_items_playlist_id", table_name="playlist_items")
    op.drop_table("playlist_items")

    op.drop_index("uq_playlists_default_save_for_later", table_name="playlists")
    op.drop_index("ix_playlists_user_id", table_name="playlists")
    op.drop_table("playlists")

    op.drop_index("ix_user_interactions_user_completed", table_name="user_interactions")
    op.drop_index("ix_user_interactions_user_saved", table_name="user_interactions")
    op.drop_index("ix_user_interactions_reaction", table_name="user_interactions")
    op.drop_index("ix_user_interactions_video_id", table_name="user_interactions")
    op.drop_index("ix_user_interactions_user_id", table_name="user_interactions")
    op.drop_table("user_interactions")

    op.drop_constraint("uq_videos_url", "videos", type_="unique")
    op.drop_index("ix_videos_tags_gin", table_name="videos")
    op.drop_index("ix_videos_status_topic_level", table_name="videos")
    op.drop_index("ix_videos_submitted_by_id", table_name="videos")
    op.drop_index("ix_videos_popularity_score", table_name="videos")
    op.drop_index("ix_videos_status", table_name="videos")
    op.drop_index("ix_videos_year", table_name="videos")
    op.drop_index("ix_videos_level", table_name="videos")
    op.drop_index("ix_videos_topic", table_name="videos")
    op.drop_index("ix_videos_provider", table_name="videos")
    op.drop_index("ix_videos_title", table_name="videos")
    op.drop_table("videos")

    op.drop_index("ix_users_role", table_name="users")
    op.drop_index("ix_users_email", table_name="users")
    op.drop_table("users")

    feedback_type.drop(op.get_bind(), checkfirst=True)
    reaction_value.drop(op.get_bind(), checkfirst=True)
    video_level.drop(op.get_bind(), checkfirst=True)
    video_status.drop(op.get_bind(), checkfirst=True)
    user_role.drop(op.get_bind(), checkfirst=True)
