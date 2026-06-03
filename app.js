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

const storageKeys = {
  saved: "g2l.saved",
  reactions: "g2l.reactions",
  playlists: "g2l.playlists",
  activePlaylist: "g2l.activePlaylist",
  feedback: "g2l.feedback",
  completed: "g2l.completed",
  notes: "g2l.notes",
  customVideos: "g2l.customVideos"
};

const state = {
  query: "",
  topic: "all",
  level: "all",
  duration: "all",
  sort: "recommended",
  savedOnly: false,
  freshOnly: false,
  unfinishedOnly: false,
  apiMode: "checking",
  remoteVideos: [],
  saved: readSet(storageKeys.saved),
  completed: readSet(storageKeys.completed),
  notes: readJson(storageKeys.notes, {}),
  customVideos: readJson(storageKeys.customVideos, []),
  reactions: readJson(storageKeys.reactions, {}),
  playlists: readJson(storageKeys.playlists, [
    { id: "save-later", name: "Save for Later", items: [] }
  ]),
  activePlaylist: localStorage.getItem(storageKeys.activePlaylist) || "save-later",
  activeVideoId: ""
};

const els = {
  search: document.querySelector("#search-input"),
  topic: document.querySelector("#topic-filter"),
  level: document.querySelector("#level-filter"),
  duration: document.querySelector("#duration-filter"),
  sort: document.querySelector("#sort-filter"),
  savedOnly: document.querySelector("#saved-only"),
  freshOnly: document.querySelector("#fresh-only"),
  unfinishedOnly: document.querySelector("#unfinished-only"),
  grid: document.querySelector("#video-grid"),
  template: document.querySelector("#video-card-template"),
  visibleCount: document.querySelector("#visible-count"),
  savedCount: document.querySelector("#saved-count"),
  completedCount: document.querySelector("#completed-count"),
  playlistCount: document.querySelector("#playlist-count"),
  summary: document.querySelector("#result-summary"),
  emptyState: document.querySelector("#empty-state"),
  rail: document.querySelector("#recommendation-rail"),
  progressBar: document.querySelector("#progress-bar"),
  progressSummary: document.querySelector("#progress-summary"),
  resumeNext: document.querySelector("#resume-next"),
  apiStatus: document.querySelector("#api-status"),
  playlistPanel: document.querySelector("#playlist-panel"),
  openIngest: document.querySelector("#open-ingest"),
  openPlaylists: document.querySelector("#open-playlists"),
  closePlaylists: document.querySelector("#close-playlists"),
  playlistForm: document.querySelector("#playlist-form"),
  playlistName: document.querySelector("#playlist-name"),
  playlistTabs: document.querySelector("#playlist-tabs"),
  playlistItems: document.querySelector("#playlist-items"),
  videoDialog: document.querySelector("#video-dialog"),
  closeDetail: document.querySelector("#close-detail"),
  detailMeta: document.querySelector("#detail-meta"),
  detailTitle: document.querySelector("#detail-title"),
  detailThumb: document.querySelector("#detail-thumb"),
  detailDescription: document.querySelector("#detail-description"),
  detailDuration: document.querySelector("#detail-duration"),
  detailLevel: document.querySelector("#detail-level"),
  detailTopic: document.querySelector("#detail-topic"),
  detailNote: document.querySelector("#detail-note"),
  detailOpen: document.querySelector("#detail-open"),
  detailSave: document.querySelector("#detail-save"),
  detailComplete: document.querySelector("#detail-complete"),
  detailAdd: document.querySelector("#detail-add"),
  detailReport: document.querySelector("#detail-report"),
  ingestDialog: document.querySelector("#ingest-dialog"),
  ingestForm: document.querySelector("#ingest-form"),
  closeIngest: document.querySelector("#close-ingest"),
  ingestTitle: document.querySelector("#ingest-title-input"),
  ingestUrl: document.querySelector("#ingest-url"),
  ingestTopic: document.querySelector("#ingest-topic"),
  ingestLevel: document.querySelector("#ingest-level"),
  ingestDuration: document.querySelector("#ingest-duration"),
  ingestYear: document.querySelector("#ingest-year"),
  ingestDescription: document.querySelector("#ingest-description"),
  ingestTags: document.querySelector("#ingest-tags"),
  feedbackDialog: document.querySelector("#feedback-dialog"),
  feedbackForm: document.querySelector("#feedback-form"),
  feedbackType: document.querySelector("#feedback-type"),
  feedbackMessage: document.querySelector("#feedback-message"),
  closeFeedback: document.querySelector("#close-feedback"),
  openFeedback: document.querySelector("#open-feedback")
};

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
  localStorage.setItem(storageKeys.saved, JSON.stringify([...state.saved]));
  localStorage.setItem(storageKeys.completed, JSON.stringify([...state.completed]));
  localStorage.setItem(storageKeys.notes, JSON.stringify(state.notes));
  localStorage.setItem(storageKeys.customVideos, JSON.stringify(state.customVideos));
  localStorage.setItem(storageKeys.reactions, JSON.stringify(state.reactions));
  localStorage.setItem(storageKeys.playlists, JSON.stringify(state.playlists));
  localStorage.setItem(storageKeys.activePlaylist, state.activePlaylist);
}

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

