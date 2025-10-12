from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import hashlib

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    grade = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    answers = relationship("UserAnswer", back_populates="user")
    tasks = relationship("UserTask", back_populates="user")
    progress = relationship("UserProgress", back_populates="user")
    task_versions = relationship("TaskVersion", back_populates="user")
    grade_history = relationship("UserGradeHistory", back_populates="user")

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
