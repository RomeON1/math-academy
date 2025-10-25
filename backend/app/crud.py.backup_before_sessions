from sqlalchemy.orm import Session
from sqlalchemy import and_, func
import models
import schemas
from auth import get_password_hash, verify_password
import hashlib
import json
from datetime import datetime
from typing import List, Dict, Any

def create_user(db: Session, user_data: schemas.UserCreate):
    hashed_password = get_password_hash(user_data.password)
    db_user = models.User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed_password,
        grade=user_data.grade,
        current_subject=user_data.current_subject,
        parent_name=user_data.parent_name,
        parent_email=user_data.parent_email,
        age=user_data.age,
        school=user_data.school,
        real_grade=user_data.real_grade,
        city=user_data.city
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Добавляем запись в историю классов
    grade_history = models.UserGradeHistory(
        user_id=db_user.id,
        grade=db_user.grade,
        start_date=db_user.created_at
    )
    db.add(grade_history)
    
    # Добавляем запись в историю предметов
    subject_history = models.UserSubjectHistory(
        user_id=db_user.id,
        subject=db_user.current_subject
    )
    db.add(subject_history)
    
    db.commit()
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def update_user_profile(db: Session, user_id: int, profile_data: dict):
    """Обновление профиля пользователя"""
    user = get_user_by_id(db, user_id)
    if not user:
        return None
    
    for field, value in profile_data.items():
        if hasattr(user, field):
            setattr(user, field, value)
    
    db.commit()
    db.refresh(user)
    return user

def update_user_subject(db: Session, user_id: int, new_subject: str):
    """Обновить предмет пользователя"""
    user = get_user_by_id(db, user_id)
    if not user:
        return None
    
    user.current_subject = new_subject
    
    # Добавляем запись в историю
    subject_history = models.UserSubjectHistory(
        user_id=user_id,
        subject=new_subject
    )
    db.add(subject_history)
    db.commit()
    db.refresh(user)
    return user

def get_user_subject_history(db: Session, user_id: int):
    """Получить историю предметов пользователя"""
    return db.query(models.UserSubjectHistory).filter(
        models.UserSubjectHistory.user_id == user_id
    ).order_by(models.UserSubjectHistory.start_date.desc()).all()

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

def get_total_tasks_for_day(db: Session, user_id: int, day: int) -> int:
    """Получить реальное количество заданий для дня пользователя"""
    return db.query(models.UserTask).filter(
        and_(
            models.UserTask.user_id == user_id,
            models.UserTask.day == day
        )
    ).count()

def update_progress_after_answer(db: Session, user_id: int, day: int):
    """Обновляет прогресс после сохранения ответа - ИСПРАВЛЕННАЯ ВЕРСИЯ"""
    # Считаем количество правильных ответов для этого дня - ДОБАВЛЯЕМ COMMIT ПЕРЕД ПОДСЧЕТОМ
    db.commit()  # Гарантируем что все предыдущие изменения сохранены
    
    correct_answers_count = db.query(models.UserAnswer).filter(
        and_(
            models.UserAnswer.user_id == user_id,
            models.UserAnswer.day == day,
            models.UserAnswer.is_correct == True
        )
    ).count()
    
    # Получаем реальное количество заданий для этого дня
    total_tasks = get_total_tasks_for_day(db, user_id, day)
    
    # Если заданий нет, используем значение по умолчанию 10
    if total_tasks == 0:
        total_tasks = 10
    
    # Обновляем прогресс
    progress = db.query(models.UserProgress).filter(
        and_(
            models.UserProgress.user_id == user_id,
            models.UserProgress.day == day
        )
    ).first()
    
    if progress:
        progress.completed_tasks = correct_answers_count
        progress.total_tasks = total_tasks
        progress.updated_at = datetime.utcnow()
    else:
        progress = models.UserProgress(
            user_id=user_id,
            day=day,
            completed_tasks=correct_answers_count,
            total_tasks=total_tasks
        )
        db.add(progress)
    
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
            # Для дней без прогресса используем реальное количество заданий
            total_tasks = get_total_tasks_for_day(db, user_id, int(day))
            result[day] = {
                "completed_tasks": 0,
                "total_tasks": total_tasks if total_tasks > 0 else 10
            }
    
    return result