function getCatalogVideos() {
  const baseVideos = state.remoteVideos.length ? state.remoteVideos : curatedVideos;
  return [...baseVideos, ...state.customVideos];
}

function getVideoById(videoId) {
  return getCatalogVideos().find((video) => video.id === videoId);
}

function apiVideoToLocal(video) {
  return {
    id: video.id,
    title: video.title,
    topic: video.topic,
    level: video.level,
    duration: video.duration_minutes,
    year: video.year,
    provider: video.provider,
    url: video.url,
    thumbnail: video.thumbnail_url || "",
    description: video.description,
    tags: video.tags || [],
    popularity: video.popularity_score || 0
  };
}

function setApiStatus(mode, label) {
  state.apiMode = mode;
  els.apiStatus.textContent = label;
  els.apiStatus.dataset.status = mode;
}

function getCompletedCount() {
  return [...state.completed].filter((id) => getVideoById(id)).length;
}

function seedPlaylistFromSaved() {
  const saveLater = state.playlists.find((playlist) => playlist.id === "save-later");
  if (saveLater) {
    saveLater.items = [...new Set([...saveLater.items, ...state.saved])];
  }
}

function hydrateFilters() {
  const videos = getCatalogVideos();
  const topics = ["all", ...[...new Set(videos.map((video) => video.topic))].sort()];
  const levels = ["all", ...[...new Set(videos.map((video) => video.level))].sort()];

  els.topic.innerHTML = topics
    .map((topic) => `<option value="${escapeHtml(topic)}">${topic === "all" ? "All topics" : escapeHtml(topic)}</option>`)
    .join("");
  els.level.innerHTML = levels
    .map((level) => `<option value="${escapeHtml(level)}">${level === "all" ? "All levels" : escapeHtml(level)}</option>`)
    .join("");

  if (!topics.includes(state.topic)) state.topic = "all";
  if (!levels.includes(state.level)) state.level = "all";
  els.topic.value = state.topic;
  els.level.value = state.level;
}

function scoreVideo(video) {
  let score = video.popularity;
  if (state.saved.has(video.id)) score += 18;
  if (state.completed.has(video.id)) score -= 26;
  if (state.reactions[video.id] === "up") score += 14;
  if (state.reactions[video.id] === "down") score -= 22;

  const preferredTopics = new Set(
    getCatalogVideos()
      .filter((item) => state.saved.has(item.id) || state.reactions[item.id] === "up")
      .map((item) => item.topic)
  );

  if (preferredTopics.has(video.topic)) score += 8;
  if (video.year >= 2026) score += 4;
  return score;
}

function getFilteredVideos() {
  const query = normalize(state.query);

  return getCatalogVideos()
    .filter((video) => {
      const searchable = normalize([
        video.title,
        video.topic,
        video.level,
        video.provider,
        video.description,
        state.notes[video.id] || "",
        video.tags.join(" ")
      ].join(" "));

      const matchesQuery = !query || searchable.includes(query);
      const matchesTopic = state.topic === "all" || video.topic === state.topic;
      const matchesLevel = state.level === "all" || video.level === state.level;
      const matchesDuration =
        state.duration === "all" ||
        (state.duration === "short" && video.duration < 20) ||
        (state.duration === "medium" && video.duration >= 20 && video.duration <= 45) ||
        (state.duration === "long" && video.duration > 45);
      const matchesSaved = !state.savedOnly || state.saved.has(video.id);
      const matchesFresh = !state.freshOnly || video.year >= 2026;
      const matchesUnfinished = !state.unfinishedOnly || !state.completed.has(video.id);

      return matchesQuery && matchesTopic && matchesLevel && matchesDuration && matchesSaved && matchesFresh && matchesUnfinished;
    })
    .sort((a, b) => {
      if (state.sort === "newest") return b.year - a.year || b.popularity - a.popularity;
      if (state.sort === "shortest") return a.duration - b.duration;
      if (state.sort === "popular") return b.popularity - a.popularity;
      return scoreVideo(b) - scoreVideo(a);
    });
}

