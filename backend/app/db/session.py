from collections.abc import AsyncGenerator
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlmodel import SQLModel

from app.core.config import get_settings

settings = get_settings()


def is_transaction_pooler_url(database_url: str) -> bool:
    parsed = urlsplit(database_url)
    return (parsed.hostname or "").endswith("pooler.supabase.com") and parsed.port == 6543


def database_url_for_engine(database_url: str) -> str:
    parsed = urlsplit(database_url)
    query = dict(parse_qsl(parsed.query, keep_blank_values=True))

    if settings.db_prepared_statement_cache_size is not None:
        query["prepared_statement_cache_size"] = str(settings.db_prepared_statement_cache_size)
    elif is_transaction_pooler_url(database_url):
        query.setdefault("prepared_statement_cache_size", "0")

    return urlunsplit((parsed.scheme, parsed.netloc, parsed.path, urlencode(query), parsed.fragment))


engine = create_async_engine(
    database_url_for_engine(settings.database_url),
    echo=settings.db_echo,
    pool_pre_ping=True,
    pool_size=settings.db_pool_size,
    max_overflow=settings.db_max_overflow,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session


async def create_db_and_tables() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
