from typing import List
from app.models.schemas import JobRole, LearningResource

JOB_ROLES_DATA: List[JobRole] = [
    JobRole(
        id="python-developer",
        title="Python Developer",
        category="Software Engineering",
        description="Builds backend services, automated scripts, CLI tools, and data processing workflows using Python and modern web frameworks.",
        required_skills=["Python", "Git", "REST APIs", "SQL"],
        supplementary_skills=["FastAPI", "Django", "Docker", "Unit Testing", "PostgreSQL"],
        typical_experience_level="Beginner / 0-1 Years",
        relevant_interests=["Backend Development", "Automation", "Web Development", "Scripting"],
        example_responsibilities=[
            "Design and maintain clean, well-documented REST APIs with FastAPI or Django.",
            "Write SQL queries and interact with relational databases using ORMs.",
            "Automate repetitive operational data processing and pipeline tasks.",
            "Author unit and integration tests to ensure reliable code quality."
        ],
        learning_resources=[
            LearningResource(
                title="Official Python Tutorial & Documentation",
                resource_type="Documentation",
                description="Core language syntax, data structures, and standard library modules.",
                suggested_focus="Python standard library, generators, virtual environments"
            ),
            LearningResource(
                title="FastAPI Web Framework Tutorial",
                resource_type="Course",
                description="Modern, fast Python web framework based on standard Python type hints.",
                suggested_focus="Pydantic models, dependency injection, async endpoints"
            ),
            LearningResource(
                title="SQLBolt Interactive SQL Lessons",
                resource_type="Practice",
                description="Interactive exercises teaching SQL queries, joins, and aggregations.",
                suggested_focus="SELECT queries, JOINs, indexing fundamentals"
            )
        ]
    ),
    JobRole(
        id="frontend-developer",
        title="Frontend Developer",
        category="Software Engineering",
        description="Crafts responsive, accessible, and performant user interfaces for web applications using modern web standards and component libraries.",
        required_skills=["JavaScript", "React", "HTML/CSS", "Git"],
        supplementary_skills=["TypeScript", "Tailwind CSS", "Next.js", "Web Accessibility", "Testing Library"],
        typical_experience_level="Beginner / 0-1 Years",
        relevant_interests=["Frontend Development", "Web Development", "UI/UX Design", "Design Systems"],
        example_responsibilities=[
            "Translate UI/UX wireframes into responsive, cross-browser web components.",
            "Manage client-side state, form validation, and asynchronous API calls.",
            "Ensure accessible HTML markup adhering to WCAG 2.1 AA guidelines.",
            "Optimize page load performance, layout shifts, and asset delivery."
        ],
        learning_resources=[
            LearningResource(
                title="React Official Documentation (react.dev)",
                resource_type="Documentation",
                description="Component lifecycle, hooks (useState, useEffect), and thinking in React.",
                suggested_focus="State management, component breakdown, hooks"
            ),
            LearningResource(
                title="MDN Web Docs (HTML, CSS, JS)",
                resource_type="Documentation",
                description="Comprehensive web reference maintained by the Mozilla developer community.",
                suggested_focus="Semantic HTML, Flexbox/Grid layouts, DOM manipulation"
            ),
            LearningResource(
                title="TypeScript Handbook for React Developers",
                resource_type="Documentation",
                description="Typing props, state, event handlers, and API payloads safely.",
                suggested_focus="Interface definitions, generics, union types"
            )
        ]
    ),
    JobRole(
        id="backend-developer",
        title="Backend Developer",
        category="Software Engineering",
        description="Architects robust server-side applications, business logic, microservices, database schemas, and external API integrations.",
        required_skills=["Python", "SQL", "REST APIs", "Git"],
        supplementary_skills=["Node.js", "Docker", "PostgreSQL", "Redis", "Authentication / JWT", "CI/CD"],
        typical_experience_level="Beginner / 0-2 Years",
        relevant_interests=["Backend Development", "System Design", "Cloud Infrastructure", "Databases"],
        example_responsibilities=[
            "Develop scalable server logic and secure API endpoints.",
            "Design normalized relational database schemas and tune query performance.",
            "Implement authentication, authorization, and role-based access control.",
            "Integrate third-party services, webhooks, and asynchronous message queues."
        ],
        learning_resources=[
            LearningResource(
                title="Roadmap.sh Backend Developer Guide",
                resource_type="Course",
                description="Step-by-step path covering HTTP, databases, caching, and security.",
                suggested_focus="HTTP status codes, RESTful standards, relational database indexing"
            ),
            LearningResource(
                title="PostgreSQL Official Documentation",
                resource_type="Documentation",
                description="Relational database concepts, constraints, transactions, and indexing.",
                suggested_focus="ACID properties, foreign keys, query execution plans"
            )
        ]
    ),
    JobRole(
        id="fullstack-developer",
        title="Full-Stack Developer",
        category="Software Engineering",
        description="Builds end-to-end features spanning responsive client-side interfaces, server-side APIs, database models, and deployment workflows.",
        required_skills=["JavaScript", "React", "Python", "SQL", "Git"],
        supplementary_skills=["TypeScript", "FastAPI", "Node.js", "Docker", "Tailwind CSS", "MongoDB"],
        typical_experience_level="Beginner / 0-2 Years",
        relevant_interests=["Full-Stack Engineering", "Web Development", "Product Building", "Startups"],
        example_responsibilities=[
            "Deliver complete end-to-end features from front-end UI down to database persistence.",
            "Coordinate client-server communication with typed contracts or OpenAPI schemas.",
            "Collaborate with designers to implement intuitive user workflows.",
            "Deploy and monitor full-stack applications in containerized or cloud environments."
        ],
        learning_resources=[
            LearningResource(
                title="Full Stack Open (University of Helsinki)",
                resource_type="Course",
                description="Deep dive into modern web development with React, Node/Express, and REST.",
                suggested_focus="Full-stack integration, automated testing, containerization"
            ),
            LearningResource(
                title="Docker Documentation & Getting Started",
                resource_type="Documentation",
                description="Containerizing frontend and backend services for reproducible builds.",
                suggested_focus="Dockerfiles, docker-compose multi-container setup"
            )
        ]
    ),
    JobRole(
        id="data-analyst",
        title="Data Analyst",
        category="Data & Analytics",
        description="Inspects, cleans, transforms, and models data to discover actionable business insights, design dashboards, and support decision-making.",
        required_skills=["SQL", "Python", "Data Visualization", "Excel / Spreadsheets"],
        supplementary_skills=["Pandas", "Power BI", "Tableau", "Statistics", "Git"],
        typical_experience_level="Beginner / 0-1 Years",
        relevant_interests=["Data Analytics", "Business Intelligence", "Statistics", "Reporting"],
        example_responsibilities=[
            "Query data warehouses to extract cohorts, metrics, and operational datasets.",
            "Clean messy datasets and validate metrics against business rules.",
            "Build interactive dashboards and reports for non-technical stakeholders.",
            "Synthesize exploratory data analysis into clear written executive summaries."
        ],
        learning_resources=[
            LearningResource(
                title="Pandas Documentation & 10 Minutes to Pandas",
                resource_type="Documentation",
                description="Data manipulation, filtering, aggregation, and merging in Python.",
                suggested_focus="DataFrames, groupby operations, handling missing values"
            ),
            LearningResource(
                title="Khan Academy Statistics & Probability",
                resource_type="Course",
                description="Descriptive statistics, hypothesis testing, distributions, and variance.",
                suggested_focus="Mean, median, standard deviation, correlation vs causation"
            ),
            LearningResource(
                title="Mode Analytics SQL Tutorial for Data Analysis",
                resource_type="Practice",
                description="Real-world case studies for querying business datasets.",
                suggested_focus="Window functions, CTEs, aggregation rollups"
            )
        ]
    ),
    JobRole(
        id="ml-intern",
        title="Machine Learning Intern",
        category="Artificial Intelligence",
        description="Assists in data preprocessing, feature engineering, baseline model evaluation, and deployment of predictive machine learning pipelines.",
        required_skills=["Python", "Machine Learning", "Mathematics / Linear Algebra", "Pandas"],
        supplementary_skills=["Scikit-Learn", "PyTorch", "NumPy", "Git", "Data Cleaning", "Hugging Face"],
        typical_experience_level="Intern / Student",
        relevant_interests=["Artificial Intelligence", "Machine Learning", "Research", "Data Science"],
        example_responsibilities=[
            "Prepare, normalize, and split tabular or text training datasets.",
            "Implement baseline regression, classification, or clustering models with Scikit-Learn.",
            "Track experiments, hyperparameter tuning, and cross-validation metrics.",
            "Assist in packaging trained models into inference endpoints."
        ],
        learning_resources=[
            LearningResource(
                title="Scikit-Learn Official User Guide",
                resource_type="Documentation",
                description="Supervised learning, unsupervised learning, model selection, and metrics.",
                suggested_focus="Pipelines, cross-validation, precision/recall trade-offs"
            ),
            LearningResource(
                title="Google Machine Learning Crash Course",
                resource_type="Course",
                description="Practical fundamentals of classification, loss functions, and neural nets.",
                suggested_focus="Loss calculation, gradient descent, overfitting prevention"
            )
        ]
    ),
    JobRole(
        id="qa-tester",
        title="QA Tester / Test Automation Engineer",
        category="Quality Assurance",
        description="Ensures software quality, reliability, and security through comprehensive manual testing, automated test suites, and regression verification.",
        required_skills=["Manual Testing", "Test Planning", "Git", "Bug Reporting"],
        supplementary_skills=["Python", "Selenium", "Cypress", "Postman / API Testing", "SQL", "CI/CD"],
        typical_experience_level="Beginner / 0-1 Years",
        relevant_interests=["Quality Assurance", "Testing & Reliability", "Automation", "Software Quality"],
        example_responsibilities=[
            "Analyze user stories to design structured test plans, test cases, and edge-case checklists.",
            "Execute functional, usability, negative, and cross-browser regression testing.",
            "Write clear bug reports with reproducible steps, logs, and severity triage.",
            "Develop automated regression scripts for web and REST API endpoints."
        ],
        learning_resources=[
            LearningResource(
                title="Ministry of Testing Community Resources",
                resource_type="Community",
                description="Practical exploratory testing guides, heuristics, and test design.",
                suggested_focus="Equivalence partitioning, boundary value analysis, exploratory testing"
            ),
            LearningResource(
                title="Postman API Testing Academy",
                resource_type="Course",
                description="Validating HTTP response status, JSON schemas, and test automation scripts.",
                suggested_focus="API status assertions, collection runner, environment variables"
            )
        ]
    ),
    JobRole(
        id="ui-ux-designer",
        title="UI/UX Designer",
        category="Design & Product",
        description="Researches user needs, crafts wireframes, designs high-fidelity design systems, and prototypes user journeys for intuitive software.",
        required_skills=["Figma", "User Research", "Wireframing", "UI/UX Design"],
        supplementary_skills=["Prototyping", "HTML/CSS", "Design Systems", "Usability Testing", "Information Architecture"],
        typical_experience_level="Beginner / 0-1 Years",
        relevant_interests=["UI/UX Design", "Product Design", "Human-Computer Interaction", "User Research"],
        example_responsibilities=[
            "Conduct student and user interviews to map journey pains and user mental models.",
            "Produce low-fidelity wireframes and clickable high-fidelity Figma prototypes.",
            "Establish consistent typography, color tokens, and reusable component libraries.",
            "Conduct usability tests to validate navigation flow and readability."
        ],
        learning_resources=[
            LearningResource(
                title="Nielsen Norman Group UX Articles",
                resource_type="Documentation",
                description="10 usability heuristics, information architecture, and user research standards.",
                suggested_focus="Usability heuristics, cognitive load, user testing methods"
            ),
            LearningResource(
                title="Figma Community Tutorials & Best Practices",
                resource_type="Practice",
                description="Auto-layout, interactive components, tokens, and design systems.",
                suggested_focus="Auto-layout, typography styles, variant states"
            )
        ]
    ),
    JobRole(
        id="technical-support-engineer",
        title="Technical Support Engineer",
        category="IT & Customer Solutions",
        description="Diagnoses technical customer issues, investigates log files, triages bugs, and serves as the bridge between end-users and engineering.",
        required_skills=["Troubleshooting", "Operating Systems", "Networking Fundamentals", "Customer Communication"],
        supplementary_skills=["SQL", "Bash / Shell", "Log Analysis", "Ticketing Systems (Jira/Zendesk)", "API Debugging"],
        typical_experience_level="Beginner / 0-1 Years",
        relevant_interests=["Technical Support", "IT Infrastructure", "Systems Troubleshooting", "Customer Operations"],
        example_responsibilities=[
            "Triage incoming technical issues, isolate root causes, and reproduce bugs.",
            "Inspect system and application logs to identify errors or configuration conflicts.",
            "Communicate complex technical resolutions clearly to non-technical users.",
            "Author internal knowledge base articles and troubleshooting runbooks."
        ],
        learning_resources=[
            LearningResource(
                title="Google IT Support Professional Certificate",
                resource_type="Course",
                description="Operating systems, computer networking, DNS, and system administration.",
                suggested_focus="TCP/IP, DNS resolution, permissions, CLI troubleshooting"
            ),
            LearningResource(
                title="Linux Journey (linuxjourney.com)",
                resource_type="Practice",
                description="Hands-on introduction to command line, processes, logs, and permissions.",
                suggested_focus="grep, journalctl, curl, file permissions"
            )
        ]
    ),
    JobRole(
        id="digital-marketing-associate",
        title="Digital Marketing Associate",
        category="Marketing & Growth",
        description="Executes digital acquisition campaigns, tracks web analytics, performs keyword research, and produces data-backed marketing content.",
        required_skills=["Content Writing", "Social Media Marketing", "SEO Basics", "Web Analytics"],
        supplementary_skills=["Google Analytics (GA4)", "Email Marketing", "Canva", "Basic HTML", "Copywriting"],
        typical_experience_level="Beginner / 0-1 Years",
        relevant_interests=["Digital Marketing", "Content Creation", "Growth & SEO", "Audience Engagement"],
        example_responsibilities=[
            "Conduct keyword research and optimize website articles for organic search ranking.",
            "Monitor conversion funnels, bounce rates, and traffic sources in GA4.",
            "Draft targeted email newsletters and measure open and click-through rates.",
            "Collaborate with design and product teams on launch campaigns."
        ],
        learning_resources=[
            LearningResource(
                title="Google Analytics (GA4) Certification Course",
                resource_type="Course",
                description="Event-based tracking, conversion funnels, and audience reports.",
                suggested_focus="Events, conversions, user acquisition channels"
            ),
            LearningResource(
                title="Moz Beginner's Guide to SEO",
                resource_type="Documentation",
                description="On-page optimization, site architecture, and content relevancy.",
                suggested_focus="Title tags, meta descriptions, search intent"
            )
        ]
    ),
    JobRole(
        id="business-analyst",
        title="Business Analyst",
        category="Business & Operations",
        description="Gathers stakeholder requirements, maps operational business processes, documents functional specifications, and translates business goals into technical requirements.",
        required_skills=["Business Process Mapping", "Requirements Gathering", "Excel / Spreadsheets", "Documentation"],
        supplementary_skills=["SQL", "Agile / Scrum", "Jira", "Data Flow Diagrams", "Stakeholder Communication"],
        typical_experience_level="Beginner / 0-1 Years",
        relevant_interests=["Business Analysis", "Operations", "Product Management", "Process Optimization"],
        example_responsibilities=[
            "Interview business stakeholders to define functional and non-functional requirements.",
            "Create process flowcharts, user stories, and acceptance criteria.",
            "Analyze operational datasets to identify workflow bottlenecks and cost optimizations.",
            "Coordinate user acceptance testing (UAT) sessions with business departments."
        ],
        learning_resources=[
            LearningResource(
                title="BABOK Guide Summary & Business Analysis Fundamentals",
                resource_type="Book",
                description="Core techniques for requirements elicitation, modeling, and validation.",
                suggested_focus="Use case diagrams, SWOT analysis, gap analysis"
            ),
            LearningResource(
                title="Agile Alliance Scrum Guide",
                resource_type="Documentation",
                description="User story authoring, backlog refinement, sprint planning.",
                suggested_focus="INVEST criteria for user stories, acceptance criteria"
            )
        ]
    ),
    JobRole(
        id="cybersecurity-analyst",
        title="Junior Cybersecurity Analyst",
        category="Security & Infrastructure",
        description="Monitors network traffic, analyzes security alerts, identifies vulnerabilities, and supports incident response to protect digital assets.",
        required_skills=["Networking Fundamentals", "Security Fundamentals", "Operating Systems", "Linux"],
        supplementary_skills=["Python / Scripting", "Wireshark", "SIEM (Splunk/Elastic)", "Vulnerability Scanning", "OWASP Top 10"],
        typical_experience_level="Beginner / 0-1 Years",
        relevant_interests=["Cybersecurity", "Network Security", "Ethical Hacking", "Cloud Security"],
        example_responsibilities=[
            "Monitor intrusion detection systems (IDS) and investigate anomalies.",
            "Perform vulnerability scans and recommend patch priorities.",
            "Analyze authentication logs and access records for suspicious activity.",
            "Help educate employees on phishing awareness and secure password practices."
        ],
        learning_resources=[
            LearningResource(
                title="TryHackMe Pre-Security & SOC Level 1 Pathways",
                resource_type="Practice",
                description="Gamified labs teaching network traffic, Linux commands, and log analysis.",
                suggested_focus="Network protocols, basic Wireshark packet capture, Linux commands"
            ),
            LearningResource(
                title="OWASP Top Ten Security Risks",
                resource_type="Documentation",
                description="Common web application vulnerabilities and prevention strategies.",
                suggested_focus="Injection attacks, broken authentication, security misconfigurations"
            )
        ]
    ),
]


def get_all_roles() -> List[JobRole]:
    return JOB_ROLES_DATA


def get_role_by_id(role_id: str) -> JobRole:
    for role in JOB_ROLES_DATA:
        if role.id == role_id:
            return role
    raise KeyError(f"Role with ID '{role_id}' not found.")
