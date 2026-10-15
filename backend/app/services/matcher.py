import re
from typing import List, Dict, Set, Tuple, Any
from app.models.schemas import UserProfile, JobRole, RoleMatch
from app.data.roles import get_all_roles

# Common alias dictionary mapping variants to a standardized canonical key
SKILL_ALIASES: Dict[str, str] = {
    "js": "javascript",
    "javascript": "javascript",
    "ecmascript": "javascript",
    "ts": "typescript",
    "typescript": "typescript",
    "py": "python",
    "python": "python",
    "python3": "python",
    "react": "react",
    "react.js": "react",
    "reactjs": "react",
    "node": "node.js",
    "node.js": "node.js",
    "nodejs": "node.js",
    "html": "html/css",
    "css": "html/css",
    "html5": "html/css",
    "css3": "html/css",
    "html/css": "html/css",
    "html & css": "html/css",
    "tailwind": "tailwind css",
    "tailwind css": "tailwind css",
    "tailwindcss": "tailwind css",
    "sql": "sql",
    "mysql": "sql",
    "sqlite": "sql",
    "postgres": "postgresql",
    "postgresql": "postgresql",
    "psql": "postgresql",
    "git": "git",
    "github": "git",
    "gitlab": "git",
    "version control": "git",
    "rest": "rest apis",
    "rest api": "rest apis",
    "rest apis": "rest apis",
    "apis": "rest apis",
    "api": "rest apis",
    "restful": "rest apis",
    "restful api": "rest apis",
    "fastapi": "fastapi",
    "django": "django",
    "docker": "docker",
    "containers": "docker",
    "figma": "figma",
    "ui": "ui/ux design",
    "ux": "ui/ux design",
    "ui/ux": "ui/ux design",
    "ui/ux design": "ui/ux design",
    "user experience": "ui/ux design",
    "user interface": "ui/ux design",
    "wireframing": "wireframing",
    "prototyping": "prototyping",
    "user research": "user research",
    "design systems": "design systems",
    "ml": "machine learning",
    "machine learning": "machine learning",
    "ai": "artificial intelligence",
    "artificial intelligence": "artificial intelligence",
    "pandas": "pandas",
    "numpy": "numpy",
    "scikit-learn": "scikit-learn",
    "sklearn": "scikit-learn",
    "pytorch": "pytorch",
    "data visualization": "data visualization",
    "dataviz": "data visualization",
    "excel": "excel / spreadsheets",
    "spreadsheets": "excel / spreadsheets",
    "google sheets": "excel / spreadsheets",
    "power bi": "power bi",
    "powerbi": "power bi",
    "tableau": "tableau",
    "statistics": "statistics",
    "manual testing": "manual testing",
    "test planning": "test planning",
    "bug reporting": "bug reporting",
    "selenium": "selenium",
    "cypress": "cypress",
    "postman": "postman / api testing",
    "postman / api testing": "postman / api testing",
    "api testing": "postman / api testing",
    "linux": "linux",
    "bash": "bash / shell",
    "shell": "bash / shell",
    "bash / shell": "bash / shell",
    "networking": "networking fundamentals",
    "networking fundamentals": "networking fundamentals",
    "security": "security fundamentals",
    "security fundamentals": "security fundamentals",
    "cybersecurity": "cybersecurity",
    "seo": "seo basics",
    "seo basics": "seo basics",
    "content writing": "content writing",
    "copywriting": "copywriting",
    "social media": "social media marketing",
    "social media marketing": "social media marketing",
    "analytics": "web analytics",
    "web analytics": "web analytics",
    "google analytics": "google analytics (ga4)",
    "ga4": "google analytics (ga4)",
    "business process": "business process mapping",
    "business process mapping": "business process mapping",
    "requirements gathering": "requirements gathering",
    "agile": "agile / scrum",
    "scrum": "agile / scrum",
    "agile / scrum": "agile / scrum",
    "jira": "jira",
    "troubleshooting": "troubleshooting",
    "operating systems": "operating systems",
    "customer communication": "customer communication",
}


def normalize_skill(skill: str) -> str:
    """
    Standardize a skill string by lowercasing, stripping punctuation,
    and resolving recognized synonyms.
    """
    cleaned = skill.strip().lower()
    cleaned = re.sub(r"\s+", " ", cleaned)
    
    # Check direct match in alias table
    if cleaned in SKILL_ALIASES:
        return SKILL_ALIASES[cleaned]
    
    # Remove leading/trailing non-alphanumeric except common symbols (+, #, /)
    cleaned_simple = re.sub(r"^[^a-z0-9+#]+|[^a-z0-9+#]+$", "", cleaned)
    if cleaned_simple in SKILL_ALIASES:
        return SKILL_ALIASES[cleaned_simple]

    return cleaned


