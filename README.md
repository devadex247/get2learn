# 🚀 get2learn — Premium Technical Learning Workspace

> A curated, local-first technical learning discovery and organization platform that helps developers, students, and young tech professionals discover, organize, and track high-signal technical video content.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Architecture](https://img.shields.io/badge/Architecture-Hybrid%20Local--First%20%2B%20API-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 📖 What is get2learn?

**get2learn** answers one primary question for developers in under five seconds:
> **"What should I learn next, and where do I begin?"**

get2learn transforms fragmented educational content into an organized, high-velocity learning experience. It combines a desktop **Navigation Rail** and mobile **Bottom Bar** layout with an adaptive dashboard, structured exploration, personal workspace tabs, and custom learning paths.

Whether operating in pure **Local-First mode** (`localStorage`) or connected to the **FastAPI + PostgreSQL Backend**, learners can discover resources, track progress, create playlists, take private notes, and execute custom learning paths seamlessly.

---

## ✨ Workspace Architecture & Navigation

The platform is structured into five core functional views:

```text
get2learn Workspace
├── 🏠 Home                     Personalized dashboard (Greeting, Continue strip, Recommendations, Progress metrics)
├── 🔍 Explore                  Directory discovery & search (Filters by Topic, Level, Duration, Sorts)
├── ◈ My Learning              Personal workspace (Continue, Saved, Playlists, Completed, Searchable Notes)
├── ⇢ Learning Paths           Goal-oriented lesson sequences with SVG progress rings
└── ➕ Add Link                 Ingest modal with automatic YouTube thumbnail detection & validation
```

### Layout Responsiveness
- **Desktop (≥ 1080px)**: Left Navigation Rail (`72px`), compact brand topbar, full-width main content area.
- **Mobile (< 768px)**: Bottom Navigation Bar with 4 primary targets + Floating Action Button (FAB) for quick link ingestion.

---

## 🚀 Core Features

### 🏠 Home Dashboard
- **Contextual Welcome Header**: Time-aware greeting ("Good morning", "Good evening") with instant "Resume next lesson" action.
- **Continue Learning Strip**: Displays in-progress resources for rapid friction-free resumption.
- **Personalized Recommendations**: Behavior-based scoring rail with explicit "Why?" reasoning tags.
- **Progress Snapshot**: 4-tile metric cards displaying completed videos, total learning minutes, active paths, and overall completion percentage.

### 🔍 Search & Explore
- **Multi-Attribute Search**: Real-time debounced query across titles, topics, difficulty, providers, descriptions, tags, and private notes.
- **Granular Filters**: Filter by Topic, Difficulty Level (Beginner, Intermediate, Advanced), Duration (Under 20m, 20–45m, 45m+), and quick toggles (`Saved only`, `New this year`, `Unfinished only`).
- **Sorting Modes**: Sort by `Recommended`, `Newest`, `Shortest`, or `Most useful`.

### 🃏 Redesigned Video Cards & Detail Drawer
- **Adaptive Primary Action**: Contextually changes label based on state (`Start learning` → `Resume` → `Review`).
- **Card Overflow Menu**: Compact dropdown menu for secondary actions (Add to playlist, Mark useful/skip, Add note, Mark complete, Report link).
- **Interactive Detail Drawer**: Native `<dialog>` modal with sticky action strip, auto-saving private notes (500ms debounce), state indicators, and storage mode badges.

### ◈ My Learning Workspace
Structured 5-tab workspace:
1. **Continue**: Immediate access to active, unfinished resources.
2. **Saved**: Quick access to all bookmarked videos.
3. **Playlists**: Custom playlist manager with drag-and-drop ordering and positional controls.
4. **Completed**: Review completed materials and manage completion history.
5. **Notes**: Dedicated searchable repository of all personal video annotations.

### ⇢ Learning Paths
- Create goal-oriented, structured sequences of technical resources.
- Visual SVG progress ring tracking completed lessons within each path.
- Up/Down ordering controls and custom path descriptions.

### 🔔 Toast System with Undo Support
- Lightweight, accessible notification system (`aria-live="polite"`).
- Non-disruptive feedback for saving, completing, playlist mutations, and note edits.
- Instant **Undo** action support for destructive or state-reversing operations.

---

## ⚡ Tech Stack & Hybrid Persistence Model

### Frontend
- **HTML5 & CSS3**: Vanilla CSS with CSS custom properties (design system tokens, dark theme, fluid typography, glassmorphic surfaces).
- **Vanilla JavaScript**: Zero build tools, fast DOM rendering, local state management.
- **API Layer ([`api.js`](file:///c:/Users/user/Desktop/Projects/get2learn/api.js))**: Asynchronous Fetch wrapper supporting JWT authorization headers and live status monitoring.

### Backend Microservice ([`backend/`](file:///c:/Users/user/Desktop/Projects/get2learn/backend))
- **FastAPI**: High-performance Python async REST API framework (`/api/v1`).
- **SQLModel & SQLAlchemy**: Async database ORM supporting PostgreSQL engine (`asyncpg`).
- **Security & Authentication**: JWT bearer tokens (`python-jose`) and `bcrypt` password hashing (`passlib`).
- **Alembic**: Relational database migration management.

---

## 🛠️ Quick Start Guide

### 1. Run Frontend Locally (Local-First Mode)
Simply serve the root directory using any static web server:

```bash
# From workspace root
python -m http.server 5500
```
Open [`http://127.0.0.1:5500`](http://127.0.0.1:5500) in your browser. All data will save locally to browser `localStorage`.

### 2. Run Full Stack with FastAPI Backend

#### Backend Setup
```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1  # Windows PowerShell

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Run database migrations and seed data
alembic upgrade head
python -m app.db.seed

# Start FastAPI server
python -m uvicorn app.main:app --reload --port 8000
```
> **Backend API Docs**: [`http://127.0.0.1:8000/api/v1/docs`](http://127.0.0.1:8000/api/v1/docs)

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](file:///c:/Users/user/Desktop/Projects/get2learn/LICENSE) for more details.
