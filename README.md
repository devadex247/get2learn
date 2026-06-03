# get2learn

Fast, dependency-free MVP slice for a curated video access platform aimed at young tech professionals.

## What is implemented

- Responsive video directory with curated seed data.
- Client-side search, filters, sorting, saved-only mode, and new-this-year mode.
- Personalized recommendation rail based on saved videos and reactions.
- Save for Later plus custom playlists with click controls and drag-and-drop reorder.
- Completion tracking, an unfinished-only filter, and a learning progress bar.
- Video detail drawer with private notes, save, complete, add-to-playlist, and report actions.
- Local curator ingestion for adding new video links from the UI.
- Lightweight reactions: Useful and Skip.
- Feedback dialog for broken links, topic requests, and quality suggestions.
- Local-first persistence through `localStorage`.
- Backend API bridge with local fallback behavior.

## Performance posture

- No build step or framework runtime for this first slice.
- Static HTML/CSS/JS can be opened directly in the browser.
- Gallery uses thumbnail links instead of heavy embedded video iframes.
- Images are lazy loaded with fixed dimensions to reduce layout shift.
- Search/filtering happens in memory and schedules rendering through `requestAnimationFrame`.
- Video embeds are intentionally deferred; users open the source video only when they choose to.
- The frontend checks `http://127.0.0.1:8000/api/v1/health` and can sync server videos once the backend database is available.

## Next implementation steps

1. Add export/import for locally curated video data.
2. Run PostgreSQL migrations and seed backend video data.
3. Add frontend auth screens and migrate interactions to authenticated API calls.
4. Add admin moderation states for submitted links.
5. Add bundle/CWV monitoring after moving into Next.js.
