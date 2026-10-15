import React from 'react';
import { Award, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';

export const SDGSection: React.FC = () => {
  return (
    <section id="sdg-impact" className="py-16 bg-[#F4F6F4] border-b border-[#E2E6E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Context */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#E2EAE3] text-[#183B2B] text-xs font-semibold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>United Nations SDG 8 Alignment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#18221D]">
              Decent Work & Economic Growth
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#55665D] leading-relaxed">
              Global youth underemployment is rarely caused by a shortage of effort or ambition. It is frequently driven by an informational divide: students graduate without knowing which specific skills industry teams require, and self-taught learners struggle to prioritize among thousands of competing online tutorials.
            </p>
            <p className="mt-3 text-sm sm:text-base text-[#55665D] leading-relaxed">
              SkillMatch AI directly supports <strong>SDG Target 8.6</strong> (reducing youth unemployment and NEET rates) by demystifying role requirements and providing structured, step-by-step roadmaps toward productive employment.
            </p>
          </div>

          {/* Right Column: Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg bg-white border border-[#E2E6E2]">
              <div className="w-8 h-8 rounded bg-[#EAEFEA] text-[#183B2B] flex items-center justify-center mb-3">
                <Briefcase className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-sm text-[#18221D]">Transparent Industry Expectations</h4>
              <p className="mt-1.5 text-xs text-[#55665D] leading-relaxed">
                Replaces vague job postings with explicit required vs. supplementary skills so students know precisely what to prepare.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-white border border-[#E2E6E2]">
              <div className="w-8 h-8 rounded bg-[#EAEFEA] text-[#183B2B] flex items-center justify-center mb-3">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-sm text-[#18221D]">Actionable Bridge Over Gap</h4>
              <p className="mt-1.5 text-xs text-[#55665D] leading-relaxed">
                Rather than discouraging learners with rejection letters, we supply tangible next steps to close missing competencies.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-white border border-[#E2E6E2]">
              <div className="w-8 h-8 rounded bg-[#EAEFEA] text-[#183B2B] flex items-center justify-center mb-3">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-sm text-[#18221D]">Proof of Work Over Credentials</h4>
              <p className="mt-1.5 text-xs text-[#55665D] leading-relaxed">
                Emphasizes applied practice projects and verified code samples that demonstrate capability regardless of college pedigree.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-white border border-[#E2E6E2]">
              <div className="w-8 h-8 rounded bg-[#EAEFEA] text-[#183B2B] flex items-center justify-center mb-3">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-sm text-[#18221D]">Honest Guidance Ethics</h4>
              <p className="mt-1.5 text-xs text-[#55665D] leading-relaxed">
                No false promises of hiring guarantees, fake partnerships, or commercial recruitment agency lock-ins. Pure educational value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
