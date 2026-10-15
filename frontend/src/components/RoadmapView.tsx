import React from 'react';
import {
  Calendar,
  Code2,
  FolderGit2,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import type { LearningRoadmap } from '../types/career';

interface RoadmapViewProps {
  roadmap: LearningRoadmap;
  aiGenerated: boolean;
  aiNotice: string;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmap,
  aiGenerated,
  aiNotice,
}) => {
  return (
    <div className="mt-12 bg-white rounded-lg border border-[#E2E6E2] shadow-xs p-6 sm:p-8">
      {/* Header */}
      <div className="border-b border-[#E2E6E2] pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-[#EAEFEA] text-[#183B2B] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A17]" />
            <span>Targeted Growth Plan</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#18221D]">
            Personalised Employability Roadmap
          </h3>
          <p className="text-sm text-[#55665D] mt-1">
            Grounded in your evaluated skill gaps, here is your sequenced path to building verifiable competence.
          </p>
        </div>

        <div className="text-right">
          <span
            className={`text-xs px-2.5 py-1 rounded font-medium border ${
              aiGenerated
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}
          >
            {aiGenerated ? 'AI Dynamic Evaluation' : 'Deterministic Curriculum Engine'}
          </span>
          <p className="text-[11px] text-[#7B8B82] mt-1 max-w-xs text-right">
            {aiNotice}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Stage 1: Immediate Tactical Actions */}
        <div>
          <div className="flex items-center space-x-2.5 mb-3">
            <div className="w-7 h-7 rounded bg-[#183B2B] text-white flex items-center justify-center text-xs font-bold">
              1
            </div>
            <h4 className="text-base font-semibold text-[#18221D] flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#C85A17]" />
              <span>Immediate Tactical Next Steps (First 14 Days)</span>
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-9">
            {roadmap.immediate_steps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-md bg-[#F8F8F5] border border-[#E2E6E2] flex items-start space-x-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#183B2B] shrink-0 mt-0.5" />
                <span className="text-sm text-[#18221D] leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 2: Core Skills to Prioritize */}
        <div>
          <div className="flex items-center space-x-2.5 mb-3">
            <div className="w-7 h-7 rounded bg-[#183B2B] text-white flex items-center justify-center text-xs font-bold">
              2
            </div>
            <h4 className="text-base font-semibold text-[#18221D] flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-[#183B2B]" />
              <span>Core Missing Skills to Learn</span>
            </h4>
          </div>
          <div className="pl-9 flex flex-wrap gap-2">
            {roadmap.core_skills_to_learn.map((skill, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 rounded-md bg-[#F4F6F4] border border-[#D5E0D5] text-xs font-medium text-[#183B2B] flex items-center space-x-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C85A17]"></span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 3: Concrete Applied Projects */}
        <div>
          <div className="flex items-center space-x-2.5 mb-3">
            <div className="w-7 h-7 rounded bg-[#183B2B] text-white flex items-center justify-center text-xs font-bold">
              3
            </div>
            <h4 className="text-base font-semibold text-[#18221D] flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-[#183B2B]" />
              <span>Recommended Practice Projects</span>
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-9">
            {roadmap.practice_projects.map((proj, idx) => (
              <div
                key={idx}
                className="p-4 rounded-md border border-[#E2E6E2] bg-white hover:border-[#183B2B] transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h5 className="font-semibold text-sm text-[#18221D]">
                    {proj.title}
                  </h5>
                  <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded bg-[#EAEFEA] text-[#183B2B]">
                    {proj.difficulty}
                  </span>
                </div>
                <p className="text-xs text-[#55665D] leading-relaxed mb-3">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {proj.key_skills_practiced.map((sk) => (
                    <span
                      key={sk}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#F8F8F5] text-[#55665D] border border-[#E2E6E2]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 4: Portfolio Development */}
        <div>
          <div className="flex items-center space-x-2.5 mb-3">
            <div className="w-7 h-7 rounded bg-[#183B2B] text-white flex items-center justify-center text-xs font-bold">
              4
            </div>
            <h4 className="text-base font-semibold text-[#18221D] flex items-center space-x-2">
              <FolderGit2 className="w-4 h-4 text-[#183B2B]" />
              <span>Portfolio & Proof-of-Work Guidance</span>
            </h4>
          </div>
          <ul className="space-y-2.5 pl-9">
            {roadmap.portfolio_guidance.map((item, idx) => (
              <li
                key={idx}
                className="text-sm text-[#55665D] flex items-start space-x-2"
              >
                <ArrowRight className="w-4 h-4 text-[#C85A17] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stage 5: Technical Interview & Conceptual Preparation */}
        <div>
          <div className="flex items-center space-x-2.5 mb-3">
            <div className="w-7 h-7 rounded bg-[#183B2B] text-white flex items-center justify-center text-xs font-bold">
              5
            </div>
            <h4 className="text-base font-semibold text-[#18221D] flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-[#183B2B]" />
              <span>Interview Readiness & Conceptual Verification</span>
            </h4>
          </div>
          <ul className="space-y-2.5 pl-9">
            {roadmap.interview_preparation.map((item, idx) => (
              <li
                key={idx}
                className="text-sm text-[#55665D] flex items-start space-x-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#183B2B] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
