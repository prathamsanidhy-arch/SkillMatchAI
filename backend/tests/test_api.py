from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "operational"
    assert data["roles_count"] >= 10
    assert "ai_configured" in data


def test_list_roles_endpoint():
    response = client.get("/api/roles")
    assert response.status_code == 200
    roles = response.json()
    assert isinstance(roles, list)
    assert len(roles) >= 10
    first_role = roles[0]
    assert "id" in first_role
    assert "title" in first_role
    assert "required_skills" in first_role


def test_get_single_role_found():
    response = client.get("/api/roles/python-developer")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Python Developer"
    assert "learning_resources" in data


def test_get_single_role_not_found():
    response = client.get("/api/roles/non-existent-role-xyz")
    assert response.status_code == 404


def test_assessment_endpoint_valid():
    payload = {
        "education_level": "Bachelor's Degree",
        "field_of_study": "Computer Science",
        "skills": ["Python", "SQL", "Git"],
        "interests": ["Backend Development"],
        "experience_level": "Beginner / Student",
        "preferred_location": "Remote",
        "preferred_work_arrangement": "Remote",
    }
    response = client.post("/api/assess", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "top_matches" in data
    assert len(data["top_matches"]) > 0
    assert "learning_roadmap" in data
    assert "summary" in data
    assert "ai_notice" in data
    assert "sdg_alignment_note" in data
    assert "disclaimer" in data


def test_assessment_endpoint_empty_skills_fails():
    payload = {
        "education_level": "Bachelor's Degree",
        "field_of_study": "Computer Science",
        "skills": [],
        "interests": [],
    }
    response = client.post("/api/assess", json=payload)
    assert response.status_code == 422
