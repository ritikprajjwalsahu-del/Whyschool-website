'use client';

import React, { useState } from 'react';
import { Compass, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface PhilosophySectionProps {
  onOpenInquiryModal: (type?: string) => void;
}

export default function PhilosophySection({ onOpenInquiryModal }: PhilosophySectionProps) {
  const [showTable, setShowTable] = useState(false);

  const comparisons = [
    {
      traditional: 'Rote Memorization & Written Exams',
      whyschool: 'Applied Mastery & Product Launches',
      desc: 'Instead of memorizing definitions for tests, students build physical or digital solutions that solve actual market problems.',
    },
    {
      traditional: 'Isolated Textbooks & Hypothetical Theory',
      whyschool: 'Real-World Incubators & Venture Sprints',
      desc: 'Theory is coupled with live execution, prototyping, customer feedback, and real-world deployment.',
    },
    {
      traditional: 'Grade Points & Report Card Marks',
      whyschool: 'Emotional Intelligence & Leadership Capabilities',
      desc: 'Building resilience, public speaking, negotiation, crisis response, and high-performance team dynamics.',
    },
    {
      traditional: 'Paper Diplomas & Passive Degrees',
      whyschool: 'Living Digital Portfolios & Published IP',
      desc: 'Students graduate with patent filings, working products, active Github repos, and verifiable startup achievements.',
    },
  ];

  return (
    <section id="philosophy" className="py-20 md:py-28 bg-[#12151C] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6500]/15 border border-[#FF6500]/30 text-[#FF7A1A] text-xs font-bold uppercase tracking-wider">
            <Compass size={14} />
            <span>OUR CORE PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Shifting From <span className="text-slate-400 font-light">Information</span> To{' '}
            <span className="text-[#FF6500]">Transformation</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Traditional education measures memory. WhySchool measures execution capability.
          </p>
        </div>

        {/* 2x2 Grid of Transformation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {comparisons.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#181C26] border border-white/10 rounded-2xl p-6 hover:border-[#FF6500]/40 transition space-y-4 shadow-xl"
            >
              {/* Traditional vs WhySchool Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
                  <XCircle size={15} />
                  <span>Traditional: {item.traditional}</span>
                </div>
                <div className="flex items-center gap-2 text-base font-extrabold text-[#FF7A1A]">
                  <CheckCircle2 size={18} className="text-[#FF6500]" />
                  <span>WhySchool: {item.whyschool}</span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed pt-2 border-t border-white/10">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Toggle Detailed Matrix View */}
        <div className="text-center space-y-6">
          <button
            onClick={() => setShowTable(!showTable)}
            className="py-2.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition border border-white/10"
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

          <div>
            <button
              onClick={() => onOpenInquiryModal('Philosophy Consultation')}
              className="py-3 px-6 rounded-xl bg-[#FF6500] hover:bg-[#FF7A1A] text-white font-bold text-xs transition inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FF6500]/25"
            >
              <span>Transform Your Campus Pedagogy</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
