from pydantic import BaseModel, HttpUrl


class VideoMetadata(BaseModel):
    provider: str = "External"
    thumbnail_url: str | None = None


def extract_youtube_id(url: str) -> str | None:
    try:
        from urllib.parse import parse_qs, urlparse

        parsed = urlparse(url)
        host = parsed.hostname or ""
        if host.endswith("youtu.be"):
            return parsed.path.strip("/").split("/")[0]
        if host.endswith("youtube.com"):
            query_id = parse_qs(parsed.query).get("v", [None])[0]
            if query_id:
                return query_id
            parts = [part for part in parsed.path.split("/") if part]
            if len(parts) >= 2 and parts[0] in {"embed", "shorts"}:
                return parts[1]
    except ValueError:
        return None
    return None


def infer_provider(url: str) -> str:
    try:
        from urllib.parse import urlparse

        host = (urlparse(url).hostname or "").replace("www.", "")
        if "youtube.com" in host or "youtu.be" in host:
            return "YouTube"
        if "vimeo.com" in host:
            return "Vimeo"
        return host.split(".")[0].title() if host else "External"
    except ValueError:
        return "External"


async def parse_metadata_from_url(url: HttpUrl | str) -> VideoMetadata:
    raw_url = str(url)
    youtube_id = extract_youtube_id(raw_url)
    return VideoMetadata(
        provider=infer_provider(raw_url),
        thumbnail_url=f"https://i.ytimg.com/vi/{youtube_id}/hqdefault.jpg" if youtube_id else None,
    )


async def enqueue_metadata_refresh(video_id: str, url: str) -> None:
    # Placeholder for Celery/RQ/Arq. Keep API code stable while worker tech is chosen.
    _ = (video_id, url)
