import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  X,
  Check,
  AlertCircle,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import type { UserProfile } from '../types/career';
import {
  SKILL_CATEGORIES,
  CAREER_INTERESTS,
  EDUCATION_LEVELS,
  FIELDS_OF_STUDY,
  SAMPLE_PROFILES,
} from '../data/presetData';

interface AssessmentFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
  initialProfile?: UserProfile | null;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({
  onSubmit,
  isLoading,
  initialProfile,
}) => {
  const [educationLevel, setEducationLevel] = useState<string>(
    initialProfile?.education_level || EDUCATION_LEVELS[0]
  );
  const [fieldOfStudy, setFieldOfStudy] = useState<string>(
    initialProfile?.field_of_study || FIELDS_OF_STUDY[0]
  );
  const [skills, setSkills] = useState<string[]>(
    initialProfile?.skills || ['Python', 'SQL', 'Git']
  );
  const [customSkill, setCustomSkill] = useState<string>('');
  const [interests, setInterests] = useState<string[]>(
    initialProfile?.interests || ['Backend Development', 'Data Analytics']
  );
  const [experienceLevel, setExperienceLevel] = useState<string>(
    initialProfile?.experience_level || 'Beginner / Student'
  );
  const [preferredLocation, setPreferredLocation] = useState<string>(
    initialProfile?.preferred_location || 'Anywhere / Remote'
  );
  const [workArrangement, setWorkArrangement] = useState<string>(
    initialProfile?.preferred_work_arrangement || 'Any'
  );

  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [formError, setFormError] = useState<string | null>(null);

  const handleToggleSkill = (skill: string) => {
    setFormError(null);
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleAddCustomSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customSkill.trim();
    if (!trimmed) return;
    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setCustomSkill('');
      return;
    }
    setSkills([...skills, trimmed]);
    setCustomSkill('');
    setFormError(null);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleToggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleLoadSample = (sample: (typeof SAMPLE_PROFILES)[0]) => {
    setEducationLevel(sample.profile.education_level);
    setFieldOfStudy(sample.profile.field_of_study);
    setSkills(sample.profile.skills);
    setInterests(sample.profile.interests);
    setExperienceLevel(sample.profile.experience_level);
    setPreferredLocation(sample.profile.preferred_location);
    setWorkArrangement(sample.profile.preferred_work_arrangement || 'Any');
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skills.length === 0) {
      setFormError('Please select or add at least one skill to match against industry roles.');
      return;
    }
    setFormError(null);
    onSubmit({
      education_level: educationLevel,
      field_of_study: fieldOfStudy,
      skills,
      interests,
      experience_level: experienceLevel,
      preferred_location: preferredLocation,
      preferred_work_arrangement: workArrangement,
    });
  };

  return (
    <section id="assessment-form-section" className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Form Card */}
        <div className="bg-white rounded-lg border border-[#E2E6E2] shadow-xs p-6 sm:p-8">
          {/* Header */}
          <div className="border-b border-[#E2E6E2] pb-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-[#18221D]">
                  Career Assessment Profile
                </h2>
                <p className="text-sm text-[#55665D] mt-1">
                  Enter your background and current technical tools to evaluate your role fit and skill gaps.
                </p>
              </div>

              {/* Sample Profile Switchers for Quick Demo */}
              <div className="flex flex-wrap items-center gap-1.5 bg-[#F4F6F4] p-1.5 rounded-md border border-[#E2E6E2]">
                <span className="text-[11px] font-medium text-[#55665D] px-1 flex items-center">
                  <Sparkles className="w-3 h-3 text-[#C85A17] mr-1" />
                  Presets:
                </span>
                {SAMPLE_PROFILES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleLoadSample(sample)}
                    className="text-xs px-2.5 py-1 rounded bg-white hover:bg-[#EAEFEA] text-[#183B2B] font-medium border border-[#D0D6D0] transition-colors cursor-pointer"
                    title={sample.description}
                  >
                    {sample.label.split(' ')[1] || sample.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Education & Field */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-1.5">
                  Education Level
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full text-sm rounded-md border border-[#D0D6D0] bg-white px-3 py-2 text-[#18221D] focus:outline-none focus:ring-1 focus:ring-[#183B2B]"
                >
                  {EDUCATION_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-1.5">
                  Academic Major / Background
                </label>
                <select
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  className="w-full text-sm rounded-md border border-[#D0D6D0] bg-white px-3 py-2 text-[#18221D] focus:outline-none focus:ring-1 focus:ring-[#183B2B]"
                >
                  {FIELDS_OF_STUDY.map((fld) => (
                    <option key={fld} value={fld}>
                      {fld}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Skills Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#18221D]">
                  Current Skills & Tools <span className="text-[#C85A17]">*</span>
                </label>
                <span className="text-xs text-[#55665D]">
                  {skills.length} {skills.length === 1 ? 'skill' : 'skills'} selected
                </span>
              </div>

              {/* Selected Skill Pills */}
              <div className="p-3 bg-[#F8F8F5] rounded-md border border-[#E2E6E2] min-h-[52px] mb-3 flex flex-wrap gap-1.5 items-center">
                {skills.length === 0 ? (
                  <span className="text-xs text-[#7B8B82] italic">
                    Click suggested skills below or type custom skills to add them here...
                  </span>
                ) : (
                  skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center space-x-1.5 text-xs font-medium px-2.5 py-1 rounded bg-[#183B2B] text-white"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-red-300 transition-colors cursor-pointer"
                        title="Remove skill"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Custom Skill Input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomSkill();
                    }
                  }}
                  placeholder="Type any unlisted skill (e.g. Django, C#, AWS, Postman) and hit Enter..."
                  className="flex-1 text-sm rounded-md border border-[#D0D6D0] bg-white px-3 py-2 text-[#18221D] placeholder-[#7B8B82] focus:outline-none focus:ring-1 focus:ring-[#183B2B]"
                />
                <button
                  type="button"
                  onClick={() => handleAddCustomSkill()}
                  className="px-4 py-2 text-sm font-medium rounded-md border border-[#D0D6D0] bg-white text-[#18221D] hover:bg-[#F2F4F2] transition-colors inline-flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              {/* Skill Category Selector & Suggested Pills */}
              <div className="border border-[#E2E6E2] rounded-md p-3 bg-white">
                <div className="flex flex-wrap gap-1 border-b border-[#E2E6E2] pb-2 mb-3">
                  {SKILL_CATEGORIES.map((cat, idx) => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setActiveCategoryIndex(idx)}
                      className={`text-xs px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                        activeCategoryIndex === idx
                          ? 'bg-[#183B2B] text-white'
                          : 'bg-[#F4F6F4] text-[#55665D] hover:bg-[#EAEFEA]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {SKILL_CATEGORIES[activeCategoryIndex].skills.map((skill) => {
                    const isSelected = skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleToggleSkill(skill)}
                        className={`text-xs px-2.5 py-1 rounded border transition-colors cursor-pointer inline-flex items-center space-x-1 ${
                          isSelected
                            ? 'bg-[#EAEFEA] text-[#183B2B] border-[#183B2B] font-medium'
                            : 'bg-white text-[#55665D] border-[#D0D6D0] hover:border-[#183B2B] hover:text-[#18221D]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-[#183B2B]" />}
                        <span>{skill}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Career Interests */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-1.5">
                Target Career Interests (Optional)
              </label>
              <p className="text-xs text-[#55665D] mb-2">
                Select areas you are eager to work on to help fine-tune interest fit (15% weight).
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CAREER_INTERESTS.map((interest) => {
                  const isSelected = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleToggleInterest(interest)}
                      className={`text-xs px-2.5 py-1 rounded border transition-colors cursor-pointer inline-flex items-center space-x-1 ${
                        isSelected
                          ? 'bg-[#EAEFEA] text-[#183B2B] border-[#183B2B] font-medium'
                          : 'bg-white text-[#55665D] border-[#D0D6D0] hover:border-[#183B2B]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-[#183B2B]" />}
                      <span>{interest}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Experience & Work Arrangement */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-1.5">
                  Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full text-sm rounded-md border border-[#D0D6D0] bg-white px-3 py-2 text-[#18221D] focus:outline-none focus:ring-1 focus:ring-[#183B2B]"
                >
                  <option value="Beginner / Student">Beginner / Student</option>
                  <option value="Intern / 0-1 Years">Intern / 0-1 Years</option>
                  <option value="Junior / 1-2 Years">Junior / 1-2 Years</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-1.5">
                  Preferred Location
                </label>
                <input
                  type="text"
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                  placeholder="e.g. Remote, Bengaluru, Pune"
                  className="w-full text-sm rounded-md border border-[#D0D6D0] bg-white px-3 py-2 text-[#18221D] focus:outline-none focus:ring-1 focus:ring-[#183B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-1.5">
                  Work Arrangement
                </label>
                <select
                  value={workArrangement}
                  onChange={(e) => setWorkArrangement(e.target.value)}
                  className="w-full text-sm rounded-md border border-[#D0D6D0] bg-white px-3 py-2 text-[#18221D] focus:outline-none focus:ring-1 focus:ring-[#183B2B]"
                >
                  <option value="Any">Any Arrangement</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Onsite">Onsite</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{formError}</span>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-4 border-t border-[#E2E6E2] flex items-center justify-between">
              <span className="text-xs text-[#7B8B82] flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Evaluates 12 benchmark entry profiles deterministically</span>
              </span>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 text-sm font-semibold rounded-md bg-[#183B2B] text-white hover:bg-[#122C20] disabled:opacity-60 transition-colors shadow-xs inline-flex items-center space-x-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Capabilities...</span>
                  </>
                ) : (
                  <span>Match Skills & Generate Roadmap</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