function renderVideoCard(video) {
  const node = els.template.content.firstElementChild.cloneNode(true);
  const link = node.querySelector(".thumb-link");
  const image = node.querySelector(".thumb");
  const title = node.querySelector("h3");
  const description = node.querySelector(".description");
  const topic = node.querySelector(".topic-pill");
  const level = node.querySelector(".level-pill");
  const duration = node.querySelector(".duration-pill");
  const tags = node.querySelector(".tag-row");
  const save = node.querySelector(".save-button");
  const add = node.querySelector(".playlist-button");
  const details = node.querySelector(".details-button");
  const complete = node.querySelector(".complete-button");
  const reactions = node.querySelectorAll(".reaction-button");

  node.dataset.completed = String(state.completed.has(video.id));
  link.href = video.url;
  link.setAttribute("aria-label", `Open ${video.title}`);
  if (video.thumbnail) image.src = video.thumbnail;
  image.alt = `${video.title} thumbnail`;
  image.onerror = () => {
    image.removeAttribute("src");
    image.alt = "";
  };
  title.textContent = video.title;
  description.textContent = video.description;
  topic.textContent = video.topic;
  level.textContent = video.level;
  duration.textContent = formatDuration(video.duration);
  tags.innerHTML = video.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  if (state.notes[video.id]) {
    tags.insertAdjacentHTML("beforeend", "<span>Note</span>");
  }

  save.textContent = state.saved.has(video.id) ? "Saved" : "Save";
  save.setAttribute("aria-pressed", String(state.saved.has(video.id)));
  save.addEventListener("click", () => toggleSaved(video.id));

  add.addEventListener("click", () => addToActivePlaylist(video.id));

  details.addEventListener("click", () => openDetail(video.id));

  complete.textContent = state.completed.has(video.id) ? "Done" : "Done";
  complete.setAttribute("aria-pressed", String(state.completed.has(video.id)));
  complete.addEventListener("click", () => toggleCompleted(video.id));

  reactions.forEach((button) => {
    const reaction = button.dataset.reaction;
    button.dataset.active = String(state.reactions[video.id] === reaction);
    button.addEventListener("click", () => setReaction(video.id, reaction));
  });

  return node;
}

function renderVideos() {
  const videos = getFilteredVideos();
  const fragment = document.createDocumentFragment();

  videos.forEach((video) => fragment.appendChild(renderVideoCard(video)));
  els.grid.replaceChildren(fragment);
  els.visibleCount.textContent = videos.length;
  els.summary.textContent = `${videos.length} curated video${videos.length === 1 ? "" : "s"} ready`;
  els.emptyState.hidden = videos.length > 0;
  updateCounts();
  renderProgress();
  renderRecommendations();
}

function renderRecommendations() {
  const recommendations = getCatalogVideos()
    .filter((video) => !state.completed.has(video.id) && state.reactions[video.id] !== "down")
    .sort((a, b) => scoreVideo(b) - scoreVideo(a))
    .slice(0, 4);

  if (!recommendations.length) {
    els.rail.innerHTML = '<p class="empty-state">Your queue is full. Nice momentum.</p>';
    return;
  }

  els.rail.replaceChildren(
    ...recommendations.map((video) => {
      const card = document.createElement("button");
      card.className = "rail-card";
      card.type = "button";
      card.innerHTML = `<strong>${escapeHtml(video.title)}</strong><small>${escapeHtml(video.topic)} / ${formatDuration(video.duration)}</small>`;
      card.addEventListener("click", () => openDetail(video.id));
      return card;
    })
  );
}

function renderProgress() {
  const total = getCatalogVideos().length;
  const completed = getCompletedCount();
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const completedMinutes = getCatalogVideos()
    .filter((video) => state.completed.has(video.id))
    .reduce((sum, video) => sum + video.duration, 0);

  els.progressBar.style.width = `${percent}%`;
  els.progressSummary.textContent = completed
    ? `${completed} of ${total} videos completed / ${completedMinutes} minutes banked.`
    : "Mark videos complete to build your learning signal.";
}

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
    const videos = (response.items || []).map(apiVideoToLocal);
    if (videos.length) {
      state.remoteVideos = videos;
      hydrateFilters();
      renderVideos();
      renderPlaylists();
      setApiStatus("synced", "API synced");
    } else {
      setApiStatus("online", "API online");
    }
  } catch {
    setApiStatus("partial", "API ready");
  }
}

