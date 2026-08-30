/* ============================================================
   get2learn — Application
   Phases 1-9: Navigation, Home, Explore, My Learning,
                Cards, Drawer, Toasts, Add Link
   ============================================================ */

/* ── CURATED VIDEO CATALOGUE ────────────────────────────────── */
const curatedVideos = [
  {
    id: "next-app-router",
    title: "Next.js App Router Crash Course",
    topic: "Frontend",
    level: "Intermediate",
    duration: 38,
    year: 2026,
    provider: "YouTube",
    url: "https://www.youtube.com/results?search_query=next.js+app+router+crash+course",
    thumbnail: "https://i.ytimg.com/vi/ZVnjOPwW4ZA/hqdefault.jpg",
    description: "Server components, routing, loading states, and production patterns for modern React apps.",
    tags: ["Next.js", "React", "Routing"],
    popularity: 96
  },
  {
    id: "react-patterns",
    title: "React Architecture Patterns for Fast Teams",
    topic: "Frontend",
    level: "Advanced",
    duration: 44,
    year: 2025,
    provider: "YouTube",
    url: "https://www.youtube.com/results?search_query=react+architecture+patterns",
    thumbnail: "https://i.ytimg.com/vi/oJYFRZ4cj2Q/hqdefault.jpg",
    description: "Component boundaries, state ownership, and performance-minded React design decisions.",
    tags: ["React", "Architecture", "State"],
    popularity: 91
  },
  {
    id: "docker-fundamentals",
    title: "Docker Fundamentals for Developers",
    topic: "DevOps",
    level: "Beginner",
    duration: 31,
    year: 2026,
    provider: "YouTube",
    url: "https://www.youtube.com/results?search_query=docker+fundamentals+for+developers",
    thumbnail: "https://i.ytimg.com/vi/pTFZFxd4hOI/hqdefault.jpg",
    description: "Images, containers, volumes, networks, and local development workflows without ceremony.",
    tags: ["Docker", "Containers", "CLI"],
    popularity: 88
  },
  {
    id: "postgres-indexes",
    title: "Postgres Indexing Explained Visually",
    topic: "Backend",
    level: "Intermediate",
    duration: 26,
    year: 2025,
    provider: "YouTube",
    url: "https://www.youtube.com/results?search_query=postgres+indexes+explained",
    thumbnail: "https://i.ytimg.com/vi/HubezKbFL7E/hqdefault.jpg",
    description: "A practical guide to B-tree indexes, query plans, and common database performance traps.",
    tags: ["Postgres", "SQL", "Performance"],
    popularity: 93
  },
  {
    id: "system-design",
    title: "System Design Interview: Video Platform",
    topic: "Career",
    level: "Advanced",
    duration: 57,
    year: 2026,
    provider: "YouTube",
    url: "https://www.youtube.com/results?search_query=system+design+video+platform",
    thumbnail: "https://i.ytimg.com/vi/NtMvNh0WFVM/hqdefault.jpg",
    description: "Design tradeoffs for feeds, recommendations, metadata ingestion, caching, and scale.",
    tags: ["System Design", "Caching", "Interview"],
    popularity: 95
  },
  {
    id: "ai-products",
    title: "Building AI Products Users Actually Trust",
    topic: "AI",
    level: "Intermediate",
    duration: 33,
    year: 2026,
    provider: "YouTube",
    url: "https://www.youtube.com/results?search_query=building+AI+products+users+trust",
    thumbnail: "https://i.ytimg.com/vi/jPhJbKBuNnA/hqdefault.jpg",
    description: "Evaluation loops, user controls, retrieval quality, and UX patterns for AI-assisted tools.",
    tags: ["AI", "UX", "Evaluation"],
    popularity: 89
  },
  {
    id: "figma-dev-handoff",
    title: "Figma to Frontend Handoff Without Rework",
    topic: "Design",
    level: "Beginner",
    duration: 19,
    year: 2025,
    provider: "YouTube",
    url: "https://www.youtube.com/results?search_query=figma+developer+handoff+frontend",
    thumbnail: "https://i.ytimg.com/vi/FTFaQWZBqQ8/hqdefault.jpg",
    description: "Tokens, spacing systems, variants, responsive specs, and collaboration rituals.",
    tags: ["Figma", "Design Systems", "Frontend"],
    popularity: 82
  },
  {
    id: "python-automation",
    title: "Python Automation Projects for Daily Work",
    topic: "Backend",
    level: "Beginner",
    duration: 24,
    year: 2026,
    provider: "YouTube",
    url: "https://www.youtube.com/results?search_query=python+automation+projects+for+work",
    thumbnail: "https://i.ytimg.com/vi/s8XjEuplx_U/hqdefault.jpg",
    description: "Scripts for APIs, files, reporting, and repetitive engineering tasks.",
    tags: ["Python", "Automation", "APIs"],
    popularity: 84
  },
  {
    id: "security-basics",
    title: "Web Security Basics Every Builder Needs",
    topic: "Security",
    level: "Beginner",
    duration: 42,
    year: 2025,
    provider: "YouTube",
    url: "https://www.youtube.com/results?search_query=web+security+basics+for+developers",
    thumbnail: "https://i.ytimg.com/vi/inWWhr5tnEA/hqdefault.jpg",
    description: "XSS, CSRF, auth mistakes, headers, secrets, and secure-by-default habits.",
    tags: ["Security", "Auth", "Web"],
    popularity: 90
  },
  {
    id: "git-collaboration",
    title: "Git Collaboration That Keeps Teams Moving",
    topic: "Career",
    level: "Beginner",
    duration: 17,
    year: 2026,
    provider: "YouTube",
    url: "https://www.youtube.com/results?search_query=git+collaboration+workflow+pull+requests",
    thumbnail: "https://i.ytimg.com/vi/Uszj_k0DGsg/hqdefault.jpg",
    description: "Branches, pull requests, code review etiquette, and clean commit habits.",
    tags: ["Git", "Teams", "Review"],
    popularity: 86
  },
  {
    id: "api-design",
    title: "API Design for Products That Scale",
    topic: "Backend",
    level: "Intermediate",
    duration: 48,
    year: 2025,
    provider: "YouTube",
    url: "https://www.youtube.com/results?search_query=api+design+best+practices+scalable+products",
    thumbnail: "https://i.ytimg.com/vi/_YlYuNMTCc8/hqdefault.jpg",
    description: "Resource modeling, versioning, pagination, errors, and developer experience.",
    tags: ["API", "REST", "DX"],
    popularity: 87
  },
  {
    id: "performance-web",
    title: "Web Performance for Real Users",
    topic: "Frontend",
    level: "Intermediate",
    duration: 36,
    year: 2026,
    provider: "YouTube",
    url: "https://www.youtube.com/results?search_query=web+performance+core+web+vitals+real+users",
    thumbnail: "https://i.ytimg.com/vi/AQqFZ5t8uNc/hqdefault.jpg",
    description: "Core Web Vitals, bundle budgets, image loading, interaction latency, and field data.",
    tags: ["Performance", "CWV", "UX"],
    popularity: 94
  }
];

/* ── LOCALSTORAGE KEYS (additive — original keys preserved) ─── */
const storageKeys = {
  saved:         "g2l.saved",
  reactions:     "g2l.reactions",
  playlists:     "g2l.playlists",
  activePlaylist:"g2l.activePlaylist",
  feedback:      "g2l.feedback",
  completed:     "g2l.completed",
  notes:         "g2l.notes",
  customVideos:  "g2l.customVideos",
  // New additive keys
  activeNav:     "g2l.activeNav",
  activeMyTab:   "g2l.activeMyTab",
  paths:         "g2l.paths"
};

/* ── STATE ──────────────────────────────────────────────────── */
const state = {
  // Filter state
  query:          "",
  topic:          "all",
  level:          "all",
  duration:       "all",
  sort:           "recommended",
  savedOnly:      false,
  freshOnly:      false,
  unfinishedOnly: false,

  // API
  apiMode:        "checking",
  remoteVideos:   [],

  // Persisted user state
  saved:          readSet(storageKeys.saved),
  completed:      readSet(storageKeys.completed),
  notes:          readJson(storageKeys.notes, {}),
  customVideos:   readJson(storageKeys.customVideos, []),
  reactions:      readJson(storageKeys.reactions, {}),
  playlists:      readJson(storageKeys.playlists, [
    { id: "save-later", name: "Save for Later", items: [] }
  ]),
  activePlaylist: localStorage.getItem(storageKeys.activePlaylist) || "save-later",
  paths:          readJson(storageKeys.paths, []),

  // Navigation state
  activePage:     localStorage.getItem(storageKeys.activeNav) || "home",
  activeMyTab:    localStorage.getItem(storageKeys.activeMyTab) || "continue",

  // Auth state
  user:           null,
  authMode:       "login",

  // UI state
  activeVideoId:  ""
};

