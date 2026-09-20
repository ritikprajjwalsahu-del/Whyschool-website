'use client';

import React, { useState } from 'react';
import { Rocket, ShieldCheck, Cpu, Award, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

interface K12ProgramsSectionProps {
  onOpenInquiryModal: (type?: string, details?: any) => void;
}

export default function K12ProgramsSection({ onOpenInquiryModal }: K12ProgramsSectionProps) {
  const [selectedPods, setSelectedPods] = useState<string[]>(['Young Founders Pod']);
  const [capacity, setCapacity] = useState('100-250 Students');

  const pods = [
    {
      id: 'Young Founders Pod',
      title: 'Young Founders Pod',
      icon: Rocket,
      badge: 'Grade-Agnostic Innovation',
      desc: 'Transforms students into real-world product creators. Covers market research, MVP prototyping, financial literacy, and investor pitching.',
      outcomes: ['Working Physical/Digital MVP', 'Business Model Canvas', 'Live Pitch Experience'],
    },
    {
      id: 'Leadership Pod',
      title: 'Leadership & EQ Pod',
      icon: ShieldCheck,
      badge: 'Character & Team Dynamics',
      desc: 'Fosters high-stress decision making, conflict resolution, public speaking, executive presence, and ethical leadership.',
      outcomes: ['Crisis Management Simulation', 'Debate & Negotiation Mastery', 'Team Leadership Portfolio'],
    },
    {
      id: 'Future Skills Pod',
      title: 'Future Skills & Deep Tech Pod',
      icon: Cpu,
      badge: 'STEM & Frontier Tech',
      desc: 'Hands-on exposure to AI/ML tools, micro-robotics, clean energy systems, space-tech, and advanced data analytics.',
      outcomes: ['AI Tool Deployment', 'Robotics & Hardware Demo', 'Data Science Case Studies'],
    },
    {
      id: 'Career & Portfolio Pod',
      title: 'Career & Research Portfolio Pod',
      icon: Award,
      badge: 'IP & Global Applications',
      desc: 'Guides students to publish research papers, file utility patents, build digital portfolios, and stand out for Ivy League admissions.',
      outcomes: ['Published Research Paper / Patent', 'Digital GitHub/Web Portfolio', 'Global University Profile'],
    },
  ];

  const togglePod = (podId: string) => {
    if (selectedPods.includes(podId)) {
      if (selectedPods.length > 1) {
        setSelectedPods(selectedPods.filter((p) => p !== podId));
      }
    } else {
      setSelectedPods([...selectedPods, podId]);
    }
  };

  const handleExportBlueprint = () => {
    onOpenInquiryModal('K-12 Custom Blueprint Export', {
      selectedPods,
      studentCapacity: capacity,
      institutionType: 'K12',
    });
  };

  return (
    <section id="k12-programs" className="py-20 md:py-28 bg-[#F8FAFC] text-[#0B0D11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6500]/10 border border-[#FF6500]/30 text-[#FF6500] text-xs font-bold uppercase tracking-wider">
            <BookOpen size={14} />
            <span>FOR K-12 SCHOOLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0D11] tracking-tight">
            Grade-Agnostic <span className="text-[#FF6500]">Experiential Pods</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Modular learning pods designed to seamlessly integrate into school schedules without disturbing core syllabi.
          </p>
        </div>

        {/* 4 Pod Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {pods.map((pod) => {
            const IconComponent = pod.icon;
            const isSelected = selectedPods.includes(pod.id);
            return (
              <div
                key={pod.id}
                onClick={() => togglePod(pod.id)}
                className={`p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer shadow-lg bg-white relative overflow-hidden ${
                  isSelected
                    ? 'border-[#FF6500] ring-4 ring-[#FF6500]/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3.5 rounded-2xl bg-[#FF6500]/10 text-[#FF6500]">
                    <IconComponent size={28} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {pod.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0B0D11] mb-2">{pod.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{pod.desc}</p>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Key Deliverables</span>
                  {pod.outcomes.map((out, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 size={14} className="text-[#FF6500]" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FF6500]">
                    {isSelected ? '✓ Included in Blueprint' : '+ Click to Add'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Custom K-12 Builder Bar */}
        <div className="bg-[#0B0D11] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6500]">
              Interactive School Customizer
            </span>
            <h3 className="text-2xl font-black text-white">Custom K-12 Program Blueprint</h3>
            <p className="text-xs text-slate-400">
              Selected Pods: <span className="text-white font-bold">{selectedPods.join(', ')}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="bg-[#181C26] border border-white/20 text-white rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#FF6500] cursor-pointer"
            >
              <option value="50-100 Students">50 - 100 Students</option>
              <option value="100-250 Students">100 - 250 Students</option>
              <option value="250-500 Students">250 - 500 Students</option>
              <option value="500+ Students">500+ Students</option>
            </select>

            <button
              onClick={handleExportBlueprint}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-[#FF6500] hover:bg-[#FF7A1A] text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FF6500]/30"
            >
              <span>Export K-12 Blueprint</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
