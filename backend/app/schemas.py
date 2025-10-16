from typing import Optional, Dict, List, Any
from pydantic import BaseModel, EmailStr
from datetime import datetime

# Схемы для пользователей
class UserBase(BaseModel):
    email: EmailStr
    username: str
    grade: int = 6
    current_subject: str = 'математика'
    parent_name: Optional[str] = None
    parent_email: Optional[str] = None
    age: Optional[int] = None
    school: Optional[str] = None
    real_grade: Optional[int] = None
    city: Optional[str] = None

class UserProfileUpdate(BaseModel):
    parent_name: Optional[str] = None
    parent_email: Optional[str] = None
    age: Optional[int] = None
    school: Optional[str] = None
    real_grade: Optional[int] = None
    city: Optional[str] = None
    current_subject: Optional[str] = None

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

# Схемы для преподавателей
class TeacherBase(BaseModel):
    teacher_name: str
    subject: str
    custom_subject: Optional[str] = None

class TeacherCreate(TeacherBase):
    pass

class TeacherResponse(TeacherBase):
    id: int
    user_id: int
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

# Схемы для истории предметов
class SubjectHistoryBase(BaseModel):
    subject: str
    start_date: datetime

class SubjectHistoryResponse(SubjectHistoryBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Схемы для статистики
class StatsProgressResponse(BaseModel):
    day: int
    completed_tasks: int
    total_tasks: int
    progress_percentage: float
    subject: Optional[str] = None

class StatsPerformanceResponse(BaseModel):
    total_answers: int
    correct_answers: int
    incorrect_answers: int
    success_rate: float
    subject: Optional[str] = None

class StatsTaskTypesResponse(BaseModel):
    task_type: str
    count: int
    correct_count: int
    success_rate: float
    subject: Optional[str] = None

class StatsOverviewResponse(BaseModel):
    total_days: int
    completed_days: int
    total_tasks: int
    completed_tasks: int
    overall_progress: float
    overall_success_rate: float
    average_daily_progress: float
