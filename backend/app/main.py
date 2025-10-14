from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import logging
import json
from typing import List
from datetime import datetime

from database import engine, get_db
import models
from models import User, UserGradeHistory, UserTeacher, UserSubjectHistory
import schemas
from schemas import UserCreate, UserLogin, TaskResponse, AnswerCreate, ProgressUpdate, TaskCreate, TeacherCreate, TeacherResponse, UserProfileUpdate
from auth import get_current_user, create_access_token, get_password_hash, verify_password
import crud
from config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Math Academy API", version="1.1.0")

# Middleware для логирования запросов
@app.middleware("http")
async def log_requests(request: Request, call_next):
    if "/users/tasks/" in str(request.url) or "/users/answers/" in str(request.url):
        try:
            body = await request.body()
            body_json = json.loads(body.decode()) if body else {}
            logger.info(f"📥 ВХОДЯЩИЙ ЗАПРОС: {request.method} {request.url}")
            if body:
                logger.info(f"📦 ТЕЛО ЗАПРОСА: {json.dumps(body_json, indent=2)}")
            
            # Восстанавливаем body для дальнейшей обработки
            async def receive():
                return {'type': 'http.request', 'body': body}
            request._receive = receive
            
        except Exception as e:
            logger.info(f"📥 ВХОДЯЩИЙ ЗАПРОС: {request.method} {request.url}")
            logger.info(f"❌ Ошибка парсинга тела: {e}")
    
    response = await call_next(request)
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Math Academy API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "math-academy-api"}

@app.post("/api/auth/register")
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    try:
        user = crud.create_user(db, user_data)
        
        access_token = create_access_token(data={"sub": str(user.id)})
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": user.id,
            "email": user.email,
            "username": user.username
        }
    except Exception as e:
        logger.error(f"Registration error: {e}")
        raise HTTPException(status_code=400, detail="Registration failed")

@app.post("/api/auth/login")
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "email": user.email,
        "username": user.username
    }

@app.get("/api/auth/me")
def get_current_user_info(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "username": current_user.username,
        "grade": current_user.grade,
        "current_subject": current_user.current_subject,
        "parent_name": current_user.parent_name,
        "parent_email": current_user.parent_email,
        "age": current_user.age,
        "school": current_user.school,
        "real_grade": current_user.real_grade,
        "city": current_user.city,
        "is_active": True
    }

@app.get("/api/course/structure")
async def get_course_structure():
    return {
        "days": 14,
        "title": "Math Academy - 6th Grade",
        "description": "14-day math course for 6th grade students"
    }

@app.get("/api/course/day/{day_number}/tasks")
async def generate_tasks(day_number: int, db: Session = Depends(get_db)):
    from course_generator import generate_day_tasks
    try:
        tasks = generate_day_tasks(day_number)
        return {"day": day_number, "tasks": tasks}
    except Exception as e:
        logger.error(f"Ошибка генерации заданий: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate tasks")

