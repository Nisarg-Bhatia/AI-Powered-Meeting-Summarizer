from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from backend.auth_settings import settings
from fastapi import HTTPException, status
import secrets

# -------------------------
# Password hashing (argon2)
# -------------------------

pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto",
)

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# -------------------------
# JWT helpers
# -------------------------

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()

    expire = (
        datetime.utcnow() + expires_delta
        if expires_delta
        else datetime.utcnow()
        + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    to_encode.update({"exp": expire})
    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )

def decode_access_token(token: str) -> dict:
    try:
        return jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# -------------------------
# Password reset
# -------------------------

def generate_reset_token() -> str:
    return secrets.token_urlsafe(32)
