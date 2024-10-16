from fastapi import FastAPI
from app.controllers.chat import router as chat_router

def create_app():
    app = FastAPI()

    app.include_router(chat_router)

    return app

app = create_app()
