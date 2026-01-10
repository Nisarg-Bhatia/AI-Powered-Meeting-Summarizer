from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from backend.auth_database import engine, Base
from backend.auth_settings import settings
from routers import auth

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    description="Authentication API for MeetSmart AI",
    version="1.0.0"
)

# Add session middleware for OAuth - MUST be before CORS
app.add_middleware(
    SessionMiddleware, 
    secret_key=settings.SECRET_KEY,
    same_site="lax",
    https_only=False,  # Set to True in production with HTTPS
    max_age=3600,  # 1 hour
    session_cookie="session"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api")

# Health check endpoint
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "message": "MeetSmart AI Backend is running"
    }

# Root endpoint
@app.get("/")
def root():
    return {
        "message": "Welcome to MeetSmart AI API",
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("auth_main:app", host="0.0.0.0", port=8000, reload=True)

