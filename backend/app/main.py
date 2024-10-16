from fastapi import FastAPI
from app.controllers.chat import router as chat_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

def create_app():
    app.include_router(chat_router)
    return app

app = create_app()
