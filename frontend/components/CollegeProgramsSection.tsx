'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GraduationCap, ArrowRight, Zap, Briefcase, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface CollegeProgramsSectionProps {
  onOpenInquiryModal: (type?: string, details?: any) => void;
}

export default function CollegeProgramsSection({ onOpenInquiryModal }: CollegeProgramsSectionProps) {
  const [activeDomain, setActiveDomain] = useState<'ALL' | 'ENGINEERING' | 'MANAGEMENT'>('ALL');

  const programs = [
    {
      id: 'venture-sprint',
      title: 'Venture Sprint & Incubator',
      domain: 'ENGINEERING',
      icon: Zap,
      badge: 'Incubator & Startups',
      desc: '3-week intensive sprint taking student tech concepts to working MVPs, angel pitch decks, and incubator registration.',
      outcomes: ['Functional Product Prototype', 'Pre-Seed Pitch Deck', 'Incubation Onboarding'],
    },
    {
      id: 'placement-accelerator',
      title: 'Corporate Placement Accelerator',
      domain: 'MANAGEMENT',
      icon: Briefcase,
      badge: 'Corporate Readiness',
      desc: 'Real-world business consulting projects, live marketing campaigns, crisis simulations, and high-paying placement readiness.',
      outcomes: ['Live Corporate Client Case', 'Executive Presence Training', 'Interview Mastery'],
    },
    {
      id: 'research-lab',
      title: 'Research & Deep-Tech Lab',
      domain: 'ENGINEERING',
      icon: Award,
      badge: 'IP & Patents',
      desc: 'Structured guidance for undergraduate research, IEEE paper submissions, patent drafting, and international conference publishing.',
      outcomes: ['Journal Paper Publication', 'Provisional Patent Filing', 'Research Grant Pitch'],
    },
    {
      id: 'founder-hub',
      title: 'Student Founder Ecosystem',
      domain: 'MANAGEMENT',
      icon: Sparkles,
      badge: 'Seed Capital & Mentors',
      desc: 'End-to-end founder support including legal entity creation, equity splits, GST compliance, and access to angel syndicate networks.',
      outcomes: ['Incorporated Private Limited Entity', 'Angel Network Pitching', 'Founder Equity Structure'],
    },
  ];

  const filteredPrograms =
    activeDomain === 'ALL'
      ? programs
      : programs.filter((p) => p.domain === activeDomain);

  return (
    <section id="college-programs" className="py-20 md:py-28 bg-[#FFFFFF] text-[#0B0D11] relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6500]/10 border border-[#FF6500]/30 text-[#FF6500] text-xs font-bold uppercase tracking-wider">
            <GraduationCap size={14} />
            <span>FOR COLLEGES & UNIVERSITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0D11] tracking-tight">
            Venture Creation & <span className="text-[#FF6500]">Placement Mastery</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Empowering engineering & management colleges to convert students into founders, researchers, and high-tier professionals.
          </p>
        </div>

        {/* Masterclass Campus Photo Banner */}
        <div className="mb-14 rounded-3xl overflow-hidden shadow-2xl relative h-[300px] sm:h-[400px] border border-slate-200">
          <Image
            src="/assets/college_workshop.jpg"
            alt="WhySchool College Experiential Masterclass"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#FF6500] text-white inline-block">
                Live College Masterclass
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">Building Real-World Incubators Inside Campuses</h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Our founders and mentors conduct live 3-day hackathons and multi-week venture creation sprints directly inside university campuses.
              </p>
            </div>
          </div>
        </div>

        {/* Domain Filter Buttons */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveDomain('ALL')}
            className={`py-2 px-5 rounded-xl text-xs font-bold transition ${
              activeDomain === 'ALL'
                ? 'bg-[#FF6500] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Programs
          </button>
          <button
            onClick={() => setActiveDomain('ENGINEERING')}
            className={`py-2 px-5 rounded-xl text-xs font-bold transition ${
              activeDomain === 'ENGINEERING'
                ? 'bg-[#FF6500] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Engineering & Tech
          </button>
          <button
            onClick={() => setActiveDomain('MANAGEMENT')}
            className={`py-2 px-5 rounded-xl text-xs font-bold transition ${
              activeDomain === 'MANAGEMENT'
                ? 'bg-[#FF6500] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Management & Business
          </button>
        </div>

        {/* 4 Concise College Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {filteredPrograms.map((prog) => {
            const IconComp = prog.icon;
            return (
              <div
                key={prog.id}
                className="bg-white border border-slate-200 hover:border-[#FF6500] rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-xl space-y-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3.5 rounded-2xl bg-[#FF6500]/10 text-[#FF6500]">
                      <IconComp size={28} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {prog.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B0D11] mb-2">{prog.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{prog.desc}</p>

                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Outcomes</span>
                    {prog.outcomes.map((out, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 size={14} className="text-[#FF6500]" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() =>
                      onOpenInquiryModal('College Program Inquiry', {
                        programFocus: prog.title,
                        institutionType: 'College',
                      })
                    }
                    className="w-full py-3 px-5 rounded-xl bg-slate-900 hover:bg-[#FF6500] text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request College Proposal</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