def update_user_progress(db: Session, user_id: int, day: int, completed_tasks: int):
    # Получаем реальное количество заданий для дня
    total_tasks = get_total_tasks_for_day(db, user_id, day)
    if total_tasks == 0:
        total_tasks = 10
    
    progress = db.query(models.UserProgress).filter(
        and_(
            models.UserProgress.user_id == user_id,
            models.UserProgress.day == day
        )
    ).first()
    
    if progress:
        progress.completed_tasks = completed_tasks
        progress.total_tasks = total_tasks
        progress.updated_at = datetime.utcnow()
    else:
        progress = models.UserProgress(
            user_id=user_id,
            day=day,
            completed_tasks=completed_tasks,
            total_tasks=total_tasks
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

# Новые функции для работы с преподавателями
def get_user_teachers(db: Session, user_id: int):
    """Получить список преподавателей пользователя"""
    return db.query(models.UserTeacher).filter(
        models.UserTeacher.user_id == user_id
    ).order_by(models.UserTeacher.created_at.desc()).all()

def add_user_teacher(db: Session, user_id: int, teacher_data: schemas.TeacherCreate):
    """Добавить преподавателя пользователю"""
    teacher = models.UserTeacher(
        user_id=user_id,
        teacher_name=teacher_data.teacher_name,
        subject=teacher_data.subject,
        custom_subject=teacher_data.custom_subject
    )
    db.add(teacher)
    db.commit()
    db.refresh(teacher)
    return teacher

def remove_user_teacher(db: Session, teacher_id: int, user_id: int):
    """Удалить преподавателя пользователя"""
    teacher = db.query(models.UserTeacher).filter(
        and_(
            models.UserTeacher.id == teacher_id,
            models.UserTeacher.user_id == user_id
        )
    ).first()
    
    if teacher:
        db.delete(teacher)
        db.commit()
        return True
    return False

def update_user_teachers(db: Session, user_id: int, teachers_data: list):
    """Обновить список преподавателей пользователя"""
    # Удаляем старых преподавателей
    db.query(models.UserTeacher).filter(
        models.UserTeacher.user_id == user_id
    ).delete()
    
    # Добавляем новых
    for teacher_data in teachers_data:
        teacher = models.UserTeacher(
            user_id=user_id,
            teacher_name=teacher_data['teacher_name'],
            subject=teacher_data['subject'],
            custom_subject=teacher_data.get('custom_subject')
        )
        db.add(teacher)
    
    db.commit()
    return True

# Функции для статистики
def get_user_progress_stats(db: Session, user_id: int, subject: str = None) -> List[Dict[str, Any]]:
    """Получить статистику прогресса по дням - ИСПРАВЛЕННАЯ ВЕРСИЯ"""
    query = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == user_id
    )
    
    if subject:
        query = query.filter(models.UserProgress.subject == subject)
    
    progress_data = query.order_by(models.UserProgress.day).all()
    
    stats = []
    for progress in progress_data:
        # Используем реальные значения из базы, а не дефолтные
        total_tasks = progress.total_tasks
        completed_tasks = progress.completed_tasks
        
        # Проверяем корректность данных
        if total_tasks == 0:
            total_tasks = 10  # Защита от деления на ноль
        
        progress_percentage = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
        
        stats.append({
            "day": progress.day,
            "completed_tasks": completed_tasks,
            "total_tasks": total_tasks,
            "progress_percentage": round(progress_percentage, 2),
            "subject": progress.subject
        })
    
    return stats

def get_user_performance_stats(db: Session, user_id: int, subject: str = None) -> Dict[str, Any]:
    """Получить статистику успеваемости"""
    query = db.query(models.UserAnswer).filter(
        models.UserAnswer.user_id == user_id
    )
    
    if subject:
        query = query.filter(models.UserAnswer.subject == subject)
    
    answers = query.all()
    
    total_answers = len(answers)
    correct_answers = sum(1 for answer in answers if answer.is_correct)
    incorrect_answers = total_answers - correct_answers
    success_rate = (correct_answers / total_answers * 100) if total_answers > 0 else 0
    
    return {
        "total_answers": total_answers,
        "correct_answers": correct_answers,
        "incorrect_answers": incorrect_answers,
        "success_rate": round(success_rate, 2),
        "subject": subject
    }

def get_user_stats_overview(db: Session, user_id: int) -> Dict[str, Any]:
    """Получить общую статистику пользователя - ИСПРАВЛЕННАЯ ВЕРСИЯ"""
    # Прогресс по дням
    progress_stats = get_user_progress_stats(db, user_id)
    
    # Успеваемость
    performance_stats = get_user_performance_stats(db, user_id)
    
    # Расчет общей статистики
    total_days = len(progress_stats)
    completed_days = sum(1 for day in progress_stats if day["progress_percentage"] >= 100)
    
    # Используем реальные значения из прогресса, а не дефолтные
    total_tasks = sum(day["total_tasks"] for day in progress_stats)
    completed_tasks = sum(day["completed_tasks"] for day in progress_stats)
    
    overall_progress = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
    overall_success_rate = performance_stats["success_rate"]
    
    average_daily_progress = (sum(day["progress_percentage"] for day in progress_stats) / total_days) if total_days > 0 else 0
    
    return {
        "total_days": total_days,
        "completed_days": completed_days,
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "overall_progress": round(overall_progress, 2),
        "overall_success_rate": round(overall_success_rate, 2),
        "average_daily_progress": round(average_daily_progress, 2)
    }
