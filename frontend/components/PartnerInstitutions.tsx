'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface PartnerInstitutionsProps {
  onOpenInquiryModal: (type?: string) => void;
}

export default function PartnerInstitutions({ onOpenInquiryModal }: PartnerInstitutionsProps) {
  const partners = [
    {
      name: 'IIT Bhubaneswar',
      logo: '/assets/logos/iit_bhubaneswar.jpg',
      badge: 'Incubation & Research',
      desc: 'Collaborative venture sprints, technical innovation hubs, and joint hackathons.',
    },
    {
      name: 'KIIT University',
      logo: '/assets/logos/kiit.png',
      badge: 'University Incubator',
      desc: 'Experiential founder labs, product accelerator programs, and mentor networks.',
    },
    {
      name: 'SAI International School',
      logo: '/assets/logos/sai_international.png',
      badge: 'K-12 Leadership',
      desc: 'School incubation pods, robotics, and early-stage innovation bootcamps.',
    },
    {
      name: 'RCM Bhubaneswar',
      logo: '/assets/logos/rcm.jpg',
      badge: 'Management Immersion',
      desc: 'Corporate readiness, practical leadership, and business strategy sprints.',
    },
    {
      name: 'Srusti Academy',
      logo: '/assets/logos/srusti.jpg',
      badge: 'Skill Acceleration',
      desc: 'Venture creation masterclasses and real-world executive mentorship.',
    },
  ];

  return (
    <section id="partners" className="py-20 md:py-28 bg-[#0B0D11] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6500]/15 border border-[#FF6500]/30 text-[#FF7A1A] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} />
            <span>INSTITUTIONAL TRUST</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Partnered With <span className="text-[#FF6500]">Premier Institutions</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Empowering students across top universities, institutes, and visionary K-12 schools.
          </p>
        </div>

        {/* 5-Column Partner Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-[#181C26] border border-white/10 rounded-2xl p-6 text-center hover:border-[#FF6500]/50 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Logo Box */}
                <div className="w-20 h-20 mx-auto mb-4 relative rounded-xl overflow-hidden bg-white p-2 flex items-center justify-center shadow-md">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={80}
                    height={80}
                    className="object-contain max-h-full"
                  />
                </div>

                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FF6500]/15 text-[#FF7A1A] border border-[#FF6500]/30 mb-2">
                  {partner.badge}
                </span>

                <h3 className="text-base font-bold text-white group-hover:text-[#FF6500] transition mb-2">
                  {partner.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {partner.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenInquiryModal('Institutional Partnership')}
            className="py-3 px-8 rounded-xl bg-[#FF6500] hover:bg-[#FF7A1A] text-white font-bold text-xs transition inline-flex items-center gap-2 shadow-lg shadow-[#FF6500]/25 cursor-pointer"
          >
            <span>Join Our Institutional Network</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