def normalize_skill_set(skills: List[str]) -> Set[str]:
    return {normalize_skill(s) for s in skills if s.strip()}


def match_user_to_role(profile: UserProfile, role: JobRole) -> RoleMatch:
    """
    Deterministic scoring algorithm:
    - Required skills: up to 60 points
    - Supplementary skills: up to 20 points
    - Interest alignment: up to 15 points
    - Experience fit: up to 5 points
    Total maximum: 100 points
    """
    user_skills_normalized = normalize_skill_set(profile.skills)
    
    # Evaluate Required Skills (60% weight)
    matched_req: List[str] = []
    missing_req: List[str] = []
    for req in role.required_skills:
        req_norm = normalize_skill(req)
        # Check exact normalized match or substring inclusion
        if req_norm in user_skills_normalized or any(req_norm in us for us in user_skills_normalized):
            matched_req.append(req)
        else:
            missing_req.append(req)
            
    req_ratio = len(matched_req) / len(role.required_skills) if role.required_skills else 1.0
    req_points = req_ratio * 60.0

    # Evaluate Supplementary Skills (20% weight)
    matched_supp: List[str] = []
    missing_supp: List[str] = []
    for supp in role.supplementary_skills:
        supp_norm = normalize_skill(supp)
        if supp_norm in user_skills_normalized or any(supp_norm in us for us in user_skills_normalized):
            matched_supp.append(supp)
        else:
            missing_supp.append(supp)
            
    supp_ratio = len(matched_supp) / len(role.supplementary_skills) if role.supplementary_skills else 0.0
    # Capped at 20 points
    supp_points = min(20.0, supp_ratio * 20.0)

    # Evaluate Interests (15% weight)
    user_interests_norm = {i.strip().lower() for i in profile.interests}
    role_interests_norm = {i.strip().lower() for i in role.relevant_interests}
    common_interests = user_interests_norm.intersection(role_interests_norm)
    
    if len(role_interests_norm) > 0 and len(common_interests) > 0:
        interest_ratio = min(1.0, len(common_interests) / min(2, len(role_interests_norm)))
        interest_points = interest_ratio * 15.0
    else:
        interest_points = 0.0

    # Evaluate Experience fit (5% weight)
    # Entry-level / Student is targeted
    exp_points = 5.0

    total_score = int(round(req_points + supp_points + interest_points + exp_points))
    # Bound between 0 and 100
    total_score = max(0, min(100, total_score))

    # Readiness level
    if total_score >= 70:
        readiness = "High Fit"
    elif total_score >= 45:
        readiness = "Moderate Fit"
    else:
        readiness = "Foundational / Pivot"

    # Construct transparent explanation
    parts = []
    parts.append(f"Matched {len(matched_req)} of {len(role.required_skills)} required skills ({int(req_ratio * 100)}%)")
    if matched_supp:
        parts.append(f"{len(matched_supp)} bonus skill{'s' if len(matched_supp) > 1 else ''}")
    if common_interests:
        parts.append(f"strong alignment with {len(common_interests)} stated interest{'s' if len(common_interests) > 1 else ''}")
    else:
        parts.append("general foundational alignment")

    explanation = "; ".join(parts) + "."

    score_breakdown = {
        "required_skills_score": round(req_points, 1),
        "required_skills_max": 60,
        "supplementary_skills_score": round(supp_points, 1),
        "supplementary_skills_max": 20,
        "interest_fit_score": round(interest_points, 1),
        "interest_fit_max": 15,
        "experience_fit_score": round(exp_points, 1),
        "experience_fit_max": 5,
        "required_coverage_percent": int(req_ratio * 100),
    }

    return RoleMatch(
        role=role,
        match_score=total_score,
        score_breakdown=score_breakdown,
        matched_skills=matched_req,
        matched_supplementary_skills=matched_supp,
        missing_critical_skills=missing_req,
        missing_supplementary_skills=missing_supp,
        match_explanation=explanation,
        readiness_level=readiness,
    )


def rank_roles_for_profile(profile: UserProfile, roles: List[JobRole] = None) -> List[RoleMatch]:
    """
    Ranks all job roles against the given user profile in descending order of match score.
    """
    if roles is None:
        roles = get_all_roles()

    matches = [match_user_to_role(profile, role) for role in roles]
    # Sort descending by match score, secondary sort by required skills coverage
    matches.sort(
        key=lambda m: (m.match_score, len(m.matched_skills), len(m.matched_supplementary_skills)),
        reverse=True,
    )
    return matches
