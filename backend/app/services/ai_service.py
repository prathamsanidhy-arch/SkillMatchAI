import os
import json
import logging
from typing import List, Tuple, Dict, Any, Optional
from app.models.schemas import (
    UserProfile,
    RoleMatch,
    LearningRoadmap,
    ProjectSuggestion,
)

logger = logging.getLogger("skillmatch.ai")

SYSTEM_INSTRUCTION = """
You are an expert career advisor and technical mentor for SkillMatch AI, a guidance platform supporting UN SDG 8 (Decent Work & Economic Growth).
Your mission is to provide realistic, honest, and actionable career guidance for students and early-career job seekers.
Rules:
1. Ground your advice solely on the user's validated profile and the provided matched job roles.
2. DO NOT invent fake job openings, company vacancies, or guaranteed hiring probabilities.
3. Be encouraging yet realistic about missing skills and the work needed to build genuine competency.
4. Output strict JSON matching the requested structure without markdown formatting or backticks if possible, or inside ```json ``` codeblocks.
"""


def generate_deterministic_fallback(
    profile: UserProfile, top_matches: List[RoleMatch]
) -> Tuple[str, LearningRoadmap]:
    """
    Generates a high-quality, practical deterministic career summary and structured
    learning roadmap based on real skill gaps identified by the matching engine.
    """
    if not top_matches:
        summary = "No roles directly matched your selected skills. Consider exploring foundational computer science or digital literacy skills to open up entry-level pathways."
        return summary, LearningRoadmap(
            immediate_steps=[
                "Select 1-2 primary technical skills such as Python or JavaScript to build a solid foundation.",
                "Set up Git and create your first GitHub repository to track your code.",
                "Spend 30 minutes daily on interactive syntax practice.",
            ],
            core_skills_to_learn=["Git", "Python or JavaScript", "Basic Data Structures"],
            practice_projects=[
                ProjectSuggestion(
                    title="Command-Line Task Tracker",
                    description="Build a CLI tool that allows users to add, list, and complete daily tasks stored in a JSON file.",
                    key_skills_practiced=["Python", "File I/O", "CLI Design"],
                    difficulty="Beginner",
                )
            ],
            portfolio_guidance=[
                "Write a clear README for your task tracker repository.",
                "Include setup and execution instructions with example command outputs.",
            ],
            interview_preparation=[
                "Practice explaining why you chose your primary programming language.",
                "Review basic programming concepts (loops, conditionals, functions).",
            ],
        )

    best_match = top_matches[0]
    second_match = top_matches[1] if len(top_matches) > 1 else None

    # Summary synthesis
    summary_parts = [
        f"Based on your background in {profile.field_of_study} and your current skill set, your strongest career alignment is with the {best_match.role.title} profile (Match Score: {best_match.match_score}%)."
    ]
    if best_match.matched_skills:
        summary_parts.append(
            f"You already possess key foundational capabilities including {', '.join(best_match.matched_skills)}."
        )
    if best_match.missing_critical_skills:
        summary_parts.append(
            f"Focusing your near-term learning on {', '.join(best_match.missing_critical_skills[:3])} will significantly bridge your preparation gap."
        )
    if second_match and second_match.match_score >= 40:
        summary_parts.append(
            f"You also have viable adjacency to {second_match.role.title} ({second_match.match_score}%)."
        )

    summary = " ".join(summary_parts)

    # Compile critical missing skills across the top 2 roles
    missing_critical = list(
        dict.fromkeys(
            best_match.missing_critical_skills
            + (second_match.missing_critical_skills if second_match else [])
        )
    )
    if not missing_critical:
        missing_critical = ["System Design Fundamentals", "CI/CD Pipeline Setup", "Performance Optimization"]

    # Immediate next steps
    immediate = [
        f"Master the fundamentals of {missing_critical[0]} through official documentation and practical tutorials.",
        f"Build a minimal working proof-of-concept incorporating {missing_critical[0]} with your existing skills ({', '.join(best_match.matched_skills[:2]) if best_match.matched_skills else 'core tools'}).",
        "Document your architecture decisions and upload the project to a public GitHub repository.",
    ]
    if len(missing_critical) > 1:
        immediate.append(f"Explore basic concepts of {missing_critical[1]} to expand versatility.")

    # Tailored practice projects based on best match role category
    role_cat = best_match.role.category.lower()
    projects: List[ProjectSuggestion] = []

    if "software" in role_cat or "backend" in best_match.role.title.lower():
        projects = [
            ProjectSuggestion(
                title=f"{best_match.role.title} Portfolio API Service",
                description="Build a RESTful API with automated input validation, SQL persistence, and structured logging. Include unit tests for endpoints.",
                key_skills_practiced=best_match.role.required_skills[:3],
                difficulty="Beginner to Intermediate",
            ),
            ProjectSuggestion(
                title="Full-Stack Data Dashboard",
                description="Connect a responsive UI with a live backend database to perform CRUD operations, data filtering, and responsive charts.",
                key_skills_practiced=["API Integration", "Database Design", "Frontend State"],
                difficulty="Intermediate",
            ),
        ]
    elif "data" in role_cat or "analyst" in best_match.role.title.lower():
        projects = [
            ProjectSuggestion(
                title="Public Employment Trends Exploratory Analysis",
                description="Clean, aggregate, and visualize public labor market or educational datasets using SQL and Python. Present insights with clear charts.",
                key_skills_practiced=["SQL", "Pandas", "Data Visualization", "Storytelling"],
                difficulty="Beginner to Intermediate",
            ),
            ProjectSuggestion(
                title="Automated KPI Reporting Pipeline",
                description="Write an end-to-end Python pipeline that ingests raw CSV logs, computes summary statistics, and outputs an executive summary.",
                key_skills_practiced=["Python", "Data Aggregation", "Reporting"],
                difficulty="Intermediate",
            ),
        ]
    elif "design" in role_cat or "ui" in best_match.role.title.lower():
        projects = [
            ProjectSuggestion(
                title="Career Platform Accessibility Redesign",
                description="Create an interactive Figma prototype focusing on WCAG 2.1 AA accessibility, keyboard navigation, and an atomic design system.",
                key_skills_practiced=["Figma", "User Research", "Design Systems", "Accessibility"],
                difficulty="Beginner to Intermediate",
            ),
            ProjectSuggestion(
                title="Student Internship Portal Case Study",
                description="Conduct 3 user interviews, develop user flow diagrams, low-fidelity wireframes, and test high-fidelity prototypes.",
                key_skills_practiced=["User Research", "Wireframing", "Prototyping"],
                difficulty="Intermediate",
            ),
        ]
    else:
        projects = [
            ProjectSuggestion(
                title=f"Practical {best_match.role.title} Applied Project",
                description=f"Design and document a realistic case study demonstrating core workflows for {best_match.role.title}.",
                key_skills_practiced=best_match.role.required_skills[:3],
                difficulty="Beginner to Intermediate",
            )
        ]

    portfolio = [
        "Create a clean GitHub repository for each major project with an explicit README containing problem statement, architecture diagram, and setup instructions.",
        "Deploy a live accessible demonstration (e.g., on Vercel, Render, or GitHub Pages) and link it directly in your CV.",
        "Write a concise technical writeup or blog post explaining a non-trivial challenge you solved during implementation.",
    ]

    interview_prep = [
        f"Prepare to clearly articulate how you applied {', '.join(best_match.matched_skills[:2]) if best_match.matched_skills else 'your primary skills'} in real code.",
        f"Practice answering scenario-based questions about {missing_critical[0] if missing_critical else 'system architecture'}.",
        "Review foundational computer science concepts: HTTP lifecycle, database transactions, and algorithmic complexity.",
        "Practice communicating your thought process out loud when walking through code or design trade-offs.",
    ]

    roadmap = LearningRoadmap(
        immediate_steps=immediate,
        core_skills_to_learn=missing_critical[:5],
        practice_projects=projects,
        portfolio_guidance=portfolio,
        interview_preparation=interview_prep,
    )

    return summary, roadmap


