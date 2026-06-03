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

First verify your `.env` without printing secrets:

```powershell
.\.venv\Scripts\python.exe -m app.db.doctor
```

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

For Supabase, prefer the **Session Pooler** URL on port `5432`, converted to:

```text
postgresql+asyncpg://postgres.PROJECT_REF:PASSWORD@aws-0-REGION.pooler.supabase.com:5432/postgres
```

If Supabase only gives you a Transaction Pooler URL on port `6543`, the backend automatically adds `prepared_statement_cache_size=0` for SQLAlchemy/asyncpg. Session Pooler is still preferred for this persistent FastAPI service.

After migration and seeding, start the API and run:

```powershell
uvicorn app.main:app --reload --port 8000
.\.venv\Scripts\python.exe -m app.services.api_smoke
```

## Checks

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests
.\.venv\Scripts\python.exe -m compileall app alembic tests
```

## Notes

- A running PostgreSQL database is required before real API execution.
- `SECRET_KEY` must be changed before production.
- Metadata parsing and vector search are intentionally service boundaries in this pass, so they can later move to Celery/RQ/Arq and ChromaDB/pgvector without rewriting API routes.
