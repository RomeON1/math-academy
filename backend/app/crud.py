from sqlalchemy.orm import Session
from sqlalchemy import and_
import models
import schemas
from auth import get_password_hash, verify_password
import hashlib
import json
from datetime import datetime

def create_user(db: Session, user_data: schemas.UserCreate):
    hashed_password = get_password_hash(user_data.password)
    db_user = models.User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed_password,
        grade=user_data.grade
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def get_user_task_versions(db: Session, user_id: int) -> list:
    return db.query(models.TaskVersion).filter(
        models.TaskVersion.user_id == user_id
    ).order_by(models.TaskVersion.created_at.desc()).all()

def get_current_task_version(db: Session, user_id: int):
    return db.query(models.TaskVersion).filter(
        models.TaskVersion.user_id == user_id
    ).order_by(models.TaskVersion.created_at.desc()).first()

def save_user_tasks(db: Session, user_id: int, day: int, tasks: list):
    # Удаляем старые задания для этого дня
    db.query(models.UserTask).filter(
        and_(
            models.UserTask.user_id == user_id,
            models.UserTask.day == day
        )
    ).delete()
    
    # Сохраняем новые задания
    for index, task in enumerate(tasks):
        user_task = models.UserTask(
            user_id=user_id,
            day=day,
            task_index=index,
            question=task.get('question', ''),
            answer=task.get('answer', ''),
            explanation=task.get('explanation', ''),
            answer_format=task.get('answer_format', 'number'),
            translation_key=task.get('translation_key'),
            translation_params=task.get('translation_params'),
            task_data=task.get('task_data')
        )
        db.add(user_task)
    
    # Создаем версию заданий
    version_hash = create_version_hash(user_id, tasks)
    
    task_version = models.TaskVersion(
        user_id=user_id,
        version_hash=version_hash
    )
    db.add(task_version)
    
    db.commit()
    
    return {
        "status": "success",
        "day": day,
        "tasks_count": len(tasks),
        "version_hash": version_hash
    }

def create_version_hash(user_id: int, tasks: list) -> str:
    """Создает хэш версии на основе заданий пользователя"""
    tasks_data = json.dumps(tasks, sort_keys=True)
    hash_input = f"{user_id}_{tasks_data}"
    return hashlib.md5(hash_input.encode()).hexdigest()

def get_user_tasks(db: Session, user_id: int):
    tasks = db.query(models.UserTask).filter(
        models.UserTask.user_id == user_id
    ).order_by(models.UserTask.day, models.UserTask.task_index).all()
    
    result = {}
    for task in tasks:
        if str(task.day) not in result:
            result[str(task.day)] = []
        
        result[str(task.day)].append({
            "question": task.question,
            "answer": task.answer,
            "explanation": task.explanation,
            "answer_format": task.answer_format,
            "translation_key": task.translation_key,
            "translation_params": task.translation_params,
            "task_data": task.task_data
        })
    
    return result

def save_user_answer(db: Session, user_id: int, day: int, task_index: int, 
                    answer: str, is_correct: bool, task_version_id: int):
    # Удаляем старый ответ если есть
    db.query(models.UserAnswer).filter(
        and_(
            models.UserAnswer.user_id == user_id,
            models.UserAnswer.day == day,
            models.UserAnswer.task_index == task_index
        )
    ).delete()
    
    # Сохраняем новый ответ
    user_answer = models.UserAnswer(
        user_id=user_id,
        task_version_id=task_version_id,
        day=day,
        task_index=task_index,
        answer=answer,
        is_correct=is_correct
    )
    db.add(user_answer)
    
    # 🟢 ОБНОВЛЯЕМ ПРОГРЕСС ПОСЛЕ СОХРАНЕНИЯ ОТВЕТА
    update_progress_after_answer(db, user_id, day)
    
    db.commit()
    db.refresh(user_answer)
    
    return {
        "status": "success",
        "day": day,
        "task_index": task_index,
        "answer": answer,
        "is_correct": is_correct
    }

def update_progress_after_answer(db: Session, user_id: int, day: int):
    """Обновляет прогресс после сохранения ответа"""
    # Считаем количество правильных ответов для этого дня
    correct_answers_count = db.query(models.UserAnswer).filter(
        and_(
            models.UserAnswer.user_id == user_id,
            models.UserAnswer.day == day,
            models.UserAnswer.is_correct == True
        )
    ).count()
    
    # Обновляем прогресс
    progress = db.query(models.UserProgress).filter(
        and_(
            models.UserProgress.user_id == user_id,
            models.UserProgress.day == day
        )
    ).first()
    
    if progress:
        progress.completed_tasks = correct_answers_count
        progress.updated_at = datetime.utcnow()
    else:
        progress = models.UserProgress(
            user_id=user_id,
            day=day,
            completed_tasks=correct_answers_count,
            total_tasks=10  # фиксированное количество заданий в день
        )
        db.add(progress)
    
    # 🟢 ДОБАВЛЯЕМ COMMIT ДЛЯ СОХРАНЕНИЯ ИЗМЕНЕНИЙ
    db.commit()

def get_user_answers(db: Session, user_id: int, version_id: int = None):
    query = db.query(models.UserAnswer).filter(
        models.UserAnswer.user_id == user_id
    )
    
    if version_id:
        query = query.filter(models.UserAnswer.task_version_id == version_id)
    
    answers = query.all()
    
    result = {}
    for answer in answers:
        if str(answer.day) not in result:
            result[str(answer.day)] = {}
        
        result[str(answer.day)][str(answer.task_index)] = {
            "answer": answer.answer,
            "is_correct": answer.is_correct,
            "created_at": answer.created_at.isoformat() if answer.created_at else None
        }
    
    return result

def get_user_progress(db: Session, user_id: int):
    progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == user_id
    ).all()
    
    result = {}
    for p in progress:
        result[str(p.day)] = {
            "completed_tasks": p.completed_tasks,
            "total_tasks": p.total_tasks or 10
        }
    
    # Добавляем дни без прогресса (0 выполненных)
    user_tasks = db.query(models.UserTask).filter(
        models.UserTask.user_id == user_id
    ).all()
    
    days_with_tasks = set(str(task.day) for task in user_tasks)
    for day in days_with_tasks:
        if day not in result:
            result[day] = {
                "completed_tasks": 0,
                "total_tasks": 10
            }
    
    return result

def update_user_progress(db: Session, user_id: int, day: int, completed_tasks: int):
    progress = db.query(models.UserProgress).filter(
        and_(
            models.UserProgress.user_id == user_id,
            models.UserProgress.day == day
        )
    ).first()
    
    if progress:
        progress.completed_tasks = completed_tasks
        progress.updated_at = datetime.utcnow()
    else:
        progress = models.UserProgress(
            user_id=user_id,
            day=day,
            completed_tasks=completed_tasks,
            total_tasks=10
        )
        db.add(progress)
    
    db.commit()
    db.refresh(progress)
    return progress

def reset_user_progress(db: Session, user_id: int):
    # Удаляем прогресс
    db.query(models.UserProgress).filter(
        models.UserProgress.user_id == user_id
    ).delete()
    
    # Удаляем ответы
    db.query(models.UserAnswer).filter(
        models.UserAnswer.user_id == user_id
    ).delete()
    
    # Удаляем задания
    db.query(models.UserTask).filter(
        models.UserTask.user_id == user_id
    ).delete()
    
    # Удаляем версии
    db.query(models.TaskVersion).filter(
        models.TaskVersion.user_id == user_id
    ).delete()
    
    db.commit()
    
    return {"status": "success", "message": "Progress reset successfully"}
