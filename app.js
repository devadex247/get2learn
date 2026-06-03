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
  feedback: "g2l.feedback"
};

const state = {
  query: "",
  topic: "all",
  level: "all",
  duration: "all",
  sort: "recommended",
  savedOnly: false,
  freshOnly: false,
  saved: readSet(storageKeys.saved),
  reactions: readJson(storageKeys.reactions, {}),
  playlists: readJson(storageKeys.playlists, [
    { id: "save-later", name: "Save for Later", items: [] }
  ]),
  activePlaylist: localStorage.getItem(storageKeys.activePlaylist) || "save-later"
};

const els = {
  search: document.querySelector("#search-input"),
  topic: document.querySelector("#topic-filter"),
  level: document.querySelector("#level-filter"),
  duration: document.querySelector("#duration-filter"),
  sort: document.querySelector("#sort-filter"),
  savedOnly: document.querySelector("#saved-only"),
  freshOnly: document.querySelector("#fresh-only"),
  grid: document.querySelector("#video-grid"),
  template: document.querySelector("#video-card-template"),
  visibleCount: document.querySelector("#visible-count"),
  savedCount: document.querySelector("#saved-count"),
  playlistCount: document.querySelector("#playlist-count"),
  summary: document.querySelector("#result-summary"),
  emptyState: document.querySelector("#empty-state"),
  rail: document.querySelector("#recommendation-rail"),
  playlistPanel: document.querySelector("#playlist-panel"),
  openPlaylists: document.querySelector("#open-playlists"),
  closePlaylists: document.querySelector("#close-playlists"),
  playlistForm: document.querySelector("#playlist-form"),
  playlistName: document.querySelector("#playlist-name"),
  playlistTabs: document.querySelector("#playlist-tabs"),
  playlistItems: document.querySelector("#playlist-items"),
  feedbackDialog: document.querySelector("#feedback-dialog"),
  feedbackForm: document.querySelector("#feedback-form"),
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

function seedPlaylistFromSaved() {
  const saveLater = state.playlists.find((playlist) => playlist.id === "save-later");
  if (saveLater) {
    saveLater.items = [...new Set([...saveLater.items, ...state.saved])];
  }
}

function hydrateFilters() {
  const topics = ["all", ...[...new Set(curatedVideos.map((video) => video.topic))].sort()];
  const levels = ["all", ...[...new Set(curatedVideos.map((video) => video.level))].sort()];

  els.topic.innerHTML = topics
    .map((topic) => `<option value="${topic}">${topic === "all" ? "All topics" : topic}</option>`)
    .join("");
  els.level.innerHTML = levels
    .map((level) => `<option value="${level}">${level === "all" ? "All levels" : level}</option>`)
    .join("");
}

function scoreVideo(video) {
  let score = video.popularity;
  if (state.saved.has(video.id)) score += 18;
  if (state.reactions[video.id] === "up") score += 14;
  if (state.reactions[video.id] === "down") score -= 22;

  const preferredTopics = new Set(
    curatedVideos
      .filter((item) => state.saved.has(item.id) || state.reactions[item.id] === "up")
      .map((item) => item.topic)
  );

  if (preferredTopics.has(video.topic)) score += 8;
  if (video.year >= 2026) score += 4;
  return score;
}

function getFilteredVideos() {
  const query = normalize(state.query);

  return curatedVideos
    .filter((video) => {
      const searchable = normalize([
        video.title,
        video.topic,
        video.level,
        video.provider,
        video.description,
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

      return matchesQuery && matchesTopic && matchesLevel && matchesDuration && matchesSaved && matchesFresh;
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
  const reactions = node.querySelectorAll(".reaction-button");

  link.href = video.url;
  link.setAttribute("aria-label", `Open ${video.title}`);
  image.src = video.thumbnail;
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
  tags.innerHTML = video.tags.map((tag) => `<span>${tag}</span>`).join("");

  save.textContent = state.saved.has(video.id) ? "Saved" : "Save";
  save.setAttribute("aria-pressed", String(state.saved.has(video.id)));
  save.addEventListener("click", () => toggleSaved(video.id));

  add.addEventListener("click", () => addToActivePlaylist(video.id));

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
  els.savedCount.textContent = state.saved.size;
  els.playlistCount.textContent = state.playlists.length;
  els.summary.textContent = `${videos.length} curated video${videos.length === 1 ? "" : "s"} ready`;
  els.emptyState.hidden = videos.length > 0;
  renderRecommendations();
}

function renderRecommendations() {
  const recommendations = curatedVideos
    .filter((video) => !state.saved.has(video.id) && state.reactions[video.id] !== "down")
    .sort((a, b) => scoreVideo(b) - scoreVideo(a))
    .slice(0, 4);

  if (!recommendations.length) {
    els.rail.innerHTML = '<p class="empty-state">Your queue is full. Nice momentum.</p>';
    return;
  }

  els.rail.replaceChildren(
    ...recommendations.map((video) => {
      const card = document.createElement("a");
      card.className = "rail-card";
      card.href = video.url;
      card.target = "_blank";
      card.rel = "noreferrer";
      card.innerHTML = `<strong>${video.title}</strong><small>${video.topic} / ${formatDuration(video.duration)}</small>`;
      return card;
    })
  );
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
    .map((id) => curatedVideos.find((video) => video.id === id))
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
        <span class="playlist-item-title">${video.title}</span>
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
  els.savedCount.textContent = state.saved.size;
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
}

function setReaction(videoId, reaction) {
  state.reactions[videoId] = state.reactions[videoId] === reaction ? "" : reaction;
  persist();
  renderVideos();
}

function addToActivePlaylist(videoId) {
  addToPlaylist(state.activePlaylist, videoId, true);
}

function addToPlaylist(playlistId, videoId, rerender) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist) return;
  playlist.items = [...new Set([...playlist.items, videoId])];
  persist();
  if (rerender) renderPlaylists();
}

function removeFromPlaylist(playlistId, videoId) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist) return;
  playlist.items = playlist.items.filter((id) => id !== videoId);
  if (playlistId === "save-later") state.saved.delete(videoId);
  persist();
  renderVideos();
  renderPlaylists();
}

function movePlaylistItem(playlistId, from, to) {
  const playlist = state.playlists.find((item) => item.id === playlistId);
  if (!playlist || to < 0 || to >= playlist.items.length || from === to) return;
  const [item] = playlist.items.splice(from, 1);
  playlist.items.splice(to, 0, item);
  persist();
  renderPlaylists();
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
  els.openFeedback.addEventListener("click", () => {
    if (typeof els.feedbackDialog.showModal === "function") {
      els.feedbackDialog.showModal();
    }
  });
  els.closeFeedback.addEventListener("click", () => {
    els.feedbackDialog.close();
  });
  els.feedbackForm.addEventListener("submit", () => {
    const feedback = readJson(storageKeys.feedback, []);
    feedback.push({
      type: document.querySelector("#feedback-type").value,
      message: document.querySelector("#feedback-message").value.trim(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(storageKeys.feedback, JSON.stringify(feedback));
    document.querySelector("#feedback-message").value = "";
  });
}

function init() {
  seedPlaylistFromSaved();
  hydrateFilters();
  bindEvents();
  renderVideos();
  renderPlaylists();
  persist();
}

init();
