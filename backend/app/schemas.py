from typing import Optional, Dict, List, Any
from pydantic import BaseModel, EmailStr
from datetime import datetime

# Схемы для пользователей
class UserBase(BaseModel):
    email: EmailStr
    username: str
    grade: str = "6"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool = True
    created_at: datetime

    class Config:
        from_attributes = True

# Схемы для прогресса
class ProgressBase(BaseModel):
    day: int
    completed_tasks: int = 0
    total_tasks: int = 10
    answers: Dict[str, str] = {}

class ProgressUpdate(BaseModel):
    completed_tasks: int

class ProgressResponse(ProgressBase):
    last_updated: datetime

    class Config:
        from_attributes = True

# Схемы для заданий
class TaskBase(BaseModel):
    question: str
    answer: str
    explanation: str
    answer_format: str

class TaskCreate(TaskBase):
    translation_key: Optional[str] = None
    translation_params: Optional[Dict[str, Any]] = None
    task_data: Optional[Dict[str, Any]] = None

class TaskResponse(TaskBase):
    id: int
    translation_key: Optional[str] = None
    translation_params: Optional[Dict[str, Any]] = None
    task_data: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True

# Схемы для ответов
class AnswerBase(BaseModel):
    answer: str
    is_correct: bool = False

class AnswerCreate(AnswerBase):
    pass

class AnswerResponse(AnswerBase):
    id: int
    day: int
    task_index: int
    answered_at: datetime

    class Config:
        from_attributes = True

# Схемы для токенов
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None
