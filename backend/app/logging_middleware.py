import logging
from fastapi import Request
import json

logger = logging.getLogger(__name__)

async def log_requests(request: Request, call_next):
    if "/users/tasks/" in str(request.url):
        body = await request.body()
        try:
            body_json = json.loads(body.decode()) if body else {}
            logger.info(f"📥 Входящий запрос {request.method} {request.url}")
            logger.info(f"📦 Тело запроса: {json.dumps(body_json, indent=2)}")
        except:
            logger.info(f"📥 Входящий запрос {request.method} {request.url}")
            logger.info(f"📦 Тело запроса (не JSON): {body}")
    
    response = await call_next(request)
    return response