/* ── DOM REFERENCES ─────────────────────────────────────────── */
const els = {
  // Auth
  authHeaderContainer: document.querySelector("#auth-header-container"),
  openAuth:            document.querySelector("#open-auth"),
  authDialog:          document.querySelector("#auth-dialog"),
  authForm:            document.querySelector("#auth-form"),
  closeAuth:           document.querySelector("#close-auth"),
  authDialogTitle:     document.querySelector("#auth-dialog-title"),
  authTabLogin:        document.querySelector("#auth-tab-login"),
  authTabRegister:     document.querySelector("#auth-tab-register"),
  authError:           document.querySelector("#auth-error"),
  authEmail:           document.querySelector("#auth-email"),
  authPassword:        document.querySelector("#auth-password"),
  authSubmitBtn:       document.querySelector("#auth-submit-btn"),

  // Navigation
  navItems:       document.querySelectorAll(".nav-item[data-page]"),
  bottomNavItems: document.querySelectorAll(".bottom-nav-item[data-page]"),
  pages:          document.querySelectorAll(".page"),

  // Home
  homeGreeting:   document.querySelector("#home-greeting"),
  homeSubline:    document.querySelector("#home-subline"),
  homeResumeBtn:  document.querySelector("#home-resume-btn"),
  continueStrip:  document.querySelector("#continue-strip"),
  recommendRail:  document.querySelector("#recommendation-rail"),
  progressSnap:   document.querySelector("#progress-snapshot"),

  // Explore
  search:         document.querySelector("#search-input"),
  topic:          document.querySelector("#topic-filter"),
  level:          document.querySelector("#level-filter"),
  duration:       document.querySelector("#duration-filter"),
  sort:           document.querySelector("#sort-filter"),
  savedOnly:      document.querySelector("#saved-only"),
  freshOnly:      document.querySelector("#fresh-only"),
  unfinishedOnly: document.querySelector("#unfinished-only"),
  grid:           document.querySelector("#video-grid"),
  template:       document.querySelector("#video-card-template"),
  visibleCount:   document.querySelector("#visible-count"),
  savedCount:     document.querySelector("#saved-count"),
  completedCount: document.querySelector("#completed-count"),
  playlistCount:  document.querySelector("#playlist-count"),
  summary:        document.querySelector("#result-summary"),
  emptyState:     document.querySelector("#empty-state"),
  rail:           document.querySelector("#recommendation-rail"),
  progressBar:    document.querySelector("#progress-bar"),
  progressSummary:document.querySelector("#progress-summary"),
  progressTrack:  document.querySelector(".progress-track"),
  resumeNext:     document.querySelector("#resume-next"),
  apiStatus:      document.querySelector("#api-status"),

  // Playlist panel
  playlistPanel:  document.querySelector("#playlist-panel"),
  openPlaylists:  document.querySelector("#open-playlists"),
  closePlaylists: document.querySelector("#close-playlists"),
  playlistForm:   document.querySelector("#playlist-form"),
  playlistName:   document.querySelector("#playlist-name"),
  playlistTabs:   document.querySelector("#playlist-tabs"),
  playlistItems:  document.querySelector("#playlist-items"),

  // Video drawer
  videoDialog:    document.querySelector("#video-dialog"),
  closeDetail:    document.querySelector("#close-detail"),
  detailMeta:     document.querySelector("#detail-meta"),
  detailTitle:    document.querySelector("#detail-title"),
  detailThumb:    document.querySelector("#detail-thumb"),
  detailDescription: document.querySelector("#detail-description"),
  detailDuration: document.querySelector("#detail-duration"),
  detailLevel:    document.querySelector("#detail-level"),
  detailTopic:    document.querySelector("#detail-topic"),
  detailNote:     document.querySelector("#detail-note"),
  detailStats:    document.querySelector(".detail-stats"),
  detailOpen:     document.querySelector("#detail-open"),
  detailSave:     document.querySelector("#detail-save"),
  detailComplete: document.querySelector("#detail-complete"),
  detailAdd:      document.querySelector("#detail-add"),
  detailReport:   document.querySelector("#detail-report"),

  // Add Link dialog
  ingestDialog:   document.querySelector("#ingest-dialog"),
  ingestForm:     document.querySelector("#ingest-form"),
  closeIngest:    document.querySelector("#close-ingest"),
  ingestTitle:    document.querySelector("#ingest-title-input"),
  ingestUrl:      document.querySelector("#ingest-url"),
  ingestTopic:    document.querySelector("#ingest-topic"),
  ingestLevel:    document.querySelector("#ingest-level"),
  ingestDuration: document.querySelector("#ingest-duration"),
  ingestYear:     document.querySelector("#ingest-year"),
  ingestDescription: document.querySelector("#ingest-description"),
  ingestTags:     document.querySelector("#ingest-tags"),
  ingestThumbPreview: document.querySelector("#ingest-thumb-preview"),
  ingestThumbImg: document.querySelector("#ingest-thumb-img"),

  // Feedback dialog
  feedbackDialog: document.querySelector("#feedback-dialog"),
  feedbackForm:   document.querySelector("#feedback-form"),
  feedbackType:   document.querySelector("#feedback-type"),
  feedbackMessage:document.querySelector("#feedback-message"),
  feedbackCharCount: document.querySelector("#feedback-char-count"),
  closeFeedback:  document.querySelector("#close-feedback"),
  openFeedback:   document.querySelector("#open-feedback"),

  // My Learning
  tabBtns:        document.querySelectorAll(".tab-btn"),
  tabPanels:      document.querySelectorAll(".tab-panel"),
  myContinueStrip:document.querySelector("#my-continue-strip"),
  mySavedGrid:    document.querySelector("#my-saved-grid"),
  myPlaylistsGrid:document.querySelector("#my-playlists-grid"),
  myCompletedGrid:document.querySelector("#my-completed-grid"),
  notesList:      document.querySelector("#notes-list"),
  notesSearch:    document.querySelector("#notes-search"),
  mySavedEmpty:   document.querySelector("#my-saved-empty"),
  myPlaylistsEmpty:document.querySelector("#my-playlists-empty"),
  myCompletedEmpty:document.querySelector("#my-completed-empty"),
  notesEmpty:     document.querySelector("#notes-empty"),

  // Learning Paths
  pathsGrid:      document.querySelector("#paths-grid"),
  pathsEmpty:     document.querySelector("#paths-empty"),
  createPathBtn:  document.querySelector("#create-path-btn"),

  // Toast
  toastRegion:    document.querySelector("#toast-region"),

  // Mobile
  mobileAddBtn:   document.querySelector("#mobile-add-btn"),
  navAddLink:     document.querySelector("#nav-add-link")
};

/* ── STORAGE HELPERS ────────────────────────────────────────── */
function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function readSet(key) {
  return new Set(readJson(key, []));
}

function persist() {
  localStorage.setItem(storageKeys.saved,          JSON.stringify([...state.saved]));
  localStorage.setItem(storageKeys.completed,      JSON.stringify([...state.completed]));
  localStorage.setItem(storageKeys.notes,          JSON.stringify(state.notes));
  localStorage.setItem(storageKeys.customVideos,   JSON.stringify(state.customVideos));
  localStorage.setItem(storageKeys.reactions,      JSON.stringify(state.reactions));
  localStorage.setItem(storageKeys.playlists,      JSON.stringify(state.playlists));
  localStorage.setItem(storageKeys.activePlaylist, state.activePlaylist);
  localStorage.setItem(storageKeys.activeNav,      state.activePage);
  localStorage.setItem(storageKeys.activeMyTab,    state.activeMyTab);
  localStorage.setItem(storageKeys.paths,          JSON.stringify(state.paths));
}

/* ── UTILITY FUNCTIONS ──────────────────────────────────────── */
function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours ? `${hours}h ${rest}m` : `${minutes}m`;
}

