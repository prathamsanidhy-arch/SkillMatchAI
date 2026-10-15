import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SDGSection } from './components/SDGSection';
import { AssessmentForm } from './components/AssessmentForm';
import { ResultsView } from './components/ResultsView';
import { RolesCatalog } from './components/RolesCatalog';
import { Footer } from './components/Footer';
import type {
  UserProfile,
  AssessmentResponse,
  HealthResponse,
  JobRole,
} from './types/career';
import { fetchHealth, fetchRoles, submitAssessment } from './services/api';
import { AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [roles, setRoles] = useState<JobRole[]>([]);
  const [assessment, setAssessment] = useState<AssessmentResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastProfile, setLastProfile] = useState<UserProfile | null>(null);

  const assessmentRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial health and roles retrieval
    const initialize = async () => {
      try {
        const healthData = await fetchHealth();
        setHealth(healthData);
      } catch (err: any) {
        console.warn('Backend health check warning:', err.message);
      }

      try {
        const rolesData = await fetchRoles();
        setRoles(rolesData);
      } catch (err: any) {
        console.warn('Failed to load roles catalog:', err.message);
      }
    };

    initialize();
  }, []);

  const handleStartAssessment = () => {
    const el = document.getElementById('assessment-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreRoles = () => {
    const el = document.getElementById('roles-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitProfile = async (profile: UserProfile) => {
    setIsLoading(true);
    setErrorMessage(null);
    setLastProfile(profile);

    try {
      const response = await submitAssessment(profile);
      setAssessment(response);

      // Smooth scroll to results
      setTimeout(() => {
        const el = document.getElementById('results-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      setErrorMessage(
        err.message || 'An error occurred during career matching. Please check inputs and retry.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProfile = () => {
    const el = document.getElementById('assessment-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F5] text-[#18221D]">
      {/* Top Navigation */}
      <Navbar
        health={health}
        onNavigate={handleNavigate}
        onStartAssessment={handleStartAssessment}
      />

      {/* Global Error Banner if any */}
      {errorMessage && (
        <div className="bg-red-50 border-b border-red-200 py-3 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-red-800">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="font-bold hover:underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onStartAssessment={handleStartAssessment}
          onExploreRoles={handleExploreRoles}
        />

        {/* 2. UN SDG 8 Context */}
        <SDGSection />

        {/* 3. Interactive Assessment Form */}
        <div ref={assessmentRef}>
          <AssessmentForm
            onSubmit={handleSubmitProfile}
            isLoading={isLoading}
            initialProfile={lastProfile}
          />
        </div>

        {/* 4. Results & Personalised Roadmap (Rendered when assessment submitted) */}
        {assessment && (
          <div ref={resultsRef}>
            <ResultsView
              assessment={assessment}
              onEditProfile={handleEditProfile}
              onExploreAllRoles={handleExploreRoles}
            />
          </div>
        )}

        {/* 5. 12 Benchmark Entry Roles Catalog */}
        <RolesCatalog roles={roles} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