function renderPlaylists() {
  seedPlaylistFromSaved();
  const active = state.playlists.find((playlist) => playlist.id === state.activePlaylist) || state.playlists[0];
  state.activePlaylist = active.id;

  els.playlistTabs.replaceChildren(
    ...state.playlists.map((playlist) => {
      const tab = document.createElement("button");
      tab.className = "playlist-tab";
      tab.type = "button";
      tab.role = "tab";
      tab.textContent = `${playlist.name} (${playlist.items.length})`;
      tab.setAttribute("aria-selected", String(playlist.id === state.activePlaylist));
      tab.addEventListener("click", () => {
        state.activePlaylist = playlist.id;
        persist();
        renderPlaylists();
      });
      return tab;
    })
  );

  const items = active.items
    .map((id) => getVideoById(id))
    .filter(Boolean);

  if (!items.length) {
    els.playlistItems.innerHTML = '<li>Add a video from the directory to build this learning queue.</li>';
    updateCounts();
    return;
  }

  els.playlistItems.replaceChildren(
    ...items.map((video, index) => {
      const li = document.createElement("li");
      li.draggable = true;
      li.dataset.videoId = video.id;
      li.innerHTML = `
        <span class="playlist-item-title">${escapeHtml(video.title)}</span>
        <div class="playlist-item-actions">
          <button type="button" data-action="up">Up</button>
          <button type="button" data-action="down">Down</button>
          <button type="button" data-action="remove">Remove</button>
        </div>
      `;

      li.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", String(index));
      });
      li.addEventListener("dragover", (event) => event.preventDefault());
      li.addEventListener("drop", (event) => {
        event.preventDefault();
        const from = Number(event.dataTransfer.getData("text/plain"));
        movePlaylistItem(active.id, from, index);
      });
      li.querySelector("[data-action='up']").addEventListener("click", () => movePlaylistItem(active.id, index, index - 1));
      li.querySelector("[data-action='down']").addEventListener("click", () => movePlaylistItem(active.id, index, index + 1));
      li.querySelector("[data-action='remove']").addEventListener("click", () => removeFromPlaylist(active.id, video.id));
      return li;
    })
  );
  updateCounts();
}

function updateCounts() {
  els.savedCount.textContent = [...state.saved].filter((id) => getVideoById(id)).length;
  els.completedCount.textContent = getCompletedCount();
  els.playlistCount.textContent = state.playlists.length;
}

function toggleSaved(videoId) {
  if (state.saved.has(videoId)) {
    state.saved.delete(videoId);
    state.playlists.forEach((playlist) => {
      if (playlist.id === "save-later") {
        playlist.items = playlist.items.filter((id) => id !== videoId);
      }
    });
  } else {
    state.saved.add(videoId);
    addToPlaylist("save-later", videoId, false);
  }
  persist();
  renderVideos();
  renderPlaylists();
  renderActiveDetail();
}

function toggleCompleted(videoId) {
  if (state.completed.has(videoId)) {
    state.completed.delete(videoId);
  } else {
    state.completed.add(videoId);
  }
  persist();
  renderVideos();
  renderPlaylists();
  renderActiveDetail();
}

function setReaction(videoId, reaction) {
  state.reactions[videoId] = state.reactions[videoId] === reaction ? "" : reaction;
  persist();
  renderVideos();
  renderActiveDetail();
}

function addToActivePlaylist(videoId) {
  addToPlaylist(state.activePlaylist, videoId, true);
}

function addToPlaylist(playlistId, videoId, rerender) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist) return;
  playlist.items = [...new Set([...playlist.items, videoId])];
  persist();
  if (rerender) {
    renderPlaylists();
    updateCounts();
  }
}

function removeFromPlaylist(playlistId, videoId) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist) return;
  playlist.items = playlist.items.filter((id) => id !== videoId);
  if (playlistId === "save-later") state.saved.delete(videoId);
  persist();
  renderVideos();
  renderPlaylists();
  renderActiveDetail();
}

function movePlaylistItem(playlistId, from, to) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist || to < 0 || to >= playlist.items.length || from === to) return;
  const [item] = playlist.items.splice(from, 1);
  playlist.items.splice(to, 0, item);
  persist();
  renderPlaylists();
}

