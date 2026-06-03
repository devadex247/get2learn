# get2learn Functioning Features

This document lists the features currently implemented and functioning in the static get2learn MVP. The app is currently a frontend-only web application built with plain HTML, CSS, and JavaScript.

## Application Type

- Static frontend web app.
- Runs without a build step or package installation.
- Can be opened directly through `index.html` or served with a simple local HTTP server.
- Stores user activity locally in the browser through `localStorage`.

## Video Directory

- Displays a curated catalogue of tech education videos.
- Each video card includes:
  - Thumbnail.
  - Title.
  - Topic.
  - Difficulty level.
  - Duration.
  - Description.
  - Tags.
  - Source link.
- Video thumbnails are lazy loaded to reduce initial page weight.
- Video embeds are intentionally not loaded in the directory, keeping the page fast.

## Search And Filtering

- Client-side search works across:
  - Title.
  - Topic.
  - Level.
  - Provider.
  - Description.
  - Tags.
  - Saved private notes.
- Topic filter.
- Level filter.
- Duration filter:
  - Any length.
  - Under 20 minutes.
  - 20-45 minutes.
  - 45+ minutes.
- Sorting options:
  - Recommended.
  - Newest.
  - Shortest.
  - Most useful.
- Quick filters:
  - Saved only.
  - New this year.
  - Unfinished only.

## Saved Videos

- Users can save videos from each video card.
- Saved state persists after page refresh.
- Saved videos are automatically added to the default `Save for Later` playlist.
- Users can filter the directory to show only saved videos.

## Playlists

- Default `Save for Later` playlist is available.
- Users can create custom playlists.
- Users can add videos to the active playlist.
- Playlist items persist after page refresh.
- Playlist items can be reordered with:
  - Up button.
  - Down button.
  - Drag and drop.
- Playlist items can be removed.
- Removing a video from `Save for Later` also removes its saved state.

## Reactions

- Users can mark videos as:
  - Useful.
  - Skip.
- Reaction state persists after page refresh.
- Useful videos improve recommendation scoring.
- Skipped videos are deprioritized in recommendations.

## Learning Progress

- Users can mark videos as complete.
- Completion state persists after page refresh.
- The app shows:
  - Completed video count.
  - Learning progress bar.
  - Completed minutes summary.
- Completed videos are deprioritized in recommendations.
- `Unfinished only` filter hides completed videos.
- `Resume next` opens the next unfinished video from the active playlist or recommendation list.

## Video Detail Drawer

- Users can open a detail drawer for any video.
- The drawer displays:
  - Thumbnail.
  - Title.
  - Provider.
  - Year.
  - Description.
  - Duration.
  - Level.
  - Topic.
- Detail drawer actions:
  - Open video source.
  - Save or unsave.
  - Mark complete or incomplete.
  - Add to active playlist.
  - Report link.
- The detail drawer stays connected to the same saved, playlist, and completion state used by the cards.

## Private Notes

- Users can write private notes for each video.
- Notes persist after page refresh.
- Notes are searchable.
- Cards show a `Note` tag when a note exists for that video.
- Notes are local to the browser and are not synced to any account yet.

## Curator Add Link Flow

- Users can add a new video link from the `Add Link` modal.
- The form captures:
  - Title.
  - URL.
  - Topic.
  - Level.
  - Duration.
  - Year.
  - Description.
  - Tags.
- New videos appear immediately in the directory.
- New videos are included in search, filters, recommendations, playlists, and progress tracking.
- YouTube thumbnails are auto-detected when possible.
- Custom videos persist locally after page refresh.

## Feedback And Maintenance

- Users can open a feedback dialog.
- Supported feedback types:
  - Report broken link.
  - Request topic.
  - Suggest better resource.
- Reporting a link from the video detail drawer pre-fills the feedback message with the selected video title and URL.
- Feedback submissions are stored locally in the browser.

## Personalization

- Recommendation scoring uses local behavior signals:
  - Saved videos.
  - Useful reactions.
  - Skipped videos.
  - Completed videos.
  - Preferred topics inferred from saved/useful videos.
- Recommendations update immediately after user interactions.

## Responsive Interface

- Layout adapts for desktop, tablet, and mobile.
- Mobile view stacks controls and cards into a single column.
- Playlist panel becomes a bottom sheet on smaller screens.
- Touch-friendly button sizes are used across the app.
- Cards, filters, progress panel, dialogs, and playlist controls are responsive.

## Performance-Oriented Behavior

- No framework runtime is loaded.
- No package bundle is required.
- Filtering and search run in memory on the client.
- Rendering is scheduled through `requestAnimationFrame` during search input.
- Images use lazy loading and fixed dimensions.
- Video iframes are not embedded in the gallery.
- The app can be hosted on GitHub Pages or any static host.
- The frontend includes an API client bridge and health check for the FastAPI backend.
- If the backend is unavailable, the app keeps functioning in local mode.

## Current Limitations

- No backend is connected yet.
- FastAPI backend scaffolding exists, but full database-backed operation requires PostgreSQL setup.
- No user authentication yet.
- No database persistence yet.
- Data does not sync across devices or browsers.
- Feedback, notes, playlists, custom videos, saves, reactions, and progress are stored only in the current browser.
- The Add Link flow does not yet perform remote metadata fetching.
- The app does not yet include admin moderation roles.
- Analytics and real-user performance monitoring are not connected yet.

## Local Run Command

```powershell
cd C:\Users\user\Desktop\Projects\get2learn
py -m http.server 5500
```

Then open:

```text
http://localhost:5500
```
