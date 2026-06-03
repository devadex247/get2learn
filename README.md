# 🚀 get2learn

> A curated technical learning platform designed to help developers, students, and young tech professionals discover, organize, and track high-quality educational video content.

![Status](https://img.shields.io/badge/Status-MVP-green?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

# 📖 Overview

**get2learn** is a lightweight learning ecosystem built to curate, organize, and personalize educational video resources for technology learners.

The platform combines a fast, dependency-free frontend experience with a scalable FastAPI backend architecture, enabling users to:

- Discover curated technical videos
- Save and organize learning resources
- Track learning progress
- Build custom playlists
- Receive personalized recommendations
- Scale into AI-powered learning workflows

---

# 🏗️ System Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                       get2learn                         │
│          Technical Video Learning Ecosystem             │
└────────────────────┬────────────────────┬───────────────┘
                     │
      ┌──────────────┴──────────────┐
      │                             │
      ▼                             ▼
🎨 Frontend Application      🚀 Backend Platform
Vanilla HTML/CSS/JS          FastAPI + PostgreSQL

• Local Storage              • REST API
• Search Engine              • Authentication
• Playlists                  • RBAC
• Progress Tracking          • AI Services
• Personalization            • Vector Search
```

---

# ✨ Core Features

## 🎥 Curated Video Directory

Browse carefully selected technical learning resources with:

- Thumbnails
- Titles
- Topics
- Difficulty levels
- Duration metadata
- Tags
- Provider information
- Source links

---

## 🔍 Smart Search & Filtering

Search across:

- Video titles
- Topics
- Difficulty levels
- Tags
- Descriptions
- Notes
- Providers

Filter by:

- Topic
- Level
- Duration
- Saved content
- Unfinished content
- New releases

Sort by:

- Recommended
- Newest
- Shortest
- Most Useful

---

## 🤖 Personalized Learning Experience

User interactions influence recommendation ranking:

- 👍 Useful
- 👎 Skip
- ✅ Completed
- 💾 Saved

Completed or skipped videos are automatically deprioritized.

---

## 📋 Playlist Management

Create and manage:

- Save For Later
- Custom Playlists
- Reordering Controls
- Learning Paths

All playlist states persist locally.

---

## 📊 Learning Progress Tracking

Track:

- Videos completed
- Learning minutes
- Progress percentage
- Resume next unfinished lesson

---

## 🗂️ Video Detail Drawer

View complete resource information:

- Description
- Tags
- Difficulty
- Topic
- Open Source Link
- Save / Unsave
- Mark Complete
- Add to Playlist
- Report Issues

---

## 🛠️ Curator Submission Workflow

Submit new learning resources directly from the interface.

Supported fields:

- Title
- URL
- Topic
- Difficulty
- Duration
- Year
- Description
- Tags

Features:

- Automatic YouTube thumbnail detection
- Instant preview
- Local persistence

---

## 💬 Feedback System

Collect:

- Broken link reports
- Topic requests
- Learning resource suggestions
- Platform feedback

---

# ⚡ Frontend Stack

## Technology

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- localStorage

## Philosophy

### Zero Dependencies

No:

- React
- Vue
- Angular
- Build tools
- Package managers

### Fast By Default

- Lazy-loaded images
- In-memory filtering
- requestAnimationFrame rendering
- No embedded video overhead

### Offline-Friendly

Local-first architecture ensures usability even without backend connectivity.

---

# 🚀 Frontend Setup

```bash
cd get2learn

python -m http.server 5500
```

Open:

```text
http://localhost:5500
```

---

# 🚀 Backend Platform

Built with FastAPI for performance, scalability, and future AI integrations.

## Backend Features

### FastAPI REST API

- Async endpoints
- Versioned APIs
- OpenAPI documentation

### Authentication & Security

- JWT Authentication
- RBAC Authorization
- Dependency Injection
- Protected Routes

### PostgreSQL Database

Core entities:

- Users
- Videos
- Playlists
- Interactions
- Notes
- Feedback

### Search & Recommendation Engine

Supports:

- Filtering
- Sorting
- Pagination
- Recommendation scoring

### AI-Ready Architecture

Designed to support:

- Embeddings
- Vector Search
- Semantic Recommendations
- Retrieval-Augmented Generation (RAG)

---

# ⚙️ Backend Setup

## Create Environment

```bash
cd backend

python -m venv .venv
```

### Activate Environment

#### Windows

```bash
.venv\Scripts\activate
```

#### Linux / Mac

```bash
source .venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment

```bash
cp .env.example .env
```

### Run Development Server

```bash
uvicorn app.main:app --reload --port 8000
```

Health endpoint:

```text
http://localhost:8000/api/v1/health
```

---

# 🗄️ Database Setup

Using Docker:

```bash
docker compose up -d
```

Run migrations:

```bash
alembic upgrade head
```

Seed database:

```bash
python -m app.db.seed
```

Alternative PostgreSQL configuration:

```env
DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@HOST:PORT/DB_NAME
```

---

# 📂 Suggested Project Structure

```text
get2learn/
│
├── frontend/
│   ├── index.html
│   ├── styles/
│   ├── scripts/
│   └── assets/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── migrations/
│   ├── tests/
│   └── requirements.txt
│
└── README.md
```

---

# 🧠 Future AI Roadmap

## Phase 1 — Intelligent Search

- Semantic search
- Natural language queries
- Smart filtering

## Phase 2 — Recommendation Engine

- User embeddings
- Learning path suggestions
- Personalized content ranking

## Phase 3 — AI Learning Assistant

- Video summarization
- Resource recommendations
- Topic explanations
- Study planning

## Phase 4 — Full RAG Architecture

```text
Video Metadata
       │
       ▼
Data Cleaning
       │
       ▼
Embedding Generation
       │
       ▼
Vector Database
       │
       ▼
Retriever
       │
       ▼
LLM
       │
       ▼
AI Learning Assistant
```

---

# ⚠️ Current Limitations

- No active backend synchronization
- No multi-device data syncing
- No admin moderation panel
- No analytics dashboard
- No production monitoring
- Metadata scraping not implemented
- Default security keys must be replaced before production

---

# 🎯 Next Milestones

## 1. Data Portability

- Export learning data
- Import backups
- Migration utilities

## 2. Full Database Integration

- PostgreSQL persistence
- API-driven content management

## 3. User Authentication

- Login & registration
- Protected user profiles

## 4. Admin Moderation

- Resource approval workflow
- Link verification

## 5. Framework Evolution

Migration path:

```text
Vanilla JS
    ↓
Next.js
    ↓
Analytics
    ↓
Performance Monitoring
    ↓
Enterprise Scale
```

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Open a Pull Request

---

# 📄 License

This project is released under the MIT License.

---

## 🌍 Vision

**get2learn aims to become the intelligent learning companion for developers—combining curated educational resources, AI-powered recommendations, and personalized learning experiences into one seamless platform.**
