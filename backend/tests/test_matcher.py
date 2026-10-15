from app.services.matcher import (
    normalize_skill,
    match_user_to_role,
    rank_roles_for_profile,
)
from app.models.schemas import UserProfile
from app.data.roles import get_role_by_id, get_all_roles


def test_normalize_skill_aliases():
    assert normalize_skill("JS") == "javascript"
    assert normalize_skill("JavaScript") == "javascript"
    assert normalize_skill("  python3 ") == "python"
    assert normalize_skill("React.js") == "react"
    assert normalize_skill("postgres") == "postgresql"
    assert normalize_skill("github") == "git"
    assert normalize_skill("UI/UX") == "ui/ux design"


def test_matching_high_fit_python_developer():
    profile = UserProfile(
        education_level="Bachelor's Degree",
        field_of_study="Computer Science",
        skills=["Python", "Git", "REST APIs", "SQL", "FastAPI"],
        interests=["Backend Development", "Automation"],
        experience_level="Beginner / Student",
        preferred_location="Remote",
    )
    python_role = get_role_by_id("python-developer")
    match = match_user_to_role(profile, python_role)

    assert match.match_score >= 80
    assert "Python" in match.matched_skills
    assert "SQL" in match.matched_skills
    assert "Git" in match.matched_skills
    assert len(match.missing_critical_skills) == 0
    assert match.readiness_level == "High Fit"


def test_matching_partial_fit_frontend():
    profile = UserProfile(
        education_level="Bachelor's Degree",
        field_of_study="Information Technology",
        skills=["JavaScript", "HTML/CSS"],
        interests=["Web Development"],
        experience_level="Beginner / Student",
        preferred_location="Any",
    )
    frontend_role = get_role_by_id("frontend-developer")
    match = match_user_to_role(profile, frontend_role)

    # 2 of 4 required matched: JS, HTML/CSS. Missing: React, Git.
    assert match.match_score >= 35
    assert "React" in match.missing_critical_skills
    assert "Git" in match.missing_critical_skills
    assert "JavaScript" in match.matched_skills


def test_rank_roles_returns_best_fit_first():
    profile = UserProfile(
        education_level="Bachelor's Degree",
        field_of_study="Design",
        skills=["Figma", "User Research", "Wireframing", "UI/UX Design"],
        interests=["UI/UX Design", "Product Design"],
        experience_level="Beginner / Student",
    )
    matches = rank_roles_for_profile(profile, get_all_roles())
    assert len(matches) > 0
    # Top match should be UI/UX Designer
    assert matches[0].role.id == "ui-ux-designer"
    assert matches[0].match_score >= 80
