'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Award, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenInquiryModal: (type?: string) => void;
}

export default function HeroSection({ onOpenInquiryModal }: HeroSectionProps) {
  const heroImages = [
    '/assets/hero_1.jpg',
    '/assets/hero_2.jpg',
    '/assets/hero_3.jpg',
    '/assets/hero_4.jpg',
    '/assets/hero_5.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#0B0D11] via-[#12151C] to-[#0B0D11]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF6500]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Chip Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6500]/10 border border-[#FF6500]/30 text-[#FF7A1A] text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Strategic B2B Experiential Partner</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Building Young India{' '}
              <span className="text-[#FF6500] underline decoration-[#FF6500]/40 underline-offset-8">
                Beyond Curriculums.
              </span>
            </h1>

            {/* Shortened Inception Paragraph (User Request 5) */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Premier educational institutions and top brands trust WhySchool. as their strategic B2B experiential partner—building real-world innovators, researchers, and student founders beyond traditional syllabi. Because degrees prove knowledge, but hands-on execution, leadership, and real-world exposure build true future readiness.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onOpenInquiryModal('Campus Audit')}
                className="w-full sm:w-auto py-3.5 px-7 rounded-xl bg-[#FF6500] hover:bg-[#FF7A1A] text-white font-extrabold text-sm transition flex items-center justify-center gap-2 shadow-xl shadow-[#FF6500]/30 cursor-pointer"
              >
                <span>Schedule Campus Audit</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => onOpenInquiryModal('Partnership Deck')}
                className="w-full sm:w-auto py-3.5 px-7 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 backdrop-blur-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Download Partnership Deck</span>
              </button>
            </div>

            {/* Trust Stats Bar */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">15+</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">Partner Campuses</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#FF6500]">10,000+</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">Students Impacted</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">50+</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">Ventures Built</div>
              </div>
            </div>
          </div>

          {/* Right Hero Image Carousel */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#181C26] shadow-2xl group">
              <div className="relative h-[340px] sm:h-[420px] w-full">
                <Image
                  src={heroImages[currentIndex]}
                  alt="WhySchool Campus Workshop"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-transparent to-transparent opacity-80" />

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#181C26]/85 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#FF6500]/20 text-[#FF6500]">
                      <Award size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">
                        Experiential Workshop
                      </div>
                      <div className="text-[11px] text-slate-400">Live Campus Venture Sprint</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FF6500] text-white">
                    {currentIndex + 1} / {heroImages.length}
                  </span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition backdrop-blur-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition backdrop-blur-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>

        {/* Founders/Trainers Alumni Credibility Strip */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
            Mentors & Curriculum Architects Trained At Premier Global Organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-sm font-bold tracking-wider text-slate-300">IIT BOMBAY</span>
            <span className="text-sm font-bold tracking-wider text-slate-300">ISRO</span>
            <span className="text-sm font-bold tracking-wider text-slate-300">DRDO</span>
            <span className="text-sm font-bold tracking-wider text-slate-300">DELOITTE</span>
            <span className="text-sm font-bold tracking-wider text-slate-300">PwC</span>
            <span className="text-sm font-bold tracking-wider text-slate-300">HCL TECH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
