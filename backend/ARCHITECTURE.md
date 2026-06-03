# get2learn Backend Architecture

## Project Layout

```text
backend/
  app/
    main.py                  # FastAPI app factory, CORS, routers, health
    core/
      config.py              # Environment settings
      dependencies.py        # Auth dependencies and RBAC guards
      errors.py              # Shared exception handlers
      security.py            # Password hashing and JWT creation
    db/
      models.py              # SQLModel relational models
      session.py             # Async SQLAlchemy engine/session
    schemas/                 # Pydantic request/response contracts
    api/v1/
      router.py              # Versioned API composition
      routes/                # Auth, videos, interactions, playlists, notes, feedback
    services/
      video_metadata.py      # URL/provider/thumbnail parsing boundary
      recommendations.py     # Relational recommendation scoring draft
      vector_store.py        # ChromaDB/FAISS/pgvector adapter boundary
  alembic/                   # Database migration environment
  requirements.txt
  .env.example
```

## Database Strategy

The schema is normalized around durable user and content entities:

- `users`: authentication identity and role.
- `videos`: approved or pending curated resources.
- `user_interactions`: one row per user/video for saved, reaction, and completion state.
- `playlists`: user-owned learning queues.
- `playlist_items`: association table with `position`, chosen over an array to support efficient reorder, constraints, joins, and analytics.
- `private_notes`: one private note per user/video.
- `feedback`: broken-link reports, topic requests, and suggestions.

PostgreSQL-specific choices:

- UUID primary keys for safer public API identifiers.
- `ARRAY(String)` for video tags in this backend v1.
- GIN index for tag filtering/search expansion later.
- Partial unique index for one default `Save for Later` playlist per user.

## RBAC

- `student`: can read approved videos and manage their own interactions, playlists, notes, and feedback.
- `curator`: can add approved videos and view moderation queues.
- `admin`: can moderate videos, inspect feedback, and later manage users/dashboard state.

RBAC is enforced through FastAPI dependencies:

```python
Depends(require_roles(UserRole.curator, UserRole.admin))
Depends(require_roles(UserRole.admin))
```

## API Performance

- `GET /api/v1/videos` is paginated and filters server-side.
- Search currently uses indexed relational fields and `ILIKE`; this can evolve to PostgreSQL full-text search.
- Interaction updates use PostgreSQL `ON CONFLICT DO UPDATE` for atomic save/reaction/completion mutations.
- Playlist reorder uses a two-phase position update to avoid temporary unique-position collisions.
- Metadata parsing is behind a service boundary so it can move from FastAPI `BackgroundTasks` to Celery/RQ/Arq later.

## Semantic Search Draft

The vector layer is intentionally an adapter interface:

```python
VectorStore.upsert_video(document, embedding)
VectorStore.search_similar(embedding, limit)
```

Recommended progression:

1. Start with relational recommendations using `user_interactions`.
2. Add embeddings for `title + topic + level + description + tags`.
3. Store vectors in pgvector for operational simplicity, or ChromaDB for experimentation.
4. Blend vector scores with relational signals:
   - saved videos
   - useful reactions
   - skipped videos
   - completed videos
   - topic affinity

This keeps the frontend fast because recommendations are fetched as small paginated API responses rather than computed in the browser.
