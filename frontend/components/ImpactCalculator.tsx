'use client';

import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp, Award, Rocket, CheckCircle2 } from 'lucide-react';

interface ImpactCalculatorProps {
  onOpenInquiryModal: (type?: string, details?: any) => void;
}

export default function ImpactCalculator({ onOpenInquiryModal }: ImpactCalculatorProps) {
  const [studentCount, setStudentCount] = useState(250);
  const [weeks, setWeeks] = useState(12);

  // Calculations
  const projectedMVPs = Math.round((studentCount / 5) * (weeks / 12) * 1.2);
  const projectedPatents = Math.round((studentCount / 40) * (weeks / 12));
  const placementBoost = Math.min(98, Math.round(65 + (weeks * 2.5)));

  return (
    <section id="impact-calculator" className="py-20 md:py-28 bg-[#12151C] text-white relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6500]/15 border border-[#FF6500]/30 text-[#FF7A1A] text-xs font-bold uppercase tracking-wider">
            <Calculator size={14} />
            <span>INSTITUTIONAL ROI MODEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Campus <span className="text-[#FF6500]">Impact Calculator</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Estimate projected student startups, patents, and placement outcomes for your institution.
          </p>
        </div>

        {/* Interactive Sliders & Output Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Card */}
          <div className="lg:col-span-6 bg-[#181C26] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-white uppercase tracking-wider">
                  Target Student Cohort Size
                </label>
                <span className="text-lg font-black text-[#FF6500]">{studentCount} Students</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                className="w-full h-2 bg-[#0B0D11] rounded-lg appearance-none cursor-pointer accent-[#FF6500]"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-semibold">
                <span>50</span>
                <span>250</span>
                <span>500</span>
                <span>1000+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-white uppercase tracking-wider">
                  Program Duration (Weeks)
                </label>
                <span className="text-lg font-black text-[#FF6500]">{weeks} Weeks</span>
              </div>
              <input
                type="range"
                min="4"
                max="24"
                step="2"
                value={weeks}
                onChange={(e) => setWeeks(Number(e.target.value))}
                className="w-full h-2 bg-[#0B0D11] rounded-lg appearance-none cursor-pointer accent-[#FF6500]"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-semibold">
                <span>4 Wks (Bootcamp)</span>
                <span>12 Wks (Semester)</span>
                <span>24 Wks (Annual)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#FF6500]" />
                <span>Includes faculty co-mentorship & live industry review boards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#FF6500]" />
                <span>Zero extra workload on existing school timetable</span>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-6 bg-[#181C26] border border-[#FF6500]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6500]/10 rounded-full blur-2xl pointer-events-none" />

            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">
              Projected 12-Month Institutional Deliverables
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0B0D11] p-4 rounded-2xl border border-white/5 text-center">
                <div className="p-2.5 rounded-xl bg-[#FF6500]/10 text-[#FF6500] w-fit mx-auto mb-2">
                  <Rocket size={20} />
                </div>
                <div className="text-3xl font-black text-white">{projectedMVPs}</div>
                <div className="text-[11px] font-semibold text-slate-400 mt-1">Student MVPs Built</div>
              </div>

              <div className="bg-[#0B0D11] p-4 rounded-2xl border border-white/5 text-center">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 w-fit mx-auto mb-2">
                  <Award size={20} />
                </div>
                <div className="text-3xl font-black text-white">{projectedPatents}</div>
                <div className="text-[11px] font-semibold text-slate-400 mt-1">Patents / IP Filings</div>
              </div>

              <div className="bg-[#0B0D11] p-4 rounded-2xl border border-white/5 text-center">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mx-auto mb-2">
                  <TrendingUp size={20} />
                </div>
                <div className="text-3xl font-black text-white">{placementBoost}%</div>
                <div className="text-[11px] font-semibold text-slate-400 mt-1">Placement Readiness</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() =>
                  onOpenInquiryModal('Impact Calculator Report', {
                    studentCapacity: `${studentCount} Students`,
                    programFocus: `${weeks}-Week Program Duration`,
                  })
                }
                className="w-full py-4 px-6 rounded-xl bg-[#FF6500] hover:bg-[#FF7A1A] text-white font-extrabold text-sm transition flex items-center justify-center gap-2 shadow-xl shadow-[#FF6500]/30 cursor-pointer"
              >
                <span>Request Custom ROI Report</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
