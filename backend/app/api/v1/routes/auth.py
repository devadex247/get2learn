from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.dependencies import get_current_user
from app.core.errors import ResourceConflictError
from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.models import Playlist, User
from app.db.session import get_session
from app.schemas.auth import Token, UserCreate, UserRead

router = APIRouter()


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register_user(payload: UserCreate, session: AsyncSession = Depends(get_session)) -> User:
    existing_user = await session.execute(select(User).where(User.email == payload.email.lower()))
    if existing_user.scalar_one_or_none():
        raise ResourceConflictError("A user with this email already exists")

    user = User(email=payload.email.lower(), hashed_password=get_password_hash(payload.password))
    session.add(user)
    await session.flush()
    session.add(Playlist(user_id=user.id, name="Save for Later", is_default_save_for_later=True))

    try:
        await session.commit()
    except IntegrityError as exc:
        await session.rollback()
        raise ResourceConflictError("A user with this email already exists") from exc

    await session.refresh(user)
    return user


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_session),
) -> Token:
    result = await session.execute(select(User).where(User.email == form_data.username.lower()))
    user = result.scalar_one_or_none()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return Token(access_token=create_access_token(user))


@router.get("/me", response_model=UserRead)
async def get_me(current_user: User = Depends(get_current_user)) -> User:
    return current_user

