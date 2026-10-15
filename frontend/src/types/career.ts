export interface UserProfile {
  education_level: string;
  field_of_study: string;
  skills: string[];
  interests: string[];
  experience_level: string;
  preferred_location: string;
  preferred_work_arrangement?: string;
}

export interface LearningResource {
  title: string;
  resource_type: string;
  description: string;
  suggested_focus: string;
}

export interface JobRole {
  id: string;
  title: string;
  category: string;
  description: string;
  required_skills: string[];
  supplementary_skills: string[];
  typical_experience_level: string;
  relevant_interests: string[];
  example_responsibilities: string[];
  learning_resources: LearningResource[];
}

export interface ScoreBreakdown {
  required_skills_score: number;
  required_skills_max: number;
  supplementary_skills_score: number;
  supplementary_skills_max: number;
  interest_fit_score: number;
  interest_fit_max: number;
  experience_fit_score: number;
  experience_fit_max: number;
  required_coverage_percent: number;
}

export interface RoleMatch {
  role: JobRole;
  match_score: number;
  score_breakdown: ScoreBreakdown;
  matched_skills: string[];
  matched_supplementary_skills: string[];
  missing_critical_skills: string[];
  missing_supplementary_skills: string[];
  match_explanation: string;
  readiness_level: 'High Fit' | 'Moderate Fit' | 'Foundational / Pivot';
}

export interface ProjectSuggestion {
  title: string;
  description: string;
  key_skills_practiced: string[];
  difficulty: string;
}

export interface LearningRoadmap {
  immediate_steps: string[];
  core_skills_to_learn: string[];
  practice_projects: ProjectSuggestion[];
  portfolio_guidance: string[];
  interview_preparation: string[];
}

export interface AssessmentResponse {
  profile: UserProfile;
  top_matches: RoleMatch[];
  total_evaluated_roles: number;
  summary: string;
  learning_roadmap: LearningRoadmap;
  ai_generated: boolean;
  ai_notice: string;
  sdg_alignment_note: string;
  disclaimer: string;
}

export interface HealthResponse {
  status: string;
  roles_count: number;
  ai_configured: boolean;
  version: string;
}
