import asyncio
import time
from uuid import uuid4

import httpx


API_BASE_URL = "http://127.0.0.1:8000/api/v1"


async def main() -> None:
    unique = uuid4().hex[:10]
    email = f"smoke-{unique}@get2learn.local"
    password = f"SmokePass-{unique}-2026"

    async with httpx.AsyncClient(base_url=API_BASE_URL, timeout=20) as client:
        health = await client.get("/health")
        health.raise_for_status()
        print("health:", health.json())

        videos = await client.get("/videos", params={"page_size": 5})
        videos.raise_for_status()
        video_items = videos.json().get("items", [])
        print("videos:", len(video_items))

        register = await client.post("/auth/register", json={"email": email, "password": password})
        register.raise_for_status()
        print("registered:", register.json()["email"])

        login = await client.post(
            "/auth/login",
            data={"username": email, "password": password},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        login.raise_for_status()
        token = login.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        print("login: ok")

        playlists = await client.get("/playlists", headers=headers)
        playlists.raise_for_status()
        playlist_items = playlists.json()
        print("playlists:", len(playlist_items))

        if video_items:
            video_id = video_items[0]["id"]
            interaction = await client.post(
                "/interactions",
                json={"video_id": video_id, "is_saved": True, "reaction": "useful", "is_completed": False},
                headers=headers,
            )
            interaction.raise_for_status()
            print("interaction:", interaction.json()["video_id"])
        else:
            print("interaction: skipped, no seeded videos found")

        print("smoke test completed at", int(time.time()))


if __name__ == "__main__":
    asyncio.run(main())
