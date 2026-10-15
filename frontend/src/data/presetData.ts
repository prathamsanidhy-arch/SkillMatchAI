import type { UserProfile } from '../types/career';

export const SKILL_CATEGORIES = [
  {
    name: 'Programming & Core',
    skills: ['Python', 'JavaScript', 'TypeScript', 'HTML/CSS', 'SQL', 'C++', 'Java'],
  },
  {
    name: 'Web & Frontend',
    skills: ['React', 'Tailwind CSS', 'Next.js', 'Vue.js', 'REST APIs', 'Web Accessibility'],
  },
  {
    name: 'Backend & Infrastructure',
    skills: ['FastAPI', 'Node.js', 'Django', 'PostgreSQL', 'Docker', 'Linux', 'Git'],
  },
  {
    name: 'Data & Intelligence',
    skills: ['Pandas', 'Data Visualization', 'Machine Learning', 'Excel / Spreadsheets', 'Statistics', 'Power BI'],
  },
  {
    name: 'Design & Product',
    skills: ['Figma', 'UI/UX Design', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  },
  {
    name: 'Testing & Security',
    skills: ['Manual Testing', 'Test Planning', 'Postman / API Testing', 'Cybersecurity', 'Networking Fundamentals'],
  },
];

export const CAREER_INTERESTS = [
  'Web Development',
  'Backend Development',
  'Full-Stack Engineering',
  'Data Analytics',
  'Artificial Intelligence',
  'Machine Learning',
  'UI/UX Design',
  'Product Design',
  'Quality Assurance',
  'Cybersecurity',
  'IT Infrastructure',
  'Business Analysis',
];

export const EDUCATION_LEVELS = [
  "Bachelor's Degree (B.Tech / B.E. / B.Sc / BCA)",
  "Master's Degree (M.Tech / M.Sc / MCA / MBA)",
  "Diploma / Associate Degree",
  "Higher Secondary / High School",
  "Self-Taught / Alternative Bootcamp",
];

export const FIELDS_OF_STUDY = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Data Science & AI',
  'Design & Human-Computer Interaction',
  'Business Administration / Commerce',
  'Mechanical / Civil Engineering',
  'Other / Interdisciplinary',
];

export const SAMPLE_PROFILES: { label: string; description: string; profile: UserProfile }[] = [
  {
    label: 'Student Web Developer',
    description: 'B.Tech student with JavaScript, React, HTML/CSS, Git seeking frontend/fullstack roles.',
    profile: {
      education_level: "Bachelor's Degree (B.Tech / B.E. / B.Sc / BCA)",
      field_of_study: 'Computer Science & Engineering',
      skills: ['JavaScript', 'React', 'HTML/CSS', 'Git', 'Tailwind CSS'],
      interests: ['Web Development', 'Frontend Development', 'UI/UX Design'],
      experience_level: 'Beginner / Student',
      preferred_location: 'Anywhere / Remote',
      preferred_work_arrangement: 'Remote',
    },
  },
  {
    label: 'Aspiring Data Analyst',
    description: 'Fresh graduate with Python, SQL, Excel, and Statistics looking for data roles.',
    profile: {
      education_level: "Bachelor's Degree (B.Tech / B.E. / B.Sc / BCA)",
      field_of_study: 'Data Science & AI',
      skills: ['Python', 'SQL', 'Excel / Spreadsheets', 'Statistics', 'Data Visualization'],
      interests: ['Data Analytics', 'Business Analysis', 'Machine Learning'],
      experience_level: 'Beginner / Student',
      preferred_location: 'Bengaluru / Hybrid',
      preferred_work_arrangement: 'Hybrid',
    },
  },
  {
    label: 'Junior Product Designer',
    description: 'Design student with Figma, Wireframing, User Research, and UI/UX design basics.',
    profile: {
      education_level: "Bachelor's Degree (B.Tech / B.E. / B.Sc / BCA)",
      field_of_study: 'Design & Human-Computer Interaction',
      skills: ['Figma', 'UI/UX Design', 'User Research', 'Wireframing', 'Prototyping'],
      interests: ['UI/UX Design', 'Product Design'],
      experience_level: 'Beginner / Student',
      preferred_location: 'Anywhere / Remote',
      preferred_work_arrangement: 'Any',
    },
  },
];
