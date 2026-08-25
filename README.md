# 🚀 get2learn

> A curated technical learning platform that helps developers, students, and young tech professionals discover, organize, and make progress through high-quality educational video content.

![Status](https://img.shields.io/badge/Status-MVP-green?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Architecture](https://img.shields.io/badge/Architecture-Local--First-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 📖 What is get2learn?

**get2learn** is a technical learning discovery and organization platform built around a simple problem:

> There is an overwhelming amount of educational content online, but finding the right resource, organizing it, and actually making progress through it is difficult.

get2learn provides a focused environment where learners can:

- Discover curated technical videos
- Search and filter educational resources
- Save resources for later
- Build custom playlists
- Track learning progress
- Write private notes
- React to resources
- Resume unfinished lessons
- Receive behavior-based recommendations
- Submit new learning resources
- Report broken links
- Request topics and better resources

The current version is a **frontend-first MVP** built with plain HTML, CSS, and JavaScript.

A FastAPI backend scaffold is also present and provides the foundation for future authentication, persistent storage, APIs, recommendations, and AI-powered learning features.

---

# 🎯 The Problem

Technical learners often rely on a combination of:

- YouTube
- Blog posts
- Documentation
- Courses
- GitHub repositories
- Bookmarks
- Browser history
- Notes apps
- Personal spreadsheets

The result is often fragmented learning.

A learner may find a great video today, forget where it was, save dozens of unrelated resources, lose track of what they completed, and struggle to decide what to study next.

**get2learn is designed to turn scattered technical resources into an organized learning experience.**

---

# ✨ Current MVP

The current MVP is fully functional as a **browser-based local-first learning application**.

No account is required.

No package installation is required.

No database is required.

User activity is persisted through the browser's `localStorage`.

---

# 🎥 Video Directory

The application provides a curated catalogue of technical learning resources.

Each resource can contain:

- Thumbnail
- Title
- Topic
- Difficulty level
- Duration
- Description
- Tags
- Provider
- Year
- Source URL

Video thumbnails are lazy-loaded to reduce initial page weight.

Videos are **not embedded directly into the directory**, which keeps the browsing experience lightweight and fast.

---

# 🔍 Search & Discovery

get2learn provides client-side search across multiple resource attributes.

### Search across

- Titles
- Topics
- Difficulty levels
- Providers
- Descriptions
- Tags
- Private notes

### Filters

- Topic
- Difficulty
- Duration
- Saved resources
- New resources
- Unfinished resources

### Duration filters

- Any length
- Under 20 minutes
- 20–45 minutes
- 45+ minutes

### Sorting

- Recommended
- Newest
- Shortest
- Most useful

All filtering and search currently happen in memory on the client.

---

# 💾 Saved Videos

Learners can save resources directly from video cards.

Saved state:

- Persists after page refresh
- Can be filtered through `Saved only`
- Automatically adds the resource to the default **Save for Later** playlist

Users can therefore build a personal queue without needing an account.

---

# 📋 Playlist Management

get2learn supports both a default learning queue and custom playlists.

### Default playlist

**Save for Later**

### Custom playlists

Users can create playlists for different learning goals, technologies, or projects.

Playlist functionality includes:

- Create playlists
- Add videos
- Remove videos
- Reorder resources
- Drag-and-drop ordering
- Move items up and down
- Persist playlist state locally

Removing an item from **Save for Later** also removes its saved state.

---

# 👍 Learning Reactions

Users can provide lightweight feedback on resources.

Available reactions:

- 👍 Useful
- 👎 Skip

These interactions influence the recommendation system.

Useful resources receive a higher recommendation score, while skipped resources are deprioritized.

Reaction state persists after refresh.

---

# 📊 Learning Progress

get2learn tracks basic learning progress locally.

Users can mark resources as:

- Complete
- Incomplete

The application provides:

- Completed video count
- Learning progress percentage
- Completed learning minutes
- Unfinished resource filtering
- Resume-next functionality

### Resume Next

The learner can continue from the next unfinished resource in their active playlist or recommendation list.

This turns the application from a simple bookmark manager into a lightweight learning workflow.

---

# 🗂️ Video Detail Drawer

Each resource can be opened in a detailed view.

The drawer displays:

- Thumbnail
- Title
- Provider
- Year
- Description
- Duration
- Difficulty
- Topic

Available actions include:

- Open source video
- Save / unsave
- Mark complete / incomplete
- Add to active playlist
- Write private notes
- Report the resource

The drawer uses the same underlying state as the video cards, so changes remain synchronized throughout the application.

---

# 📝 Private Notes

Learners can attach private notes to individual learning resources.

Notes:

- Persist after refresh
- Are searchable
- Are associated with individual videos
- Display a `Note` indicator on resource cards

Example:

```text
"Review this section when learning async Python."

"Important explanation of database indexing around 18:30."

"Try implementing this architecture in a personal project."
