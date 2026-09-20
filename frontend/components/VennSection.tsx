'use client';

import React from 'react';
import { Layers, ArrowRight, Zap, Target, Globe } from 'lucide-react';

interface VennSectionProps {
  onOpenInquiryModal: (type?: string) => void;
}

export default function VennSection({ onOpenInquiryModal }: VennSectionProps) {
  return (
    <section id="methodology" className="py-20 md:py-28 bg-[#0B0D11] relative overflow-hidden border-t border-white/10">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6500]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with anchored chip badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6500]/15 border border-[#FF6500]/30 text-[#FF7A1A] text-xs font-bold uppercase tracking-wider">
            <Layers size={14} />
            <span>WHERE IT ALL COMES TOGETHER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The <span className="text-[#FF6500]">Experiential Nexus</span> Model
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            How WhySchool bridges classroom theory with high-impact industry execution to build future-ready innovators.
          </p>
        </div>

        {/* Compact SVG Venn Diagram & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: SVG Set Theory Diagram */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center p-4">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full drop-shadow-2xl overflow-visible"
              >
                <defs>
                  <linearGradient id="gradTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="gradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="gradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6500" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#B45309" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Circle 1: Academic Syllabus (Top) */}
                <circle
                  cx="250"
                  cy="175"
                  r="105"
                  fill="url(#gradTop)"
                  stroke="#60A5FA"
                  strokeWidth="2"
                  className="transition-all duration-500 hover:opacity-90"
                />
                <text x="250" y="145" textAnchor="middle" fill="#93C5FD" fontSize="13" fontWeight="bold">
                  Academic Syllabus
                </text>
                <text x="250" y="165" textAnchor="middle" fill="#CBD5E1" fontSize="10">
                  Theory & Concepts
                </text>

                {/* Circle 2: Real-World Execution (Bottom Left) */}
                <circle
                  cx="185"
                  cy="295"
                  r="105"
                  fill="url(#gradLeft)"
                  stroke="#34D399"
                  strokeWidth="2"
                  className="transition-all duration-500 hover:opacity-90"
                />
                <text x="155" y="325" textAnchor="middle" fill="#6EE7B7" fontSize="13" fontWeight="bold">
                  Hands-On Practice
                </text>
                <text x="155" y="345" textAnchor="middle" fill="#CBD5E1" fontSize="10">
                  Building Projects
                </text>

                {/* Circle 3: Industry Network (Bottom Right) */}
                <circle
                  cx="315"
                  cy="295"
                  r="105"
                  fill="url(#gradRight)"
                  stroke="#FF6500"
                  strokeWidth="2"
                  className="transition-all duration-500 hover:opacity-90"
                />
                <text x="345" y="325" textAnchor="middle" fill="#FDBA74" fontSize="13" fontWeight="bold">
                  Industry Network
                </text>
                <text x="345" y="345" textAnchor="middle" fill="#CBD5E1" fontSize="10">
                  Mentors & Capital
                </text>

                {/* Core Intersection Glowing Hub */}
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
          <div className="lg:col-span-5 space-y-5">
            <div className="p-5 rounded-2xl bg-[#181C26] border border-white/10 hover:border-[#FF6500]/50 transition group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition">
                  <Target size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">1. Academic Syllabi Core</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Preserves fundamental math, science, and humanities concepts while eliminating passive rote memorization.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#181C26] border border-white/10 hover:border-[#FF6500]/50 transition group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition">
                  <Zap size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">2. Applied Venture Execution</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Students turn textbook problems into working software, hardware prototypes, research papers, and revenue streams.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#181C26] border border-white/10 hover:border-[#FF6500]/50 transition group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#FF6500]/10 text-[#FF6500] group-hover:bg-[#FF6500]/20 transition">
                  <Globe size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">3. Industry & Venture Ecosystem</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Direct access to corporate mentors, incubator networks, and investment funds to accelerate student outcomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenInquiryModal('Experiential Nexus Audit')}
                className="w-full py-3.5 px-6 rounded-xl bg-[#FF6500] hover:bg-[#FF7A1A] text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-[#FF6500]/25 cursor-pointer"
              >
                <span>Incorporate Methodology in Your Institution</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
