from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import logging
from models import User
from database import get_db
from config import settings

logger = logging.getLogger(__name__)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        if len(plain_password) > 72:
            plain_password = plain_password[:72]
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except Exception as e:
        logger.error(f"Password verification error: {e}")
        return False

def get_password_hash(password: str) -> str:
    if len(password) > 72:
        password = password[:72]
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    logger.info(f"🎫 Создание токена с данными: {to_encode}")
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    logger.info(f"✅ Токен создан для user_id: {data.get('sub')}")
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    logger.info(f"🔐 Начало проверки токена. Длина: {len(token)}")
    logger.info(f"🔐 Используемый SECRET_KEY: {settings.SECRET_KEY[:10]}...")
    logger.info(f"🔐 Используемый ALGORITHM: {settings.ALGORITHM}")
    
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        logger.info(f"✅ Токен декодирован успешно. Payload: {payload}")
        
        user_id: int = payload.get("sub")
        logger.info(f"🔍 Извлечен user_id: {user_id}")
        
        if user_id is None:
            logger.error("❌ В токене нет поля 'sub'")
            raise credentials_exception
            
    except JWTError as e:
        logger.error(f"❌ JWT ошибка при декодировании: {e}")
        logger.error(f"❌ Токен: {token[:50]}...")
        raise credentials_exception
    
    logger.info(f"🔍 Поиск пользователя с id {user_id} в БД")
    user = db.query(User).filter(User.id == user_id).first()
    
    if user is None:
        logger.error(f"❌ Пользователь с id {user_id} не найден в БД")
        raise credentials_exception
        
    logger.info(f"✅ Успешная аутентификация: {user.email} (id: {user.id})")
    return user