def analyze_career_path(
    profile: UserProfile, top_matches: List[RoleMatch]
) -> Tuple[str, LearningRoadmap, bool, str]:
    """
    Coordinates AI career path generation.
    Returns: (summary, roadmap, ai_generated_flag, notice_message)
    """
    api_key = os.getenv("GEMINI_API_KEY", "").strip()

    if not api_key:
        summary, roadmap = generate_deterministic_fallback(profile, top_matches)
        return (
            summary,
            roadmap,
            False,
            "Demo Mode: High-fidelity deterministic matching active. Set GEMINI_API_KEY on the backend to activate dynamic Gemini generation.",
        )

    # Attempt calling Gemini API via google.genai or google.generativeai
    try:
        prompt_data = {
            "user_profile": {
                "education_level": profile.education_level,
                "field_of_study": profile.field_of_study,
                "skills": profile.skills,
                "interests": profile.interests,
                "experience_level": profile.experience_level,
                "preferred_location": profile.preferred_location,
                "preferred_work_arrangement": profile.preferred_work_arrangement,
            },
            "top_matches": [
                {
                    "title": m.role.title,
                    "category": m.role.category,
                    "match_score": m.match_score,
                    "matched_skills": m.matched_skills,
                    "missing_critical_skills": m.missing_critical_skills,
                    "matched_supplementary_skills": m.matched_supplementary_skills,
                }
                for m in top_matches[:3]
            ],
        }

        user_prompt = f"""
Analyze this candidate's profile against their top matching entry-level career profiles:
{json.dumps(prompt_data, indent=2)}

Generate structured career guidance formatted strictly as JSON with this schema:
{{
  "summary": "Concise 3-4 sentence evaluation of their profile, primary fit, and high-impact growth area.",
  "immediate_steps": ["step 1", "step 2", "step 3"],
  "core_skills_to_learn": ["skill 1", "skill 2", "skill 3", "skill 4"],
  "practice_projects": [
    {{
      "title": "Project Name",
      "description": "Specific project brief detailing what to build.",
      "key_skills_practiced": ["Skill A", "Skill B"],
      "difficulty": "Beginner / Intermediate"
    }}
  ],
  "portfolio_guidance": ["advice 1", "advice 2"],
  "interview_preparation": ["prep item 1", "prep item 2", "prep item 3"]
}}
Return ONLY valid JSON.
"""

        # Try google-genai first
        raw_text = ""
        try:
            from google import genai
            from google.genai import types

            client = genai.Client(api_key=api_key)
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=user_prompt,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_INSTRUCTION,
                    temperature=0.3,
                    response_mime_type="application/json",
                ),
            )
            raw_text = response.text
        except Exception as e_genai:
            logger.info("google.genai call attempt failed or fallback to google.generativeai: %s", e_genai)
            import google.generativeai as legacy_genai

            legacy_genai.configure(api_key=api_key)
            model = legacy_genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                system_instruction=SYSTEM_INSTRUCTION,
            )
            response = model.generate_content(
                user_prompt,
                generation_config={"temperature": 0.3},
            )
            raw_text = response.text

        # Parse JSON
        cleaned_json = raw_text.strip()
        if cleaned_json.startswith("```"):
            cleaned_json = cleaned_json.strip("`")
            if cleaned_json.startswith("json"):
                cleaned_json = cleaned_json[4:].strip()

        data = json.loads(cleaned_json)

        projects = [
            ProjectSuggestion(
                title=p.get("title", "Applied Project"),
                description=p.get("description", "Practical implementation"),
                key_skills_practiced=p.get("key_skills_practiced", []),
                difficulty=p.get("difficulty", "Beginner"),
            )
            for p in data.get("practice_projects", [])
        ]

        roadmap = LearningRoadmap(
            immediate_steps=data.get("immediate_steps", []),
            core_skills_to_learn=data.get("core_skills_to_learn", []),
            practice_projects=projects,
            portfolio_guidance=data.get("portfolio_guidance", []),
            interview_preparation=data.get("interview_preparation", []),
        )

        summary = data.get("summary", "Career path evaluation successfully generated.")
        return summary, roadmap, True, "AI Career Analysis generated via Google Gemini."

    except Exception as e:
        logger.warning("Gemini AI generation failed, using deterministic fallback: %s", e)
        summary, roadmap = generate_deterministic_fallback(profile, top_matches)
        return (
            summary,
            roadmap,
            False,
            f"Demo Mode: Deterministic matching used (Gemini call encountered: {type(e).__name__}).",
        )