function normalize(value) {
  return String(value).toLowerCase().trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/* ── CATALOGUE HELPERS ──────────────────────────────────────── */
function getCatalogVideos() {
  const baseVideos = state.remoteVideos.length ? state.remoteVideos : curatedVideos;
  return [...baseVideos, ...state.customVideos];
}

function getVideoById(videoId) {
  return getCatalogVideos().find((video) => video.id === videoId);
}

function apiVideoToLocal(video) {
  return {
    id:          video.id,
    title:       video.title,
    topic:       video.topic,
    level:       video.level,
    duration:    video.duration_minutes,
    year:        video.year,
    provider:    video.provider,
    url:         video.url,
    thumbnail:   video.thumbnail_url || "",
    description: video.description,
    tags:        video.tags || [],
    popularity:  video.popularity_score || 0
  };
}

function getCompletedCount() {
  return [...state.completed].filter((id) => getVideoById(id)).length;
}

function seedPlaylistFromSaved() {
  const saveLater = state.playlists.find((pl) => pl.id === "save-later");
  if (saveLater) {
    saveLater.items = [...new Set([...saveLater.items, ...state.saved])];
  }
}

/* ── RECOMMENDATION SCORING ─────────────────────────────────── */
function scoreVideo(video) {
  let score = video.popularity;
  if (state.saved.has(video.id))           score += 18;
  if (state.completed.has(video.id))       score -= 26;
  if (state.reactions[video.id] === "up")  score += 14;
  if (state.reactions[video.id] === "down")score -= 22;

  const preferredTopics = new Set(
    getCatalogVideos()
      .filter((item) => state.saved.has(item.id) || state.reactions[item.id] === "up")
      .map((item) => item.topic)
  );
  if (preferredTopics.has(video.topic)) score += 8;
  if (video.year >= 2026)               score += 4;
  return score;
}

function getRecommendationReason(video) {
  if (state.saved.has(video.id)) return null;
  const savedTopics = new Set(
    getCatalogVideos().filter((v) => state.saved.has(v.id)).map((v) => v.topic)
  );
  const usefulTopics = new Set(
    getCatalogVideos().filter((v) => state.reactions[v.id] === "up").map((v) => v.topic)
  );
  if (savedTopics.has(video.topic))  return `Because you saved ${video.topic} videos`;
  if (usefulTopics.has(video.topic)) return `Similar to videos you marked useful`;
  if (video.duration <= 20)          return "A short lesson to fit your schedule";
  if (video.year >= 2026)            return "Fresh content added this year";
  return "Highly rated by learners";
}

function getResumeCandidate() {
  const activePlaylist = state.playlists.find((pl) => pl.id === state.activePlaylist);
  const fromPlaylist = activePlaylist
    ? activePlaylist.items.map((id) => getVideoById(id)).find((v) => v && !state.completed.has(v.id))
    : null;
  const fromRecommended = getCatalogVideos()
    .filter((v) => !state.completed.has(v.id) && state.reactions[v.id] !== "down")
    .sort((a, b) => scoreVideo(b) - scoreVideo(a))[0];
  return fromPlaylist || fromRecommended || null;
}

/* ── API STATUS ─────────────────────────────────────────────── */
function setApiStatus(mode, label) {
  state.apiMode = mode;
  if (els.apiStatus) {
    els.apiStatus.textContent = label;
    els.apiStatus.dataset.status = mode;
    els.apiStatus.setAttribute("aria-label", `API status: ${label}`);
  }
}

/* ── TOAST NOTIFICATIONS ────────────────────────────────────── */
let _toastCounter = 0;

function showToast(message, undoFn = null, duration = 4000) {
  const id = `toast-${++_toastCounter}`;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.id = id;
  toast.setAttribute("role", "status");

  const msg = document.createElement("span");
  msg.className = "toast__message";
  msg.textContent = message;
  toast.appendChild(msg);

  if (undoFn) {
    const undoBtn = document.createElement("button");
    undoBtn.className = "toast__undo";
    undoBtn.type = "button";
    undoBtn.textContent = "Undo";
    undoBtn.addEventListener("click", () => {
      undoFn();
      dismissToast(id);
    });
    toast.appendChild(undoBtn);
  }

  const closeBtn = document.createElement("button");
  closeBtn.className = "toast__close";
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "Dismiss notification");
  closeBtn.textContent = "✕";
  closeBtn.addEventListener("click", () => dismissToast(id));
  toast.appendChild(closeBtn);

  els.toastRegion.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add("toast--visible"));

  // Auto-dismiss
  const timer = setTimeout(() => dismissToast(id), duration);
  toast.dataset.timer = String(timer);
}

function dismissToast(id) {
  const toast = document.getElementById(id);
  if (!toast) return;
  clearTimeout(Number(toast.dataset.timer));
  toast.classList.remove("toast--visible");
  toast.classList.add("toast--hiding");
  toast.addEventListener("transitionend", () => toast.remove(), { once: true });
}

/* ── NAVIGATION / ROUTING ───────────────────────────────────── */
function navigateTo(page) {
  state.activePage = page;
  persist();

  // Update page sections
  els.pages.forEach((section) => {
    section.hidden = section.dataset.page !== page;
  });

  // Update nav rail items
  els.navItems.forEach((item) => {
    const active = item.dataset.page === page;
    item.setAttribute("aria-current", active ? "page" : "false");
    item.classList.toggle("nav-item--active", active);
  });

  // Update bottom bar items
  els.bottomNavItems.forEach((item) => {
    const active = item.dataset.page === page;
    item.setAttribute("aria-current", active ? "page" : "false");
    item.classList.toggle("bottom-nav-item--active", active);
  });

  // Render the target page
  if (page === "home")        renderHome();
  if (page === "explore")     { renderVideos(); renderPlaylists(); }
  if (page === "my-learning") renderMyLearning();
  if (page === "paths")       renderPaths();
}

/* ── FILTER HYDRATION ───────────────────────────────────────── */
function hydrateFilters() {
  const videos = getCatalogVideos();
  const topics = ["all", ...[...new Set(videos.map((v) => v.topic))].sort()];
  const levels = ["all", ...[...new Set(videos.map((v) => v.level))].sort()];

  if (els.topic) {
    els.topic.innerHTML = topics
      .map((t) => `<option value="${escapeHtml(t)}">${t === "all" ? "All topics" : escapeHtml(t)}</option>`)
      .join("");
  }
  if (els.level) {
    els.level.innerHTML = levels
      .map((l) => `<option value="${escapeHtml(l)}">${l === "all" ? "All levels" : escapeHtml(l)}</option>`)
      .join("");
  }

  if (!topics.includes(state.topic)) state.topic = "all";
  if (!levels.includes(state.level)) state.level = "all";
  if (els.topic) els.topic.value = state.topic;
  if (els.level) els.level.value = state.level;
}

/* ── FILTERING & SORTING ────────────────────────────────────── */
function getFilteredVideos() {
  const query = normalize(state.query);
  return getCatalogVideos()
    .filter((video) => {
      const searchable = normalize([
        video.title, video.topic, video.level, video.provider,
        video.description, state.notes[video.id] || "", video.tags.join(" ")
      ].join(" "));
      const matchesQuery    = !query || searchable.includes(query);
      const matchesTopic    = state.topic === "all" || video.topic === state.topic;
      const matchesLevel    = state.level === "all" || video.level === state.level;
      const matchesDuration =
        state.duration === "all" ||
        (state.duration === "short"  && video.duration < 20) ||
        (state.duration === "medium" && video.duration >= 20 && video.duration <= 45) ||
        (state.duration === "long"   && video.duration > 45);
      const matchesSaved      = !state.savedOnly      || state.saved.has(video.id);
      const matchesFresh      = !state.freshOnly      || video.year >= 2026;
      const matchesUnfinished = !state.unfinishedOnly || !state.completed.has(video.id);
      return matchesQuery && matchesTopic && matchesLevel && matchesDuration &&
             matchesSaved && matchesFresh && matchesUnfinished;
    })
    .sort((a, b) => {
      if (state.sort === "newest")    return b.year - a.year || b.popularity - a.popularity;
      if (state.sort === "shortest")  return a.duration - b.duration;
      if (state.sort === "popular")   return b.popularity - a.popularity;
      return scoreVideo(b) - scoreVideo(a);
    });
}

/* ── VIDEO CARD RENDERING ───────────────────────────────────── */
function getPrimaryActionLabel(video) {
  if (state.completed.has(video.id)) return "Review";
  if (state.notes[video.id])         return "Resume";
  return "Start learning";
}

function renderVideoCard(video) {
  const node = els.template.content.firstElementChild.cloneNode(true);
  const link        = node.querySelector(".thumb-link");
  const image       = node.querySelector(".thumb");
  const title       = node.querySelector("h3");
  const description = node.querySelector(".description");
  const topic       = node.querySelector(".topic-pill");
  const level       = node.querySelector(".level-pill");
  const duration    = node.querySelector(".duration-pill");
  const tags        = node.querySelector(".tag-row");
  const save        = node.querySelector(".save-button");
  const add         = node.querySelector(".playlist-button");
  const details     = node.querySelector(".details-button");
  const complete    = node.querySelector(".complete-button");
  const reactions   = node.querySelectorAll(".reaction-button");

  // State
  const isSaved     = state.saved.has(video.id);
  const isCompleted = state.completed.has(video.id);
  const hasNote     = Boolean(state.notes[video.id]);

  node.dataset.completed = String(isCompleted);
  node.dataset.videoId   = video.id;
  node.setAttribute("aria-label", video.title);

  // Thumbnail
  link.href = video.url;
  link.setAttribute("aria-label", `Open ${escapeHtml(video.title)} in new tab`);
  if (video.thumbnail) {
    image.src = video.thumbnail;
  }
  image.alt = video.thumbnail ? `${video.title} thumbnail` : "";
  image.onerror = () => {
    image.removeAttribute("src");
    image.alt = "";
  };

  // Content
  duration.textContent    = formatDuration(video.duration);
  title.textContent       = video.title;
  description.textContent = video.description;
  topic.textContent       = video.topic;
  level.textContent       = video.level;

  // Tags
  let tagsHtml = video.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  if (hasNote) tagsHtml += `<span title="${escapeHtml(state.notes[video.id])}">✎ Note</span>`;
  if (isCompleted) tagsHtml += `<span>✓ Done</span>`;
  tags.innerHTML = tagsHtml;

  // Save button
  save.textContent = isSaved ? "♥ Saved" : "♡ Save";
  save.setAttribute("aria-pressed", String(isSaved));
  save.setAttribute("aria-label", isSaved ? `Unsave ${video.title}` : `Save ${video.title}`);
  save.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSaved(video.id);
  });

  // Add to playlist
  add.addEventListener("click", (e) => {
    e.stopPropagation();
    addToActivePlaylist(video.id);
  });

  // Details / primary CTA
  details.textContent = getPrimaryActionLabel(video);
  details.addEventListener("click", () => openDetail(video.id));

  // Complete toggle
  complete.textContent = isCompleted ? "✓ Done" : "Done";
  complete.setAttribute("aria-pressed", String(isCompleted));
  complete.setAttribute("aria-label", isCompleted ? `Mark ${video.title} incomplete` : `Mark ${video.title} complete`);
  complete.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCompleted(video.id);
  });

  // Reactions
  reactions.forEach((btn) => {
    const reaction = btn.dataset.reaction;
    const isActive = state.reactions[video.id] === reaction;
    btn.dataset.active = String(isActive);
    btn.setAttribute("aria-pressed", String(isActive));
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      setReaction(video.id, reaction);
    });
  });

  return node;
}

