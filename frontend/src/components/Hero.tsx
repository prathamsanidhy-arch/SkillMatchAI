import React from 'react';
import { ArrowRight, Target, BookOpen, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
  onExploreRoles: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartAssessment,
  onExploreRoles,
}) => {
  return (
    <section id="hero" className="pt-12 pb-16 border-b border-[#E2E6E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Editorial Eyebrow */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#C85A17]"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#55665D]">
            Educational Career Guidance • UN SDG 8
          </span>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#18221D] leading-[1.15]">
            Understand employer expectations. Close skill gaps. Build genuine job readiness.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#55665D] leading-relaxed">
            SkillMatch AI maps your current capabilities against transparent entry-level industry benchmarks. We identify what you already have, pinpoint what is missing, and generate a step-by-step roadmap to prepare you for productive employment.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartAssessment}
              className="inline-flex items-center space-x-2 px-5 py-3 text-base font-medium rounded-md bg-[#183B2B] text-white hover:bg-[#122C20] transition-colors shadow-xs cursor-pointer"
            >
              <span>Begin Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreRoles}
              className="px-5 py-3 text-base font-medium rounded-md border border-[#D0D6D0] bg-white text-[#18221D] hover:bg-[#F2F4F2] transition-colors cursor-pointer"
            >
              Explore Benchmark Roles
            </button>
          </div>

          {/* Trust points */}
          <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#55665D]">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#183B2B]" />
              <span>No account or signup required</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Target className="w-4 h-4 text-[#183B2B]" />
              <span>Transparent deterministic scoring</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-[#183B2B]" />
              <span>Curated practical learning resources</span>
            </span>
          </div>
        </div>

        {/* Workflow Summary Cards */}
        <div id="how-it-works" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-[#E2E6E2]">
          <div className="p-6 rounded-lg bg-white border border-[#E2E6E2]">
            <div className="w-8 h-8 rounded bg-[#EAEFEA] text-[#183B2B] flex items-center justify-center font-semibold text-sm mb-4">
              01
            </div>
            <h3 className="text-base font-semibold text-[#18221D]">Profile & Skills Baseline</h3>
            <p className="mt-2 text-sm text-[#55665D] leading-relaxed">
              Share your education, field of study, technical competencies, and career interests without entering sensitive personal data.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white border border-[#E2E6E2]">
            <div className="w-8 h-8 rounded bg-[#EAEFEA] text-[#183B2B] flex items-center justify-center font-semibold text-sm mb-4">
              02
            </div>
            <h3 className="text-base font-semibold text-[#18221D]">Deterministic Matching</h3>
            <p className="mt-2 text-sm text-[#55665D] leading-relaxed">
              Our backend normalizes your skills and compares them against required and supplementary competencies across 12 entry-level profiles.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white border border-[#E2E6E2]">
            <div className="w-8 h-8 rounded bg-[#EAEFEA] text-[#183B2B] flex items-center justify-center font-semibold text-sm mb-4">
              03
            </div>
            <h3 className="text-base font-semibold text-[#18221D]">Personalised Roadmap</h3>
            <p className="mt-2 text-sm text-[#55665D] leading-relaxed">
              Get an actionable 5-stage learning plan: tactical next steps, concrete practice projects, portfolio advice, and interview preparation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
