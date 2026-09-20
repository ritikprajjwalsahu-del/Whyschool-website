'use client';

import React from 'react';
import { Layers, ArrowRight, Zap, Target, Globe } from 'lucide-react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

interface VennSectionProps {
  onOpenInquiryModal: (type?: string) => void;
}

export default function VennSection({ onOpenInquiryModal }: VennSectionProps) {
  return (
    <section id="methodology" className="bg-[#F8FAFC] relative overflow-hidden border-t border-slate-200/80 py-2 sm:py-4">
      {/* Background ambient radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6500]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Aceternity UI 3D Scroll Container Wrapper */}
      <ContainerScroll>
        {/* Set Theory SVG Model & Pillars inside 3D Tilt Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full overflow-y-auto lg:overflow-visible">
          
          {/* SVG Venn Set Theory Diagram */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square flex items-center justify-center p-2">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full drop-shadow-xl overflow-visible"
              >
                <defs>
                  <linearGradient id="gradTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="gradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="gradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6500" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#B45309" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Circle 1: Academic Syllabus */}
                <circle
                  cx="250"
                  cy="175"
                  r="105"
                  fill="url(#gradTop)"
                  stroke="#60A5FA"
                  strokeWidth="2.5"
                  className="transition-all duration-500 hover:opacity-90"
                />
                <text x="250" y="145" textAnchor="middle" fill="#93C5FD" fontSize="13" fontWeight="bold">
                  Academic Syllabus
                </text>
                <text x="250" y="165" textAnchor="middle" fill="#CBD5E1" fontSize="10">
                  Theory & Concepts
                </text>

                {/* Circle 2: Real-World Execution */}
                <circle
                  cx="185"
                  cy="295"
                  r="105"
                  fill="url(#gradLeft)"
                  stroke="#34D399"
                  strokeWidth="2.5"
                  className="transition-all duration-500 hover:opacity-90"
                />
                <text x="155" y="325" textAnchor="middle" fill="#6EE7B7" fontSize="13" fontWeight="bold">
                  Hands-On Practice
                </text>
                <text x="155" y="345" textAnchor="middle" fill="#CBD5E1" fontSize="10">
                  Building Projects
                </text>

                {/* Circle 3: Industry Network */}
                <circle
                  cx="315"
                  cy="295"
                  r="105"
                  fill="url(#gradRight)"
                  stroke="#FF6500"
                  strokeWidth="2.5"
                  className="transition-all duration-500 hover:opacity-90"
                />
                <text x="345" y="325" textAnchor="middle" fill="#FDBA74" fontSize="13" fontWeight="bold">
                  Industry Network
                </text>
                <text x="345" y="345" textAnchor="middle" fill="#CBD5E1" fontSize="10">
                  Mentors & Capital
                </text>

                {/* Core Intersection Hub */}
                <circle
                  cx="250"
                  cy="255"
                  r="35"
                  fill="#FF6500"
                  className="venn-core-glow cursor-pointer"
                  onClick={() => onOpenInquiryModal('Experiential Nexus')}
                />
                <text x="250" y="252" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">
                  WhySchool.
                </text>
                <text x="250" y="264" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                  NEXUS
                </text>
              </svg>
            </div>
          </div>

          {/* Right Side: 3 Key Pillars */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#181C26] border border-white/10 hover:border-blue-500/50 shadow-md transition group">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition shrink-0">
                  <Target size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-0.5">1. Academic Syllabi Core</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Preserves fundamental math, science, and humanities concepts while eliminating passive rote memorization.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#181C26] border border-white/10 hover:border-emerald-500/50 shadow-md transition group">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition shrink-0">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-0.5">2. Applied Venture Execution</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Students turn textbook problems into working software, hardware prototypes, research papers, and revenue streams.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#181C26] border border-white/10 hover:border-[#FF6500]/50 shadow-md transition group">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FF6500]/10 text-[#FF6500] group-hover:bg-[#FF6500]/20 transition shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-0.5">3. Industry & Venture Ecosystem</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Direct access to corporate mentors, incubator networks, and investment funds to accelerate student outcomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenInquiryModal('Experiential Nexus Audit')}
                className="w-full py-3.5 px-5 rounded-xl bg-[#FF6500] hover:bg-[#FF7A1A] text-white font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-[#FF6500]/30 cursor-pointer"
              >
                <span>Incorporate Methodology in Your Institution</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </ContainerScroll>
    </section>
  );
}