/* ── EXPLORE RENDERING ──────────────────────────────────────── */
function renderVideos() {
  const videos   = getFilteredVideos();
  const fragment = document.createDocumentFragment();
  videos.forEach((video) => fragment.appendChild(renderVideoCard(video)));
  if (els.grid) els.grid.replaceChildren(fragment);
  if (els.visibleCount)  els.visibleCount.textContent  = videos.length;
  if (els.summary)       els.summary.textContent       = `${videos.length} video${videos.length === 1 ? "" : "s"} ready`;
  if (els.emptyState)    els.emptyState.hidden          = videos.length > 0;
  updateCounts();
  renderProgress();
}

function renderProgress() {
  const total    = getCatalogVideos().length;
  const done     = getCompletedCount();
  const percent  = total ? Math.round((done / total) * 100) : 0;
  const minutes  = getCatalogVideos()
    .filter((v) => state.completed.has(v.id))
    .reduce((sum, v) => sum + v.duration, 0);

  if (els.progressBar) {
    els.progressBar.style.width = `${percent}%`;
    els.progressBar.parentElement?.setAttribute("aria-valuenow", percent);
  }
  if (els.progressSummary) {
    els.progressSummary.textContent = done
      ? `${done} of ${total} videos completed — ${minutes} minutes banked.`
      : "Mark videos complete to build your learning signal.";
  }
}

function updateCounts() {
  if (els.savedCount)    els.savedCount.textContent    = [...state.saved].filter((id) => getVideoById(id)).length;
  if (els.completedCount)els.completedCount.textContent = getCompletedCount();
  if (els.playlistCount) els.playlistCount.textContent  = state.playlists.length;
}

/* ── HOME PAGE ──────────────────────────────────────────────── */
function renderHome() {
  // Greeting
  if (els.homeGreeting) els.homeGreeting.textContent = getTimeGreeting();

  const candidate = getResumeCandidate();
  if (els.homeSubline) {
    els.homeSubline.textContent = candidate
      ? `Next up: ${candidate.title}`
      : "Explore the catalogue to start your journey.";
  }
  if (els.homeResumeBtn) {
    els.homeResumeBtn.textContent = candidate ? "Resume next lesson" : "Explore videos";
    els.homeResumeBtn.onclick = () => {
      if (candidate) {
        openDetail(candidate.id);
      } else {
        navigateTo("explore");
      }
    };
  }

  // Continue Learning strip
  renderContinueStrip(els.continueStrip);

  // Recommendations
  renderHomeRecommendations();

  // Progress snapshot
  renderProgressSnapshot();
}

function renderContinueStrip(container) {
  if (!container) return;
  const candidate = getResumeCandidate();

  if (!candidate) {
    container.innerHTML = `
      <div class="empty-state">
        You are all caught up. <button class="link-btn" id="explore-cta-btn" type="button">Explore a new topic →</button>
      </div>`;
    container.querySelector("#explore-cta-btn")?.addEventListener("click", () => navigateTo("explore"));
    return;
  }

  const isSaved = state.saved.has(candidate.id);
  container.innerHTML = `
    <div class="continue-card">
      <div class="continue-card__thumb-wrap">
        <img class="continue-card__thumb" src="${escapeHtml(candidate.thumbnail || "")}"
             alt="${escapeHtml(candidate.title)} thumbnail"
             width="320" height="180" loading="lazy" decoding="async"
             onerror="this.style.display='none'">
      </div>
      <div class="continue-card__body">
        <div class="card-meta">
          <span class="topic-pill">${escapeHtml(candidate.topic)}</span>
          <span class="level-pill">${escapeHtml(candidate.level)}</span>
        </div>
        <h3 class="continue-card__title">${escapeHtml(candidate.title)}</h3>
        <p class="continue-card__meta">${escapeHtml(candidate.provider)} · ${formatDuration(candidate.duration)}</p>
        <div class="continue-card__actions">
          <button class="primary-button" id="continue-resume-btn" type="button">▶ Resume</button>
          <button class="ghost-button continue-save-btn" type="button" aria-pressed="${isSaved}"
                  data-video-id="${escapeHtml(candidate.id)}">
            ${isSaved ? "♥ Saved" : "♡ Save"}
          </button>
        </div>
      </div>
    </div>`;

  container.querySelector("#continue-resume-btn")?.addEventListener("click", () => openDetail(candidate.id));
  container.querySelector(".continue-save-btn")?.addEventListener("click", () => {
    toggleSaved(candidate.id);
    renderHome();
  });
}

function renderHomeRecommendations() {
  const container = els.recommendRail;
  if (!container) return;

  const recs = getCatalogVideos()
    .filter((v) => !state.completed.has(v.id) && state.reactions[v.id] !== "down")
    .sort((a, b) => scoreVideo(b) - scoreVideo(a))
    .slice(0, 5);

  if (!recs.length) {
    container.innerHTML = `<p class="empty-state">Your queue is full. Nice momentum.</p>`;
    return;
  }

  container.replaceChildren(
    ...recs.map((video) => {
      const reason = getRecommendationReason(video);
      const card   = document.createElement("button");
      card.className = "rail-card";
      card.type      = "button";
      card.setAttribute("aria-label", `${video.title} — ${formatDuration(video.duration)}`);
      card.innerHTML = `
        <strong>${escapeHtml(video.title)}</strong>
        <small>${escapeHtml(video.topic)} · ${formatDuration(video.duration)}</small>
        ${reason ? `<small class="rail-card__reason">${escapeHtml(reason)}</small>` : ""}`;
      card.addEventListener("click", () => openDetail(video.id));
      return card;
    })
  );
}

function renderProgressSnapshot() {
  const container = els.progressSnap;
  if (!container) return;

  const total   = getCatalogVideos().length;
  const done    = getCompletedCount();
  const percent = total ? Math.round((done / total) * 100) : 0;
  const minutes = getCatalogVideos()
    .filter((v) => state.completed.has(v.id))
    .reduce((sum, v) => sum + v.duration, 0);
  const savedCount  = [...state.saved].filter((id) => getVideoById(id)).length;
  const pathsActive = state.paths.length;

  container.innerHTML = `
    <div class="progress-tiles">
      <div class="progress-tile">
        <span class="progress-tile__value">${done}</span>
        <span class="progress-tile__label">Completed</span>
      </div>
      <div class="progress-tile">
        <span class="progress-tile__value">${minutes}m</span>
        <span class="progress-tile__label">Minutes learned</span>
      </div>
      <div class="progress-tile">
        <span class="progress-tile__value">${savedCount}</span>
        <span class="progress-tile__label">Saved</span>
      </div>
      <div class="progress-tile">
        <span class="progress-tile__value">${percent}%</span>
        <span class="progress-tile__label">Completion</span>
      </div>
    </div>
    <div class="progress-track home-progress-track" role="progressbar"
         aria-label="Overall learning progress"
         aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}">
      <span style="width:${percent}%"></span>
    </div>`;
}

/* ── MY LEARNING ────────────────────────────────────────────── */
function renderMyLearning() {
  activateMyTab(state.activeMyTab);
}

function activateMyTab(tabId) {
  state.activeMyTab = tabId;
  persist();

  els.tabBtns.forEach((btn) => {
    const active = btn.dataset.tab === tabId;
    btn.setAttribute("aria-selected", String(active));
    btn.classList.toggle("tab-btn--active", active);
  });

  els.tabPanels.forEach((panel) => {
    panel.hidden = panel.id !== `tabpanel-${tabId}`;
  });

  if (tabId === "continue")  renderMyContinue();
  if (tabId === "saved")     renderMySaved();
  if (tabId === "playlists") renderMyPlaylists();
  if (tabId === "completed") renderMyCompleted();
  if (tabId === "notes")     renderNotes("");
}

function renderMyContinue() {
  if (els.myContinueStrip) renderContinueStrip(els.myContinueStrip);
}

function renderMySaved() {
  const saved = getCatalogVideos().filter((v) => state.saved.has(v.id));
  if (els.mySavedEmpty) els.mySavedEmpty.hidden = saved.length > 0;
  if (!els.mySavedGrid) return;
  const fragment = document.createDocumentFragment();
  saved.forEach((v) => fragment.appendChild(renderVideoCard(v)));
  els.mySavedGrid.replaceChildren(fragment);
}

