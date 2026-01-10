from sqlalchemy.orm import Session
from models.user import User
from schemas.user import UserRegister, UserLogin
from utils.security import (
    hash_password,
    verify_password,
    create_access_token,
    generate_reset_token,
)
from utils.email import send_password_reset_email, send_welcome_email
from fastapi import HTTPException, status
from datetime import datetime, timedelta


class AuthService:

    # =========================
    # Email / Password Auth
    # =========================
    @staticmethod
    def register_user(db: Session, user_data: UserRegister):
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists",
            )

        # Create new user
        hashed_password = hash_password(user_data.password)
        new_user = User(
            name=user_data.name,
            email=user_data.email,
            password_hash=hashed_password,
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Send welcome email (non-blocking)
        try:
            send_welcome_email(new_user.email, new_user.name)
        except Exception as e:
            print(f"⚠️  Failed to send welcome email: {str(e)}")
            # Don't fail registration if email fails

        access_token = create_access_token(data={"sub": str(new_user.id)})

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": new_user,
        }

    @staticmethod
    def login_user(db: Session, credentials: UserLogin):
        user = db.query(User).filter(User.email == credentials.email).first()

        if not user or not user.password_hash:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        if not verify_password(credentials.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        access_token = create_access_token(data={"sub": str(user.id)})

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user,
        }

    # =========================
    # Google OAuth
    # =========================
    @staticmethod
    def login_or_create_google_user(db: Session, user_info: dict):
        """
        Google user_info contains:
        - email
        - name
        - picture
        - sub (google user id)
        """

        email = user_info.get("email")
        name = user_info.get("name", "")
        
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Google account email not available",
            )

        user = db.query(User).filter(User.email == email).first()

        if not user:
            # Create Google user (NO password)
            user = User(
                name=name,
                email=email,
                password_hash=None,
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            
            # Send welcome email for new Google users
            try:
                send_welcome_email(user.email, user.name)
            except Exception as e:
                print(f"⚠️  Failed to send welcome email: {str(e)}")
                # Don't fail registration if email fails

        return user

    # =========================
    # Common Helpers
    # =========================
    @staticmethod
    def create_access_token(user_id: int):
        """Create JWT access token for user"""
        return create_access_token(data={"sub": str(user_id)})

    @staticmethod
    def get_current_user(db: Session, user_id: int):
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )
        return user

    # =========================
    # Password Reset
    # =========================
    @staticmethod
    def forgot_password(db: Session, email: str):
        user = db.query(User).filter(User.email == email).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No user found with that email",
            )

        reset_token = generate_reset_token()
        user.reset_token = reset_token
        user.reset_token_expires = datetime.utcnow() + timedelta(minutes=10)

        db.commit()

        try:
            send_password_reset_email(user.email, reset_token)
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to send password reset email",
            )

        return {"message": "Password reset email sent", "success": True}

    @staticmethod
    def reset_password(db: Session, token: str, new_password: str):
        user = db.query(User).filter(
            User.reset_token == token,
            User.reset_token_expires > datetime.utcnow(),
        ).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired reset token",
            )

        user.password_hash = hash_password(new_password)
        user.reset_token = None
        user.reset_token_expires = None

        db.commit()

        access_token = create_access_token(data={"sub": str(user.id)})

        return {
            "message": "Password reset successful",
            "success": True,
            "access_token": access_token,
            "token_type": "bearer",
        }
