import asyncio

from alembic import command
from alembic.config import Config

from app.core.config import get_settings
from app.db.doctor import check_database, inspect_database_url
from app.db.seed import seed_videos


def run_migrations() -> None:
    alembic_config = Config("alembic.ini")
    command.upgrade(alembic_config, "head")


async def main() -> None:
    settings = get_settings()
    report = inspect_database_url(settings.database_url)

    if report.is_local:
        raise SystemExit(
            "DATABASE_URL still points to local Postgres. Set backend/.env to your Supabase URL before running setup."
        )

    print("Step 1/4: checking database connection")
    await check_database()

    print("Step 2/4: applying Alembic migrations")
    run_migrations()

    print("Step 3/4: seeding starter videos")
    await seed_videos()

    print("Step 4/4: checking final database state")
    await check_database()
    print("Database setup complete")


if __name__ == "__main__":
    asyncio.run(main())
