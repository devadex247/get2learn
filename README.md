# get2learn

Fast, dependency-free MVP slice for a curated video access platform aimed at young tech professionals.

## What is implemented

- Responsive video directory with curated seed data.
- Client-side search, filters, sorting, saved-only mode, and new-this-year mode.
- Personalized recommendation rail based on saved videos and reactions.
- Save for Later plus custom playlists with click controls and drag-and-drop reorder.
- Lightweight reactions: Useful and Skip.
- Feedback dialog for broken links, topic requests, and quality suggestions.
- Local-first persistence through `localStorage`.

## Performance posture

- No build step or framework runtime for this first slice.
- Static HTML/CSS/JS can be opened directly in the browser.
- Gallery uses thumbnail links instead of heavy embedded video iframes.
- Images are lazy loaded with fixed dimensions to reduce layout shift.
- Search/filtering happens in memory and schedules rendering through `requestAnimationFrame`.

## Next implementation steps

1. Add admin ingestion workflow with URL validation and metadata capture.
2. Migrate seed data and local interactions to Supabase tables.
3. Add auth, row-level security, and per-user preference sync.
4. Add bundle/CWV monitoring after moving into Next.js.