function renderMyPlaylists() {
  if (!els.myPlaylistsGrid) return;
  const fragment = document.createDocumentFragment();
  state.playlists.forEach((pl) => {
    const items      = pl.items.map((id) => getVideoById(id)).filter(Boolean);
    const completed  = items.filter((v) => state.completed.has(v.id)).length;
    const percent    = items.length ? Math.round((completed / items.length) * 100) : 0;
    const totalMins  = items.reduce((sum, v) => sum + v.duration, 0);
    const card       = document.createElement("div");
    card.className   = "playlist-card";
    card.innerHTML   = `
      <div class="playlist-card__header">
        <h3>${escapeHtml(pl.name)}</h3>
        <span class="playlist-card__count">${items.length} video${items.length === 1 ? "" : "s"}</span>
      </div>
      <p class="playlist-card__meta">${formatDuration(totalMins)} total · ${percent}% complete</p>
      <div class="playlist-card__bar">
        <div class="progress-track">
          <span style="width:${percent}%" role="progressbar"
                aria-label="${escapeHtml(pl.name)} progress"
                aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></span>
        </div>
      </div>
      <div class="playlist-card__actions">
        <button class="primary-button pl-continue-btn" data-playlist-id="${escapeHtml(pl.id)}" type="button">
          ${percent === 100 ? "Review" : "Continue"}
        </button>
        <button class="ghost-button pl-open-btn" data-playlist-id="${escapeHtml(pl.id)}" type="button">
          View all
        </button>
      </div>`;
    card.querySelector(".pl-continue-btn")?.addEventListener("click", () => {
      const next = items.find((v) => !state.completed.has(v.id)) || items[0];
      if (next) openDetail(next.id);
    });
    card.querySelector(".pl-open-btn")?.addEventListener("click", () => {
      state.activePlaylist = pl.id;
      persist();
      // Open the side panel and show this playlist
      els.playlistPanel?.classList.add("is-open");
      renderPlaylists();
    });
    fragment.appendChild(card);
  });
  els.myPlaylistsGrid.replaceChildren(fragment);
  if (els.myPlaylistsEmpty) els.myPlaylistsEmpty.hidden = state.playlists.length > 0;
}

function renderMyCompleted() {
  const completed = getCatalogVideos().filter((v) => state.completed.has(v.id));
  if (els.myCompletedEmpty) els.myCompletedEmpty.hidden = completed.length > 0;
  if (!els.myCompletedGrid) return;
  const fragment = document.createDocumentFragment();
  completed.forEach((v) => fragment.appendChild(renderVideoCard(v)));
  els.myCompletedGrid.replaceChildren(fragment);
}

function renderNotes(query) {
  if (!els.notesList) return;
  const q   = normalize(query);
  const all = Object.entries(state.notes)
    .map(([id, note]) => ({ id, note, video: getVideoById(id) }))
    .filter((n) => n.video)
    .filter((n) => !q || normalize(n.note).includes(q) || normalize(n.video.title).includes(q));

  if (els.notesEmpty) els.notesEmpty.hidden = all.length > 0;
  if (!all.length) {
    els.notesList.replaceChildren();
    return;
  }

  const fragment = document.createDocumentFragment();
  all.forEach(({ id, note, video }) => {
    const item = document.createElement("div");
    item.className = "note-item";
    item.innerHTML = `
      <div class="note-item__header">
        <strong class="note-item__title">${escapeHtml(video.title)}</strong>
        <span class="topic-pill">${escapeHtml(video.topic)}</span>
      </div>
      <p class="note-item__text">${escapeHtml(note)}</p>
      <div class="note-item__actions">
        <button class="ghost-button note-edit-btn" data-video-id="${escapeHtml(id)}" type="button">Edit</button>
        <button class="ghost-button note-delete-btn" data-video-id="${escapeHtml(id)}" type="button">Delete</button>
      </div>`;
    item.querySelector(".note-edit-btn")?.addEventListener("click", () => openDetail(id));
    item.querySelector(".note-delete-btn")?.addEventListener("click", () => {
      const prevNote = state.notes[id];
      delete state.notes[id];
      persist();
      renderNotes(els.notesSearch?.value || "");
      showToast("Note deleted", () => {
        state.notes[id] = prevNote;
        persist();
        renderNotes(els.notesSearch?.value || "");
      });
    });
    fragment.appendChild(item);
  });
  els.notesList.replaceChildren(fragment);
}

/* ── LEARNING PATHS ─────────────────────────────────────────── */
function renderPaths() {
  if (!els.pathsGrid) return;
  if (els.pathsEmpty) els.pathsEmpty.hidden = state.paths.length > 0;
  if (!state.paths.length) {
    els.pathsGrid.replaceChildren();
    return;
  }

  const fragment = document.createDocumentFragment();
  state.paths.forEach((path) => {
    const items     = (path.items || []).map((id) => getVideoById(id)).filter(Boolean);
    const done      = items.filter((v) => state.completed.has(v.id)).length;
    const percent   = items.length ? Math.round((done / items.length) * 100) : 0;
    const totalMins = items.reduce((sum, v) => sum + v.duration, 0);
    const card      = document.createElement("div");
    card.className  = "playlist-card";
    card.innerHTML  = `
      <div class="playlist-card__header">
        <h3>${escapeHtml(path.name)}</h3>
        <span class="playlist-card__count">${items.length} lessons</span>
      </div>
      ${path.description ? `<p class="playlist-card__description">${escapeHtml(path.description)}</p>` : ""}
      <p class="playlist-card__meta">${formatDuration(totalMins)} · ${percent}% complete</p>
      <div class="playlist-card__bar">
        <div class="progress-track">
          <span style="width:${percent}%" role="progressbar"
                aria-label="${escapeHtml(path.name)} progress"
                aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></span>
        </div>
      </div>
      <div class="playlist-card__actions">
        <button class="primary-button path-continue-btn" data-path-id="${escapeHtml(path.id)}" type="button">
          Continue
        </button>
        <button class="ghost-button path-delete-btn" data-path-id="${escapeHtml(path.id)}" type="button">
          Delete
        </button>
      </div>`;
    card.querySelector(".path-continue-btn")?.addEventListener("click", () => {
      const next = items.find((v) => !state.completed.has(v.id)) || items[0];
      if (next) openDetail(next.id);
    });
    card.querySelector(".path-delete-btn")?.addEventListener("click", () => {
      const prev = [...state.paths];
      state.paths = state.paths.filter((p) => p.id !== path.id);
      persist();
      renderPaths();
      showToast(`"${path.name}" deleted`, () => {
        state.paths = prev;
        persist();
        renderPaths();
      });
    });
    fragment.appendChild(card);
  });
  els.pathsGrid.replaceChildren(fragment);
}

function createPath(name, description = "") {
  const clean = name.trim();
  if (!clean) return;
  const id = `path-${slugify(clean)}-${Date.now()}`;
  state.paths.push({ id, name: clean, description, items: [] });
  persist();
  renderPaths();
  showToast(`Path "${clean}" created`);
}

/* ── PLAYLIST RENDERING ─────────────────────────────────────── */
function renderPlaylists() {
  seedPlaylistFromSaved();
  const active = state.playlists.find((pl) => pl.id === state.activePlaylist) || state.playlists[0];
  if (!active) return;
  state.activePlaylist = active.id;

  if (els.playlistTabs) {
    els.playlistTabs.replaceChildren(
      ...state.playlists.map((pl) => {
        const tab = document.createElement("button");
        tab.className = "playlist-tab";
        tab.type      = "button";
        tab.setAttribute("role", "tab");
        tab.textContent = `${pl.name} (${pl.items.length})`;
        tab.setAttribute("aria-selected", String(pl.id === state.activePlaylist));
        tab.addEventListener("click", () => {
          state.activePlaylist = pl.id;
          persist();
          renderPlaylists();
        });
        return tab;
      })
    );
  }

  const items = active.items.map((id) => getVideoById(id)).filter(Boolean);

  if (els.playlistItems) {
    if (!items.length) {
      els.playlistItems.innerHTML = "<li>Add a video from Explore to build this learning queue.</li>";
      updateCounts();
      return;
    }

    els.playlistItems.replaceChildren(
      ...items.map((video, index) => {
        const li = document.createElement("li");
        li.draggable      = true;
        li.dataset.videoId = video.id;
        li.innerHTML = `
          <span class="playlist-item-title">${escapeHtml(video.title)}</span>
          <div class="playlist-item-actions">
            <button type="button" data-action="up"     aria-label="Move up">↑</button>
            <button type="button" data-action="down"   aria-label="Move down">↓</button>
            <button type="button" data-action="remove" aria-label="Remove from playlist">Remove</button>
          </div>`;
        li.addEventListener("dragstart", (e) => e.dataTransfer.setData("text/plain", String(index)));
        li.addEventListener("dragover",  (e) => e.preventDefault());
        li.addEventListener("drop",      (e) => {
          e.preventDefault();
          const from = Number(e.dataTransfer.getData("text/plain"));
          movePlaylistItem(active.id, from, index);
        });
        li.querySelector("[data-action='up']").addEventListener("click",    () => movePlaylistItem(active.id, index, index - 1));
        li.querySelector("[data-action='down']").addEventListener("click",  () => movePlaylistItem(active.id, index, index + 1));
        li.querySelector("[data-action='remove']").addEventListener("click",() => {
          const prevItems = [...active.items];
          removeFromPlaylist(active.id, video.id);
          showToast(`"${video.title}" removed`, () => {
            active.items = prevItems;
            persist();
            renderPlaylists();
          });
        });
        return li;
      })
    );
  }
  updateCounts();
}

