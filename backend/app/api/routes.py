import os
from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models.schemas import (
    UserProfile,
    AssessmentResponse,
    HealthResponse,
    JobRole,
)
from app.data.roles import get_all_roles, get_role_by_id
from app.services.matcher import rank_roles_for_profile
from app.services.ai_service import analyze_career_path

router = APIRouter(prefix="/api", tags=["SkillMatch"])


@router.get("/health", response_model=HealthResponse)
def health_check():
    roles = get_all_roles()
    ai_key = os.getenv("GEMINI_API_KEY", "").strip()
    return HealthResponse(
        status="operational",
        roles_count=len(roles),
        ai_configured=bool(ai_key),
        version="1.0.0",
    )


@router.get("/roles", response_model=List[JobRole])
def list_job_roles():
    """Returns the curated benchmark dataset of career roles."""
    return get_all_roles()


@router.get("/roles/{role_id}", response_model=JobRole)
def get_role_details(role_id: str):
    """Returns detailed profile for a specific career role."""
    try:
        return get_role_by_id(role_id)
    except KeyError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role with ID '{role_id}' not found.",
        )


@router.post("/assess", response_model=AssessmentResponse)
def run_career_assessment(profile: UserProfile):
    """
    Evaluates user profile against curated entry-level roles,
    ranks matches using transparent deterministic scoring,
    and returns a structured career guidance summary and learning roadmap.
    """
    if not profile.skills or len(profile.skills) == 0:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="At least one skill must be provided for career matching.",
        )

    all_roles = get_all_roles()
    ranked_matches = rank_roles_for_profile(profile, all_roles)

    # Top recommendations to highlight (top 4 or those with score > 20)
    top_matches = ranked_matches[:4]

    summary, roadmap, ai_generated, ai_notice = analyze_career_path(
        profile, top_matches
    )

    sdg_note = (
        "Aligned with UN Sustainable Development Goal 8 (Decent Work & Economic Growth): "
        "Empowering youth and job-seekers to understand skill prerequisites and navigate the "
        "transition from education to productive employment."
    )

    disclaimer = (
        "SkillMatch AI is an educational career guidance prototype and does not represent a recruitment agency. "
        "Scores indicate alignment with standard job descriptions and do not guarantee employment, eligibility, or hiring decisions."
    )

    return AssessmentResponse(
        profile=profile,
        top_matches=top_matches,
        total_evaluated_roles=len(all_roles),
        summary=summary,
        learning_roadmap=roadmap,
        ai_generated=ai_generated,
        ai_notice=ai_notice,
        sdg_alignment_note=sdg_note,
        disclaimer=disclaimer,
    )
