'use client';

import React from 'react';
import { ArrowRight, Sparkles, Download } from 'lucide-react';

interface CtaSectionProps {
  onOpenInquiryModal: (type?: string) => void;
}

export default function CtaSection({ onOpenInquiryModal }: CtaSectionProps) {
  return (
    <section className="py-20 md:py-24 bg-[#0B0D11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card Container */}
        <div className="bg-gradient-to-r from-[#181C26] via-[#222734] to-[#181C26] border border-[#FF6500]/40 rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl space-y-8">
          
          {/* Glow backdrop */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF6500]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6500]/15 border border-[#FF6500]/40 text-[#FF7A1A] text-xs font-bold uppercase tracking-wider relative z-10">
            <Sparkles size={14} />
            <span>EXECUTIVE PRESENTATION</span>
          </div>

          {/* Headline & Paragraph */}
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Ready To Transform Your <span className="text-[#FF6500]">Institution’s Ecosystem?</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Book a 30-minute campus strategy call with WhySchool founders to review our customized experiential blueprints.
            </p>
          </div>

          {/* Centered Button Group (User Request 3: Schedule Campus Presentation in the middle of the box) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 mx-auto">
            <button
              onClick={() => onOpenInquiryModal('Campus Presentation')}
              className="w-full sm:w-auto py-4 px-8 rounded-xl bg-[#FF6500] hover:bg-[#FF7A1A] text-white font-extrabold text-sm transition flex items-center justify-center gap-2.5 shadow-xl shadow-[#FF6500]/30 cursor-pointer"
            >
              <span>Schedule Campus Presentation</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => onOpenInquiryModal('Partnership Deck')}
              className="w-full sm:w-auto py-4 px-8 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download size={18} />
              <span>Download Partnership Deck</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
