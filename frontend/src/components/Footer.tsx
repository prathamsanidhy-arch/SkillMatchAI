import React from 'react';
import { Compass, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E2E6E2] py-12 text-[#55665D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#E2E6E2]">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="w-7 h-7 rounded bg-[#183B2B] text-white flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-[#18221D]">
                SkillMatch<span className="text-[#C85A17]">.</span>AI
              </span>
            </div>
            <p className="text-xs text-[#55665D] leading-relaxed max-w-sm">
              Empowering college students, fresh graduates, and career changers to bridge the gap between academic study and modern industry skill requirements.
            </p>
            <div className="mt-3 flex items-center space-x-1.5 text-xs text-[#183B2B] font-medium">
              <Award className="w-3.5 h-3.5" />
              <span>United Nations SDG 8 Initiative</span>
            </div>
          </div>

          {/* Core Pillars */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-3">
              Guiding Principles
            </h4>
            <ul className="space-y-2 text-xs">
              <li>Deterministic Skill Matching</li>
              <li>Transparent Benchmark Profiles</li>
              <li>Missing Skill Gap Identification</li>
              <li>Curated Practical Roadmaps</li>
            </ul>
          </div>

          {/* Ethics & Disclaimers */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-3">
              Guidance Notice
            </h4>
            <p className="text-xs text-[#7B8B82] leading-relaxed">
              SkillMatch AI is an educational career matching prototype. Recommendations and readiness scores reflect curriculum alignment with standard job descriptions and do not guarantee hiring eligibility, job offers, or vacancy availability.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7B8B82] gap-3">
          <p>
            Built for students and early-career job seekers • UN SDG 8 Decent Work & Economic Growth
          </p>
          <p className="flex items-center space-x-1">
            <span>Powered by FastAPI, React, TypeScript & Google Gemini</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
