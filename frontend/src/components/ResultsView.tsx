import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Printer,
  Edit3,
  Info,
  ExternalLink,
  Award,
} from 'lucide-react';
import type { AssessmentResponse, JobRole } from '../types/career';
import { RoadmapView } from './RoadmapView';
import { RoleModal } from './RoleModal';

interface ResultsViewProps {
  assessment: AssessmentResponse;
  onEditProfile: () => void;
  onExploreAllRoles: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  assessment,
  onEditProfile,
  onExploreAllRoles,
}) => {
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const { profile, top_matches, summary, learning_roadmap, ai_generated, ai_notice } =
    assessment;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="results-section" className="py-12 bg-[#F8F8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E2E6E2]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#183B2B]"></span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#18221D]">
              Career Assessment & Matching Results
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onEditProfile}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-[#D0D6D0] bg-white text-[#18221D] hover:bg-[#F2F4F2] transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modify Profile</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-[#D0D6D0] bg-white text-[#18221D] hover:bg-[#F2F4F2] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save</span>
            </button>
          </div>
        </div>

        {/* Profile Summary Card */}
        <div className="bg-white rounded-lg border border-[#E2E6E2] p-6 sm:p-7 shadow-xs mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#55665D]">
                Candidate Synthesis
              </span>
              <p className="mt-2 text-base text-[#18221D] leading-relaxed">
                {summary}
              </p>

              <div className="mt-4 pt-4 border-t border-[#F2F4F2] flex flex-wrap gap-y-2 gap-x-5 text-xs text-[#55665D]">
                <span>
                  <strong>Major:</strong> {profile.field_of_study}
                </span>
                <span>
                  <strong>Education:</strong> {profile.education_level.split('(')[0]}
                </span>
                <span>
                  <strong>Skills Tracked:</strong> {profile.skills.length}
                </span>
                <span>
                  <strong>Preference:</strong> {profile.preferred_work_arrangement} (
                  {profile.preferred_location})
                </span>
              </div>
            </div>

            {/* Score Logic Callout */}
            <div className="lg:col-span-4 bg-[#F8F8F5] p-4 rounded-md border border-[#E2E6E2]">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#183B2B] mb-1.5">
                <Info className="w-4 h-4 text-[#C85A17]" />
                <span>Deterministic Scoring Engine</span>
              </div>
              <p className="text-[11px] text-[#55665D] leading-normal">
                Matches are mathematically computed based on 60% Required Skills, 20% Supplementary Skills, 15% Stated Interests, and 5% Experience Level.
              </p>
              <div className="mt-2.5 pt-2 border-t border-[#EAEFEA] text-[10px] text-[#7B8B82]">
                Guaranteed transparent weights. No arbitrary percentages.
              </div>
            </div>
          </div>
        </div>

        {/* Top Matching Roles Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#18221D]">
                Highest-Ranked Career Profiles
              </h3>
              <p className="text-xs text-[#55665D]">
                Ranked against our standardized benchmark of 12 entry-level profiles.
              </p>
            </div>
            <button
              onClick={onExploreAllRoles}
              className="text-xs font-semibold text-[#183B2B] hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>View All 12 Roles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {top_matches.map((match) => {
              const { role, match_score, readiness_level, matched_skills, missing_critical_skills, match_explanation } =
                match;
              const isHighFit = match_score >= 70;
              const isModerate = match_score >= 45 && match_score < 70;

              return (
                <div
                  key={role.id}
                  className="bg-white rounded-lg border border-[#E2E6E2] hover:border-[#183B2B] transition-all p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    {/* Role Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#F4F6F4] text-[#55665D] border border-[#E2E6E2]">
                          {role.category}
                        </span>
                        <h4 className="text-lg font-bold text-[#18221D] mt-1.5">
                          {role.title}
                        </h4>
                      </div>

                      {/* Match Score Badge */}
                      <div className="text-right shrink-0">
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-bold tracking-tight text-[#183B2B]">
                            {match_score}%
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isHighFit
                              ? 'bg-emerald-100 text-emerald-900'
                              : isModerate
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          {readiness_level}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#EAEFEA] h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className={`h-full rounded-full ${
                          isHighFit ? 'bg-[#183B2B]' : isModerate ? 'bg-[#C85A17]' : 'bg-[#7B8B82]'
                        }`}
                        style={{ width: `${match_score}%` }}
                      ></div>
                    </div>

                    {/* Match Explanation */}
                    <p className="text-xs text-[#55665D] mb-4">
                      {match_explanation}
                    </p>

                    {/* Matched vs Missing Skills */}
                    <div className="space-y-3 pt-3 border-t border-[#F2F4F2]">
                      {/* Matched */}
                      <div>
                        <div className="flex items-center space-x-1 text-xs font-semibold text-[#183B2B] mb-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Matched Skills ({matched_skills.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {matched_skills.length === 0 ? (
                            <span className="text-xs text-[#7B8B82] italic">
                              No core required skills matched yet.
                            </span>
                          ) : (
                            matched_skills.map((s) => (
                              <span
                                key={s}
                                className="text-xs px-2 py-0.5 rounded bg-[#EAEFEA] text-[#183B2B] font-medium"
                              >
                                {s}
                              </span>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Missing */}
                      <div>
                        <div className="flex items-center space-x-1 text-xs font-semibold text-[#C85A17] mb-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-[#C85A17]" />
                          <span>Key Missing Skills ({missing_critical_skills.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {missing_critical_skills.length === 0 ? (
                            <span className="text-xs text-emerald-800 font-medium">
                              All required core skills matched!
                            </span>
                          ) : (
                            missing_critical_skills.map((s) => (
                              <span
                                key={s}
                                className="text-xs px-2 py-0.5 rounded bg-[#FDF2EC] text-[#9E3E0C] font-medium border border-[#F6D8C8]"
                              >
                                {s}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Role Card Actions */}
                  <div className="mt-5 pt-4 border-t border-[#E2E6E2] flex items-center justify-between">
                    <span className="text-[11px] text-[#7B8B82]">
                      {role.typical_experience_level}
                    </span>
                    <button
                      onClick={() => setSelectedRole(role)}
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-[#183B2B] hover:text-[#C85A17] transition-colors cursor-pointer"
                    >
                      <span>Role Profile & Learning Resources</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personalised Learning Roadmap */}
        <RoadmapView
          roadmap={learning_roadmap}
          aiGenerated={ai_generated}
          aiNotice={ai_notice}
        />

        {/* SDG Impact & Disclaimer */}
        <div className="mt-12 p-6 rounded-lg bg-[#EAEFEA] border border-[#D5E0D5]">
          <div className="flex items-start space-x-3">
            <Award className="w-5 h-5 text-[#183B2B] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-[#183B2B]">
                UN SDG 8 & Educational Guidance Commitment
              </h4>
              <p className="mt-1 text-xs text-[#183B2B]/90 leading-relaxed">
                {assessment.sdg_alignment_note}
              </p>
              <p className="mt-2 text-[11px] text-[#55665D] italic">
                {assessment.disclaimer}
              </p>
            </div>
          </div>
        </div>

        {/* Role Inspection Modal */}
        <RoleModal
          role={selectedRole}
          onClose={() => setSelectedRole(null)}
        />
      </div>
    </section>
  );
};