@app.get("/api/course/progress")
def get_progress(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        progress = crud.get_user_progress(db, current_user.id)
        return progress
    except Exception as e:
        logger.error(f"Ошибка получения прогресса: {e}")
        raise HTTPException(status_code=500, detail="Failed to get progress")

@app.post("/api/course/progress/{day}")
def update_progress(day: int, progress_data: ProgressUpdate, 
                   current_user: User = Depends(get_current_user), 
                   db: Session = Depends(get_db)):
    try:
        progress = crud.update_user_progress(db, current_user.id, day, progress_data.completed_tasks)
        return {"status": "success", "day": day, "completed_tasks": progress.completed_tasks}
    except Exception as e:
        logger.error(f"Ошибка обновления прогресса: {e}")
        raise HTTPException(status_code=500, detail="Failed to update progress")

@app.post("/api/course/reset-progress")
def reset_progress(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = crud.reset_user_progress(db, current_user.id)
        return result
    except Exception as e:
        logger.error(f"Ошибка сброса прогресса: {e}")
        raise HTTPException(status_code=500, detail="Failed to reset progress")

@app.get("/api/users/tasks")
def get_all_user_tasks(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        tasks = crud.get_user_tasks(db, current_user.id)
        return tasks
    except Exception as e:
        logger.error(f"Ошибка получения заданий: {e}")
        raise HTTPException(status_code=500, detail="Failed to get tasks")

@app.get("/api/users/tasks/{day}")
def get_user_tasks_by_day(day: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        tasks = crud.get_user_tasks(db, current_user.id)
        day_tasks = tasks.get(str(day), [])
        return {"day": day, "tasks": day_tasks}
    except Exception as e:
        logger.error(f"Ошибка получения заданий дня: {e}")
        raise HTTPException(status_code=500, detail="Failed to get day tasks")

@app.post("/api/users/tasks/{day}")
def save_user_tasks(day: int, tasks: List[TaskCreate], 
                   current_user: User = Depends(get_current_user), 
                   db: Session = Depends(get_db)):
    try:
        logger.info(f"💾 Начало сохранения заданий дня {day}")
        logger.info(f"📥 Получено {len(tasks)} заданий")
        
        # Преобразуем Pydantic модели в словари для crud
        tasks_data = [task.dict() for task in tasks]
        result = crud.save_user_tasks(db, current_user.id, day, tasks_data)
        
        logger.info(f"✅ Задания успешно сохранены: {result}")
        return result
        
    except Exception as e:
        logger.error(f"❌ Ошибка сохранения заданий: {e}")
        import traceback
        logger.error(f"❌ Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="Failed to save tasks")

# 🟢 ИСПРАВЛЕННЫЙ ENDPOINT СОХРАНЕНИЯ ОТВЕТОВ
@app.post("/api/users/answers/{day}/{task_index}")
def save_user_answer(day: int, task_index: int, answer_data: AnswerCreate,
                    current_user: User = Depends(get_current_user), 
                    db: Session = Depends(get_db)):
    try:
        logger.info(f"💾 Сохранение ответа: день {day}, задание {task_index}")
        logger.info(f"📥 Ответ: {answer_data.answer}, правильно: {answer_data.is_correct}")
        
        current_version = crud.get_current_task_version(db, current_user.id)
        logger.info(f"🔍 Текущая версия заданий: {current_version}")
        
        if not current_version:
            logger.error("❌ Не найдена текущая версия заданий")
            raise HTTPException(status_code=400, detail="No task version found")
        
        result = crud.save_user_answer(
            db, current_user.id, day, task_index, 
            answer_data.answer, answer_data.is_correct, current_version.id
        )
        
        logger.info(f"✅ Ответ успешно сохранен: {result}")
        return {"status": "success", "day": day, "task_index": task_index}
        
    except Exception as e:
        logger.error(f"❌ Ошибка сохранения ответа: {e}")
        import traceback
        logger.error(f"❌ Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="Failed to save answer")

@app.get("/api/users/answers")
def get_user_answers(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        current_version = crud.get_current_task_version(db, current_user.id)
        version_id = current_version.id if current_version else None
        answers = crud.get_user_answers(db, current_user.id, version_id)
        return answers
    except Exception as e:
        logger.error(f"Ошибка получения ответов: {e}")
        raise HTTPException(status_code=500, detail="Failed to get answers")

# Endpoints для управления классами
@app.get("/api/grades")
async def get_available_grades():
    """Получить список доступных классов (1-11)"""
    return {"grades": list(range(1, 12))}

@app.post("/api/users/{user_id}/grade")
async def update_user_grade(
    user_id: int,
    new_grade: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Обновить класс пользователя"""
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if new_grade < 1 or new_grade > 11:
        raise HTTPException(status_code=400, detail="Grade must be between 1 and 11")
    
    # Обновляем текущий класс
    current_user.grade = new_grade
    
    # Добавляем запись в историю
    grade_history = UserGradeHistory(
        user_id=user_id,
        grade=new_grade,
        start_date=datetime.utcnow()
    )
    db.add(grade_history)
    db.commit()
    
    return {"message": "Grade updated successfully", "new_grade": new_grade}

@app.get("/api/users/{user_id}/grade-history")
async def get_user_grade_history(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Получить историю классов пользователя"""
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    history = db.query(UserGradeHistory).filter(
        UserGradeHistory.user_id == user_id
    ).order_by(UserGradeHistory.start_date.desc()).all()
    
    return history

# НОВЫЕ ENDPOINTS ДЛЯ ПРЕДМЕТОВ
@app.get("/api/subjects")
async def get_available_subjects():
    """Получить список доступных предметов"""
    subjects = [
        "математика", "физика", "химия", "биология", 
        "русский язык", "немецкий язык", "английский язык", "информатика"
    ]
    return {"subjects": subjects}

@app.post("/api/users/{user_id}/subject")
async def update_user_subject(
    user_id: int,
    new_subject: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Обновить предмет пользователя"""
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    available_subjects = ["математика", "физика", "химия", "биология", 
                         "русский язык", "немецкий язык", "английский язык", "информатика"]
    
    if new_subject not in available_subjects:
        raise HTTPException(status_code=400, detail="Invalid subject")
    
    user = crud.update_user_subject(db, user_id, new_subject)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "Subject updated successfully", "new_subject": new_subject}

@app.get("/api/users/{user_id}/subject-history")
async def get_user_subject_history(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Получить историю предметов пользователя"""
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    history = crud.get_user_subject_history(db, user_id)
    return history

# НОВЫЕ ENDPOINTS ДЛЯ ПРОФИЛЯ И ПРЕПОДАВАТЕЛЕЙ
@app.get("/api/users/{user_id}/profile")
async def get_user_profile(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Получить профиль пользователя"""
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    user = crud.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

@app.put("/api/users/{user_id}/profile")
async def update_user_profile(
    user_id: int,
    profile_data: UserProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Обновление профиля пользователя"""
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this profile")
    
    user = crud.update_user_profile(db, user_id, profile_data.dict(exclude_unset=True))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

@app.get("/api/users/{user_id}/teachers")
async def get_user_teachers(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Получить список преподавателей пользователя"""
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    teachers = crud.get_user_teachers(db, user_id)
    # Преобразуем объекты SQLAlchemy в словари для корректной сериализации
    teachers_list = []
    for teacher in teachers:
        teachers_list.append({
            "id": teacher.id,
            "user_id": teacher.user_id,
            "teacher_name": teacher.teacher_name,
            "subject": teacher.subject,
            "custom_subject": teacher.custom_subject,
            "created_at": teacher.created_at
        })
    
    return teachers_list

@app.post("/api/users/{user_id}/teachers")
async def add_user_teacher(
    user_id: int,
    teacher_data: TeacherCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Добавить преподавателя пользователю"""
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    teacher = crud.add_user_teacher(db, user_id, teacher_data)
    return {
        "id": teacher.id,
        "user_id": teacher.user_id,
        "teacher_name": teacher.teacher_name,
        "subject": teacher.subject,
        "custom_subject": teacher.custom_subject,
        "created_at": teacher.created_at
    }

@app.delete("/api/users/{user_id}/teachers/{teacher_id}")
async def remove_user_teacher(
    user_id: int,
    teacher_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Удалить преподавателя пользователя"""
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    success = crud.remove_user_teacher(db, teacher_id, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    return {"message": "Teacher removed successfully"}

@app.put("/api/users/{user_id}/teachers")
async def update_user_teachers(
    user_id: int,
    teachers_data: List[dict],
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Обновить список преподавателей пользователя"""
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    success = crud.update_user_teachers(db, user_id, teachers_data)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to update teachers")
    
    return {"message": "Teachers updated successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=4000)
