from logging.config import fileConfig
from sqlalchemy import create_engine
from sqlalchemy import pool
from alembic import context
import sys
import os

# Добавляем путь к приложению в sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.models import Base

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata

def get_database_url():
    """Надежное получение URL базы данных"""
    # 1. Пробуем получить из alembic.ini
    url = config.get_main_option("sqlalchemy.url")
    if url:
        print(f"🔗 Using database URL from alembic.ini")
        return url
    
    # 2. Fallback - прямой URL
    fallback_url = "postgresql://mathuser:mathpass@math-db:5432/mathdb"
    print(f"🔗 Using fallback database URL: {fallback_url}")
    return fallback_url

def run_migrations_offline() -> None:
    url = get_database_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    # Используем надежный метод получения URL
    database_url = get_database_url()
    
    print(f"🚀 Connecting to database: {database_url.split('@')[-1]}")
    
    connectable = create_engine(
        database_url,
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, 
            target_metadata=target_metadata,
            compare_type=True,
            compare_server_default=True
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