/* ── STATE MUTATIONS ────────────────────────────────────────── */
function toggleSaved(videoId) {
  const wasSaved = state.saved.has(videoId);
  if (wasSaved) {
    state.saved.delete(videoId);
    state.playlists.forEach((pl) => {
      if (pl.id === "save-later" || pl.is_default_save_for_later) pl.items = pl.items.filter((id) => id !== videoId);
    });
    showToast("Removed from Save for Later", () => {
      state.saved.add(videoId);
      addToPlaylist("save-later", videoId, false);
      persist();
      refreshAll();
    });
  } else {
    state.saved.add(videoId);
    addToPlaylist("save-later", videoId, false);
    showToast(`Saved to Save for Later`);
  }
  persist();
  refreshAll();

  if (window.Get2LearnApi && state.user && videoId.length > 20) {
    window.Get2LearnApi.updateInteraction({
      video_id: videoId,
      is_saved: !wasSaved
    }).catch((err) => console.warn("API interaction sync failed", err));
  }
}

function toggleCompleted(videoId) {
  const wasCompleted = state.completed.has(videoId);
  if (wasCompleted) {
    state.completed.delete(videoId);
    showToast("Marked as not complete");
  } else {
    state.completed.add(videoId);
    showToast("Video marked complete ✓");
  }
  persist();
  refreshAll();
  renderActiveDetail();

  if (window.Get2LearnApi && state.user && videoId.length > 20) {
    window.Get2LearnApi.updateInteraction({
      video_id: videoId,
      is_completed: !wasCompleted
    }).catch((err) => console.warn("API interaction sync failed", err));
  }
}

function setReaction(videoId, reaction) {
  const isSelected = state.reactions[videoId] === reaction;
  state.reactions[videoId] = isSelected ? "" : reaction;
  persist();
  refreshAll();
  renderActiveDetail();

  if (window.Get2LearnApi && state.user && videoId.length > 20) {
    const apiReaction = !isSelected ? (reaction === "up" ? "useful" : "skip") : null;
    window.Get2LearnApi.updateInteraction({
      video_id: videoId,
      reaction: apiReaction,
      clear_reaction: isSelected
    }).catch((err) => console.warn("API reaction sync failed", err));
  }
}

function addToActivePlaylist(videoId) {
  addToPlaylist(state.activePlaylist, videoId, true);
}

function addToPlaylist(playlistId, videoId, rerender) {
  const playlist = state.playlists.find((pl) => pl.id === playlistId);
  if (!playlist) return;
  const alreadyIn = playlist.items.includes(videoId);
  playlist.items = [...new Set([...playlist.items, videoId])];
  persist();
  if (rerender) {
    renderPlaylists();
    updateCounts();
    if (!alreadyIn) showToast(`Added to "${playlist.name}"`);
  }

  if (window.Get2LearnApi && state.user && videoId.length > 20 && playlistId.length > 20) {
    window.Get2LearnApi.addPlaylistItem(playlistId, videoId)
      .catch((err) => console.warn("API add playlist item failed", err));
  }
}

function removeFromPlaylist(playlistId, videoId) {
  const playlist = state.playlists.find((pl) => pl.id === playlistId);
  if (!playlist) return;
  playlist.items = playlist.items.filter((id) => id !== videoId);
  if (playlistId === "save-later" || playlist.is_default_save_for_later) state.saved.delete(videoId);
  persist();
  renderPlaylists();
  renderActiveDetail();
  if (state.activePage === "explore") renderVideos();

  if (window.Get2LearnApi && state.user && videoId.length > 20 && playlistId.length > 20) {
    window.Get2LearnApi.removePlaylistItem(playlistId, videoId)
      .catch((err) => console.warn("API remove playlist item failed", err));
  }
}

function movePlaylistItem(playlistId, from, to) {
  const playlist = state.playlists.find((pl) => pl.id === playlistId);
  if (!playlist || to < 0 || to >= playlist.items.length || from === to) return;
  const [item] = playlist.items.splice(from, 1);

  playlist.items.splice(to, 0, item);
  persist();
  renderPlaylists();
}

function createPlaylist(name) {
  const clean = name.trim();
  if (!clean) return;
  const id = `${slugify(clean) || "playlist"}-${Date.now()}`;
  state.playlists.push({ id, name: clean, items: [] });
  state.activePlaylist = id;
  persist();
  renderPlaylists();
  showToast(`Playlist "${clean}" created`);

  if (window.Get2LearnApi && state.user) {
    window.Get2LearnApi.createPlaylist(clean)
      .then((created) => {
        const pl = state.playlists.find((p) => p.id === id);
        if (pl) pl.id = created.id;
        if (state.activePlaylist === id) state.activePlaylist = created.id;
        persist();
        renderPlaylists();
      })
      .catch((err) => console.warn("API create playlist failed", err));
  }
}

/* ── REFRESH HELPER ─────────────────────────────────────────── */
function refreshAll() {
  if (state.activePage === "explore")     { renderVideos(); renderPlaylists(); }
  if (state.activePage === "home")        renderHome();
  if (state.activePage === "my-learning") renderMyLearning();
}

/* ── VIDEO DETAIL DRAWER ────────────────────────────────────── */
let _previousFocusEl = null;

function openDetail(videoId) {
  const video = getVideoById(videoId);
  if (!video) return;
  state.activeVideoId = videoId;
  _previousFocusEl    = document.activeElement;
  renderDetail(video);
  if (typeof els.videoDialog.showModal === "function") {
    els.videoDialog.showModal();
  }
  // Move focus to close button
  requestAnimationFrame(() => els.closeDetail?.focus());
}

function renderActiveDetail() {
  if (!state.activeVideoId || !els.videoDialog.open) return;
  const video = getVideoById(state.activeVideoId);
  if (video) renderDetail(video);
}

function renderDetail(video) {
  const isSaved     = state.saved.has(video.id);
  const isCompleted = state.completed.has(video.id);

  if (els.detailMeta)        els.detailMeta.textContent        = `${video.provider} · ${video.year}`;
  if (els.detailTitle)       els.detailTitle.textContent       = video.title;
  if (els.detailDescription) els.detailDescription.textContent = video.description;
  if (els.detailDuration)    els.detailDuration.textContent    = formatDuration(video.duration);
  if (els.detailLevel)       els.detailLevel.textContent       = video.level;
  if (els.detailTopic)       els.detailTopic.textContent       = video.topic;
  if (els.detailNote)        els.detailNote.value              = state.notes[video.id] || "";
  if (els.detailOpen) {
    els.detailOpen.href = video.url;
    const label = isCompleted ? "▶ Review" : state.notes[video.id] ? "▶ Resume" : "▶ Start learning";
    els.detailOpen.textContent = label;
    els.detailOpen.setAttribute("aria-label", `${label} — opens in new tab`);
  }

  if (els.detailThumb) {
    if (video.thumbnail) {
      els.detailThumb.hidden = false;
      els.detailThumb.src    = video.thumbnail;
      els.detailThumb.alt    = `${video.title} thumbnail`;
    } else {
      els.detailThumb.hidden = true;
      els.detailThumb.removeAttribute("src");
      els.detailThumb.alt = "";
    }
  }

  if (els.detailSave) {
    els.detailSave.textContent = isSaved ? "♥ Saved" : "♡ Save";
    els.detailSave.setAttribute("aria-pressed", String(isSaved));
  }
  if (els.detailComplete) {
    els.detailComplete.textContent = isCompleted ? "✓ Completed" : "Mark complete";
    els.detailComplete.setAttribute("aria-pressed", String(isCompleted));
  }

  // Recommendation reason
  const reason = getRecommendationReason(video);
  const existingReason = els.videoDialog?.querySelector(".detail-reason");
  if (existingReason) existingReason.remove();
  if (reason && els.detailStats) {
    const reasonEl = document.createElement("p");
    reasonEl.className = "detail-reason";
    reasonEl.textContent = `✦ ${reason}`;
    els.detailStats.insertAdjacentElement("afterend", reasonEl);
  }
}

/* ── URL UTILITIES ──────────────────────────────────────────── */
function extractYouTubeId(url) {
  try {
    const parsed = new URL(url);
    const host   = parsed.hostname.replace("www.", "");
    if (host === "youtu.be") return parsed.pathname.slice(1).split("/")[0];
    if (host.endsWith("youtube.com")) {
      const directId = parsed.searchParams.get("v");
      if (directId) return directId;
      const match = parsed.pathname.match(/\/(embed|shorts)\/([A-Za-z0-9_-]{11})/);
      return match ? match[2] : "";
    }
  } catch { return ""; }
  return "";
}

function thumbnailFromUrl(url) {
  const id = extractYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
}