function renderActiveDetail() {
  if (!state.activeVideoId || !els.videoDialog.open) return;
  const video = getVideoById(state.activeVideoId);
  if (video) renderDetail(video);
}

function openDetail(videoId) {
  const video = getVideoById(videoId);
  if (!video) return;
  state.activeVideoId = videoId;
  renderDetail(video);
  if (typeof els.videoDialog.showModal === "function") {
    els.videoDialog.showModal();
  }
}

function renderDetail(video) {
  els.detailMeta.textContent = `${video.provider} / ${video.year}`;
  els.detailTitle.textContent = video.title;
  els.detailDescription.textContent = video.description;
  els.detailDuration.textContent = formatDuration(video.duration);
  els.detailLevel.textContent = video.level;
  els.detailTopic.textContent = video.topic;
  els.detailNote.value = state.notes[video.id] || "";
  els.detailOpen.href = video.url;

  if (video.thumbnail) {
    els.detailThumb.hidden = false;
    els.detailThumb.src = video.thumbnail;
    els.detailThumb.alt = `${video.title} thumbnail`;
  } else {
    els.detailThumb.hidden = true;
    els.detailThumb.removeAttribute("src");
    els.detailThumb.alt = "";
  }

  els.detailSave.textContent = state.saved.has(video.id) ? "Saved" : "Save";
  els.detailSave.setAttribute("aria-pressed", String(state.saved.has(video.id)));
  els.detailComplete.textContent = state.completed.has(video.id) ? "Completed" : "Mark complete";
  els.detailComplete.setAttribute("aria-pressed", String(state.completed.has(video.id)));
}

function openFeedbackDialog() {
  if (typeof els.feedbackDialog.showModal === "function") {
    els.feedbackDialog.showModal();
  }
}

function reportActiveVideo() {
  const video = getVideoById(state.activeVideoId);
  if (!video) return;
  els.feedbackType.value = "broken";
  els.feedbackMessage.value = `Broken link: ${video.title} (${video.url})`;
  els.videoDialog.close();
  openFeedbackDialog();
}

function extractYouTubeId(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "");
    if (host === "youtu.be") return parsed.pathname.slice(1).split("/")[0];
    if (host.endsWith("youtube.com")) {
      const directId = parsed.searchParams.get("v");
      if (directId) return directId;
      const match = parsed.pathname.match(/\/(embed|shorts)\/([A-Za-z0-9_-]{11})/);
      return match ? match[2] : "";
    }
  } catch {
    return "";
  }
  return "";
}

function thumbnailFromUrl(url) {
  const youtubeId = extractYouTubeId(url);
  return youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : "";
}

function providerFromUrl(url) {
  try {
    const host = new URL(url).hostname.replace("www.", "");
    if (host.includes("youtube")) return "YouTube";
    if (host.includes("youtu.be")) return "YouTube";
    if (host.includes("vimeo")) return "Vimeo";
    return host.split(".")[0].replace(/^./, (letter) => letter.toUpperCase());
  } catch {
    return "External";
  }
}

function slugify(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function createCustomVideo() {
  const title = els.ingestTitle.value.trim();
  const url = els.ingestUrl.value.trim();
  const topic = els.ingestTopic.value.trim();
  const level = els.ingestLevel.value;
  const duration = Number(els.ingestDuration.value);
  const year = Number(els.ingestYear.value);
  const description = els.ingestDescription.value.trim();
  const tags = els.ingestTags.value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 5);

  return {
    id: `custom-${slugify(title) || "video"}-${Date.now()}`,
    title,
    topic,
    level,
    duration,
    year,
    provider: providerFromUrl(url),
    url,
    thumbnail: thumbnailFromUrl(url),
    description,
    tags: tags.length ? tags : [topic],
    popularity: 70
  };
}

function openResumeCandidate() {
  const activePlaylist = state.playlists.find((playlist) => playlist.id === state.activePlaylist);
  const playlistCandidate = activePlaylist
    ? activePlaylist.items.map((id) => getVideoById(id)).find((video) => video && !state.completed.has(video.id))
    : null;
  const recommendedCandidate = getCatalogVideos()
    .filter((video) => !state.completed.has(video.id) && state.reactions[video.id] !== "down")
    .sort((a, b) => scoreVideo(b) - scoreVideo(a))[0];
  const candidate = playlistCandidate || recommendedCandidate;
  if (candidate) openDetail(candidate.id);
}

