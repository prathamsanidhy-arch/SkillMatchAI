from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class UserProfile(BaseModel):
    education_level: str = Field(..., description="Highest completed or in-progress education level")
    field_of_study: str = Field(..., description="Academic major or background")
    skills: List[str] = Field(..., min_length=1, description="List of user skills")
    interests: List[str] = Field(default_factory=list, description="Target career interests and topics")
    experience_level: str = Field(default="Beginner / Student", description="Current experience level")
    preferred_location: str = Field(default="Anywhere / Remote", description="Preferred work location")
    preferred_work_arrangement: Optional[str] = Field(default="Any", description="Remote, Hybrid, Onsite, or Any")


class LearningResource(BaseModel):
    title: str
    resource_type: str  # "Documentation", "Course", "Practice", "Book", "Community"
    description: str
    suggested_focus: str


class JobRole(BaseModel):
    id: str
    title: str
    category: str
    description: str
    required_skills: List[str]
    supplementary_skills: List[str]
    typical_experience_level: str
    relevant_interests: List[str]
    example_responsibilities: List[str]
    learning_resources: List[LearningResource]


class RoleMatch(BaseModel):
    role: JobRole
    match_score: int = Field(..., ge=0, le=100)
    score_breakdown: Dict[str, Any]
    matched_skills: List[str]
    matched_supplementary_skills: List[str]
    missing_critical_skills: List[str]
    missing_supplementary_skills: List[str]
    match_explanation: str
    readiness_level: str  # "High Fit", "Moderate Fit", "Foundational / Pivot"


class ProjectSuggestion(BaseModel):
    title: str
    description: str
    key_skills_practiced: List[str]
    difficulty: str


class LearningRoadmap(BaseModel):
    immediate_steps: List[str]
    core_skills_to_learn: List[str]
    practice_projects: List[ProjectSuggestion]
    portfolio_guidance: List[str]
    interview_preparation: List[str]


class AssessmentResponse(BaseModel):
    profile: UserProfile
    top_matches: List[RoleMatch]
    total_evaluated_roles: int
    summary: str
    learning_roadmap: LearningRoadmap
    ai_generated: bool
    ai_notice: str
    sdg_alignment_note: str
    disclaimer: str


class HealthResponse(BaseModel):
    status: str
    roles_count: int
    ai_configured: bool
    version: str
