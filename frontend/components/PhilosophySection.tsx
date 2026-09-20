'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Compass, CheckCircle2, XCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface PhilosophySectionProps {
  onOpenInquiryModal?: (type?: string) => void;
}

export default function PhilosophySection({ onOpenInquiryModal }: PhilosophySectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [showTable, setShowTable] = useState(false);

  const transformations = [
    {
      id: 'pillar-1',
      title: 'Applied Mastery & Product Launches',
      traditional: 'Rote Memorization & Written Exams',
      tagline: 'From passive theory to tangible market-ready solutions',
      desc: 'Instead of memorizing textbook definitions for written exams, students build physical hardware prototypes, software apps, and revenue-generating products.',
      image: '/assets/hero_3.jpg',
      badge: 'Execution-First Pedagogy',
      stats: '100% Practical Build Rate',
    },
    {
      id: 'pillar-2',
      title: 'Real-World Incubators & Venture Sprints',
      traditional: 'Isolated Textbooks & Hypothetical Scenarios',
      tagline: 'Bridging classroom labs with live startup incubators',
      desc: 'Theory is coupled with 72-hour hackathons, customer discovery sprints, live user testing, and direct feedback from seasoned corporate founders.',
      image: '/assets/whyschool_college_hub.jpg',
      badge: 'Incubator Network',
      stats: '50+ Ventures Incubated',
    },
    {
      id: 'pillar-3',
      title: 'Emotional Intelligence & Leadership',
      traditional: 'Grade Points & Paper Marksheets',
      tagline: 'Building character, resilience, and executive presence',
      desc: 'Nurturing public speaking, crisis management, high-stakes negotiation, ethical AI leadership, and high-performance team dynamics.',
      image: '/assets/college_workshop.jpg',
      badge: 'EQ & Leadership',
      stats: 'High-Impact Skill Metrics',
    },
    {
      id: 'pillar-4',
      title: 'Living Portfolios & Published IP',
      traditional: 'Paper Diplomas & Static Certificates',
      tagline: 'Verifiable proof of capability, patents, and repositories',
      desc: 'Students graduate with active GitHub repositories, published research papers, filed patents, and living digital portfolios that top recruiters seek.',
      image: '/assets/whyschool_k12_lab.jpg',
      badge: 'Verifiable IP & Proof',
      stats: '15+ Patents & Research Papers',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % transformations.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [transformations.length]);

  const current = transformations[activeTab];

  return (
    <section id="philosophy" className="py-20 md:py-28 bg-[#12151C] relative border-t border-white/10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#FF6500]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6500]/15 border border-[#FF6500]/30 text-[#FF7A1A] text-xs font-bold uppercase tracking-wider">
            <Compass size={14} />
            <span>OUR CORE PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Shifting From <span className="text-slate-400 font-light">Information</span> To{' '}
            <span className="text-[#FF6500]">Transformation</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Traditional education measures memory. WhySchool measures execution capability.
          </p>
        </div>

        {/* Tab Navigation Pill Strip */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {transformations.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`py-2.5 px-4 sm:px-5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer border ${
                activeTab === idx
                  ? 'bg-[#FF6500] text-white border-[#FF6500] shadow-lg shadow-[#FF6500]/30'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
            >
              <span>{idx + 1}. {item.title}</span>
            </button>
          ))}
        </div>

        {/* Main Visual Carousel Feature Card */}
        <div className="bg-[#181C26] border border-white/15 rounded-3xl p-6 lg:p-8 shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Image Visual Showcase Carousel */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-[320px] sm:h-[400px] w-full rounded-2xl overflow-hidden border border-white/15 shadow-xl group">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-transparent to-transparent opacity-80" />

                {/* Floating Badge Overlay */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#FF6500]" />
                  <span>{current.badge}</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#12151C]/90 backdrop-blur-md border border-white/10 rounded-xl p-3.5 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold">{current.tagline}</span>
                  <span className="font-extrabold text-[#FF7A1A] px-2.5 py-1 rounded-lg bg-[#FF6500]/20 border border-[#FF6500]/30 shrink-0">
                    {current.stats}
                  </span>
                </div>

                {/* Arrow Navigation */}
                <button
                  onClick={() => setActiveTab((prev) => (prev === 0 ? transformations.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition backdrop-blur-sm cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setActiveTab((prev) => (prev + 1) % transformations.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition backdrop-blur-sm cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Right Side Visual Transformation Comparison Details */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Traditional vs WhySchool Contrast Box */}
              <div className="space-y-3 bg-[#0B0D11]/70 p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
                  <XCircle size={16} className="shrink-0" />
                  <span>Traditional System: {current.traditional}</span>
                </div>
                <div className="flex items-center gap-2 text-lg sm:text-xl font-black text-white pt-2 border-t border-white/10">
                  <CheckCircle2 size={22} className="text-[#FF6500] shrink-0" />
                  <span className="text-[#FF7A1A]">WhySchool: {current.title}</span>
                </div>
              </div>

              {/* Detailed Explanation */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {current.desc}
              </p>

              {/* 4 Pillars Mini Navigation */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {transformations.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveTab(idx)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                      activeTab === idx
                        ? 'bg-[#FF6500]/20 border-[#FF6500] text-white font-bold'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold text-slate-200 truncate">{idx + 1}. {item.title}</div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* Detailed Matrix Toggle */}
        <div className="text-center">
          <button
            onClick={() => setShowTable(!showTable)}
            className="py-2.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition border border-white/10 cursor-pointer"
          >
            {showTable ? 'Hide Detailed Paradigm Matrix' : 'View Full Paradigm Comparison Matrix'}
          </button>

          {showTable && (
            <div className="mt-8 bg-[#181C26] border border-white/10 rounded-2xl overflow-hidden text-left shadow-2xl animate-fadeIn">
              <table className="w-full text-sm text-slate-300">
                <thead className="bg-[#0B0D11] border-b border-white/10 text-xs uppercase font-bold text-slate-400 tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Dimension</th>
                    <th className="py-4 px-6 text-red-400">Traditional Syllabi</th>
                    <th className="py-4 px-6 text-[#FF6500]">WhySchool Experiential Ecosystem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-4 px-6 font-bold text-white">Focus Area</td>
                    <td className="py-4 px-6">Curriculum syllabus completion & textbook exams</td>
                    <td className="py-4 px-6 text-white font-medium">Real-world problem solving & prototype building</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-white">Student Role</td>
                    <td className="py-4 px-6">Passive listener taking lecture notes</td>
                    <td className="py-4 px-6 text-white font-medium">Active creator, researcher, and startup founder</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-white">Outcome Proof</td>
                    <td className="py-4 px-6">Report card marksheet</td>
                    <td className="py-4 px-6 text-white font-medium">Working product portfolio, IP filings, live startups</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-white">Mentorship</td>
                    <td className="py-4 px-6">Solely internal faculty</td>
                    <td className="py-4 px-6 text-white font-medium">IIT/ISRO scientists, corporate executives, serial founders</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