function createPlaylist(name) {
  const cleanName = name.trim();
  if (!cleanName) return;
  const id = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `playlist-${Date.now()}`;
  const uniqueId = state.playlists.some((playlist) => playlist.id === id) ? `${id}-${Date.now()}` : id;
  state.playlists.push({ id: uniqueId, name: cleanName, items: [] });
  state.activePlaylist = uniqueId;
  persist();
  renderPlaylists();
}

function scheduleRender() {
  window.requestAnimationFrame(renderVideos);
}

function bindEvents() {
  els.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    scheduleRender();
  });
  els.topic.addEventListener("change", (event) => {
    state.topic = event.target.value;
    renderVideos();
  });
  els.level.addEventListener("change", (event) => {
    state.level = event.target.value;
    renderVideos();
  });
  els.duration.addEventListener("change", (event) => {
    state.duration = event.target.value;
    renderVideos();
  });
  els.sort.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderVideos();
  });
  els.savedOnly.addEventListener("change", (event) => {
    state.savedOnly = event.target.checked;
    renderVideos();
  });
  els.freshOnly.addEventListener("change", (event) => {
    state.freshOnly = event.target.checked;
    renderVideos();
  });
  els.unfinishedOnly.addEventListener("change", (event) => {
    state.unfinishedOnly = event.target.checked;
    renderVideos();
  });
  els.resumeNext.addEventListener("click", openResumeCandidate);
  els.openIngest.addEventListener("click", () => {
    if (state.topic !== "all") els.ingestTopic.value = state.topic;
    if (typeof els.ingestDialog.showModal === "function") {
      els.ingestDialog.showModal();
    }
  });
  els.closeIngest.addEventListener("click", () => {
    els.ingestDialog.close();
  });
  els.ingestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const video = createCustomVideo();
    state.customVideos.unshift(video);
    persist();
    hydrateFilters();
    renderVideos();
    renderPlaylists();
    els.ingestForm.reset();
    els.ingestDialog.close();
  });
  els.openPlaylists.addEventListener("click", () => {
    els.playlistPanel.classList.add("is-open");
  });
  els.closePlaylists.addEventListener("click", () => {
    els.playlistPanel.classList.remove("is-open");
  });
  els.playlistForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createPlaylist(els.playlistName.value);
    els.playlistName.value = "";
  });
  els.closeDetail.addEventListener("click", () => {
    els.videoDialog.close();
  });
  els.videoDialog.addEventListener("close", () => {
    state.activeVideoId = "";
    renderVideos();
  });
  els.detailThumb.addEventListener("error", () => {
    els.detailThumb.hidden = true;
    els.detailThumb.removeAttribute("src");
  });
  els.detailNote.addEventListener("input", (event) => {
    if (!state.activeVideoId) return;
    const note = event.target.value.trim();
    if (note) {
      state.notes[state.activeVideoId] = note;
    } else {
      delete state.notes[state.activeVideoId];
    }
    persist();
  });
  els.detailSave.addEventListener("click", () => {
    if (state.activeVideoId) toggleSaved(state.activeVideoId);
  });
  els.detailComplete.addEventListener("click", () => {
    if (state.activeVideoId) toggleCompleted(state.activeVideoId);
  });
  els.detailAdd.addEventListener("click", () => {
    if (state.activeVideoId) addToActivePlaylist(state.activeVideoId);
  });
  els.detailReport.addEventListener("click", reportActiveVideo);
  els.openFeedback.addEventListener("click", () => {
    openFeedbackDialog();
  });
  els.closeFeedback.addEventListener("click", () => {
    els.feedbackDialog.close();
  });
  els.feedbackForm.addEventListener("submit", () => {
    const feedback = readJson(storageKeys.feedback, []);
    const message = els.feedbackMessage.value.trim();
    const feedbackType = els.feedbackType.value;
    feedback.push({
      type: feedbackType,
      message,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(storageKeys.feedback, JSON.stringify(feedback));
    if (window.Get2LearnApi && state.apiMode !== "offline") {
      window.Get2LearnApi.createFeedback({
        feedback_type: feedbackType === "broken" ? "broken_link" : feedbackType === "topic" ? "topic_request" : "suggestion",
        message
      }).catch(() => setApiStatus("partial", "API ready"));
    }
    els.feedbackMessage.value = "";
  });
}

function init() {
  seedPlaylistFromSaved();
  hydrateFilters();
  bindEvents();
  renderVideos();
  renderPlaylists();
  persist();
  syncBackendVideos();
}

init();
