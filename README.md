# SkillMatch AI

> **Bridging the Career Expectation Gap for Students and Early-Career Job Seekers**  
> Supporting **UN Sustainable Development Goal 8: Decent Work and Economic Growth (Target 8.6)**

---

## 1. Overview

**SkillMatch AI** is an educational career guidance and skill matching platform designed for college students, fresh graduates, and career changers. 

### The Problem
Traditional job portals overwhelm students with conflicting job listings, inflated "entry-level" requirements, and automated rejection emails that offer zero feedback. Students often study in isolation without knowing which specific skills industry engineering teams actually prioritize.

### The Solution
SkillMatch AI eliminates guesswork through **transparent deterministic benchmarks** and **personalised employability roadmaps**:
1. **Capability Baseline**: Students enter their education, current technical competencies, and target interests without needing to sign up or share personal data.
2. **Transparent Matching Engine**: Evaluates skills against 12 standardized entry-level career profiles with documented scoring weights (60% Required Skills, 20% Supplementary Skills, 15% Stated Interests, 5% Experience Level).
3. **Skill Gap Diagnostics**: Accurately separates matched skills from missing critical prerequisites.
4. **Actionable 5-Stage Roadmap**: Generates immediate tactical steps, missing skills to learn, practical applied projects, portfolio guidance, and interview preparation.
5. **Dual Guidance Engine**: Operates in high-fidelity **Deterministic Demo Mode** by default and elevates to dynamic generative analysis when configured with the Google Gemini API.

---

## 2. UN SDG 8 Alignment

SkillMatch AI directly addresses **UN Sustainable Development Goal 8: Decent Work and Economic Growth**, particularly **Target 8.6**:
> *"By 2020, substantially reduce the proportion of youth not in employment, education or training (NEET)."*

By providing clear, transparent criteria for what entry-level jobs require and offering structured next steps to bridge missing competencies, SkillMatch AI empowers youth to transition from education to productive, dignified employment.

---

## 3. Technology Stack

- **Frontend**:
  - React 19 + TypeScript
  - Vite 8
  - Tailwind CSS v4
  - Lucide Icons
- **Backend**:
  - Python 3.13
  - FastAPI
  - Pydantic v2 (Validation & Schemas)
  - Uvicorn (ASGI Server)
  - Pytest + HTTPX (Testing)
- **AI Integration**:
  - Google Gemini API (`google-genai` & `google-generativeai`)
  - Server-side key management with seamless deterministic fallback

---

## 4. Curated Benchmark Roles (12 Profiles)

SkillMatch AI includes 12 realistic benchmark profiles:

| Role Title | Category | Core Required Skills |
| :--- | :--- | :--- |
| **Python Developer** | Software Engineering | Python, Git, REST APIs, SQL |
| **Frontend Developer** | Software Engineering | JavaScript, React, HTML/CSS, Git |
| **Backend Developer** | Software Engineering | Python, SQL, REST APIs, Git |
| **Full-Stack Developer** | Software Engineering | JavaScript, React, Python, SQL, Git |
| **Data Analyst** | Data & Analytics | SQL, Python, Data Visualization, Excel / Spreadsheets |
| **Machine Learning Intern** | Artificial Intelligence | Python, Machine Learning, Mathematics / Linear Algebra, Pandas |
| **QA Tester / Automation Engineer**| Quality Assurance | Manual Testing, Test Planning, Git, Bug Reporting |
| **UI/UX Designer** | Design & Product | Figma, User Research, Wireframing, UI/UX Design |
| **Technical Support Engineer** | IT & Customer Solutions | Troubleshooting, Operating Systems, Networking Fundamentals, Customer Communication |
| **Digital Marketing Associate** | Marketing & Growth | Content Writing, Social Media Marketing, SEO Basics, Web Analytics |
| **Business Analyst** | Business & Operations | Business Process Mapping, Requirements Gathering, Excel / Spreadsheets, Documentation |
| **Junior Cybersecurity Analyst** | Security & Infrastructure| Networking Fundamentals, Security Fundamentals, Operating Systems, Linux |

---

## 5. Transparent Matching Algorithm

Unlike opaque recruitment algorithms that generate arbitrary scores, SkillMatch AI uses a documented, deterministic scoring model:

$$\text{Total Score} = \text{Score}_{\text{req}} + \text{Score}_{\text{supp}} + \text{Score}_{\text{interest}} + \text{Score}_{\text{exp}}$$

Where:
- **Required Core Skills (60% weight)**: Ratio of matched required skills to total required skills $\times 60$.
- **Supplementary Skills (20% weight)**: Ratio of matched supplementary skills to total supplementary skills $\times 20$.
- **Interest Alignment (15% weight)**: Intersection between user interests and role-relevant focus areas $\times 15$.
- **Experience Fit (5% weight)**: Baseline entry-level candidate calibration $\times 5$.

### Readiness Tiers
- **High Fit (70% – 100%)**: Strong foundational overlap; candidate is ready to start targeted portfolio building and interview preparation.
- **Moderate Fit (45% – 69%)**: Viable adjacency; requires learning 1–2 critical missing skills before applying.
- **Foundational / Pivot (< 45%)**: Exploratory pathway; requires building foundational prerequisites.

---

## 6. Getting Started Locally

### Prerequisites
- Node.js 18+ (Node 24 tested) & npm
- Python 3.10+ (Python 3.13 tested)

### A. Clone and Setup Environment

```bash
git clone <repository-url>
cd SkillMatchAI
```

### B. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (if not already created)
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Configure Gemini API Key
# Copy .env.example to .env and add your key:
# GEMINI_API_KEY="your-key-here"
# If left empty, SkillMatch AI runs automatically in Demo Mode!

# Run backend test suite
pytest

# Start backend server (runs on http://localhost:8000)
uvicorn app.main:app --reload --port 8000
```

The interactive Swagger API documentation will be available at:  
👉 **`http://localhost:8000/docs`**

### C. Frontend Setup

In a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install npm packages
npm install

# Run frontend build check
npm run build

# Start Vite development server (runs on http://localhost:5173)
npm run dev
```

Open your browser at:  
👉 **`http://localhost:5173`**

---

## 7. Verification & Testing

### Backend Unit & Integration Tests
Run pytest from the `backend/` directory:
```bash
pytest -v
```
All 10 test cases test:
- Skill alias normalization (case insensitivity, synonyms like `JS`, `py`, `React.js`, `postgres`).
- High-fit matching logic for software engineering and data roles.
- Partial-fit matching and missing skill identification.
- Health check and roles catalog API endpoints.
- Input validation on career assessment requests.

### Frontend Production Build Check
Run Vite build from the `frontend/` directory:
```bash
npm run build
```
Compiles TypeScript types and bundles assets with 0 errors.

---

## 8. Guidance Ethics & Disclaimer

SkillMatch AI is an educational guidance prototype developed to advance UN SDG 8. 
- It does **not** represent a recruitment agency or hiring firm.
- Match scores represent curriculum and skill alignment with standard entry-level industry expectations.
- It does **not** promise or guarantee employment, hiring eligibility, or current job vacancies.
- No sensitive personal information (passwords, phone numbers, addresses, government IDs) is collected.

---

## 9. License

Open source under the [MIT License](LICENSE).
