import uuid

from app.db.models import ReactionValue, UserInteraction, Video


def score_video_for_user(video: Video, interactions: dict[uuid.UUID, UserInteraction]) -> int:
    score = video.popularity_score
    interaction = interactions.get(video.id)
    if not interaction:
        return score
    if interaction.is_saved:
        score += 18
    if interaction.reaction == ReactionValue.useful:
        score += 14
    if interaction.reaction == ReactionValue.skip:
        score -= 22
    if interaction.is_completed:
        score -= 26
    return score
