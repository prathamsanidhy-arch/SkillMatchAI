import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

# Load local .env if present
load_dotenv()

app = FastAPI(
    title="SkillMatch AI — Backend Guidance API",
    description="Deterministic skill-matching and AI career path guidance supporting UN SDG 8.",
    version="1.0.0",
)

# CORS configuration: Allow explicit origins + all Vercel deployments + local dev
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "").strip()
if allowed_origins_env:
    origins = [orig.strip() for orig in allowed_origins_env.split(",") if orig.strip()]
else:
    origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^https://.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/health")
def health():
    """Simple root health check endpoint for hosting providers (e.g. Render)."""
    return {
        "status": "healthy",
        "service": "SkillMatch AI Backend",
        "version": "1.0.0",
    }


@app.get("/")
def root():
    return {
        "service": "SkillMatch AI Backend API",
        "sdg_target": "UN SDG 8 — Decent Work and Economic Growth",
        "documentation": "/docs",
        "health": "/health",
        "api_health": "/api/health",
        "roles": "/api/roles",
    }
