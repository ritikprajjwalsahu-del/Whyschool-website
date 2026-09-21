'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Mail, Phone, MapPin, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#07090D] border-t border-white/10 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="brand-logo flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-white p-0.5 shadow-md shrink-0">
                <Image
                  src="/assets/whyschool_logo.png"
                  alt="WhySchool Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-end">
                <span className="logo-why text-[#FF6500] font-black text-2xl tracking-tight">Why</span>
                <span className="logo-school text-white font-medium text-2xl tracking-tight">School</span>
                <span className="logo-dot w-[7px] h-[7px] bg-[#FF6500] rounded-full ml-1 mb-1.5 shadow-[0_0_8px_rgba(255,101,0,0.6)] inline-block align-baseline" />
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strategic B2B experiential partner for premier educational institutions and top brands—building real-world innovators, researchers, and student founders beyond traditional syllabi.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <span className="font-bold text-white uppercase tracking-wider block">Ecosystem</span>
              <ul className="space-y-2">
                <li><a href="#methodology" className="hover:text-[#FF6500] transition">Methodology</a></li>
                <li><a href="#partners" className="hover:text-[#FF6500] transition">Partners</a></li>
                <li><a href="#impact-calculator" className="hover:text-[#FF6500] transition">Impact Calculator</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <span className="font-bold text-white uppercase tracking-wider block">Programs</span>
              <ul className="space-y-2">
                <li><a href="#k12-programs" className="hover:text-[#FF6500] transition">K-12 Experiential Pods</a></li>
                <li><a href="#college-programs" className="hover:text-[#FF6500] transition">College Incubators</a></li>
                <li><a href="#college-programs" className="hover:text-[#FF6500] transition">Placement Acceleration</a></li>
              </ul>
            </div>
          </div>

          {/* Contact & Admin Portal */}
          <div className="md:col-span-4 space-y-4 text-xs">
            <span className="font-bold text-white uppercase tracking-wider block">Contact & Admin</span>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#FF6500]" />
                <a href="mailto:office@whyschool.co" className="hover:text-white transition">office@whyschool.co</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#FF6500]" />
                <a href="tel:+917326869001" className="hover:text-white transition">+91 7326869001</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#FF6500] shrink-0 mt-0.5" />
                <span>DCB 321, DLF Cybercity, Bhubaneswar 751024</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition font-semibold"
              >
                <Lock size={12} className="text-[#FF6500]" />
                <span>Super Admin Portal</span>
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} WhySchool Ecosystem. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition">Institutional SLA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
