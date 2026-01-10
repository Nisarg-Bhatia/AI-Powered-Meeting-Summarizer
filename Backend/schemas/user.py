from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

# Request schemas
class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ForgotPassword(BaseModel):
    email: EmailStr

class ResetPassword(BaseModel):
    password: str = Field(..., min_length=6)

# Response schemas
class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class MessageResponse(BaseModel):
    message: str
    success: bool = True
