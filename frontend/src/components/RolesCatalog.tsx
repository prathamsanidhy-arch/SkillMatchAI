import React, { useState, useMemo } from 'react';
import { Search, BookOpen } from 'lucide-react';
import type { JobRole } from '../types/career';
import { RoleModal } from './RoleModal';

interface RolesCatalogProps {
  roles: JobRole[];
}

export const RolesCatalog: React.FC<RolesCatalogProps> = ({ roles }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [modalRole, setModalRole] = useState<JobRole | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    roles.forEach((r) => set.add(r.category));
    return ['All', ...Array.from(set)];
  }, [roles]);

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const matchesCategory =
        selectedCategory === 'All' || role.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        role.title.toLowerCase().includes(q) ||
        role.description.toLowerCase().includes(q) ||
        role.required_skills.some((s) => s.toLowerCase().includes(q)) ||
        role.supplementary_skills.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [roles, selectedCategory, searchQuery]);

  return (
    <section id="roles-catalog" className="py-16 bg-[#F8F8F5] border-t border-[#E2E6E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#183B2B]"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#55665D]">
                Open Reference Standards
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#18221D]">
              12 Benchmark Entry-Level Career Profiles
            </h2>
            <p className="mt-1 text-sm text-[#55665D]">
              Curated, verified skill profiles across modern tech, product, data, and business tracks.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8B82]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role or skill (e.g. Python, SQL, Figma)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-[#D0D6D0] bg-white text-[#18221D] placeholder-[#7B8B82] focus:outline-none focus:ring-1 focus:ring-[#183B2B]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded font-medium border transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#183B2B] text-white border-[#183B2B]'
                  : 'bg-white text-[#55665D] border-[#D0D6D0] hover:border-[#183B2B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="bg-white rounded-lg border border-[#E2E6E2] hover:border-[#183B2B] transition-colors p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#EAEFEA] text-[#183B2B]">
                    {role.category}
                  </span>
                  <span className="text-[10px] text-[#7B8B82]">
                    {role.typical_experience_level}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#18221D] mb-2">
                  {role.title}
                </h3>

                <p className="text-xs text-[#55665D] leading-relaxed line-clamp-3 mb-4">
                  {role.description}
                </p>

                {/* Required Skills */}
                <div className="mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#18221D] block mb-1.5">
                    Core Required Skills
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {role.required_skills.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded bg-[#F4F6F4] text-[#18221D] font-medium border border-[#E2E6E2]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Supplementary Skills */}
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#55665D] block mb-1.5">
                    Supplementary Skills
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {role.supplementary_skills.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded bg-white text-[#55665D] border border-[#E2E6E2]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-[#F2F4F2]">
                <button
                  onClick={() => setModalRole(role)}
                  className="w-full py-1.5 text-xs font-semibold rounded bg-[#F8F8F5] text-[#183B2B] hover:bg-[#EAEFEA] transition-colors border border-[#D5E0D5] flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Inspect Profile & Resources</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Role Modal */}
        <RoleModal
          role={modalRole}
          onClose={() => setModalRole(null)}
        />
      </div>
    </section>
  );
};
