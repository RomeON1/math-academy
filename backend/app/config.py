import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://mathuser:mathpass@math-db:5432/mathdb")
    
    # 🟢 ФИКСИРОВАННЫЙ СЕКРЕТНЫЙ КЛЮЧ
    SECRET_KEY: str = "math_academy_fixed_jwt_secret_2024_october_06_final"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    
    BACKEND_CORS_ORIGINS: list = [
        "https://math.my-ai-agency.de",
        "http://localhost:3000",
    ]
    
settings = Settings()

print(f"🔐 JWT Config: SECRET_KEY={settings.SECRET_KEY[:10]}..., ALGORITHM={settings.ALGORITHM}")
