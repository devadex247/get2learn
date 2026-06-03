import asyncio
from typing import Any

from sqlalchemy.dialects.postgresql import insert as pg_insert

from app.db.models import Video, VideoLevel, VideoStatus
from app.db.session import AsyncSessionLocal


SEED_VIDEOS: list[dict[str, Any]] = [
    {
        "title": "Next.js App Router Crash Course",
        "url": "https://www.youtube.com/results?search_query=next.js+app+router+crash+course",
        "provider": "YouTube",
        "topic": "Frontend",
        "level": VideoLevel.intermediate,
        "duration_minutes": 38,
        "year": 2026,
        "description": "Server components, routing, loading states, and production patterns for modern React apps.",
        "tags": ["Next.js", "React", "Routing"],
        "thumbnail_url": "https://i.ytimg.com/vi/ZVnjOPwW4ZA/hqdefault.jpg",
        "status": VideoStatus.approved,
        "popularity_score": 96,
    },
    {
        "title": "Docker Fundamentals for Developers",
        "url": "https://www.youtube.com/results?search_query=docker+fundamentals+for+developers",
        "provider": "YouTube",
        "topic": "DevOps",
        "level": VideoLevel.beginner,
        "duration_minutes": 31,
        "year": 2026,
        "description": "Images, containers, volumes, networks, and local development workflows without ceremony.",
        "tags": ["Docker", "Containers", "CLI"],
        "thumbnail_url": "https://i.ytimg.com/vi/pTFZFxd4hOI/hqdefault.jpg",
        "status": VideoStatus.approved,
        "popularity_score": 88,
    },
    {
        "title": "Postgres Indexing Explained Visually",
        "url": "https://www.youtube.com/results?search_query=postgres+indexes+explained",
        "provider": "YouTube",
        "topic": "Backend",
        "level": VideoLevel.intermediate,
        "duration_minutes": 26,
        "year": 2025,
        "description": "A practical guide to B-tree indexes, query plans, and common database performance traps.",
        "tags": ["Postgres", "SQL", "Performance"],
        "thumbnail_url": "https://i.ytimg.com/vi/HubezKbFL7E/hqdefault.jpg",
        "status": VideoStatus.approved,
        "popularity_score": 93,
    },
    {
        "title": "Building AI Products Users Actually Trust",
        "url": "https://www.youtube.com/results?search_query=building+AI+products+users+trust",
        "provider": "YouTube",
        "topic": "AI",
        "level": VideoLevel.intermediate,
        "duration_minutes": 33,
        "year": 2026,
        "description": "Evaluation loops, user controls, retrieval quality, and UX patterns for AI-assisted tools.",
        "tags": ["AI", "UX", "Evaluation"],
        "thumbnail_url": "https://i.ytimg.com/vi/jPhJbKBuNnA/hqdefault.jpg",
        "status": VideoStatus.approved,
        "popularity_score": 89,
    },
]


async def seed_videos() -> None:
    async with AsyncSessionLocal() as session:
        for video in SEED_VIDEOS:
            statement = (
                pg_insert(Video)
                .values(**video)
                .on_conflict_do_update(
                    index_elements=[Video.url],
                    set_={
                        "title": video["title"],
                        "provider": video["provider"],
                        "topic": video["topic"],
                        "level": video["level"],
                        "duration_minutes": video["duration_minutes"],
                        "year": video["year"],
                        "description": video["description"],
                        "tags": video["tags"],
                        "thumbnail_url": video["thumbnail_url"],
                        "status": video["status"],
                        "popularity_score": video["popularity_score"],
                    },
                )
            )
            await session.execute(statement)
        await session.commit()


if __name__ == "__main__":
    asyncio.run(seed_videos())
