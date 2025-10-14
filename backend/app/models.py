from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import hashlib
from enum import Enum

Base = declarative_base()

class Subject(Enum):
    MATH = "математика"
    PHYSICS = "физика"
    CHEMISTRY = "химия"
    BIOLOGY = "биология"
    RUSSIAN = "русский язык"
    GERMAN = "немецкий язык"
    OTHER = "другой"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    grade = Column(Integer)
    current_subject = Column(String, default='математика')
    parent_name = Column(String, nullable=True)
    parent_email = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    school = Column(String, nullable=True)
    real_grade = Column(Integer, nullable=True)
    city = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    answers = relationship("UserAnswer", back_populates="user")
    tasks = relationship("UserTask", back_populates="user")
    progress = relationship("UserProgress", back_populates="user")
    task_versions = relationship("TaskVersion", back_populates="user")
    grade_history = relationship("UserGradeHistory", back_populates="user")
    subject_history = relationship("UserSubjectHistory", back_populates="user")
    teachers = relationship("UserTeacher", back_populates="user")

class UserTeacher(Base):
    __tablename__ = "user_teachers"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    teacher_name = Column(String)
    subject = Column(String)
    custom_subject = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="teachers")

class UserSubjectHistory(Base):
    __tablename__ = "user_subject_history"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    subject = Column(String)
    start_date = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="subject_history")

class TaskVersion(Base):
    __tablename__ = "task_versions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    version_hash = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="task_versions")
    answers = relationship("UserAnswer", back_populates="task_version")

class UserTask(Base):
    __tablename__ = "user_tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    day = Column(Integer)
    task_index = Column(Integer)
    question = Column(Text)
    answer = Column(Text)
    explanation = Column(Text, nullable=True)
    answer_format = Column(String, nullable=True)
    translation_key = Column(String, nullable=True)
    translation_params = Column(JSON, nullable=True)
    task_data = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="tasks")

class UserAnswer(Base):
    __tablename__ = "user_answers"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    task_version_id = Column(Integer, ForeignKey("task_versions.id"))
    day = Column(Integer)
    task_index = Column(Integer)
    answer = Column(Text)
    is_correct = Column(Boolean)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="answers")
    task_version = relationship("TaskVersion", back_populates="answers")

class UserProgress(Base):
    __tablename__ = "user_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    day = Column(Integer)
    completed_tasks = Column(Integer, default=0)
    total_tasks = Column(Integer, default=0)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="progress")

class UserGradeHistory(Base):
    __tablename__ = "user_grade_history"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    grade = Column(Integer)
    start_date = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="grade_history")
