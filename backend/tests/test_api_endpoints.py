import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.main import create_app
from app.db.session import get_session

TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"


@pytest_asyncio.fixture
async def async_session():
    engine = create_async_engine(TEST_DATABASE_URL, echo=False)
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

    session_factory = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
    async with session_factory() as session:
        yield session

    await engine.dispose()


@pytest_asyncio.fixture
async def client(async_session: AsyncSession):
    app = create_app()

    async def _get_test_session():
        yield async_session

    app.dependency_overrides[get_session] = _get_test_session
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    response = await client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "get2learn API"}


@pytest.mark.asyncio
async def test_auth_flow(client: AsyncClient):
    # 1. Register user
    reg_resp = await client.post(
        "/api/v1/auth/register",
        json={"email": "test@example.com", "password": "securepassword123"},
    )
    assert reg_resp.status_code == 201
    user_data = reg_resp.json()
    assert user_data["email"] == "test@example.com"
    assert user_data["role"] == "student"

    # 2. Login
    login_resp = await client.post(
        "/api/v1/auth/login",
        data={"username": "test@example.com", "password": "securepassword123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert login_resp.status_code == 200
    token = login_resp.json()["access_token"]
    assert token

    # 3. Get /auth/me
    me_resp = await client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert me_resp.status_code == 200
    assert me_resp.json()["email"] == "test@example.com"


@pytest.mark.asyncio
async def test_playlists_and_items_flow(client: AsyncClient):
    # Register & Login
    await client.post("/api/v1/auth/register", json={"email": "playlist@example.com", "password": "password123"})
    login_resp = await client.post(
        "/api/v1/auth/login",
        data={"username": "playlist@example.com", "password": "password123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    token = login_resp.json()["access_token"]
    auth_headers = {"Authorization": f"Bearer {token}"}

    # List initial playlists (should include default Save for Later)
    pls_resp = await client.get("/api/v1/playlists", headers=auth_headers)
    assert pls_resp.status_code == 200
    pls = pls_resp.json()
    assert len(pls) == 1
    assert pls[0]["is_default_save_for_later"] is True

    # Create custom playlist
    create_resp = await client.post("/api/v1/playlists", json={"name": "Docker Mastery"}, headers=auth_headers)
    assert create_resp.status_code == 201
    custom_pl = create_resp.json()
    assert custom_pl["name"] == "Docker Mastery"

    # Delete custom playlist
    del_resp = await client.delete(f"/api/v1/playlists/{custom_pl['id']}", headers=auth_headers)
    assert del_resp.status_code == 204

    # Attempt to delete default playlist (should fail 400)
    del_default_resp = await client.delete(f"/api/v1/playlists/{pls[0]['id']}", headers=auth_headers)
    assert del_default_resp.status_code == 400
