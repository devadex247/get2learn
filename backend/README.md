# get2learn Backend

FastAPI/PostgreSQL migration foundation for the get2learn static MVP.

## Current status

- Async FastAPI app scaffold.
- SQLModel relational models for users, videos, interactions, playlists, notes, and feedback.
- JWT authentication and RBAC dependencies.
- Versioned `/api/v1` router structure.
- Paginated video query endpoint with filters, search, and sorting.
- Auth, interaction, playlist, note, and feedback route foundations.
- Vector recommendation service interface draft.

## Local setup

```powershell
cd C:\Users\user\Desktop\Projects\get2learn\backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --port 8000
```

The API will be available at:

```text
http://localhost:8000/api/v1/health
```

## Database setup

If Docker is available:

```powershell
cd C:\Users\user\Desktop\Projects\get2learn\backend
docker compose up -d
.\.venv\Scripts\alembic.exe upgrade head
.\.venv\Scripts\python.exe -m app.db.seed
```

If Docker is not available, install PostgreSQL locally or provide a hosted PostgreSQL URL, then update `.env`:

```text
DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@HOST:PORT/DB_NAME
```

## Notes

- A running PostgreSQL database is required before real API execution.
- `SECRET_KEY` must be changed before production.
- Metadata parsing and vector search are intentionally service boundaries in this pass, so they can later move to Celery/RQ/Arq and ChromaDB/pgvector without rewriting API routes.
