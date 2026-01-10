from fastapi import APIRouter, Depends, HTTPException, status, Header, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from typing import Optional
import secrets
import httpx
from sqlalchemy.orm import Session
from backend.auth_database import get_db
from models.user import User
from schemas.auth import SignupRequest
from utils.password import hash_password

from backend.auth_database import get_db
from schemas.user import (
    UserRegister,
    UserLogin,
    ForgotPassword,
    ResetPassword,
    TokenResponse,
    MessageResponse,
    UserResponse,
)
from services.auth_service import AuthService
from utils.security import decode_access_token
from utils.google_oauth import oauth
from backend.auth_settings import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])


# =========================
# Helper: Get current user
# =========================
def get_current_user_from_token(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    user_id = payload.get("sub")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

    return AuthService.get_current_user(db, int(user_id))


# =========================
# Email / Password Auth
# =========================
@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    return AuthService.register_user(db, user_data)


@router.post("/login", response_model=TokenResponse)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    return AuthService.login_user(db, credentials)


@router.get("/me", response_model=UserResponse)
def get_me(current_user=Depends(get_current_user_from_token)):
    return current_user


@router.post("/forgot-password", response_model=MessageResponse)
def forgot_password(data: ForgotPassword, db: Session = Depends(get_db)):
    return AuthService.forgot_password(db, data.email)


@router.post("/reset-password/{token}", response_model=MessageResponse)
def reset_password(token: str, data: ResetPassword, db: Session = Depends(get_db)):
    return AuthService.reset_password(db, token, data.password)


# =========================
# Google OAuth
# =========================
@router.get("/google/login")
async def google_login():
    """
    Step 1: Redirect user to Google login using manual OAuth URL
    """
    state = secrets.token_urlsafe(32)
    
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": "http://localhost:8000/api/auth/google/callback",
        "response_type": "code",
        "scope": "openid email profile",
        "state": state,
        "access_type": "online",
        "prompt": "consent select_account"  # Force account selection every time
    }
    
    google_auth_url = "https://accounts.google.com/o/oauth2/v2/auth?" + "&".join(
        [f"{k}={v}" for k, v in params.items()]
    )
    
    return RedirectResponse(google_auth_url)


@router.get("/google/callback")
async def google_callback(code: str, state: str, db: Session = Depends(get_db)):
    """
    Step 2: Exchange code for user info and create/login user
    """
    try:
        async with httpx.AsyncClient() as client:
            # Exchange code for access token
            token_response = await client.post(
                "https://oauth2.googleapis.com/token",
                data={
                    "code": code,
                    "client_id": settings.GOOGLE_CLIENT_ID,
                    "client_secret": settings.GOOGLE_CLIENT_SECRET,
                    "redirect_uri": "http://localhost:8000/api/auth/google/callback",
                    "grant_type": "authorization_code",
                },
            )
            
            if token_response.status_code != 200:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Token exchange failed: {token_response.text}"
                )
            
            tokens = token_response.json()
            access_token_google = tokens.get("access_token")
            
            # Get user info
            user_info_response = await client.get(
                "https://www.googleapis.com/oauth2/v2/userinfo",
                headers={"Authorization": f"Bearer {access_token_google}"},
            )
            
            if user_info_response.status_code != 200:
                raise HTTPException(
                    status_code=400,
                    detail="Failed to fetch user info"
                )
            
            user_info = user_info_response.json()
            
    except HTTPException:
        raise
    except Exception as e:
        print(f"OAuth Error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Google authentication failed: {str(e)}")

    # Create or login Google user in database
    user = AuthService.login_or_create_google_user(db, user_info)
    print(f"User logged in/created: {user.email} (ID: {user.id})")

    # Create JWT token
    access_token = AuthService.create_access_token(user.id)

    # Redirect to frontend
    frontend_redirect = f"{settings.FRONTEND_URL}/google-success?token={access_token}"
    return RedirectResponse(frontend_redirect)
