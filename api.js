(function attachGet2LearnApi() {
  const defaultBaseUrl = "http://127.0.0.1:8000/api/v1";
  const baseUrl = localStorage.getItem("g2l.apiBaseUrl") || defaultBaseUrl;
  const tokenKey = "g2l.authToken";

  function getToken() {
    return localStorage.getItem(tokenKey);
  }

  function setToken(token) {
    localStorage.setItem(tokenKey, token);
  }

  function clearToken() {
    localStorage.removeItem(tokenKey);
  }

  function buildUrl(path, params) {
    const url = new URL(`${baseUrl}${path}`);
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  }

  async function request(path, options) {
    const token = getToken();
    const headers = new Headers(options?.headers || {});

    if (!headers.has("Content-Type") && options?.body && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(buildUrl(path, options?.params), {
      ...options,
      headers
    });

    const isJson = response.headers.get("content-type")?.includes("application/json");
    const payload = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const message = typeof payload === "object" && payload?.detail ? payload.detail : "API request failed";
      throw new Error(Array.isArray(message) ? message.map((item) => item.msg).join(", ") : message);
    }

    return payload;
  }

  async function login(email, password) {
    const body = new URLSearchParams();
    body.set("username", email);
    body.set("password", password);
    const token = await request("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });
    setToken(token.access_token);
    return token;
  }

  window.Get2LearnApi = {
    baseUrl,
    getToken,
    setToken,
    clearToken,
    health: () => request("/health"),
    register: (email, password) => request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }),
    login,
    getMe: () => request("/auth/me"),
    listVideos: (params) => request("/videos", { params }),
    addVideo: (payload) => request("/videos/add", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
    updateInteraction: (payload) => request("/interactions", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
    listPlaylists: () => request("/playlists"),
    createPlaylist: (name) => request("/playlists", {
      method: "POST",
      body: JSON.stringify({ name })
    }),
    addPlaylistItem: (playlistId, videoId) => request(`/playlists/${playlistId}/items`, {
      method: "POST",
      body: JSON.stringify({ video_id: videoId })
    }),
    removePlaylistItem: (playlistId, videoId) => request(`/playlists/${playlistId}/items/${videoId}`, {
      method: "DELETE"
    }),
    deletePlaylist: (playlistId) => request(`/playlists/${playlistId}`, {
      method: "DELETE"
    }),
    reorderPlaylist: (playlistId, orderedVideoIds) => request(`/playlists/${playlistId}/reorder`, {
      method: "PUT",
      body: JSON.stringify({ ordered_video_ids: orderedVideoIds })
    }),
    listNotes: () => request("/notes"),
    upsertNote: (videoId, noteText) => request("/notes", {
      method: "PUT",
      body: JSON.stringify({ video_id: videoId, note_text: noteText })
    }),
    deleteNote: (videoId) => request(`/notes/${videoId}`, {
      method: "DELETE"
    }),
    createFeedback: (payload) => request("/feedback", {
      method: "POST",
      body: JSON.stringify(payload)
    })
  };
})();

