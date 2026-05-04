import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://mathuser:mathpass@math-db:5432/mathdb")
    
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    if not SECRET_KEY:
        raise RuntimeError("SECRET_KEY must be set in environment variables")

    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
    
    BACKEND_CORS_ORIGINS: list = [
        "https://math.my-ai-agency.de",
        "http://localhost:3000",
    ]
    
settings = Settings()
