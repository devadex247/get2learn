import asyncio
from dataclasses import dataclass
from sqlalchemy.exc import SQLAlchemyError
from urllib.parse import urlsplit, urlunsplit

from sqlalchemy import text

from app.core.config import get_settings
from app.db.session import database_url_for_engine, engine


@dataclass(frozen=True)
class DatabaseUrlReport:
    safe_url: str
    safe_engine_url: str
    is_asyncpg: bool
    is_supabase: bool
    is_local: bool
    uses_pooler: bool
    looks_transaction_pooler: bool
    disables_prepared_statement_cache: bool


def mask_database_url(database_url: str) -> str:
    parsed = urlsplit(database_url)
    if not parsed.netloc:
        return database_url
    host_part = parsed.hostname or ""
    port_part = f":{parsed.port}" if parsed.port else ""
    username = parsed.username or ""
    masked_auth = f"{username}:***@" if username else ""
    return urlunsplit((parsed.scheme, f"{masked_auth}{host_part}{port_part}", parsed.path, parsed.query, parsed.fragment))


def inspect_database_url(database_url: str) -> DatabaseUrlReport:
    parsed = urlsplit(database_url)
    engine_url = database_url_for_engine(database_url)
    host = parsed.hostname or ""
    return DatabaseUrlReport(
        safe_url=mask_database_url(database_url),
        safe_engine_url=mask_database_url(engine_url),
        is_asyncpg=database_url.startswith("postgresql+asyncpg://"),
        is_supabase="supabase" in host or "pooler.supabase.com" in host,
        is_local=host in {"localhost", "127.0.0.1"},
        uses_pooler="pooler.supabase.com" in host,
        looks_transaction_pooler=parsed.port == 6543,
        disables_prepared_statement_cache="prepared_statement_cache_size=0" in engine_url,
    )


async def check_database() -> None:
    settings = get_settings()
    report = inspect_database_url(settings.database_url)

    print("Database URL:", report.safe_url)
    print("Engine URL:", report.safe_engine_url)
    print("Uses asyncpg:", report.is_asyncpg)
    print("Supabase host:", report.is_supabase)
    print("Local host:", report.is_local)
    print("Supabase pooler:", report.uses_pooler)
    print("Transaction pooler port:", report.looks_transaction_pooler)
    print("Prepared statement cache disabled:", report.disables_prepared_statement_cache)

    if not report.is_asyncpg:
        raise SystemExit("DATABASE_URL must start with postgresql+asyncpg://")
    if report.looks_transaction_pooler:
        print("Warning: port 6543 is usually transaction pooler mode; prefer Supabase Session Pooler on 5432 for this backend.")

    try:
        async with engine.connect() as connection:
            version = await connection.scalar(text("select version()"))
            current_database = await connection.scalar(text("select current_database()"))
            try:
                alembic_version = await connection.scalar(
                    text("select version_num from alembic_version limit 1")
                )
            except SQLAlchemyError:
                alembic_version = None
    except (OSError, SQLAlchemyError) as exc:
        print("Connection check: failed")
        print(f"Reason: {exc}")
        raise SystemExit(1) from exc

    print("Connected database:", current_database)
    print("Postgres version:", version)
    print("Alembic version:", alembic_version or "not migrated")


if __name__ == "__main__":
    asyncio.run(check_database())
