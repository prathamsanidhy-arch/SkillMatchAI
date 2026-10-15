import React from 'react';
import { Compass, CheckCircle2, AlertCircle } from 'lucide-react';
import type { HealthResponse } from '../types/career';

interface NavbarProps {
  health: HealthResponse | null;
  onNavigate: (sectionId: string) => void;
  onStartAssessment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  health,
  onNavigate,
  onStartAssessment,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F8F8F5]/90 backdrop-blur-md border-b border-[#E2E6E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => onNavigate('hero')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-md bg-[#183B2B] text-white flex items-center justify-center transition-transform group-hover:scale-105">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg tracking-tight text-[#18221D]">
                SkillMatch<span className="text-[#C85A17]">.</span>AI
              </span>
              <span className="text-[10px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded bg-[#EAEFEA] text-[#183B2B] border border-[#D5E0D5]">
                SDG 8
              </span>
            </div>
            <p className="text-[11px] text-[#55665D] hidden sm:block">
              Employability & Skills Guidance
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-[#55665D]">
          <button
            onClick={() => onNavigate('how-it-works')}
            className="hover:text-[#18221D] transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => onNavigate('roles-catalog')}
            className="hover:text-[#18221D] transition-colors cursor-pointer"
          >
            Benchmark Roles
          </button>
          <button
            onClick={() => onNavigate('sdg-impact')}
            className="hover:text-[#18221D] transition-colors cursor-pointer"
          >
            UN SDG 8
          </button>
        </nav>

        {/* Right Action & Status */}
        <div className="flex items-center space-x-3">
          {health && (
            <div 
              title={health.ai_configured ? 'Google Gemini AI Configured' : 'Running in Deterministic Demo Mode'}
              className="hidden lg:flex items-center space-x-1.5 text-xs text-[#55665D] px-2.5 py-1 rounded border border-[#E2E6E2] bg-white"
            >
              {health.ai_configured ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Gemini AI Connected</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-[#C85A17]" />
                  <span>Demo Mode (Active)</span>
                </>
              )}
            </div>
          )}

          <button
            onClick={onStartAssessment}
            className="px-4 py-2 text-sm font-medium rounded-md bg-[#183B2B] text-white hover:bg-[#122C20] transition-colors shadow-xs cursor-pointer"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </header>
  );
};
