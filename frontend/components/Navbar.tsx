'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenInquiryModal: (type?: string) => void;
}

export default function Navbar({ onOpenInquiryModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'What We Deliver', href: '#methodology' },
    { name: 'Partner Institutions', href: '#partners' },
    { name: 'For K-12 Schools', href: '#k12-programs' },
    { name: 'For Colleges', href: '#college-programs' },
    { name: 'Impact Calculator', href: '#impact-calculator' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0D11]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-[#0B0D11]/60 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with exact circular dot */}
        <Link href="/" className="brand-logo group flex items-end">
          <span className="logo-why text-[#FF6500] font-black text-2xl sm:text-3xl tracking-tight">Why</span>
          <span className="logo-school text-white font-medium text-2xl sm:text-3xl tracking-tight">School</span>
          <span className="logo-dot w-[7px] h-[7px] bg-[#FF6500] rounded-full ml-1 mb-1.5 shadow-[0_0_8px_rgba(255,101,0,0.6)] inline-block align-baseline" />
        </Link>

        {/* Desktop Nav Links (Pushed far right with lesser space between them) */}
        <nav className="hidden lg:flex items-center gap-4 ml-auto mr-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-300 hover:text-[#FF6500] text-xs font-semibold transition tracking-tight whitespace-nowrap px-1 py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button without Emoji (User Request 1) */}
        <div className="hidden lg:block">
          <button
            onClick={() => onOpenInquiryModal('Institutional Partnership')}
            className="py-2.5 px-5 rounded-lg bg-[#FF6500] hover:bg-[#FF7A1A] text-white font-bold text-xs transition flex items-center gap-1.5 shadow-lg shadow-[#FF6500]/25 cursor-pointer"
          >
            <span>Partner With Us</span>
            <ArrowUpRight size={15} />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12151C] border-b border-white/10 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-[#FF6500] text-sm font-semibold py-1.5"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiryModal('Institutional Partnership');
              }}
              className="w-full py-3 px-5 rounded-lg bg-[#FF6500] text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <span>Partner With Us</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
