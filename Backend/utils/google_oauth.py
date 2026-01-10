from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
from backend.auth_settings import settings
import httpx

# Create async HTTP client for OAuth
async_client = httpx.AsyncClient()

oauth = OAuth()

oauth.register(
    name="google",
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    client_kwargs={
        "scope": "openid email profile"
    }
)
