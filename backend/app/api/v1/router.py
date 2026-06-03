from fastapi import APIRouter

from app.api.v1.routes import auth, feedback, interactions, notes, playlists, videos

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(videos.router, prefix="/videos", tags=["videos"])
api_router.include_router(interactions.router, prefix="/interactions", tags=["interactions"])
api_router.include_router(playlists.router, prefix="/playlists", tags=["playlists"])
api_router.include_router(notes.router, prefix="/notes", tags=["notes"])
api_router.include_router(feedback.router, prefix="/feedback", tags=["feedback"])