function providerFromUrl(url) {
  try {
    const host = new URL(url).hostname.replace("www.", "");
    if (host.includes("youtube") || host.includes("youtu.be")) return "YouTube";
    if (host.includes("vimeo")) return "Vimeo";
    return host.split(".")[0].replace(/^./, (c) => c.toUpperCase());
  } catch { return "External"; }
}

function slugify(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/* ── INGEST / ADD LINK ──────────────────────────────────────── */
function createCustomVideo() {
  const title       = els.ingestTitle?.value.trim() || "";
  const url         = els.ingestUrl?.value.trim()   || "";
  const topic       = els.ingestTopic?.value.trim()  || "";
  const level       = els.ingestLevel?.value         || "Beginner";
  const duration    = Number(els.ingestDuration?.value) || 20;
  const year        = Number(els.ingestYear?.value)     || 2026;
  const description = els.ingestDescription?.value.trim() || "";
  const tags        = (els.ingestTags?.value || "")
    .split(",").map((t) => t.trim()).filter(Boolean).slice(0, 5);

  return {
    id:          `custom-${slugify(title) || "video"}-${Date.now()}`,
    title,
    topic,
    level,
    duration,
    year,
    provider:    providerFromUrl(url),
    url,
    thumbnail:   thumbnailFromUrl(url),
    description,
    tags:        tags.length ? tags : [topic],
    popularity:  70
  };
}

function showIngestThumbPreview(url) {
  if (!els.ingestThumbPreview || !els.ingestThumbImg) return;
  const thumb = thumbnailFromUrl(url);
  if (thumb) {
    els.ingestThumbImg.src  = thumb;
    els.ingestThumbImg.alt  = "YouTube thumbnail preview";
    els.ingestThumbPreview.hidden = false;
  } else {
    els.ingestThumbPreview.hidden = true;
    els.ingestThumbImg.removeAttribute("src");
  }
}

function checkDuplicateUrl(url) {
  return getCatalogVideos().some((v) => v.url === url);
}

/* ── FEEDBACK ───────────────────────────────────────────────── */
function openFeedbackDialog() {
  if (typeof els.feedbackDialog.showModal === "function") {
    els.feedbackDialog.showModal();
    requestAnimationFrame(() => els.feedbackType?.focus());
  }
}

function reportActiveVideo() {
  const video = getVideoById(state.activeVideoId);
  if (video) {
    if (els.feedbackType) els.feedbackType.value = "broken";
    if (els.feedbackMessage) els.feedbackMessage.value = `Broken link: ${video.title} (${video.url})`;
    els.videoDialog.close();
  }
  openFeedbackDialog();
}

/* ── RESUME ─────────────────────────────────────────────────── */
function openResumeCandidate() {
  const candidate = getResumeCandidate();
  if (candidate) openDetail(candidate.id);
}

/* ── BACKEND SYNC ───────────────────────────────────────────── */
async function syncBackendVideos() {
  if (!window.Get2LearnApi) {
    setApiStatus("offline", "Local mode");
    return;
  }
  try {
    await window.Get2LearnApi.health();
    setApiStatus("online", "API online");
  } catch {
    setApiStatus("offline", "Local mode");
    return;
  }
  try {
    const response = await window.Get2LearnApi.listVideos({ page_size: 100, sort: "popular" });
    const videos   = (response.items || []).map(apiVideoToLocal);
    if (videos.length) {
      state.remoteVideos = videos;
      hydrateFilters();
      refreshAll();
      setApiStatus("synced", "API synced");
    } else {
      setApiStatus("online", "API online");
    }
  } catch {
    setApiStatus("partial", "API ready");
  }
}

/* ── AUTHENTICATION & USER DATA SYNC ─────────────────────────── */
function renderAuthHeader() {
  const container = els.authHeaderContainer || document.querySelector("#auth-header-container");
  if (!container) return;

  if (state.user) {
    const email = state.user.email;
    const role = state.user.role || "student";
    container.innerHTML = `
      <div class="user-badge" title="Logged in as ${escapeHtml(email)}">
        <span>${escapeHtml(email.split("@")[0])}</span>
        <span class="role-pill" data-role="${escapeHtml(role)}">${escapeHtml(role)}</span>
      </div>
      <button class="icon-button" id="logout-btn" type="button" aria-label="Sign out">
        <span class="button-icon" aria-hidden="true">🚪</span>
        <span class="button-text">Logout</span>
      </button>`;
    container.querySelector("#logout-btn")?.addEventListener("click", () => {
      if (window.Get2LearnApi) window.Get2LearnApi.clearToken();
      state.user = null;
      renderAuthHeader();
      showToast("Signed out");
    });
  } else {
    container.innerHTML = `
      <button class="icon-button" id="open-auth" type="button" aria-label="Sign in or register account">
        <span class="button-icon" aria-hidden="true">👤</span>
        <span class="button-text">Sign In</span>
      </button>`;
    container.querySelector("#open-auth")?.addEventListener("click", () => openAuthModal("login"));
  }
}

function openAuthModal(mode = "login") {
  state.authMode = mode;
  if (els.authDialogTitle) {
    els.authDialogTitle.textContent = mode === "login" ? "Sign In to get2learn" : "Create a get2learn Account";
  }
  if (els.authSubmitBtn) {
    els.authSubmitBtn.textContent = mode === "login" ? "Sign In" : "Register Account";
  }
  if (els.authTabLogin && els.authTabRegister) {
    els.authTabLogin.classList.toggle("active", mode === "login");
    els.authTabRegister.classList.toggle("active", mode === "register");
  }
  if (els.authError) {
    els.authError.hidden = true;
    els.authError.textContent = "";
  }
  if (els.authDialog && typeof els.authDialog.showModal === "function") {
    els.authDialog.showModal();
    requestAnimationFrame(() => els.authEmail?.focus());
  }
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const email = els.authEmail?.value.trim();
  const password = els.authPassword?.value;
  if (!email || !password) return;

  if (els.authSubmitBtn) els.authSubmitBtn.disabled = true;
  if (els.authError) els.authError.hidden = true;

  try {
    if (state.authMode === "register") {
      await window.Get2LearnApi.register(email, password);
    }
    await window.Get2LearnApi.login(email, password);
    await checkAuthSession();
    if (els.authDialog) els.authDialog.close();
    if (els.authForm) els.authForm.reset();
    showToast(state.authMode === "login" ? "Signed in successfully" : "Account registered and signed in!");
    await migrateLocalStateToBackend();
  } catch (err) {
    if (els.authError) {
      els.authError.textContent = err.message || "Authentication failed";
      els.authError.hidden = false;
    }
  } finally {
    if (els.authSubmitBtn) els.authSubmitBtn.disabled = false;
  }
}

async function checkAuthSession() {
  if (!window.Get2LearnApi || !window.Get2LearnApi.getToken()) {
    state.user = null;
    renderAuthHeader();
    return;
  }
  try {
    const user = await window.Get2LearnApi.getMe();
    state.user = user;
    renderAuthHeader();
    await syncUserDataFromBackend();
  } catch {
    window.Get2LearnApi.clearToken();
    state.user = null;
    renderAuthHeader();
  }
}

async function syncUserDataFromBackend() {
  if (!window.Get2LearnApi || !state.user || state.apiMode === "offline") return;
  try {
    const [playlists, notes] = await Promise.all([
      window.Get2LearnApi.listPlaylists().catch(() => []),
      window.Get2LearnApi.listNotes().catch(() => [])
    ]);

    if (Array.isArray(playlists) && playlists.length) {
      state.playlists = playlists.map((pl) => ({
        id: pl.id,
        name: pl.name,
        is_default_save_for_later: pl.is_default_save_for_later,
        items: (pl.items || []).map((item) => item.video_id)
      }));
      const defaultPl = state.playlists.find((pl) => pl.is_default_save_for_later);
      if (defaultPl) {
        state.saved = new Set(defaultPl.items);
      }
    }

    if (Array.isArray(notes)) {
      notes.forEach((n) => {
        if (n.video_id && n.note_text) {
          state.notes[n.video_id] = n.note_text;
        }
      });
    }

    persist();
    refreshAll();
  } catch (err) {
    console.warn("Backend user data sync notice:", err);
  }
}

async function migrateLocalStateToBackend() {
  if (!window.Get2LearnApi || !state.user || state.apiMode === "offline") return;
  try {
    if (["curator", "admin"].includes(state.user.role)) {
      for (const v of state.customVideos) {
        try {
          await window.Get2LearnApi.addVideo({
            title: v.title,
            url: v.url,
            topic: v.topic,
            level: v.level,
            duration_minutes: v.duration,
            year: v.year,
            description: v.description,
            tags: v.tags,
            thumbnail_url: v.thumbnail || null
          });
        } catch {
          // ignore duplicates
        }
      }
    }

    const allVideoIds = new Set([
      ...state.saved,
      ...state.completed,
      ...Object.keys(state.reactions)
    ]);
    for (const vid of allVideoIds) {
      const isSaved = state.saved.has(vid);
      const isDone = state.completed.has(vid);
      const react = state.reactions[vid];

      if (vid.includes("-") && vid.length > 20) {
        try {
          await window.Get2LearnApi.updateInteraction({
            video_id: vid,
            is_saved: isSaved,
            is_completed: isDone,
            reaction: react === "up" ? "useful" : react === "down" ? "skip" : null,
            clear_reaction: !react
          });
        } catch {
          // ignore
        }
      }
    }

    for (const [vid, text] of Object.entries(state.notes)) {
      if (vid.includes("-") && vid.length > 20 && text) {
        try {
          await window.Get2LearnApi.upsertNote(vid, text);
        } catch {
          // ignore
        }
      }
    }

    await syncUserDataFromBackend();
  } catch (err) {
    console.warn("Local migration notice:", err);
  }
}


/* ── EVENT BINDING ──────────────────────────────────────────── */
function bindEvents() {
  // ── Auth Modal & Form ─────────────────────────────────────────
  els.openAuth?.addEventListener("click", () => openAuthModal("login"));
  els.closeAuth?.addEventListener("click", () => els.authDialog?.close());
  els.authTabLogin?.addEventListener("click", () => openAuthModal("login"));
  els.authTabRegister?.addEventListener("click", () => openAuthModal("register"));
  els.authForm?.addEventListener("submit", handleAuthSubmit);

  // ── Navigation ──────────────────────────────────────────────
  // Desktop rail
  els.navItems.forEach((item) => {
    item.addEventListener("click", () => navigateTo(item.dataset.page));
  });
  // Mobile bottom bar
  els.bottomNavItems.forEach((item) => {
    item.addEventListener("click", () => navigateTo(item.dataset.page));
  });
  // Brand link → home
  document.querySelector("#brand-link")?.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("home");
  });
  // Add Link buttons
  els.navAddLink?.addEventListener("click", () => {
    if (els.ingestDialog && typeof els.ingestDialog.showModal === "function") {
      els.ingestDialog.showModal();
      requestAnimationFrame(() => els.ingestUrl?.focus());
    }
  });
  els.mobileAddBtn?.addEventListener("click", () => {
    if (els.ingestDialog && typeof els.ingestDialog.showModal === "function") {
      els.ingestDialog.showModal();
      requestAnimationFrame(() => els.ingestUrl?.focus());
    }
  });
  els.openFeedback?.addEventListener("click", openFeedbackDialog);

  // ── Explore filters ─────────────────────────────────────────
  els.search?.addEventListener("input", (e) => {
    state.query = e.target.value;
    window.requestAnimationFrame(renderVideos);
  });
  els.topic?.addEventListener("change", (e) => {
    state.topic = e.target.value;
    renderVideos();
  });
  els.level?.addEventListener("change", (e) => {
    state.level = e.target.value;
    renderVideos();
  });
  els.duration?.addEventListener("change", (e) => {
    state.duration = e.target.value;
    renderVideos();
  });
  els.sort?.addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderVideos();
  });
  els.savedOnly?.addEventListener("change", (e) => {
    state.savedOnly = e.target.checked;
    renderVideos();
  });
  els.freshOnly?.addEventListener("change", (e) => {
    state.freshOnly = e.target.checked;
    renderVideos();
  });
  els.unfinishedOnly?.addEventListener("change", (e) => {
    state.unfinishedOnly = e.target.checked;
    renderVideos();
  });
  els.resumeNext?.addEventListener("click", openResumeCandidate);

  // ── Playlist panel ──────────────────────────────────────────
  els.openPlaylists?.addEventListener("click", () => {
    els.playlistPanel?.classList.add("is-open");
    renderPlaylists();
  });
  els.closePlaylists?.addEventListener("click", () => {
    els.playlistPanel?.classList.remove("is-open");
  });
  els.playlistForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    createPlaylist(els.playlistName?.value || "");
    if (els.playlistName) els.playlistName.value = "";
  });

  // ── Add Link ────────────────────────────────────────────────
  document.querySelector("#open-ingest")?.addEventListener("click", () => {
    if (state.topic !== "all" && els.ingestTopic) els.ingestTopic.value = state.topic;
    if (typeof els.ingestDialog.showModal === "function") {
      els.ingestDialog.showModal();
      requestAnimationFrame(() => els.ingestUrl?.focus());
    }
  });
  els.closeIngest?.addEventListener("click", () => els.ingestDialog.close());
  els.ingestUrl?.addEventListener("blur", () => {
    showIngestThumbPreview(els.ingestUrl.value);
    const isDuplicate = checkDuplicateUrl(els.ingestUrl.value.trim());
    const errEl = document.querySelector("#ingest-url-error");
    if (errEl) {
      errEl.textContent = isDuplicate ? "⚠ This URL is already in the directory." : "";
      errEl.hidden = !isDuplicate;
    }
  });
  els.ingestForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const video = createCustomVideo();
    if (!video.title || !video.url) return;
    state.customVideos.unshift(video);
    persist();
    hydrateFilters();
    refreshAll();
    els.ingestForm.reset();
    if (els.ingestThumbPreview) els.ingestThumbPreview.hidden = true;
    els.ingestDialog.close();
    showToast(`"${video.title}" added to directory`);
  });

  // ── Feedback ────────────────────────────────────────────────
  els.closeFeedback?.addEventListener("click", () => els.feedbackDialog.close());
  els.feedbackMessage?.addEventListener("input", () => {
    const len = els.feedbackMessage.value.length;
    if (els.feedbackCharCount) els.feedbackCharCount.textContent = `${len} / 260`;
  });
  els.feedbackForm?.addEventListener("submit", () => {
    const all  = readJson(storageKeys.feedback, []);
    const msg  = els.feedbackMessage?.value.trim() || "";
    const type = els.feedbackType?.value || "general";
    all.push({ type, message: msg, createdAt: new Date().toISOString() });
    localStorage.setItem(storageKeys.feedback, JSON.stringify(all));
    if (window.Get2LearnApi && state.apiMode !== "offline") {
      window.Get2LearnApi.createFeedback({
        feedback_type: type === "broken" ? "broken_link" : type === "topic" ? "topic_request" : "suggestion",
        message: msg
      }).catch(() => setApiStatus("partial", "API ready"));
    }
    if (els.feedbackMessage) els.feedbackMessage.value = "";
    if (els.feedbackCharCount) els.feedbackCharCount.textContent = "0 / 260";
    showToast("Feedback saved locally — thank you");
  });

  // ── Video drawer ────────────────────────────────────────────
  els.closeDetail?.addEventListener("click", () => els.videoDialog.close());
  els.videoDialog?.addEventListener("close", () => {
    // Save note on close
    if (state.activeVideoId && els.detailNote) {
      const note = els.detailNote.value.trim();
      if (note) {
        state.notes[state.activeVideoId] = note;
      } else {
        delete state.notes[state.activeVideoId];
      }
      persist();
    }
    // Restore focus
    _previousFocusEl?.focus();
    state.activeVideoId = "";
    refreshAll();
  });
  els.detailThumb?.addEventListener("error", () => {
    if (els.detailThumb) {
      els.detailThumb.hidden = true;
      els.detailThumb.removeAttribute("src");
    }
  });
  els.detailNote?.addEventListener("input", (e) => {
    if (!state.activeVideoId) return;
    const note = e.target.value.trim();
    if (note) { state.notes[state.activeVideoId] = note; }
    else      { delete state.notes[state.activeVideoId]; }
    persist();
  });
  els.detailSave?.addEventListener("click", () => {
    if (state.activeVideoId) toggleSaved(state.activeVideoId);
    renderActiveDetail();
  });
  els.detailComplete?.addEventListener("click", () => {
    if (state.activeVideoId) toggleCompleted(state.activeVideoId);
  });
  els.detailAdd?.addEventListener("click", () => {
    if (state.activeVideoId) addToActivePlaylist(state.activeVideoId);
  });
  els.detailReport?.addEventListener("click", reportActiveVideo);

  // ── My Learning tabs ────────────────────────────────────────
  els.tabBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => activateMyTab(btn.dataset.tab));
    btn.addEventListener("keydown", (e) => {
      const tabs = [...els.tabBtns];
      if (e.key === "ArrowRight") {
        e.preventDefault();
        tabs[(index + 1) % tabs.length].focus();
        tabs[(index + 1) % tabs.length].click();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        tabs[(index - 1 + tabs.length) % tabs.length].focus();
        tabs[(index - 1 + tabs.length) % tabs.length].click();
      }
    });
  });

  // ── Notes search ────────────────────────────────────────────
  els.notesSearch?.addEventListener("input", (e) => {
    window.requestAnimationFrame(() => renderNotes(e.target.value));
  });

  // ── Learning Paths ──────────────────────────────────────────
  els.createPathBtn?.addEventListener("click", () => {
    const name = prompt("New learning path name:");
    if (name && name.trim()) {
      const desc = prompt("Short description (optional):") || "";
      createPath(name, desc);
    }
  });

  // ── Escape key for playlist panel (mobile bottom sheet) ─────
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && els.playlistPanel?.classList.contains("is-open")) {
      els.playlistPanel.classList.remove("is-open");
    }
  });
}

/* ── INIT ───────────────────────────────────────────────────── */
function init() {
  seedPlaylistFromSaved();
  hydrateFilters();
  bindEvents();
  renderAuthHeader();

  // Navigate to the persisted page (default: home)
  navigateTo(state.activePage);

  persist();
  syncBackendVideos().then(() => checkAuthSession());
}

init();

