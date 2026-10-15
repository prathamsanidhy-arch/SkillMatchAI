import React from 'react';
import { X, BookOpen, CheckCircle, Layers } from 'lucide-react';
import type { JobRole } from '../types/career';

interface RoleModalProps {
  role: JobRole | null;
  onClose: () => void;
}

export const RoleModal: React.FC<RoleModalProps> = ({ role, onClose }) => {
  if (!role) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div 
        className="bg-white rounded-lg border border-[#D0D6D0] shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E2E6E2] flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EAEFEA] text-[#183B2B] border border-[#D5E0D5]">
                {role.category}
              </span>
              <span className="text-xs text-[#55665D]">
                Typical Level: {role.typical_experience_level}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#18221D] mt-2">
              {role.title}
            </h3>
            <p className="text-xs text-[#55665D] mt-1">
              Standard Industry Benchmark Profile
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#55665D] hover:text-[#18221D] hover:bg-[#F2F4F2] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-2">
              Role Overview
            </h4>
            <p className="text-sm text-[#55665D] leading-relaxed">
              {role.description}
            </p>
          </div>

          {/* Example Responsibilities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-2">
              Day-to-Day Responsibilities (Typical)
            </h4>
            <ul className="space-y-2">
              {role.example_responsibilities.map((resp, i) => (
                <li key={i} className="text-sm text-[#55665D] flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#183B2B] mt-2 shrink-0"></span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-md bg-[#F8F8F5] border border-[#E2E6E2]">
              <h5 className="text-xs font-semibold text-[#183B2B] flex items-center space-x-1.5 mb-2">
                <CheckCircle className="w-4 h-4 text-[#183B2B]" />
                <span>Required Core Skills</span>
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {role.required_skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium px-2 py-0.5 rounded bg-white text-[#18221D] border border-[#D0D6D0]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-md bg-[#F8F8F5] border border-[#E2E6E2]">
              <h5 className="text-xs font-semibold text-[#55665D] flex items-center space-x-1.5 mb-2">
                <Layers className="w-4 h-4 text-[#55665D]" />
                <span>Supplementary / Bonus Skills</span>
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {role.supplementary_skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium px-2 py-0.5 rounded bg-white text-[#55665D] border border-[#D0D6D0]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Curated Learning Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-3">
              Curated Learning Resources & Focus Areas
            </h4>
            <div className="space-y-3">
              {role.learning_resources.map((res, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-md border border-[#E2E6E2] bg-white flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-[#183B2B]" />
                      <h5 className="text-sm font-semibold text-[#18221D]">
                        {res.title}
                      </h5>
                    </div>
                    <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded bg-[#F4F6F4] text-[#55665D] border border-[#E2E6E2]">
                      {res.resource_type}
                    </span>
                  </div>
                  <p className="text-xs text-[#55665D] mt-1.5">
                    {res.description}
                  </p>
                  <div className="mt-2 pt-2 border-t border-[#F2F4F2] text-[11px] text-[#183B2B]">
                    <strong>Suggested Focus:</strong> {res.suggested_focus}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8F8F5] border-t border-[#E2E6E2] flex items-center justify-between">
          <span className="text-xs text-[#7B8B82]">
            Educational benchmark profile • SkillMatch AI
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-md bg-[#183B2B] text-white hover:bg-[#122C20] transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
