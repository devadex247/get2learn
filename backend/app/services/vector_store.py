import uuid
from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass(frozen=True)
class VectorDocument:
    id: uuid.UUID
    text: str
    metadata: dict[str, str | int | float | bool]


@dataclass(frozen=True)
class VectorMatch:
    id: uuid.UUID
    score: float


class VectorStore(ABC):
    @abstractmethod
    async def upsert_video(self, document: VectorDocument, embedding: list[float]) -> None:
        raise NotImplementedError

    @abstractmethod
    async def search_similar(self, embedding: list[float], limit: int = 20) -> list[VectorMatch]:
        raise NotImplementedError


class NullVectorStore(VectorStore):
    async def upsert_video(self, document: VectorDocument, embedding: list[float]) -> None:
        _ = (document, embedding)

    async def search_similar(self, embedding: list[float], limit: int = 20) -> list[VectorMatch]:
        _ = (embedding, limit)
        return []


def build_video_document_text(title: str, topic: str, level: str, description: str, tags: list[str]) -> str:
    return " ".join([title, topic, level, description, " ".join(tags)]).strip()
